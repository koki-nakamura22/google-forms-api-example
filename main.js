var fs = require("fs");

const jsonData = require("./setting.json");

const path = require("path");
const google = require("@googleapis/forms");
const { authenticate } = require("@google-cloud/local-auth");

async function retrieveFormData(query) {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, jsonData["credentialFileName"]),
    scopes: "https://www.googleapis.com/auth/forms.body.readonly",
  });
  const forms = google.forms({
    version: "v1",
    auth: auth,
  });
  const res = await forms.forms.get({
    formId: jsonData["formID"],
  });
  console.log(res.data);
  const jsonStr = JSON.stringify(res.data, null, 2);
  const outputJsonFilePath = path.join(__dirname, "output_googleforms.json");
  fs.writeFileSync(outputJsonFilePath, jsonStr);
  return res.data;
}

if (module === require.main) {
  retrieveFormData().catch(console.error);
}
