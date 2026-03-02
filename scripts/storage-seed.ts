import { createWriteStream, promises as fs } from "fs";
import { tmpdir } from "os";
import { join, resolve } from "path";
import { pipeline } from "stream/promises";
import * as https from "https";
import * as dotenv from "dotenv";
import AdmZip from "adm-zip";

dotenv.config();

const url =
  process.env.SEED_STORAGE_URL ||
  "https://github.com/Digital-Revolution-Cuba/Digital-Revolution-Web/archive/refs/heads/seed-storage.zip";

/**
 * Descarga un archivo desde una URL
 */
const download = (fileUrl: string, dest: string) =>
  new Promise<void>((resolvePromise, reject) => {
    console.log("iniciando descarga");

    let lastLoggedProgress = 0;

    https
      .get(fileUrl, (response) => {
        if (
          response.statusCode &&
          response.statusCode >= 300 &&
          response.statusCode < 400 &&
          response.headers.location
        ) {
          console.log("redirigiendo");
          return download(response.headers.location, dest).then(resolvePromise).catch(reject);
        }
        if (response.statusCode !== 200) {
          return reject(new Error(`descarga fallida con estado ${response.statusCode}`));
        }

        const contentLength = parseInt(response.headers["content-length"] || "0", 10);
        let downloadedBytes = 0;

        response.on("data", (chunk) => {
          downloadedBytes += chunk.length;

          if (contentLength > 0) {
            const progress = (downloadedBytes / contentLength) * 100;
            const progressStep = Math.floor(progress / 20) * 20;

            if (progressStep > lastLoggedProgress && progressStep <= 100) {
              lastLoggedProgress = progressStep;
              const downloadedMB = (downloadedBytes / (1024 * 1024)).toFixed(1);
              const totalMB = (contentLength / (1024 * 1024)).toFixed(1);
              console.log(`${progressStep}% - ${downloadedMB}mb de ${totalMB}mb`);
            }
          }
        });

        const fileStream = createWriteStream(dest);
        pipeline(response, fileStream)
          .then(() => {
            console.log("descarga completada");
            resolvePromise();
          })
          .catch(reject);
      })
      .on("error", reject);
  });

/**
 * Copia recursivamente archivos y directorios
 */
const copyRecursive = async (src: string, dest: string) => {
  const stat = await fs.stat(src);
  if (stat.isDirectory()) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src);
    for (const entry of entries) {
      await copyRecursive(join(src, entry), join(dest, entry));
    }

    const files = await fs.readdir(src);
    const filesInCurrentDir: string[] = [];

    for (const file of files) {
      const filePath = join(src, file);
      const fileStat = await fs.stat(filePath);
      if (fileStat.isFile()) {
        filesInCurrentDir.push(file);
      }
    }

    if (filesInCurrentDir.length > 0) {
      const ignoreContent = [
        ".gitignore",
        ...filesInCurrentDir.filter((f) => f !== ".gitignore"),
      ].join("\n");
      await fs.writeFile(join(dest, ".gitignore"), ignoreContent);
    }
  } else {
    await fs.mkdir(resolve(dest, ".."), { recursive: true });
    await fs.copyFile(src, dest);
  }
};

const main = async () => {
  console.log("iniciando proceso");
  const tempZip = join(tmpdir(), `seed-storage-${Date.now()}.zip`);
  const extractDir = join(tmpdir(), `seed-storage-${Date.now()}`);

  await download(url, tempZip);

  console.log("extrayendo archivos");
  
  // Usando adm-zip en lugar de unzipper
  const zip = new AdmZip(tempZip);
  zip.extractAllTo(extractDir, true);

  const contentDir = join(
    extractDir,
    (await fs.readdir(extractDir))[0] // entrar a la carpeta del zip
  );
  const entries = await fs.readdir(contentDir);
  for (const entry of entries) {
    if (entry === "README.md") continue;
    const fullPath = join(contentDir, entry);
    await copyRecursive(fullPath, resolve(process.cwd(), entry));
  }

  // Limpieza de archivos temporales
  await fs.rm(tempZip, { force: true });
  await fs.rm(extractDir, { recursive: true, force: true });
};

main()
  .then(() => console.log("proceso finalizado"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });