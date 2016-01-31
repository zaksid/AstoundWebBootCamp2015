(function (window, undefined) {
    var painter = {};

    painter.init = function () {

        painter.showProductsTable = function () {
            var table = $("<table/>"),
                tr = $("<tr/>")
                    .append($("<th/>", {"colspan": "2", "text": "Продукт"}))
                    .append($("<th/>", {"text": "Кількість"}))
                    .append($("<th/>", {"text": "Ціна"}))
                    .append($("<th/>", {"text": "Вартість"}));

            table.append(tr);

            var currentProduct, productIndex = 0, totalPrice = 0,
                img, inputCount, spanPrice, spanCount, pWrapper,
                tdImage, tdName, tdCount, tdPrice, tdCost;

            $.each(cart.products, function () {
                currentProduct = this;

                img = $("<img/>", {
                    "class": "product-pic",
                    "src": currentProduct.image,
                    "alt": currentProduct.name
                });

                inputCount = $("<input/>", {
                    "class": "count",
                    "type": "number",
                    "data-index": productIndex,
                    "min": "0",
                    "value": currentProduct.count
                });

                spanPrice = $("<span/>", {
                    "class": "price",
                    "text": currentProduct.price
                });

                spanCount = $("<span/>", {
                    "class": "price",
                    "id": "price-span" + productIndex,
                    "text": currentProduct.getCost()
                });

                pWrapper = $("<p/>", {
                    "class": "wrapper",
                    "data-product": productIndex
                });

                pWrapper.append(spanCount)
                    .append($("<span/>", {"text": " грн"}));

                tdImage = $("<td/>").append(img);
                tdName = $("<td/>").append($("<span/>", {"text": currentProduct.name}));
                tdCount = $("<td/>").append(inputCount);
                tdPrice = $("<td/>").append(spanPrice).append($("<span/>", {"text": " грн"}));
                tdCost = $("<td/>").append(pWrapper);

                tr = $("<tr/>", {"id": "row" + productIndex})
                    .append(tdImage)
                    .append(tdName)
                    .append(tdCount)
                    .append(tdPrice)
                    .append(tdCost);

                table.append(tr);

                productIndex++;
                totalPrice += currentProduct.price;
            });

            var spanTotalPrice = $("<span/>", {
                "class": "price",
                "id": "price-span-total",
                "text": totalPrice
            });

            var tdTotalPrice = $("<td/>")
                .append(spanTotalPrice)
                .append($("<span/>", {"text": " грн"}));

            var tdQwerty = $("<td/>", {"colspan": "4"})
                .append($("<span/>", {"text": "До сплати"}));

            tr = $("<tr/>").append(tdQwerty).append(tdTotalPrice);

            table.append(tr);

            return table;
        };

        painter.deleteTable = function () {
            $("#section-table").text(EMPTY_CART);
        };

        painter.refreshProductPrice = function (count, index, element) {
            element.val(count);
            cart.products[index].count = count;
            $("#price-span" + index).text(cart.products[index].getCost());
            painter.refreshTotalPriceInTable();
        };

        painter.refreshTotalPriceInTable = function () {
            $("#price-span-total").text(cart.getCostWithDelivery());
        };

        painter.initSection = function (section, label, select) {
            section.empty()
                .append(label)
                .append(select)
                .show();
        };

        painter.showCities = function () {
            var label = painter.createLabel("field-label delivery", "city", "Місто"),
                select = painter.createSelect("form-control", "city", "city"),
                section = $("#section-city");

            painter.initSection(section, label, select);

            painter.addOptionsToSelect(newPost.cities, select);
            painter.showDepartments(select.val());

            select.on("change", function () {
                painter.showDepartments($(this).val());
            })
        };

        painter.showDepartments = function (chosenCity) {
            var label = painter.createLabel("field-label delivery", "department", "Відділення"),
                select = painter.createSelect("form-control", "department", "department"),
                section = $("#section-department");

            painter.initSection(section, label, select);

            var departments = cart.getCityDepartments(newPost.cities, chosenCity);

            painter.addOptionsToSelect(departments, select);
        };

        painter.createLabel = function (className, anchorElement, text) {
            return $("<label/>", {
                "class": className,
                "for": anchorElement,
                "text": text
            });
        };

        painter.createSelect = function (className, selectName, selectId) {
            return $("<select/>", {
                "class": className,
                "name": selectName,
                "id": selectId
            })
        };

        painter.addOptionsToSelect = function (items, select) {
            items.forEach(function (item) {
                $("<option/>", {
                    "value": item.value,
                    "text": item.name
                }).appendTo(select);
            });
        };
    };

    window.module.addModule("Painter", painter);

})(window);
