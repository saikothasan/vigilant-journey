const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/download", (req, res) => {
    const url = req.query.url;
    const format = req.query.format || 'mp4'; // Default format

    // Set the appropriate content disposition
    res.header("Content-Disposition", `attachment; filename="video.${format}"`);

    // Define the format options
    let formatOptions = {};

    switch (format) {
        case 'mp3':
            formatOptions = {
                filter: format => format.container === 'mp3',
                quality: 'highestaudio'
            };
            break;
        case 'webm':
            formatOptions = {
                filter: format => format.container === 'webm',
                quality: 'highest'
            };
            break;
        case 'mp4':
        default:
            formatOptions = {
                filter: format => format.container === 'mp4',
                quality: 'highestvideo'
            };
            break;
    }

    // Use ytdl-core to stream the video/audio
    ytdl(url, formatOptions).pipe(res);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});