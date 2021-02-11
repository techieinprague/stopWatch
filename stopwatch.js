$(function(){
// -----variables------------//
    // App mode [ON & OFF]
    var mode = 0 ;
    //time counter
    var timeCounter = 0;
    //lap counter 
    var lapCounter = 0;
    //for setInterval
    var action;
    //No of Laps
    var lapNum = 0;
    //Minutes, seconds, centisecond for  time & lap
    var timeMinutes, timeSec, timeCentiSec, lapMinutes, lapSec, lapCentiSec;

    //On app load show start & lap buttons
    hideshowButtons("#startButton","#lapButton")
        //click on Start button
    $("#startButton").click(function(){
        //mode on
        mode = 1 ;
        //show stop & lap buttons
        hideshowButtons("#stopButton","#lapButton");
        startAction();
    })
    //stop button -->
    $("#stopButton").click(function(){
        //show resume & reset button
        hideshowButtons("#resumeButton","#resetButton");
        //stop the counter
        clearInterval(action);
    })
    //resume button -->
    $("#resumeButton").click(function(){
        //show stop & lap button
        hideshowButtons("#stopButton","#lapButton");
        //stop the counter
        startAction();
    })
    //reset button -->
    $("#resetButton").click(function(){
        //reload the page 
        location.reload();
    })

    //Lap button -->
    $("#lapButton").click(function(){
        // mode on
        if(mode){
            //stop action
            clearInterval(action);
            //reset lap counter & append lap details
            lapCounter = 0 ;
            addLap();
            //start action
            startAction();
        }


    })
    /*/--------Functions-------------/*/ 
    
    //Hide & show buttons
    function hideshowButtons(x,y){
        $('.controls').hide();
        $(x).show();
        $(y).show();
    }

    //Start the counter 
    function startAction(){
        action = setInterval(function(){

            timeCounter++ ;
            // limiting the time
            if(timeCounter == 100 * 60 * 100){
                timeCounter = 0;  }

            lapCounter++ ;
            if(lapCounter == 100 * 60 * 100){
                lapCounter = 0; }
            updateTime();
        }, 10)
    }

    function updateTime(){
        // 1 min = 60 sec = 60 * 100 centisec = 60 * 1000 millisec 
        timeMinutes  = Math.floor(timeCounter/6000);
        // 1 sec = 100 centisec
        timeSec      = Math.floor((timeCounter % 6000)/100);
        timeCentiSec = (timeCounter % 6000) % 100;

        $("#timeMinute").text(format(timeMinutes));
        $("#timeSecond").text(format(timeSec));
        $("#timecentiSec").text(format(timeCentiSec));

        // -------------------------------------------//

        // 1 min = 60 sec = 60 * 100 centisec = 60 * 1000 millisec 
        lapMinutes  = Math.floor(lapCounter/6000);
        // 1 sec = 100 centisec
        lapSec      = Math.floor((lapCounter % 6000)/100);
        lapCentiSec = (lapCounter % 6000) % 100;

        $("#lapMinute").text(format(lapMinutes));
        $("#lapSecond").text(format(lapSec));
        $("#lapcentiSec").text(format(lapCentiSec));
    }

    //Format the number 00:00:00
    function format(number){
        if(number<10){
            return '0'+ number;
        }else{ return number; }
    }
    //Print lap details inside Lap Box
    function addLap(){
        lapNum++ ;
        var lapDetails = '<div class = "lap">' +

                             '<div class = "laptimetitle">' + 'Lap '   + lapNum  +'</div>' +
                             '<div class = "laptime">' + '<span>' + format(lapMinutes)+ '</span>' +
                             ':<span>'+ format(lapSec) + '</span>'+ ':<span>'+ format(lapCentiSec)+ '</span>'+ '</div>' +
    
                         '</div>';
        $(lapDetails).prependTo('#laps')
    }





});