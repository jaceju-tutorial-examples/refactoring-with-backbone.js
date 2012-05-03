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

var ProductListView = Backbone.View.extend({
  render: function () {
    var $ul = $('ul', this.el);

    this.collection.forEach(function (product) {
      var itemView = new ProductItemView({
        model: product
      })
      $ul.append(itemView.render().el);
    });
  }
});

var ProductItemView = Backbone.View.extend({
  template: _.template($('#item-template').html()),
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
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

    var product = new Product();

    var $ul = $('#product-list>ul').empty();

    var listView = new ProductListView({
      el: '#product-list',
      collection: productList
    });

    var infoView = new ProductInfoView({
      el: '#product-info',
      model: product
    });

    product.on('change', infoView.render, infoView);

    $('a', $ul).bind('click', function (e) {

      e.preventDefault();

      var id = this.id.replace(/^product-/, '');

      $('a', $ul).removeClass('active')
      $(this).addClass('active');

      product.set(productList.get(id).toJSON());

    }).eq(0).click();

    listView.render();

  }, 'json');
};


$(function () {
  init();
});