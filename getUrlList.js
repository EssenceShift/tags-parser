const puppeteer = require('puppeteer');
const axios = require('axios').default;
var parseString = require('xml2js').parseString;


function siteMapCheck(i) {
    if(i == 0)
        return true;
    return false;
}

(async () => {
    const addressFirst =  'http://cryptoconsulting.info/ru/'
    const addressSecond = addressFirst + 'sitemap.xml'
    const xmlSiteMap = await axios.get(addressSecond)
    let xmlDate
    await parseString(xmlSiteMap.data, function (err, res) {
         xmlData = res.sitemapindex.sitemap;
    });

    for(let i =0; i < xmlData.length; i++){
        if(siteMapCheck(i))
             xmlDate = xmlData[i].loc[0];
    }
    console.log(xmlDate)
    const xmlNews = await axios.get(xmlDate)
    let result
    await parseString(xmlNews.data, function (err, res) {
        result = res;
    });
    for(let i = 0;i < result.urlset.url.length;i ++){
        console.log(result.urlset.url[i].loc[0])
    }
})();

