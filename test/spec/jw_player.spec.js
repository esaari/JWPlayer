/**
 * Test setup/teardown and steps utilizing page objects for the requested problems.
 */

/*
1. Log in to the jwplayer dashboard at https://dashboard.jwplayer.com/ (You will need to Create a free account ahead of time and use those credentials to log in)
2. Click on the “Players” link in the navbar to go to the players list page
3. Click the name of an example player in the list to go to the player builder page.
4. On the player builder page, rename the player, change the aspect ratio, and save your changes
5. Close the player builder page;  on the players list page verify your changes to the name and size of the player
*/

import puppeteer from "puppeteer";

/*********************** Puppeteer/Jest Setup ******************************/
let page;
let browser;

//Set 'headless' to turn off browswer UI, increase sloMo to slow down test execution.
beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 10,
        args: [`--start-fullscreen`]
    });
    page = await browser.newPage();
    //dynamically set browser viewport to user's display resolution, else default to
    //MacBook Pro resolution
    const width = await page.evaluate("window.screen.availWidth") || 1440;
    const height = await page.evaluate("window.screen.availHeight") || 900;
    await page.setViewport({ width, height });
});

afterAll(() => {
    browser.close();
});
/***************************************************************************/


//Setup for tests
import { dashboardLogin } from "../fixtures/login";
import * as dashboardSignIn from "../page-objects/dashboard-sign-in";
import * as playerList from "../page-objects/player-list";
import * as playerBuilder from "../page-objects/player-builder";
import * as helper from "../page-objects/helper";

const newPlayerWidth = helper.generateResolution().width;
const newPlayerHeight = helper.generateResolution().height;
const newTitle = "Eric's Video Player " + newPlayerWidth + " x " + newPlayerHeight;

describe("JWPlayer test", () => {
    test("logs into dashboard", async () => {
        await page.goto(dashboardSignIn.URI);
        await page.waitForSelector(dashboardSignIn.selectors.email);
        await page.type(dashboardSignIn.selectors.email, dashboardLogin.email);
        await page.type(dashboardSignIn.selectors.password, dashboardLogin.password);
        await page.click(dashboardSignIn.selectors.signInButton);
        await page.waitForSelector(playerList.NavBar.selectors.playerListLink);
    }, 20000);

    test("clicks on players link and goes to player builder page", async () => {
        await page.click(playerList.NavBar.selectors.playerListLink);
        await page.waitForSelector(playerList.selectors.firstRowPlayerLink);
        await page.click(playerList.selectors.firstRowPlayerLink);
        await page.waitForSelector("#player-name");
    }, 20000);

    test("renames the player, changes aspect ration and saves changes", async() => {
        await helper.clearTextFields(page, Object.values(playerBuilder.selectors.formFields));
        await page.type(playerBuilder.selectors.formFields.playerNameTextField, newTitle);
        await page.click(playerBuilder.selectors.fixedSizeRadioButton);
        await page.type(playerBuilder.selectors.formFields.playerWidth, newPlayerWidth);
        await page.type(playerBuilder.selectors.formFields.playerHeight, newPlayerHeight);
        await page.click(playerBuilder.header.selectors.saveChangesButton);
        await page.waitForSelector(playerBuilder.header.selectors.successNotification);
    }, 20000);

    test("closes player builder page and verifies the changed name and player aspect ratio", async() => {
        await page.click(playerBuilder.header.selectors.closePlayerButton);
        await page.waitForSelector(playerList.selectors.firstRowPlayerLink);
        const savedTitle = await helper.getInnerText(page, playerList.selectors.firstRowPlayerLink);
        const savedResolution = await helper.getInnerText(page, playerList.selectors.firstRowResolution);
            expect(savedTitle).toBe(newTitle);
            expect(newPlayerWidth + " x " + newPlayerHeight).toBe(savedResolution);
        await page.screenshot({ path: 'myscreenshot.png', fullPage: true });
    }, 20000)
});