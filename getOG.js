const puppeteer = require('puppeteer');
const axios = require('axios').default;
var parseString = require('xml2js').parseString;


(async () => {
        let urlAdress = 'https://forklog.com/oshibka-opensea-privela-k-unichtozheniyu-42-nft-stoimostyu-100-000/'
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(urlAdress);
        const propertys = await page.evaluate(() => {
            return Array.from(document.getElementsByTagName('meta'), a => {return {property: a.getAttribute("property"), content: a.content}})
        }).then(data => Array.from(new Set(data.filter(item=>{
            if(item.property)
                return item.property.includes('og:')
            else
                return false
        }
        ))));
        console.log(urlAdress)
        console.log(propertys)
        await browser.close();

})();

