/*
require('../styles/styles.scss');
*/



const second = 1000;
const callAPIEvery = 5 * 60 * second;


// const app = document.getElementById('app');

$(document).ready(function() {
    $('#conversion_submit').click(lookUpConvert);
    $('#sell_submit').click(readyToSell);
});



var schedule = (function ($) {

    setTimeout(arguments.callee, callAPIEvery);


    loadProfileInfo;
    getAllOffers;


    // ################### conversion rates

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

    setAnOfferForSale($("#sell_amount").val());

    return false;
};

