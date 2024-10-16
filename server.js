const express = require('express');
const cors = require('cors');
const { startBot, stopBot, getStatus, canProcess } = require('./bot');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/start', (req, res) => {
    startBot();
    res.send('Bot started!');
});

app.post('/stop', (req, res) => {
    stopBot();
    res.send('Bot stopped!');
});

app.get('/status', (req, res) => {
    const status = getStatus() ? 'Online' : 'Offline';
    res.json({ status });
});

app.get('/can-process', (req, res) => {
    const canProcessCommands = canProcess() ? 'true' : 'false';
    res.json({ canProcess: canProcessCommands });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
