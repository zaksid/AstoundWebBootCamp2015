function Product(name, count, price, image) {
    this.name = name;
    this.count = count;
    this.price = price;
    this.image = image;
}

Product.prototype.getCost = function () {
    return this.price * this.count;
};

Product.prototype.setName = function (name) {
    this.name = name;
    return this;
};

Product.prototype.setCount = function (count) {
    this.count = count;
    return this;
};

Product.prototype.setPrice = function (price) {
    this.price = price;
    return this;
};

Product.prototype.setImage = function (img) {
    this.image = img;
    return this;
};