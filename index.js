const express = require('express');
const QRCode = require('qrcode');
const app = express();
const api = express.Router();
const port = 55001;

app.use(express.json());

api.get('/', async (req, res) => {
    const { text, url } = req.query;
    if (!text && !url) {
        return res.status(400).send('Missing text or url query parameter');
    }

    try {
        let content;
        if (url) {
            const transformUrl = new URL(url);
            content = transformUrl.href;
        } else {
            content = text;
        }
        const qrImage = await QRCode.toDataURL(content);
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

api.post('/', async (req, res) => {
    const { text, url } = req.body;
    if (!text && !url) {
        return res.status(400).send('Missing text or url in body');
    }

    try {
        const transformUrl = new URL(url);
        const content = text || transformUrl.href;
        const qrImage = await QRCode.toDataURL(content);
        // Return as data URI in JSON for POST
        res.json({ qrCode: qrImage });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error generating QR code');
    }
});

app.use('/qr-generate', api);

app.listen(port, () => {
    console.log(`QR Code Generator app listening at http://localhost:${port}`);
});
