(function ($) {
    $.fn.tooltip = function () {

        this.on("mouseenter", function (event) {

            var productIndex = 0;
            $.data(productIndex, "product");

            var self = $(this),
                currentProduct = cart.products[productIndex],
                productName = currentProduct.name,
                productCount = currentProduct.count,
                message = "Ви замовили: " + productName + ", " + productCount + "шт., на суму " + self.text();

            $("#tipp").show()
                .text(message)
                .offset({top: event.pageY, left: event.pageX});
        });

        this.on("mouseout", function () {
            $("#tipp").hide();
        });

    };

})(jQuery);