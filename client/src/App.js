import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const About = () => {
    return (
        <section>
            <h2>About</h2>
            <p>
                Welcome to the YouTube Downloader! This application allows you to easily download audio and video from YouTube. With a simple and user-friendly interface, you can input any YouTube video URL and choose your preferred format (MP4 for video or MP3 for audio) to download directly to your device.
            </p>
            <p>
                Our goal is to provide a fast, reliable, and straightforward way to access your favorite content offline. Enjoy your downloads!
            </p>
        </section>
    );
};

const HowToUse = () => {
    return (
        <section>
            <h2>How to Use</h2>
            <ol>
                <li>Copy the URL of the YouTube video you want to download.</li>
                <li>Paste the URL into the input field on the homepage.</li>
                <li>Select the format you want to download (MP4 for video or MP3 for audio).</li>
                <li>Click the "Download" button.</li>
                <li>Your download will start automatically, and the file will be saved to your device.</li>
            </ol>
        </section>
    );
};

const FAQ = () => {
    return (
        <section>
            <h2>FAQ</h2>
            <h3>1. Is it legal to download videos from YouTube?</h3>
            <p>
                Downloading videos from YouTube may violate YouTube's Terms of Service. Please ensure you have the right to download the content before doing so.
            </p>

            <h3>2. What formats can I download?</h3>
            <p>
                You can download videos in MP4 format and audio in MP3 format.
            </p>

            <h3>3. Why is my download not starting?</h3>
            <p>
                Make sure the URL is correct and that the video is publicly accessible. If the issue persists, try refreshing the page or using a different browser.
            </p>

            <h3>4. Can I download playlists or multiple videos at once?</h3>
            <p>
                Currently, this application only supports downloading individual videos. We may add support for playlists in future updates.
            </p>
        </section>
    );
};

function App() {
    const [url, setUrl] = useState('');
    const [format, setFormat] = useState('mp4');

    const handleDownload = async () => {
        const response = await axios.get(`http://localhost:5000/download?url=${url}&format=${format}`, {
            responseType: 'blob',
        });
        const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = urlBlob;
        link.setAttribute('download', `video.${format}`);
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div className="App">
            <header>
                <h1>YouTube Downloader</h1 >
            </header>
            <main>
                <section>
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter YouTube video URL" />
                    <select value={format} onChange={(e) => setFormat(e.target.value)}>
                        <option value="mp4">MP4 (Video)</option>
                        <option value="mp3">MP3 (Audio)</option>
                    </select>
                    <button onClick={handleDownload}>Download</button>
                </section>
                <About />
                <HowToUse />
                <FAQ />
            </main>
        </div>
    );
}

export default App;