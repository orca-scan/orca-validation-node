const express = require('express');
const app = express();
const port = process.env.PORT || 8888;

// automatically parse incoming JSON request bodies
app.use(express.json());

app.post('/', function(request, response) {

    // request.body contains the full row data from Orca Scan
    // system fields (sheet name, user email, row id) start with ___
    // your custom sheet columns are available by their exact field name
    // e.g. request.body.Barcode, request.body.Name, request.body.Location
    const data = request.body;

    // ---------------------------------------------------------------
    // OPTION 1: Reject the scan and show an error dialog in the app
    // Orca Scan will block the save and display the message to the user
    // ---------------------------------------------------------------
    if (data.Name && data.Name.length > 20) {
        return response.status(400).json({
            "___orca_message": {
                "display": "dialog",
                "type": "error",
                "title": "Invalid Name",
                "message": "Name cannot be longer than 20 characters"
            }
        });
    }

    // ---------------------------------------------------------------
    // OPTION 2: Modify the data before it saves
    // Return HTTP 200 with only the fields you want to change
    // Orca Scan will update those fields and allow the save
    // ---------------------------------------------------------------
    // return response.status(200).json({
    //     "Name": data.Name.trim()  // example: trim whitespace before saving
    // });

    // ---------------------------------------------------------------
    // OPTION 3: Show a success notification (green banner in the app)
    // The data still saves, this just gives the user feedback
    // ---------------------------------------------------------------
    // return response.status(200).json({
    //     "___orca_message": {
    //         "display": "notification",
    //         "type": "success",
    //         "message": "Barcode scanned successfully"
    //     }
    // });

    // ---------------------------------------------------------------
    // SECURITY: Verify the request came from your specific Orca sheet
    // Set a secret in Orca Scan (Integrations > Events API > Secret)
    // then check it matches here before trusting the data
    // ---------------------------------------------------------------
    // const secret = request.headers['orca-secret'];
    // if (secret !== process.env.ORCA_SECRET) {
    //     return response.status(401).send();
    // }

    // All good - return HTTP 204 to allow the data to save with no changes
    return response.status(204).send();
});

app.listen(port, function() {
    console.log('Listening on port ' + port + '. Ready for Orca Scan requests.');
});