/**
 * application script for index.html
 */
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

     var clickmebutton = document.getElementById("click-me");
    clickmebutton.addEventListener('click', function () {
        var alerts = document.querySelectorAll('.alert')

        forEachElement(alerts, function(alert) {
            alert.style.display = 'block'
        })
    })

    function forEachElement(collection, fn) {
        var index;
        for (index = 0; index < collection.length; index++) {
            fn(collection[index]);
        }
    }


    var arrayOfButtons = document.querySelectorAll('.alert .close');
    forEachElement(arrayOfButtons, function(button) {
        button.addEventListener('click', function() {
            button.parentElement.style.display = 'none';
        })
    })


;});