var Product = Backbone.Model.extend({
  defaults: {
    name: '',
    image: '',
    desc: ''
  }
});

var ProductList = Backbone.Collection.extend({
  model: Product,
  url: 'json.php'
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

    $('a:eq(0)', this.el).click();

    return this;
  },
  events: {
    'click a': 'changeProductInfo'
  },
  changeProductInfo: function (e) {
    e.preventDefault();
    var target = e.target;
    var id = target.id.replace(/^product-/, '');

    $('a', this.el).removeClass('active')
    $(target).addClass('active');

    this.model.set(this.collection.get(id).toJSON());
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

  var productList = new ProductList();

  var product = new Product();

  var listView = new ProductListView({
    el: '#product-list',
    collection: productList,
    model: product
  });

  var infoView = new ProductInfoView({
    el: '#product-info',
    model: product
  });

  product.on('change', infoView.render, infoView);
  productList.on('all', listView.render, listView);
  productList.fetch();

};

$(function () {
  init();
});