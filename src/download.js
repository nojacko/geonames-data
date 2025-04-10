import fs from "fs";
import https from "https";
import path from "path";
import { promisify } from "util";
import stream from "stream";
import { goenamesFiles, geonamesBaseUrl, originalDirRel, originalDir } from "./vars.js";

const pipeline = promisify(stream.pipeline);

async function downloadFile(file) {
  const url = geonamesBaseUrl + file.src;
  const dest = path.join(originalDir, file.src);
  const destStream = fs.createWriteStream(dest);

  try {
    console.log("📂", url);
    const response = await new Promise((resolve, reject) => {
      https.get(url, resolve).on("error", reject);
    });

    await pipeline(response, destStream);
    console.log(`🟢 Downloaded to ${originalDirRel}/${file.src}`);
  } catch (err) {
    if (fs.existsSync(dest)) {
      await fs.promises.unlink(dest);
    }
    console.error(`🛑 Failed to download ${url}: ${err.message}`);
  }

  console.log();
}

(async () => {
  if (!fs.existsSync(originalDir)) {
    fs.mkdirSync(originalDir, { recursive: true });
  }

  console.log("Downloading files...");
  for (const file of goenamesFiles.filter((f) => f.src)) {
    await downloadFile(file);
  }
})();