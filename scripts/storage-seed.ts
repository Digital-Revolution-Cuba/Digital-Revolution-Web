import { createWriteStream, promises as fs } from "fs";
import { tmpdir } from "os";
import { join, resolve, dirname } from "path";
import { pipeline } from "stream/promises";
import * as https from "https";
import * as dotenv from "dotenv";
import AdmZip from "adm-zip";
import glob from "fast-glob";

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
 * asegura que un archivo exista (lo crea vacío si no existe)
 */
const ensureGitignore = async (filePath: string) => {
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, ".gitignore\n");
  }
};

/**
 * add una entrada al .gitignore si no existe ya
 */
const appendToGitignore = async (dir: string, entry: string) => {
  const gitignorePath = join(dir, ".gitignore");

  await ensureGitignore(gitignorePath);

  await fs.appendFile(gitignorePath, `${entry}\n`);
  console.log(`  → Agregado "${entry}" a ${gitignorePath}`);
};

const main = async () => {
  console.log("iniciando proceso");
  const tempZip = join(tmpdir(), `seed-storage-${Date.now()}.zip`);
  const extractDir = join(tmpdir(), `seed-storage-${Date.now()}`);

  await download(url, tempZip);

  console.log("extrayendo archivos");

  const zip = new AdmZip(tempZip);
  zip.extractAllTo(extractDir, true);

  const contentDir = join(
    extractDir,
    (await fs.readdir(extractDir))[0] // entrar a la carpeta del zip
  );

  // Leer el archivo copy.json
  const seedJsonPath = join(contentDir, "copy.json");
  const seedJsonContent = await fs.readFile(seedJsonPath, "utf-8");
  const config = JSON.parse(seedJsonContent);

  const filesToCopy = await glob(config.include || [], {
    cwd: contentDir,
    ignore: config.exclude || [],
    dot: true,
  });

  for (const relativePath of filesToCopy) {
    const src = join(contentDir, relativePath);
    const dest = resolve(process.cwd(), relativePath);
    const destDir = dirname(dest);
    const fileName = relativePath.split("/").pop()!;

    console.log(`Copiando: ${relativePath}`);

    await fs.mkdir(destDir, { recursive: true });
    await fs.copyFile(src, dest);
    await appendToGitignore(destDir, fileName);
  }

  await fs.rm(tempZip, { force: true });
  await fs.rm(extractDir, { recursive: true, force: true });
};

main()
  .then(() => console.log("proceso finalizado"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
