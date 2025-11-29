const express = require('express');
const QRCode = require('qrcode');
const app = express();
const api = express.Router();
const port = 3000;

app.use(express.json());

app.get('/', async (req, res) => {
    const text = req.query.text;
    if (!text) {
        return res.status(400).send('Missing text query parameter');
    }

    try {
        const qrImage = await QRCode.toDataURL(text);
        const img = Buffer.from(qrImage.split(',')[1], 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });
        res.end(img);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error generating QR code');
    }
});

app.post('/url', async (req, res) => {
    const url = req.body.url;
    if (!url) {
        return res.status(400).send('Missing url in body');
    }

    try {
        const qrImage = await QRCode.toDataURL(url);
        // Return as data URI in JSON for POST
        res.json({ qrCode: qrImage });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error generating QR code');
    }
});

api.use('/qr-generate', app);

api.listen(port, () => {
    console.log(`QR Code Generator app listening at http://localhost:${port}`);
});
