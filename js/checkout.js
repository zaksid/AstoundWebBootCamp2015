const EMPTY_CART = "У кошику немає продуктів";
const CONFIRM_DELETION = "Дійсно відалити продукт із кошика?";

var painter = module.use("Painter");

var product1 = new Product()
    .setName("Пательня")
    .setCount(1)
    .setPrice(250)
    .setImage("img/frying_pan.jpg");

var product2 = new Product()
    .setName("Чайник")
    .setCount(1)
    .setPrice(300)
    .setImage("img/kettle.jpg");

var buyer1 = new Buyer("Олег", "(800)555-35-35", "buyer@gmail.com");

var deliveryNewPost = new Delivery("Нова пошта", 35),
    deliveryNone = new Delivery("Заберу сам", 0);

var cart = new Cart(buyer1, deliveryNone)
    .addProduct(product1)
    .addProduct(product2);

var departmentChernihiv1 = new Department("Відділення №1", "cnDept1"),
    departmentChernihiv2 = new Department("Відділення №2", "cnDept2"),
    departmentChernihiv4 = new Department("Відділення №4", "cnDept4");

var departmentKyiv1 = new Department("Відділення №1", "kyivDept1"),
    departmentKyiv2 = new Department("Відділення №2", "kyivDept2"),
    departmentKyiv3 = new Department("Відділення №3", "kyivDept3"),
    departmentKyiv4 = new Department("Відділення №4", "kyivDept4");

var departmentVinnitsa1 = new Department("Відділення №1", "vinDept1"),
    departmentVinnitsa2 = new Department("Відділення №2", "vinDept2");

var chernihiv = new City("Чернігів", "chernihiv")
    .addDepartment(departmentChernihiv1)
    .addDepartment(departmentChernihiv2)
    .addDepartment(departmentChernihiv4),
    kyiv = new City("Київ", "kyiv")
        .addDepartment(departmentKyiv1)
        .addDepartment(departmentKyiv2)
        .addDepartment(departmentKyiv3)
        .addDepartment(departmentKyiv4),
    vinnitsa = new City("Вінниця", "vinnitsa")
        .addDepartment(departmentVinnitsa1)
        .addDepartment(departmentVinnitsa2);

var newPost = new NewPost().addCity(chernihiv).addCity(kyiv).addCity(vinnitsa);

$(document).ready(function () {
    $("#section-table").html(painter.showProductsTable());

    var deliveryRadio = $("#delivery"),
        shipmentRadio = $("#shipment");

    shipmentRadio.on("change", function () {
        cart.delivery = deliveryNone;
        painter.refreshTotalPriceInTable();

        if (shipmentRadio.is(":checked")) {
            $("#section-city").hide();
            $("#section-department").hide();
        }
    });

    deliveryRadio.on("change", function () {
        cart.delivery = deliveryNewPost;
        painter.refreshTotalPriceInTable();

        if (deliveryRadio.is(":checked")) {
            painter.showCities();
        }
    });

    $(".count").each(function (index) {
        $(this).on("change", function () {
            var count = parseInt($(this).val());

            isNaN(count) || count < 0 ? count = 1 : count;

            painter.refreshProductPrice(count, index, $(this));

            if (count === 0) {
                var deletion = confirm(CONFIRM_DELETION);
                if (deletion) {
                    $("#row" + index).empty();
                    if (cart.isEmpty())
                        painter.deleteTable();
                } else {
                    painter.refreshProductPrice(1, index, $(this));
                }
            }
        })
    });

    $("p").tooltip();


});

