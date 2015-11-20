
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    navigator.getUserMedia = navigator.getUserMedia
                            || navigator.webkitGetUserMedia
                            || navigator.mozGetUserMedia
                            || navigator.msGetUserMedia;

    var video = document.querySelector('video');
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var videoStream;

    navigator.getUserMedia({video:true}, function(stream) {
        videoStream = stream;

        video.src = window.URL.createObjectURL(videoStream);

    }, function (err) {
        console.error(err);
    })

    video.addEventListener('click', function () {
       canvas.width = video.clientWidth;
       canvas.height = video.clientHeight;
       ctx.drawImage(video, 0, 0); 
    });

    var mouseIsDown = false;

    canvas.addEventListener('mousedown', function(evt) {
        mouseIsDown = true;
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
    });

    canvas.addEventListener('mousemove', function(evt) {
        if (mouseIsDown) {
            ctx.lineTo(evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', function(evt) {
        ctx.lineTo(evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
        ctx.stroke();
        mouseIsDown = false;
    });

});

