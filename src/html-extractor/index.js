//var request = require('request')
const read = require('node-read')

const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities()

var SummaryTool = require('node-summary')
var sanitizeHtml = require('sanitize-html')


var fromUrl = function(url) {
  return new Promise(function(resolve, reject) {
    read(url, function(err, data, res) {
      if (err) {
        return reject(err);
      }

      var title = sanitizeHtml(data.title, {allowedTags: [], allowedAttributes: []});
      var article = sanitizeHtml(data.content, {allowedTags: [], allowedAttributes: []});
      var content = sanitizeHtml(data.content, {allowedTags: ['img', 'ol', 'ul', 'li', 'table', 'td', 'tr', 'b', 'strong', 'em', 'i'], allowedAttributes: {'img': ['src']}});

      title = entities.decode(title);
      content = entities.decode(content);
      article = entities.decode(article);

      SummaryTool.summarize(title.replace(/\.*$/, '')+'.', article, function(err, summary) {
        if (err) { // ignore error
          //  return reject(err);
          // TODO вместо reject просто обрезать content по кол-ву слов...
          //summary = title + "\n" + ...
        } else {
          summary = summary.replace(/\.([\d\wА-Я])/ig, '. $1')//.replace(/\n/g, " ")
        }
        return resolve({
          title: title,
          article: article,
          content: content,
          summary: summary
        })
      })
    })
  })
}

var fromString = function(html) {
  console.log('extract from string');
  // ...
}

var fromFile = function(filename) {
  console.log('extract from file');
  // ...
}

module.exports = {

  byUrl: fromUrl,
  byString: fromString,
  byFilename: fromFile

}
