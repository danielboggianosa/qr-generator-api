# QR Generator API

A simple Node.js API to generate QR codes.

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Start the server:
```bash
node index.js
```
The server will start on `http://localhost:3000`.

## API Endpoints

### 1. Generate QR Code (Image)

Returns the QR code as a PNG image.

- **URL:** `/qr`
- **Method:** `GET`
- **Query Parameters:**
    - `text` (required): The text or URL to encode in the QR code.

**Example:**
```bash
curl "http://localhost:3000/qr?text=Hello%20World" --output qr.png
```

### 2. Generate QR Code (Data URI)

Returns the QR code as a Base64 Data URI in a JSON response.

- **URL:** `/qr`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Body:**
    ```json
    {
      "text": "Your text here"
    }
    ```

**Response:**
```json
{
  "qrCode": "data:image/png;base64,..."
}
```

**Example:**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"text":"Hello World"}' http://localhost:3000/qr
```
