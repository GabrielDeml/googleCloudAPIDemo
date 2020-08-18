// BEFORE RUNNING:
// ---------------
// 1. If not already done, enable the Compute Engine API
//    and check the quota for your project at
//    https://console.developers.google.com/apis/api/compute
// 2. This sample uses Application Default Credentials for authentication.
//    If not already done, install the gcloud CLI from
//    https://cloud.google.com/sdk and run
//    `gcloud beta auth application-default login`.
//    For more information, see
//    https://developers.google.com/identity/protocols/application-default-credentials
// 3. Install the Node.js client library by running
//    `npm install googleapis --save`
//
//
//
//
//    save
const { google } = require("googleapis");
var compute = google.compute("v1");

authorize(function (authClient) {
  var request = {
    project: "wpilib",
    zone: "us-central1-a",
    resource: {
      name: "wpilib",
      machineType: "zones/us-central1-a/machineTypes/e2-standard-2",
      disks: [
        {
          initializeParams: {
            sourceImage:
              "projects/ubuntu-os-cloud/global/images/ubuntu-2004-focal-v20200720",
          },
          boot: true,
        },
      ],
      shieldedInstanceConfig: {
        enableSecureBoot: "ENABLE_SECURE_BOOT",
      },

      networkInterfaces: [{ name: "mainNetwork" }],
    },

    auth: authClient,
  };

  compute.instances.insert(request, function (err, response) {
    if (err) {
      console.error(err);
      return;
    }

    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
  });
});

function authorize(callback) {
  google.auth
    .getClient({
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    })
    .then((client) => {
      callback(client);
    })
    .catch((err) => {
      console.error("authentication failed: ", err);
    });
}
