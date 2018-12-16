/**
 * "Helper" functions that would be commonly called across many page objects.
 */


/**
 * Helper method for clearing a single or list of text fields of placeholder text
 * @param page: Puppeteer page object
 * @param selectors: A single string representing a selector or an array of strings
 * @returns {Promise<void>}
 */
async function clearTextFields(page, selectors) {
    if (Array.isArray(selectors)) {
        for (let selector of selectors) {
            page.$eval(selector, textField => textField.value = "");
        }
    } else
        page.$eval(selectors, textField => textField.value = "");
}

/**
 * Helper method for returning trimmed text displayed to the user from a single
 * or list of elements
 * @param page: Puppeteer page object
 * @param selectors: A single string representing a selector or an array of strings
 * @returns {Promise<Array>} or single promise for single selector
 */
async function getInnerText(page, selectors) {
    if (Array.isArray(selectors)) {
        let innerText = [];
        for (let selector of selectors) {
            innerText.push(await page.$eval(selector, element => element.innerText.trim()));
        }
        return innerText;
    } else
        return await page.$eval(selectors, element => element.innerText.trim());
}

/**
 * Generate the width and height of a (very, very close) 16x9 display resolution in pixels
 * @returns {{width: string, height: string}}
 */
function generateResolution() {
    let width =  Math.floor((Math.random() * (1920 - 1280) + 1280));
    let height = Math.floor(width / 1.777777778);
    return {
        "width": width.toString(),
        "height": height.toString()
    }
}

export { clearTextFields, getInnerText, generateResolution }