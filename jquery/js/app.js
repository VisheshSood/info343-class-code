/*
    script for the index.html page
    dependencies: jquery

    open weather API: 
    http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f
*/

$(function() {
    $('a').attr('target', '_blank');
    $('article').hide().fadeIn(1000);

    $('#toggle-article').click(function() {
        $('article').fadeToggle(100);
    })

    var url = 'http://api.openweathermap.org/data/2.5/weather?zip=98105,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f'
    $.getJSON(url)
        .then(function (data) {
        console.log(data);
            $('#temp').append(Math.round(data.main.temp))
    });

    console.log('test');

});