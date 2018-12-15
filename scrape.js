require('@babel/polyfill');

const fs = require('fs');

const request = require('request-promise-native');
const cheerio = require('cheerio');

const React          = require('react');
const ReactDomServer = require('react-dom/server');

import ThreadList from './components/thread-list';

const boilerplate = require('./templates/boilerplate');

async function downloadAllPages() {
  const LAST_PAGE = 29;
  const BASE_URL  = 'http://lulz.net/furi/';

  let pageRequests = [];
  for (let i=0;i<=LAST_PAGE;i++) {
    let fullUri;
    if (i==0) {
      fullUri = `${BASE_URL}`;
    } else {
      fullUri = `${BASE_URL}${i}.html`;
    }

    let pageRequest = request({
      method: "GET",
      uri:    fullUri,
      json:   true
    });

    pageRequests.push(pageRequest);
  }

  return await Promise.all(pageRequests);
}

function getThreadDataFromHtmlStrings(htmlPages) {
  let allThreadData = [];
  for (let htmlPage of htmlPages) {
    let parser = cheerio.load(htmlPage);

    parser('[id=delform]').find('div').each((index,element) => {
      let potentialThreadDivId = parser(element).attr('id');

      if (!isNaN(potentialThreadDivId)) {
        let numReplies = 0;
        let numImages  = 1;

        if (parser(element).find('.omittedposts').length>0) {
          let repliesImagesText = parser(element).find('.omittedposts').first().text();

          numReplies += Number(repliesImagesText.match(/(\d+) posts/)[1]);

          if (repliesImagesText.match(/(\d+) images/)) {
            numImages += Number(repliesImagesText.match(/(\d+) images/)[1]);
          }
        }

        numReplies += parser(element).find('.reply').length;
        numImages  += parser(element).find('.reply > a > img').length;

        //allow line breaks in parsed comment
        parser(element).find('br').replaceWith('\n');

        let threadData = {
          subject:    parser(element).find('.filetitle').first().contents().first().text(),
          comment:    parser(element).find('blockquote').first().text(),
          imageLink:  parser(element).find('a > img').first().attr('src'),
          threadLink: parser(element).find('.navform2 > a').first().attr('href'),
          numImages:  numImages,
          numReplies: numReplies
        };

        allThreadData.push(threadData);
      }
    });
  }

  return allThreadData;
}

function genCatalogHtml(threadData) {
  const body    = ReactDomServer.renderToStaticMarkup(<ThreadList title="Lulz Catalog" threads={threadData} />);
  const title   = 'Lulz Catalog';
  const bgColor = '#7C99AB';

  return boilerplate({body: body, title: title, bgColor: bgColor});
}

async function scrape() {
  let pagesHtml   = await downloadAllPages();
  let threadData  = getThreadDataFromHtmlStrings(pagesHtml);
  let catalogHtml = genCatalogHtml(threadData);

  fs.writeFile('./catalog.html', catalogHtml, (err) => {
    if(err) {
      console.error(err);
    }
  });
}

scrape();
