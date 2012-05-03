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

var ProductInfoView = Backbone.View.extend({
  template: _.template($('#info-template').html()),
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

var init = function () {
  $.get('json.php', function (json) {

    var productList = new ProductList(json);

    $ul = $('#product-list>ul').empty();
    $info = $('#product-info');

    var itemTemplate = _.template($('#item-template').html());
    productList.forEach(function (product) {
      $ul.append(itemTemplate(product.toJSON()));
    });

    var infoView = new ProductInfoView({
      el: '#product-info'
    });
    $('a', $ul).bind('click', function (e) {
      e.preventDefault();
      var id = this.id.replace(/^product-/, '');
      var product = productList.get(id);

      $('a', $ul).removeClass('active')
      $(this).addClass('active');

      infoView.model = product;
      infoView.render();
    }).eq(0).click();
  }, 'json');
};


$(function () {
  init();
});