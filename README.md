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
