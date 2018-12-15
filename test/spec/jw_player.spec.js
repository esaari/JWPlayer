

/*1. Log in to the jwplayer dashboard at https://dashboard.jwplayer.com/ (You will need to Create a free account ahead of time and use those credentials to log in)
    2. Click on the “Players” link in the navbar to go to the players list page
3. Click the name of an example player in the list to go to the player builder page.
   4. On the player builder page, rename the player, change the aspect ratio, and save your changes
5. Close the player builder page;  on the players list page verify your changes to the name and size of the player*/


import puppeteer from "puppeteer";
import {DASHBOARD_LOGIN} from "../fixtures/login";


const BASE_URI = "https://dashboard.jwplayer.com/";

let page;
let browser;
const width = 1920;
const height = 1080;



beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 10,
        args: [`--start-fullscreen`]
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
});

afterAll(() => {
    browser.close();
});

const newPlayerWidth = generateResolution().width;
const newPlayerHeight = generateResolution().height;
const newTitle = "Eric's Video Player " + newPlayerWidth + " x " + newPlayerHeight;

describe("JWPlayer test", () => {
    test("logs into dashboard", async () => {
        await page.goto(BASE_URI);
        await page.waitForSelector("[name=\"loginForm\"] #email");
        await page.type("[name=\"loginForm\"] #email", DASHBOARD_LOGIN.email);
        await page.type("[name=\"loginForm\"] [name=\"password\"]", DASHBOARD_LOGIN.password);
        await page.click("[name=\"loginForm\"] #submit_login");
        await page.waitForSelector(".navigation-bar .publish [href=\"/#/players/list\"]");
            //expect(await page.title()).toContain("Overview")
    }, 16000);

    test("clicks on players link and goes to player builder page", async () => {
        await page.click(".navigation-bar .publish [href=\"/#/players/list\"]");
        await page.waitForSelector(".player-table .videoTruncate");
        await page.click(".player-table .videoTruncate");
        await page.waitForSelector("#player-name");
    }, 16000);

    test("renames the player, changes aspect ration and saves changes", async() => {
        await page.evaluate( () => document.querySelector("#player-name").value = "");
        await page.type("#player-name", newTitle);
        await page.click(".player-size #fixed");
        await page.evaluate( () => document.querySelector(".fixed-size-input [placeholder=\"Width\"]").value = "");
        await page.evaluate( () => document.querySelector(".fixed-size-input [placeholder=\"Height\"]").value = "");
        await page.type(".fixed-size-input [placeholder=\"Width\"]", newPlayerWidth);
        await page.type(".fixed-size-input [placeholder=\"Height\"]", newPlayerHeight);
        await page.click(".action-buttons [ng-show=\"canEditPlayers()\"]");
        await page.waitForSelector(".success.notification-show");
    });

    test("closes player builder page and verifies the changed name and player aspect ratio", async() => {
        await page.click(".action-buttons [ng-click=\"close()\"]");
        await page.waitForSelector(".player-table tbody tr:first-child [title]");
        const savedTitle = await page.$eval(".player-table tbody tr:first-child [title]", element => element.innerText);
        const savedResolution = await page.$eval(".player-table tbody tr:first-child td:nth-child(3)", element => element.innerText);
        expect(savedTitle).toBe(newTitle);
        expect(newPlayerWidth + " x " + newPlayerHeight).toBe(savedResolution.trim());
        await page.screenshot({ path: 'myscreenshot.png', fullPage: true });
    })
});


function generateResolution() {
   let width =  Math.floor((Math.random() * (1920 - 1280) + 1280));
   let height = Math.floor(width / 1.777777778);
    return {
        "width": width.toString(),
        "height": height.toString()
   }
}