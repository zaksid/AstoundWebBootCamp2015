const REQUIRED_FIELD = "This field is required";
const INVALID_FIELD_DATA = "Invalid data";
const ACCEPT_LICENSE = "Please, accept the license";

$("#form").on("submit", function (event) {
    var isNameCorrect = validateName($("#user-name")),
        isPhoneCorrect = validatePhone($("#phone")),
        isEmailCorrect = validateEmail($("#email"));

    var isFormCorrect = isNameCorrect && isEmailCorrect && isPhoneCorrect;

    if (!isLicenseAccepted() || !isFormCorrect) {
        return false;
    }
    event.preventDefault();

    var url = (Math.random() > 0.3) ? "orderReceived.html" : "globalError.html";
    showLoader();
    setTimeout(function () {

        $.ajax({
            method: "POST",
            url: url,
            success: function (data) {
                $("#form-container")
                    .empty()
                    .append(data);

                $(".count").each(function () {
                    $(this).prop('disabled', true);
                })
            },
            error: function (jqXHR) {
                $("body").empty()
                    .append($("<h2/>", {
                        text: jqXHR.status + ": " + jqXHR.statusText
                    }));
            }
        })

    }, 5000);

});

function showLoader(form) {
    $("#form-container").empty()
        .append($("<img/>", {
            src: "img/loader.gif",
            alt: "sending data to server...",
            id: "loader"
        }));
}


function isLicenseAccepted() {
    var isAccepted = $("#agree").is(":checked"),
        span = $("#license");

    if (!isAccepted) {
        span.text(ACCEPT_LICENSE);
    } else {
        span.empty();
    }

    return isAccepted;
}

$("#agree").on("change", function () {
    if (this.checked) {
        $("#license").empty();
    }
});

$("#user-name").on("blur", function () {
    validateName($(this));
});

$("#email").on("blur", function () {
    validateEmail($(this));
});

$("#phone").on("blur", function () {
    validatePhone($(this));
});

function validateName(elem) {
    var regexp = /(^[\w\-'а-яА-Я]{2,})\s*([\w\-'а-яА-Я]*)/g;
    return validateField(elem, regexp);
}

function validateEmail(elem) {
    var regexpMail = /^[-\w*_?]+(\.[-\w_?]+)*@[-\w*_?]+(\.[-\w_?]+)*\.(\w+)$/g;
    return validateField(elem, regexpMail);
}

function validatePhone(elem) {
    var regexp = /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{2})[-. ]?(\d{2})$/;
    return validateField(elem, regexp);
}

function validateField(input, regexp) {
    var data = input.val(),
        span = input.next();

    if (!data) {
        span.text(REQUIRED_FIELD);
        setInputAsInvalid(input);
        return false;
    }
    else if (!regexp.test(data)) {
        span.text(INVALID_FIELD_DATA);
        setInputAsInvalid(input);
        return false;
    } else {
        span.empty();
        setInputAsValid(input);
        return true;
    }
}

function setInputAsInvalid(input) {
    input.addClass("invalid");
}

function setInputAsValid(input) {
    input.removeClass("invalid");
}
