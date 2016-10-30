/*
require('../styles/styles.scss');
*/

const second = 1000;
const devDivision = 50;
const callAPIEvery = devDivision == 0 ?  5 * 60 * second : 5 * 60 * second / devDivision;


// const app = document.getElementById('app');

$(document).ready(function() {
    $('#conversion_submit').click(lookUpConvert);
    $('#sell_submit').click(readyToSell);

});


var truulean = true;

var schedule = (function ($) {

    setTimeout(arguments.callee, callAPIEvery);




    var loadProfileInfo = (function ($) {

        if (truulean) {

/*        $('.account_name div').text('Name: ');
        $('.account_amount div').text('Amount: ');*/

        $.getJSON(APIURL+'?what=account_info&apikey='+APIKEY, function (data) {

            $('.my_account div').remove();

            $.each(data, function() {
                $.each(this, function(key, val) {


                    if (val.currency != undefined && val.amount != undefined) {


                        $('.my_account').append('<div class="account_name">Name: '+ val.currency+'</div>');
                        $('.my_account').append('<div class="account_amount">Amount: '+ val.amount +'</div>');




                    }

                });
            });

        });

            truulean = false;
    } else {

            $('.my_account div').remove();

            $('.my_account').append('<div class="account_name">Name: '+'</div>');
            $('.my_account').append('<div class="account_amount">Amount: '+'</div>');
            truulean = true;
    }

    }(jQuery));


    var getAllOffers = (function ($) {

            $.getJSON(APIURL+'?what=offers&apikey='+APIKEY, function (data) {

                $('.tbody tr').remove();

                //let offers = [], $tbody;


                $.each(data, function() {
                    $.each(this, function(key, val) {

                        if (val.id != undefined) { //todo change or die

                            $('.tbody').append('<tr id="' + key + '"><th scope="row" class="tr_id">'+val.id+'</th><td class="tr_amount">'+val.amount+'</td>' +
                                '<td class="tr_currency">'+val.currency+'</td><td class="tr_since">'+val.since+'</td>' +
                                '<td><input type="submit" class="tbl_Update" id="'+ val.id +'" value="Buy" onclick="buySpecificOrder(this);"></td></tr>'
                            );

                        }

                    });
                });

            });
    }(jQuery));

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

