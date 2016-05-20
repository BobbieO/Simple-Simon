(function(){
"use strict";

    // computer's lights
    var sequence = [];

    // variable to check against the sequence's index
    var sequenceIndexCheck = 0;

    // var for later grabbing all elements by class, click box; an array.
    var boxes = $(".box");

    // to play sound
    function playSuccess() {
        $("#beep")[0].play();
    };

    function playFail() {
        $("#fail")[0].play();
    }

    var coreGame = function() {
        // randomize a numerical value from 0-3
        var random = Math.floor(Math.random()*4);
            console.log(boxes[random]);

        // to concatenate the lights on to each other
        sequence.push(random);
        
        // local var
        var index = 0;
        var makeLights = setInterval(function() {
            //sets fade in-out on the boxes
            $(boxes[ sequence[index] ]).fadeOut();
            $(boxes[ sequence[index] ]).fadeIn();
            index++;

            // stops the intervalling
            if (index==sequence.length) {
                clearInterval(makeLights);
            }  
        }, 1000);
    };

    // variable for game count
    var gameNum = 0;
    
    // click listener for boxes
    boxes.click(function() {
        // if the computer-light-value-index is same as data-index-of-box-user-clicked,
        // add more to lights
        if (sequence[sequenceIndexCheck] == $(this).data("index") ){
            playSuccess();
            sequenceIndexCheck++;

            // if same, run coreGame again, reset index for another iteration of lights
            if (sequence.length == sequenceIndexCheck) {
                coreGame();
                sequenceIndexCheck = 0;
                gameNum++;
                $(".status").html("Round " + gameNum + ": Success!");
            };
        // if NOT the same, do fail code
        } else {
            console.log("wrong");
            playFail();
            $(".status").html("Oops! Try Again");
            sequence = [];
            sequenceIndexCheck = 0;
            gameNum = 0;
        }
    });

    // to start/restart game function when start button clicked
    $("#start").click(function(event) { 
        sequence = [];
        sequenceIndexCheck = 0;
        gameNum = 0;
        $(".status").html("");
        $(".status2").html("");
        playSuccess();
        coreGame();
    })
 })();