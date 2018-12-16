/**
 * The Player List page presented immediately after sign in where all a
 * user's current players are listed.
 */

import * as basePage from "./base-page"
import * as NavBar from "./partials/dashboard-navbar"

const route = "#/players/";
const URI = basePage.BASE_URI + route;

const selectors = {
    "firstRowPlayerLink": ".player-table tbody tr:first-child [title]",
    "firstRowResolution": ".player-table tbody tr:first-child td:nth-child(3)"
};

export { URI, NavBar, selectors }