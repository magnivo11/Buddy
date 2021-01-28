let axios = require('axios');
let cheerio = require ('cheerio'); 
const photoService = require('../services/photoService'); 
const Photo = require('../models/photoModel')


const scrapePhoto = async () => {
    const wikiPage = await axios.get('https://en.wikipedia.org/wiki/Hedera') ;
    const $ = cheerio.load(wikiPage.data);
    $('img').map(function(){ 
        let link = $(this).attr('src') ;
        photoService.createPhoto(link)
     });
 return true;   
}


module.exports = {scrapePhoto};