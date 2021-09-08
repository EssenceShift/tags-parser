const puppeteer = require('puppeteer');
const axios = require('axios').default;
var parseString = require('xml2js').parseString;

function typeCheck(siteName){
    const type = [
        ['https://hashtelegraph.com/'],
        ['https://bitnovosti.com/'],
        ['https://forklog.com/','https://beincrypto.ru/','http://cryptoconsulting.info/'], // post max
        ['https://bits.media/'], // random
        ['https://vc.ru/']
    ]

    let typeReturn = -1
    for(let i = 0; i < type.length;i++) {
        type[i].forEach(item => {
            if( item === siteName )
                typeReturn = i
        })
    }
    return typeReturn
}

(async () => {
    const addressFirst =  'https://vc.ru/'
    const addressSecond = addressFirst + 'sitemap.xml'
    const xmlSiteMap = await axios.get(addressSecond)
    let xmlDate
    await parseString(xmlSiteMap.data, function (err, res) {
         xmlData = res.sitemapindex.sitemap;
    });
    let siteType = typeCheck(addressFirst)
    if(siteType === 1 || siteType === 0 || siteType === 4){
        for(let i =0; i < xmlData.length; i++){
            if(i === (siteType)){
                xmlDate = xmlData[i].loc[0];
            }
        }
        console.log(xmlDate)
    }
    if(siteType === -1 || siteType === 2 || siteType === 5 ){
        console.log("TODO")
    }
    const xmlNews = await axios.get(xmlDate)
    let result
    await parseString(xmlNews.data, function (err, res) {
        result = res;
    });
    for(let i = 0;i < result.urlset.url.length;i ++){
        console.log(result.urlset.url[i].loc[0])
    }
})();

