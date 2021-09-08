const puppeteer = require('puppeteer');
const axios = require('axios').default;
var parseString = require('xml2js').parseString;


(async () => {
    const xml = await axios.get(`https://vc.ru/sitemap/year-2021-09-06.xml`)
    let result
    await parseString(xml.data, function (err, res) {
        result = res;
    });

    for(let i = 0;i < result.urlset.url.length;i ++){
        let urlAdress = result.urlset.url[i].loc[0]
        console.log(urlAdress)
    }
})();

