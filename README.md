# orca-validation-node

This is a fully working example of how to [validate barcode scans](https://orcascan.com/docs/api/validation-url) using [Orca Scan](https://orcascan.com/mobile) and Node.js

**How it works:**

1. A user [scans a barcode](https://orcascan.com/mobile) using the Orca mobile app
2. They're presented with a form asking for information
3. They enter the information and tap save
4. The information is sent to your Validation URL
5. Your system validates the information entered

**If Valid**: You return a HTTP 200 with no body and the app save proceeds.

**If Invalid**: You return JSON error message, the error is presented to the user and save is rejected.

```json
{
    "title": "Error",
    "description": "Whatever action you need the user to take"
}
```

Once the user has corrected the error, they tap save and the process returns to point 4.

## Install

First ensure you have [Node.js](https://nodejs.org/en/download/) installed.

```bash
# should return 11 or higher
node -v
```

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

## Troubleshooting

If you run into any issues please [open a ticket](https://github.com/orca-scan/orca-validation-node/issues) or chat to us live at [orcascan.com](https://orcascan.com)

## Contributing

To contribute simply:

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## History

For change-log, check [releases](https://github.com/orca-scan/orca-validation-node/releases).

## License

Licensed under [MIT License](LICENSE) &copy; [Orca Scan](https://orcascan.com)