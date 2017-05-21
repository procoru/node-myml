var ImageResolver = require('image-resolver/src/ImageResolver');

var resolver = new ImageResolver();
resolver.register(new ImageResolver.FileExtension());
resolver.register(new ImageResolver.MimeType());
resolver.register(new ImageResolver.Opengraph());
resolver.register(new ImageResolver.Webpage());


var mainImage = function(url) {
  return new Promise(function(resolve, reject) {

    resolver.resolve(url, res => {
      var img = null;
      if (res) {
        img = res.image;
      }
      resolve(img); // если не нашли картинку, то всё равно резолвим, но с пустым текстом ссылки на изображение
    });

  });
}

var getImages = function(url) {
  console.log('article images');
  // ...
}

var allImages = function(url) {
  console.log('all images');
  // ...
}

module.exports = {
  mainImage: mainImage, // главное изображение страницы
  getImages: getImages, // изображения из основной статьи страницы
  allImages: allImages // все изображения со страницы
}
