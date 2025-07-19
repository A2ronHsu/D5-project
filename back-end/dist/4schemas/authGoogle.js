"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const google_auth_library_1 = require("google-auth-library");
//path to service account keys json file
const KEY_FILE_PATH = "./secret.json";
//Permission (authorization) my app need, in this case, just googlesheets
const SCOPE = ['https://www.googleapis.com/auth/spreadsheets'];
const authClient = () => {
    //GoogleAuth() returns an object that will handles authentication and authorization. It creates an instance that manages the authentication process (e.g., obtaining/refreshing access tokens) using the provided key file and scopes.
    return new google_auth_library_1.GoogleAuth({
        keyFile: KEY_FILE_PATH,
        scopes: SCOPE
    });
};
exports.default = authClient;
