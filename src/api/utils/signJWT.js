import HmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";
import Utf8 from "crypto-js/enc-utf8";

const signJWT = (header, body, secret) => {
  const jsonHeader = JSON.stringify(header);
  const jsonBody = JSON.stringify(body);

  const headerEncoded = Base64.stringify(Utf8.parse(jsonHeader));
  const bodyEncoded = Base64.stringify(Utf8.parse(jsonBody));

  const signature = HmacSHA256(`${headerEncoded}.${bodyEncoded}`, secret);
  const signatureEncoded = signature.toString(Base64);

  const token = `${headerEncoded}.${bodyEncoded}.${signatureEncoded}`;

  return token;
};

export default signJWT;
