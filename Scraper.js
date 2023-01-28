/** Wilson Qiu
 *  Scrapes Amazon for Title, Description and Prices of Items
 */

const cheerio = require('cheerio');
const request = require('request');

let obj = "";
const url = 'https://www.amazon.ca/s?k=';

module.exports = (obj, callback) => {
  request(url + obj, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      const result = {};
      $('.sg-col-inner').each((i, element) => {
        const title = $(element).find('h5').find('.a-size-base-plus.a-color-base').text();
        const price = $(element).find('.a-price-whole').text();
        const priceFr = $(element).find('.a-price-fraction').text();
        const description = $(element).find('.a-size-base-plus.a-color-base.a-text-normal').text();
        let p = price + priceFr.toString();
        if (title.length <= 200 && description.length <= 200 && priceFr != "" && price.length <= 10) {
          result[i] = {
            Title: title,
            Description: description,
            Price: p
          }
        }
      });
      console.log(result); // Log the result to the console
      callback(result);
    }
  });
}

