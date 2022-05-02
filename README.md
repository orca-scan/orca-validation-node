# orca-validation-node

Example of [how to validate barcode scans in real-time](https://orcascan.com/guides/how-to-validate-barcode-scans-in-real-time-56928ff9) using [NodeJS](https://nodejs.org/) and [express](https://expressjs.com/) framework.

## Install

First ensure you have [NodeJS](https://nodejs.org/) installed:

Then execute the following:

```bash
# download this example code
git clone https://github.com/orca-scan/orca-validation-node.git

# go into the new directory
cd orca-validation-node

# install dependencies
npm install
```

## Run

```bash
# start the project
npm start
```

Your server will now be running on port 5000.

You can emulate an Orca Scan Validation input using [cURL](https://dev.to/ibmdeveloper/what-is-curl-and-why-is-it-all-over-api-docs-9mh) by running the following:

```bash
curl --location --request POST 'http://127.0.0.1:5000/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "___orca_sheet_name": "Vehicle Checks",
    "___orca_user_email": "hidden@requires.https",
    "Barcode": "orca-scan-test",
    "Date": "2022-04-19T16:45:02.851Z",
    "Name": Orca Scan Validation Example,
}'
```

### Important things to note

1. Only Orca Scan system fields start with `___`
2. Properties in the JSON payload are an exact match to the  field names in your sheet _(case and space)_

## How this example works

This [example](server.js) uses the [express](https://expressjs.com/) framework:

```js
const app = express();
// Parse JSON bodies for this app.
app.use(express.json());

app.post('/', function(request, response){
    data = request.body;

    // dubug purpose: show in console raw data received
    console.log("Request received: \n"+JSON.stringify(data, null, 2));

    // NOTE:
    // orca system fields start with ___
    // you can access the value of each field using the field name (data.Name, data.Barcode, data.Location)
    const name = data.Name

    //validation example
    if(name.length > 20){
        //return json error message
        response.json({
            "title": "Invalid Name",
            "message": "Name cannot contain more than 20 characters",
        }).send();
        return;
    }

    //return HTTP Status 204 (No Content)
    response.status(204).send();
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
```

## Test server locally against Orca Cloud

To expose the server securely from localhost and test it easily against the real Orca Cloud environment you can use [Secure Tunnels](https://ngrok.com/docs/secure-tunnels#what-are-ngrok-secure-tunnels). Take a look at [Ngrok](https://ngrok.com/) or [Cloudflare](https://www.cloudflare.com/).

```bash
ngrok http 5000
```

## Troubleshooting

If you run into any issues not listed here, please [open a ticket](https://github.com/orca-scan/orca-validation-node/issues).

## Examples in other langauges
* [orca-validation-dotnet](https://github.com/orca-scan/orca-validation-dotnet)
* [orca-validation-python](https://github.com/orca-scan/orca-validation-python)
* [orca-validation-go](https://github.com/orca-scan/orca-validation-go)
* [orca-validation-java](https://github.com/orca-scan/orca-validation-java)
* [orca-validation-php](https://github.com/orca-scan/orca-validation-php)
* [orca-validation-node](https://github.com/orca-scan/orca-validation-node)

## History

For change-log, check [releases](https://github.com/orca-scan/orca-validation-node/releases).

## License

&copy; Orca Scan, the [Barcode Scanner app for iOS and Android](https://orcascan.com)