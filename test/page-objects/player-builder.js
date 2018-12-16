/**
 * An individual player builder (configuration) page where resolution and other properties
 * may be edited.
 */

import * as basePage from "./base-page"
import * as navBar from "./partials/dashboard-navbar"
import * as header from "./partials/player-builder/header"

//property token and unique player ID would be queried from an internal API
const route = "#/players/basic_setup_jw8?property=&player_key=";
const URI = basePage.BASE_URI + route;

const selectors = {
    "formFields": {
        "playerNameTextField": "#player-name",
        "playerWidth":         ".fixed-size-input [placeholder=\"Width\"]",
        "playerHeight":        ".fixed-size-input [placeholder=\"Height\"]"
    },
    "fixedSizeRadioButton": ".player-size #fixed"
};

export { route, URI, selectors, header, navBar }