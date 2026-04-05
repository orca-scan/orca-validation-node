# orca-validation-node

This is a working example of how to build a [Validation URL](https://orcascan.com/guides/barcode-scan-validation-webhook-56928ff9) for [Orca Scan](https://orcascan.com) using Node.js and Express.

**Why?** when someone scans a barcode in the Orca Scan app, you might want to check the data **before** it gets saved. A Validation URL lets you:

- **Reject bad data** - block a scan if a value is missing, out of range, or a duplicate
- **Modify data** - auto-format, trim, or fill in fields before saving
- **Guide the user** - show a success, warning, or error message right in the app

## How it works

When a user scans a barcode or edits a field, the app sends the row data to your server as a POST request:

```json
{
    "___orca_sheet_name": "Vehicle Checks",
    "___orca_user_email": "user@example.com",
    "___orca_row_id": "abc123",
    "Barcode": "orca-scan-test",
    "Name": "Orca Scan"
}
```

Fields starting with `___` are Orca system fields. Everything else matches your sheet column names exactly _(case and spaces matter)_.

Your server responds to tell Orca Scan what to do:

| Response                          | What happens                                                 |
|-----------------------------------|--------------------------------------------------------------|
| HTTP `204`                        | Allow - data saves as-is                                     |
| HTTP `200` with fields            | Modify - Orca Scan updates the fields you return, then saves |
| HTTP `400` with `___orca_message` | Reject - user sees an error and the save is blocked          |

### In-app messages

You can show messages in the app by including `___orca_message` in your response:

```json
{
    "___orca_message": {
        "display": "notification",
        "type": "success",
        "message": "Item verified"
    }
}
```

`display` controls how the message appears. `"notification"` shows a brief banner, `"dialog"` shows a popup the user must dismiss.

`type` controls the colour: `"success"` (green), `"warning"` (yellow), or `"error"` (red).

> Your server must respond within **750ms** or Orca Scan will ignore the response.

See [server.js](server.js) for working examples of all three response types, plus in-app notifications and secret verification.

## Getting started

You'll need [Node.js](https://nodejs.org/) v11+ installed (`node -v` to check) and an [Orca Scan](https://orcascan.com) account.

```bash
# download this example
git clone https://github.com/orca-scan/orca-validation-node.git

# go into the folder
cd orca-validation-node

# install dependencies
npm install

# start the server
npm start
```

Your server is now running at `http://localhost:3000`.

## Try it

Use [cURL](https://curl.se) to send a test request from your terminal (just like Orca Scan would):

```bash
curl -X POST http://localhost:3000 \
  -H 'Content-Type: application/json' \
  -H 'orca-sheet-name: Vehicle Checks' \
  -H 'orca-secret: your-secret-here' \
  -d '{
    "___orca_sheet_name": "Vehicle Checks",
    "___orca_user_email": "user@example.com",
    "___orca_row_id": "abc123",
    "Barcode": "orca-scan-test",
    "Name": "Orca Scan"
  }'
```

- **Name ≤ 20 chars** → empty `HTTP 204` response (data allowed)
- **Name > 20 chars** → `HTTP 400` with an error message (data rejected)

## Connect to Orca Scan

Orca Scan needs to reach your server over the internet. During development, [localtunnel](https://github.com/localtunnel/localtunnel) creates a temporary public URL that points to your laptop:

```bash
npx localtunnel --port 3000
```

Copy the URL it gives you and paste it in Orca Scan under **Integrations > Events API > Validation URL**.

When you're ready to go live, deploy to any Node.js host (e.g. [Railway](https://railway.app), [Render](https://render.com)) and update the URL.

## Security

Set a secret in Orca Scan (**Integrations > Events API > Secret**) and Orca Scan will send it as an `orca-secret` header with every request. Verify it on your server to make sure the request is genuine. See the commented example in [server.js](server.js).

## Help

[Chat to us live](https://orcascan.com/#chat) if you run into any issues.

## Examples in other langauges
* [orca-validation-dotnet](https://github.com/orca-scan/orca-validation-dotnet)
* [orca-validation-python](https://github.com/orca-scan/orca-validation-python)
* [orca-validation-go](https://github.com/orca-scan/orca-validation-go)
* [orca-validation-java](https://github.com/orca-scan/orca-validation-java)
* [orca-validation-php](https://github.com/orca-scan/orca-validation-php)
* [orca-validation-node](https://github.com/orca-scan/orca-validation-node)

## License

&copy; Orca Scan, the [Barcode Scanner app for iOS and Android](https://orcascan.com)