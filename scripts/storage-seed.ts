/**!
 * Script based on: 
 * https://github.com/rodnye/literary-blog/blob/master/scripts/blog-sync.ts
 * 
 * !!Note: Modifications to this file will be tested and updated from there
 */

import * as dotenv from "dotenv";
import glob from "fast-glob";
import simpleGit, { CheckRepoActions } from "simple-git";
import { join, resolve, dirname } from "node:path";
import { access, appendFile, copyFile, mkdir, readFile, writeFile } from "node:fs/promises";

dotenv.config();

const url =
  process.env.SEED_STORAGE_URL ||
  "https://github.com/Digital-Revolution-Cuba/Digital-Revolution-Web/tree/seed-storage";

/**
 * Parses download URL to extract owner, repo and branch.
 * Expected format: https://github.com/<owner>/<repo>/tree/<branch>
 */
function parseGitHubUrl(rawUrl: string) {
  const url = new URL(rawUrl);
  const routes = url.pathname.split("/").slice(1);
  const owner = routes[0];
  const repo = routes[1];

  if (routes[2] !== "tree" || !routes[3]) throw new Error("Expected a branch name after /tree/...");
  const branch = routes[3];

  const repoUrl = `https://github.com/${owner}/${repo}.git`;
  return { repoUrl, branch };
}

/**
 * Ensures an updated clone of the repository exists in cacheDir.
 */
async function ensureRepoClone(repoUrl: string, branch: string, cacheDir: string) {
  await mkdir(cacheDir, { recursive: true });
  const git = simpleGit(cacheDir);

  const isRepo = await git.checkIsRepo(CheckRepoActions.IS_REPO_ROOT);
  if (!isRepo) {
    console.log(`Cloning repository ${repoUrl} (branch ${branch}) into ${cacheDir}`);
    await git.clone(repoUrl, cacheDir, ["--branch", branch, "--depth", "1"]);
  } else {
    console.log(`Updating existing repository in ${cacheDir}`);
    await git.fetch("origin", branch);
    await git.reset(["--hard", `origin/${branch}`]);
  }
}

/**
 *
 */
const ensureGitignore = async (filePath: string) => {
  try {
    await access(filePath);
  } catch {
    await writeFile(filePath, ".gitignore\n");
  }
};

/**
 * Adds an entry to .gitignore if it doesn't already exist
 */
const appendToGitignore = async (dir: string, entry: string) => {
  const gitignorePath = join(dir, ".gitignore");

  await ensureGitignore(gitignorePath);
  if (!(await readFile(gitignorePath, "utf8")).includes("\n" + entry)) {
    await appendFile(gitignorePath, `${entry}\n`);
    console.log(`  → Added "${entry}" to ${gitignorePath}`);
  }
};

const main = async () => {
  console.log("Starting process");

  const { repoUrl, branch } = parseGitHubUrl(url);
  const cacheDir = join(process.cwd(), ".cache", "blog-sync");

  // Get updated clone
  await ensureRepoClone(repoUrl, branch, cacheDir);

  // Read copy.json
  const seedJsonPath = join(cacheDir, "copy.json");
  const seedJsonContent = await readFile(seedJsonPath, "utf-8");
  const config = JSON.parse(seedJsonContent);

  //copy files according to include/exclude
  const filesToCopy = await glob(config.include || [], {
    cwd: cacheDir,
    ignore: config.exclude || [],
    dot: true,
  });

  for (const relativePath of filesToCopy) {
    const src = join(cacheDir, relativePath);
    const dest = resolve(process.cwd(), relativePath);
    const destDir = dirname(dest);
    const fileName = relativePath.split("/").pop()!;

    console.log(`Copying: ${relativePath}`);

    await mkdir(destDir, { recursive: true });
    await copyFile(src, dest);
    await appendToGitignore(destDir, fileName);
  }

  console.log(`Process completed (cache saved in ${cacheDir} :)`);
};

main()
  .then(() => console.log("Process completed :D"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
