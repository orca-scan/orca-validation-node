var express = require('express');
var app = express();

// accept JSON posted data
app.use(express.json());

// POST / handler
app.post('/', function (req, res) {

    // get the data posted from orca mobile barcode app
    var orcaData = req.body;

    if (orcaData) {

        // extract info
        var sheetName = orcaData.___orca_sheet_name;
        var user = orcaData.___orca_user_email;
        var barcode = orcaData.barcode;
        var quantity = parseInt(orcaData.quantity || '0');

        // TODO: connect to your internal systems to verify something

        // simple validation check
        if (quantity < 3) {

            // return an error message
            return res.json({
                title: 'Error',
                message: 'Sorry, you must have a least 3'
            });
        }
    }

    // if we reach this point, validation passed
    res.status(200).end();
});

// start the server on port 5001
app.listen(5001);