const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

const createWriteStream = fs.createWriteStream("links.csv");

// This is the url to scrape from
const url =
  "https://www.whatsappgrouplinks.org/2019/06/whatsapp-group-join-links.html";

createWriteStream.write("Links\n");

request(url, function(error, response, body) {
  if (!error) {
    const $ = cheerio.load(body);
    // this contains all the links
    const requiredLinks = $(".post-body a");
    requiredLinks.each((index, element) => {
      // getting the link through attribute tag
      const link = $(element).attr("href");
      // storing only the required links(whatsapp invite links)
      const LinkPattern = /chat.whatsapp.com/;
      if (LinkPattern.test(link)) {
        createWriteStream.write(link);
        createWriteStream.write("\n");
      }
    });
  } else {
    console.log("Bhaiya-ji Error -  " + error);
  }
});
