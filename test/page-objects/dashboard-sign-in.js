/**
 * Main login page for JWPlayer Dashboard.
 */

import * as basePage from "./base-page"

const URI = basePage.BASE_URI;

const selectors = {
    "email":        "[name=\"loginForm\"] #email",
    "password":     "[name=\"loginForm\"] [name=\"password\"]",
    "signInButton": "[name=\"loginForm\"] #submit_login"
};

export { URI, selectors }
