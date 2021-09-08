const puppeteer = require('puppeteer');
const axios = require('axios').default;
var parseString = require('xml2js').parseString;


(async () => {
    const adressFirst =  'https://vc.ru/'
    const adressSecond = adressFirst + 'sitemap.xml'
    const xmlSiteMap = await axios.get(adressSecond)
    await parseString(xmlSiteMap.data, function (err, res) {
         = res;
    });

    console.log(xmlSiteMap)
    const xmlDate = await axios.get(xmlSiteMap)
    let result
    await parseString(xmlDate.data, function (err, res) {
        result = res;
    });

    for(let i = 0;i < result.urlset.url.length;i ++){
        let urlAdress = result.urlset.url[i].loc[0]
        console.log(urlAdress)
    }
})();

