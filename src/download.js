const fs = require("fs");
const https = require("https");
const path = require("path");
const { promisify } = require("util");
const stream = require("stream");
const pipeline = promisify(stream.pipeline);
const { goenamesFiles, geonamesBaseUrl, originalDirRel, originalDir } = require("./vars");

async function downloadFile(file) {
    const url = geonamesBaseUrl + file.src;
    const dest = path.join(originalDir, file.src);
    const destStream = fs.createWriteStream(dest);

    try {
        console.log("📂", url);
        const response = await new Promise((resolve, reject) => {
            https.get(url, resolve).on('error', reject);
        });

        await pipeline(response, destStream);
        console.log(`🟢 Downloaded to ${originalDirRel}/${file.src}`);
    } catch (err) {
        await fs.promises.unlink(dest);
        console.error(`🛑 Failed: ${err.message}`);
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