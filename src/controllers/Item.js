const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const handleImage = async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            devtools: true, headless: false,
            args: ["--no-sandbox", "--disabled-setupid-sandbox"]
        });
        const page = await browser.newPage();
        await page.goto(`https://steamcommunity.com/market/listings/730/${encodeURI(req.params.hashName)}`);
        const content = await page.content();
        await page.close()
        await browser.close()
        const $ = cheerio.load(content)

        const url = $('.market_listing_largeimage').find('img').attr('src')
        const rarity = $('#largeiteminfo_item_type').contents().first().text();

        const iconHash = url.split('/')[5]

        if (iconHash.length < 10) {
            throw 'Invalid item\'s hash'
        }

        res.status(200).json({
            url,
            iconHash,
            rarity
        })
    } catch (e) {
        res.status(500).json({error: e.message})
    }
}

module.exports = {
    handleImage
}
