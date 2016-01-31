/**
 *  Task 1
 */
var str1 = "DE56986623670976937041",
    regexp1 = /(^.{3})(.*)(.{4}$)/g;
console.log("\n1.\n" + str1.replace(regexp1, function (a, b, c, d) {
        var res = b;
        for (var i = 0; i < c.length; i++)
            res += "*";
        return res + d;
    }));


/**
 *  Task 2
 */
var str2 = "a12 444 g224b 78 0 q0234 5",
    regexp2 = /\w+ (\d+)/g,
    result = '';
console.log("\n2.\n" + str2.replace(regexp2, function (a, b) {
        return result + b;
    }));


/**
 *  Task 3
 */
var str3 = "red red red cat mat phone phone",
    regexp3 = /(\b\S+\b)\s+\b\1\b/g;
console.log("\n3.\n" + str3.match(regexp3));


/**
 *  Task 4
 */
var str4 = "red red cat mat phone phone red",
    regexp4 = /(^\w+).*(\1)$/;
console.log("\n4.\n" + regexp4.test(str4));


/**
 *  Task 5
 */
var str5 = "red red red",
    regexp5 = /^(\w+\s?)+$/g;
console.log("\n5.\n" + regexp5.test(str5));


/**
 *  Task 6
 */
var str6 = "red Zed cat Fat Phone phonE",
    regexp6 = /\b[A-Z]\w+/g;
console.log("\n6.\n" + str6.replace(regexp6, ""));


/**
 *  Task 7
 */
var str7 = "asap (red) [cat] mat {phone} afaik {vert}",
    regexp7 = /[\(\[\{]\w+[\)\]\}]/g;
console.log("\n7.\n" + str7.match(regexp7));


/**
 *  Task 8
 */
var str8A = "abcdefgt",
    str8B = "bcdg",
    regexp8 = new RegExp('[' + str8B + ']', 'g');
console.log("\n8.\n" + str8A.replace(regexp8, ""));


/**
 *  Task 9
 */
var matrix = "a,vb,c,d;1,2,3,4;444444444444,4,3,2";
function isRowsEqual() {
    var arr = matrix.split(";"),
        isRowLengthEqual = false;

    for (var i = 0; i < arr.length - 1; i++) {
        var line = arr[i].match(/\w+/g),
            nextLine = arr[i + 1].match(/\w+/g);

        isRowLengthEqual = line.length === nextLine.length;
    }
    return isRowLengthEqual;
}

console.log("\n9.");
isRowsEqual() ? console.log("Row length is equal") : console.log("Rows have different length");


/**
 *  Task 10
 */
var str10 = "AdfFFnmDFmUPPERlower",
    qwer = "";
console.log("\n10.");
str10.replace(/([A-Z]+)([a-z]+)*/g, function (x, y, z) {
    if (y)
        qwer += y.toLowerCase();

    if (z)
        qwer += z.toUpperCase();
});

console.log(qwer);