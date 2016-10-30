/*var loadProfileInfo = (function ($) {

    $('.account_name div').val('Name: ');
    $('.account_amount div').val('Amount: ');

    $.getJSON(APIURL+'?what=account_info&apikey='+APIKEY, function (data) {

        $.each(data, function() {
            $.each(this, function(key, val) {


                if (val.currency != undefined && val.amount != undefined) {

                    $('.account_name').parent().append('<div>Name: '+ val.currency +'</div>');
                    $('.account_amount').parent().append('<div>Amount: '+ val.amount +'</div>');
                }

            });
        });

    });

}(jQuery));*/






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


function buySpecificOrder(e) {
    const id = e.id;


    (function ($) {
        $.getJSON(APIURL+'?what=buy&offer='+ id +'&apikey='+APIKEY, function (data) {

            console.log(data.resp.code);
            if (data.resp.code === "200") {
                toastr.success("You just made a purchase.");

                //loadProfileInfo;
                //schedule; // to update all information on the site
            } else {
                toastr.warning("An error occurred in the transaction.")
            }
        });
    })(jQuery);
}



function getASpecificExchangeRate(currency1, currency2) {

    (function ($) {
        $.getJSON(APIURL+'?what=exchange_rate&from='+currency1+'&to='+currency2+'&apikey='+APIKEY, function (data) {

            if(data.resp.code === "404") {
                toastr.warning("Currency not found.")
            } else if (data.resp.code === "200") {
                toastr.success("Exchange rate: " + data.data.amount)
            } else {
                toastr.warning("Something went wrong")
            }
        });

    }(jQuery));

}



function setAnOfferForSale(amount) {

        (function ($) {
            $.getJSON(APIURL+'?what=sell&amount='+amount+'&&apikey='+APIKEY, function (data) {

                if (data.resp.code === "200") {
                    toastr.success("You just sold for " + data.data.amount + ".")
                } else {
                    toastr.warning("Something went wrong")
                }
            });


    }(jQuery));

}

