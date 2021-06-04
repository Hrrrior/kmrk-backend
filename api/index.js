const express = require('express');
const cors = require('cors')
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
app.use(cors())
    


const leeturls = ['https://r6.tracker.network/profile/id/1c3ac9e4-8274-4b23-be0d-df2413f6e0a8', 'https://r6.tracker.network/profile/id/420eeb31-58bd-46c6-a2c8-1cdab47deb0b', 'https://r6.tracker.network/profile/id/06da4799-915f-40bd-955e-67484882b4e4', 'https://r6.tracker.network/profile/id/564d34ba-41b7-45f6-b800-1f725511f8cb', 'https://r6.tracker.network/profile/id/43cf5298-0215-4380-8480-1c055736f954', 'https://r6.tracker.network/profile/id/d289650a-a1af-40f7-8d0a-0f7ecb65f18c', 'https://r6.tracker.network/profile/id/cdd23c10-af63-4420-abfb-7291dd99accd']
class Gamer {
    constructor(trackerurl, ign, rank, mmr, img, level, pvpwl, pvpkd, pvpkills, pvpwins, toperators) {
        this.trackerurl = trackerurl;
        this.ign = ign;
        this.rank = rank;
        this.mmr = mmr;
        this.img = img;
        this.level = level;
        this.pvpwl = pvpwl;
        this.pvpkd = pvpkd;
        this.pvpkills = pvpkills;
        this.pvpwins = pvpwins;
        this.toperators = toperators;
    }
}

class Toperator {
    constructor(img, title) {
        this.img = img;
        this.title = title;
    }
}

let leetgamers = []
for (let step = 0; step < leeturls.length; step++) {
    let url = leeturls[step];
    let ign;
    let rank;
    let mmr;
    let img;
    let pvpwl;
    let pvpkd;
    let pvpkills;
    let pvpwins;
    let toperators = [];

    axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const namefind = $('.trn-profile-header__name > span');
        const rankfind = $('.trn-defstat > .trn-defstat__value');
        const imgfind = $('.trn-profile-header__content > .trn-profile-header__avatar > img');
        const levelfind = $('.trn-defstat__data > .trn-defstat__value');
        const pvpfind = $('.trn-defstats > .trn-defstat');
        const toperatorsfind = $('.top-operators > .trn-defstat__value > img');
        const toperatorsfind2 = $('.r6-season__stats > .trn-defstats > .trn-defstat');
        // console.log($(toperatorsfind2)[11].find('.trn-defstat__value'));
        console.log($(toperatorsfind2[10]).find('.trn-defstat__value').text().trim());
        ign = $(namefind[0]).text().trim();
        rank = $(rankfind[0]).text().trim();
        // mmr = $(rankfind[1]).text().trim();
        mmr = $(toperatorsfind2[10]).find('.trn-defstat__value').text().trim();
        img = imgfind[0].attribs['src'];
        level = $(levelfind[0]).text().trim();
        pvpwins = $(pvpfind[0]).find('.trn-defstat__value').text().trim();
        pvpwl = $(pvpfind[1]).find('.trn-defstat__value').text().trim();
        pvpkills = $(pvpfind[2]).find('.trn-defstat__value').text().trim();
        pvpkd = $(pvpfind[3]).find('.trn-defstat__value').text().trim();
        toperatorsfind.each(function () {
            const opname = $(this)[0].attribs['title'];
            const opimg = $(this)[0].attribs['src'];
            toperators.push(new Toperator(opimg, opname));

        });
        leetgamers.push(new Gamer(url, ign, rank, mmr, img, level, pvpwl, pvpkd, pvpkills, pvpwins, toperators));
    })
    .catch(console.error); 
}
   

app.get('/', (req,res) => {
    console.log(JSON.stringify({'Gamers:' : leetgamers}));
    res.send(JSON.stringify({'Gamers:' : leetgamers}));
});

app.listen(process.env.port || 9000);
console.log('Web Server is listening at port '+ (process.env.port || 9000));