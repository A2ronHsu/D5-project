import { GoogleAuth } from "google-auth-library";

//path to service account keys json file
const KEY_FILE_PATH = "./secret.json";

//Permission (authorization) my app need, in this case, just googlesheets
const SCOPE = ['https://www.googleapis.com/auth/spreadsheets'];



const authClient = (): GoogleAuth => {
   //GoogleAuth() returns an object that will handles authentication and authorization. It creates an instance that manages the authentication process (e.g., obtaining/refreshing access tokens) using the provided key file and scopes.
   return new GoogleAuth({
      keyFile: KEY_FILE_PATH,
      scopes: SCOPE
   });

}

export default authClient;

