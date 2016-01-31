function Cart(buyer, delivery) {
    this.buyer = buyer;
    this.products = [];
    this.delivery = delivery;
}

Cart.prototype.addProduct = function (product) {
    this.products.push(product);
    return this;
};

Cart.prototype.getCostOfAllProducts = function () {
    var productsCost = 0;
    for (var productIndex in this.products) {
        if (this.products.hasOwnProperty(productIndex)) {
            var currentProduct = cart.products[productIndex];
            productsCost += currentProduct.getCost();
        }
    }

    return productsCost;
};

Cart.prototype.getCostWithDelivery = function () {
    return this.getCostOfAllProducts() + this.delivery.price;
};

Cart.prototype.getCountOfProducts = function () {
    var productsCount = 0,
        products = this.products;

    for (var i in products) {
        if (products.hasOwnProperty(i)) {
            productsCount += products[i].count;
        }
    }

    return productsCount;
};

Cart.prototype.isEmpty = function () {
    var result;
    this.getCountOfProducts() > 0 ? result = false : result = true;

    return result;
};

Cart.prototype.getCityDepartments = function (cities, targetCity) {
    for (var city in cities) {
        if (cities.hasOwnProperty(city) && cities[city].value === targetCity) {
            return cities[city].departments;
        }
    }
};
