var productList = null;

var init = function () {
  $.get('json.php', function (json) {

    productList = json;
    $ul = $('#product-list>ul').empty();
    $info = $('#product-info');

    for(id in productList) {
      var row = productList[id];
      $ul.append('<li><a id="product-'
        + row.id
        + '" href="json.php?id='
        + row.id
        + '">' + row.name
        + '</a></li>');
    }
    $('a', $ul).bind('click', function (e) {
      e.preventDefault();
      var id = this.id.replace(/^product-/, '');
      var row = productList[id];
      $('h1', $info).text(row.name);
      $('img', $info).attr({
        src: row.image,
        alt: row.name
      });
    });
  }, 'json');
};


$(function () {
  init();
});