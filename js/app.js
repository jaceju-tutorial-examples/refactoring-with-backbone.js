var productList = null;

var init = function () {

  $.get('json.php', function (json) {

    productList = json;
    var $ul = $('#product-list>ul').empty();
    var $info = $('#product-info');

    for(idx in productList) {
      var product = productList[idx];
      $ul.append('<li><a id="product-'
        + product.id
        + '" href="#">' + product.name
        + '</a></li>');
    }

    $('a', $ul).bind('click', function (e) {

      e.preventDefault();

      var id = this.id.replace(/^product-/, '');
      var product = _.find(productList, function(p) {
        return p.id == id;
      });

      $('a', $ul).removeClass('active')
      $(this).addClass('active');
      $('h1', $info).text(product.name);
      $('img', $info).attr({
        src: product.image,
        alt: product.name
      });
      $('.desc', $info).text(product.desc);

    }).eq(0).click();

  }, 'json');
};


$(function () {
  init();
});