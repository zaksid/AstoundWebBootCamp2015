

function NewPost() {
    this.cities = [];
}

NewPost.prototype.addCity = function (city) {
    this.cities.push(city);
    return this;
};