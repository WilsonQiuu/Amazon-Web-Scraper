/** Wilson Qiu
 * Server for the Amazon web Scraper
 */
const express = require('express');
const scraper = require('./scraper');
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/scrape', (req, res) => {
    let obj = req.query.obj;
    scraper(obj, (result) => {
        res.send(result);
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
