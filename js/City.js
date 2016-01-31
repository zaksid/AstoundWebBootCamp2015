function City(name, value) {
    this.name = name;
    this.value = value;
    this.departments = [];
}

City.prototype.addDepartment = function (department) {
    this.departments.push(department);
    return this;
};