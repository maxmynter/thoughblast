import axios from "axios";
import FormData from "form-data";
import Constants from "expo-constants";
import signJWT from "./utils/signJWS";

const transcribeRecording = async (uri) => {
  const SECRET = Constants.manifest.extra.secret;
  const REQUEST_TOKEN = Constants.manifest.extra.flask_token;
  const filetype = uri.split(".").pop();
  const filename = uri.split("/").pop();

  const formDataForRequest = new FormData();
  formDataForRequest.append("language", "english"); // Todo, make dynamic in settings
  formDataForRequest.append("model_size", "large");
  formDataForRequest.append(
    "audio_data",
    {
      uri,
      type: `audio/${filetype}`,
      name: filename,
    },
    "temp_recording"
  );
  formDataForRequest.append("summarise", "summarise");
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const token = signJWT(header, { token: REQUEST_TOKEN }, SECRET);
  console.log(
    `Sending to: ${Constants.manifest.extra.flaskBackendURI}/transcribe`
  );
  const response = await axios({
    url: `${Constants.manifest.extra.flaskBackendURI}/transcribe`,
    method: "POST",
    timeout: 300 * 1000, // Same as Railway timeout, 300 sec
    data: formDataForRequest,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("Returned Data: ", response.data);

  return response.data;
};

export default transcribeRecording;
