let axios = require('axios');
let cheerio = require ('cheerio'); 
const photoService = require('../services/photoService'); 
const Photo = require('../models/photoModel')


const scrapePhoto = async (name) => {
    const wikiPage = await axios.get('https://en.wikipedia.org/wiki/'+name) ;
    const $ = cheerio.load(wikiPage.data);
    $('img').map(function(){ 
        let link = $(this).attr('src') ;
        photoService.createPhoto(link,null,name)
     });
 return true;   
}


module.exports = {scrapePhoto};