/*
require('../styles/styles.scss');
*/

const second = 1000;
const devDivision = 50;
const callAPIEvery = 5 * 60 * second / devDivision;


// const app = document.getElementById('app');

$(document).ready(function() {
    $('#conversion_submit').click(lookUpConvert);
    $('#sell_submit').click(readyToSell);
});



var schedule = (function ($) {

    setTimeout(arguments.callee, callAPIEvery);

    loadProfileInfo;
    getAllOffers;

}(jQuery));




let lookUpConvert = function (e) {
    let currency1 = $("#Currency1").val();
    let currency2 = $("#Currency2").val();

    if (currency1 != "" && currency2 != "") {
        getASpecificExchangeRate(currency1, currency2);
    } else if (currency1 == "" && currency2 == "") {
        toastr.info("You have not filled out the currency IDs.");
    } else if (currency1 == "") {
        toastr.info("You have not filled out Currency ID 1.");
    } else if (currency2 == "") {
        toastr.info("You have not filled out Currency ID 2.");
    }

    return false;
};


let readyToSell = function () {
    let amountToSell = $("#sell_amount").val();
    if (amountToSell === "") {
        toastr.info("You have not filled out an amount.");
    } else {
        setAnOfferForSale();
        $("#sell_amount").val('');
    }

    return false;
};

