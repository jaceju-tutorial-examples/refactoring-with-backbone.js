var Product = Backbone.Model.extend({
  defaults: {
    name: '',
    image: '',
    desc: ''
  }
});

var ProductList = Backbone.Collection.extend({
  model: Product
});

var init = function () {
  $.get('json.php', function (json) {

    var productList = new ProductList(json);

    var $ul = $('#product-list>ul').empty();
    var $info = $('#product-info');

    productList.forEach(function (product) {
      $ul.append('<li><a id="product-'
        + product.get('id')
        + '" href="#">' + product.get('name')
        + '</a></li>');
    });

    $('a', $ul).bind('click', function (e) {
      e.preventDefault();
      var id = this.id.replace(/^product-/, '');
      var product = productList.get(id);

      $('a', $ul).removeClass('active')
      $(this).addClass('active');
      $('h1', $info).text(product.get('name'));
      $('img', $info).attr({
        src: product.get('image'),
        alt: product.get('name')
      });
      $('.desc', $info).text(product.get('desc'));
    }).eq(0).click();
  }, 'json');
};


$(function () {
  init();
});