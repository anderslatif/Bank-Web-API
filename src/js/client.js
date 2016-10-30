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




    var getAllOffers = (function ($) {


        if (showAllOffers) {

            $.getJSON(APIURL+'?what=offers&apikey='+APIKEY, function (data) {

                $('.tbody tr').remove();

                console.log(showAllOffers);

                //let offers = [], $tbody;


                $.each(data, function() {
                    $.each(this, function(key, val) {

                        if (val.id != undefined) { //todo change or die

                            $('.tbody').append('<tr id="' + key + '"><th scope="row" class="tr_id">'+val.id+'</th><td class="tr_amount">'+val.amount+'</td>' +
                                '<td class="tr_currency">'+val.currency+'</td><td class="tr_since">'+val.since+'</td>' +
                                '<td><input type="submit" class="tbl_Update" id="'+ val.id +'" value="Buy" onclick="buySpecificOrder(this);"></td></tr>'
                            );

/*                            offers.push('<tr id="' + key + '"><th scope="row" class="tr_id">'+val.id+'</th><td class="tr_amount">'+val.amount+'</td>' +
                                '<td class="tr_currency">'+val.currency+'</td><td class="tr_since">'+val.since+'</td>' +
                                '<td><input type="submit" class="tbl_Update" id="'+ val.id +'" value="Buy" onclick="buySpecificOrder(this);"></td></tr>');*/
                        }

                    });
                });

/*                $tbody = $('<tbody />').appendTo('.table');

                //append list items to list
                $tbody.append(offers);
                $('.tr').page*/

                setInterval(getAllOffers, callAPIEvery);

                showAllOffers = false;
            });


        } else {
            console.log(showAllOffers);

            $('.tbody tr').remove();

            showAllOffers = true;
        }

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

