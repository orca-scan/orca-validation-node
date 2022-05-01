const express = require('express');
const axios = require('axios');

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