/*
require('../styles/styles.scss');
*/



const second = 1000;
const callAPIEvery = 5 * 60 * second;


// const app = document.getElementById('app');

$(document).ready(function() {
    $('#conversion_submit').click(lookUpConvert);
});



(function schedule($) {

    setTimeout(arguments.callee, callAPIEvery);



        // ################### profile info

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










        // ################### update offers

     // remove resultset if this has already been run
     //$('.tbody').remove();

    // Get offers, call AJAX
    $.getJSON(APIURL+'?what=offers&apikey='+APIKEY, function (data) {


        let offers = [], $tbody;



        $.each(data, function() {
            $.each(this, function(key, val) {

                if (val.id != undefined) { //todo change or die

                    offers.push('<tr id="' + key + '"><th scope="row" class="tr_id">'+val.id+'</th><td class="tr_amount">'+val.amount+'</td>' +
                        '<td class="tr_currency">'+val.currency+'</td><td class="tr_since">'+val.since+'</td>' +
                        '<td><input type="submit" class="tbl_Update" id="'+ val.id +'" value="Buy" onclick="buyCurrency(this);"></td></tr>');
                }


            });
        });

        $tbody = $('<tbody />').appendTo('.table');

        //append list items to list
        $tbody.append(offers);
    });


    // ################### conversion rates




}(jQuery));


let buyCurrency = function (e) {
    console.log(e.id);
};

let lookUpConvert = function (e) {
    let Currency1 = $("#Currency1").val();
    let Currency = $("#Currency2").val();

    if (Currency1 != "" && Currency != "") {
        console.log(Currency1);
        console.log(Currency);
    } else if (Currency1 == "" && Currency == "") {
        toastr.info("You have not filled out the currency IDs.");
    } else if (Currency1 == "") {
        toastr.info("You have not filled out Currency ID 1.");
    } else if (Currency == "") {
        toastr.info("You have not filled out Currency ID 2.");
    }


    return false;
};