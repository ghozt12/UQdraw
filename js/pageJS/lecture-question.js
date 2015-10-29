/**
 * Created by kinngaileung on 29/10/2015.
 */
var questionID = getParameterByName("questionID");
var week = getParameterByName("week");
var courseID = getParameterByName("courseID");
var cookieQuestion = $.cookie(week).split(",");

$(document).ready(function () {
    $.ajax({//retrieve JSON through ajax
        type: 'GET',
        url: '../uqDrawBackend/getQuestion.php?courseID=' + courseID + '&questionID=' + questionID,
        success: function (data) {
            console.log(data);
            console.log("success");
            var questionsListObject = JSON.parse(data);
            document.getElementById("code").textContent = questionsListObject.enteringCode;// 3 digit code
            //document.getElementById("subject").textContent=questionsListObject.subject;// course code
            document.getElementById("question-title").textContent = questionsListObject.questionList[0].title;

        },
        error: function () {
            console.log(data);
            alert('There was an error adding your comment');
        }
    });
    console.log(cookieQuestion);
    if (cookieQuestion.indexOf(questionID) < cookieQuestion.length - 1) {
        document.getElementById("nextButton").innerHTML = "<button class='q-button' onclick='btnNext()'>Next</button>";
    }


});
function getParameterByName(name) { // get url parameter
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function btnEnd() {//go back to list, if end
    var questionID = getParameterByName("questionID");
    $.ajax({
        type: "POST",
        url: "../uqDrawBackend/askQuestion.php",
        data: {
            questionID: questionID,
            status: 0,
        }
    }).done(function (data) {
       //get result from php
        window.location.href = "../pages/lecture-questions.html?courseID=" + getParameterByName("courseID");
    });


}
function btnViewResponses() {//
    window.location.href = "../pages/lecture-responses.html?questionID=" + getParameterByName("questionID") + "&courseID=" + getParameterByName("courseID");
}
function btnNext() {
    btnEnd();
    var nextQ = cookieQuestion[cookieQuestion.indexOf(questionID) + 1];
    window.location.href = 'lecture-question.html?courseID=' + courseID + '&questionID=' + nextQ + '&week=' + week;
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = 0;
            btnEnd();
        }
    }, 1000);
}

jQuery(function ($) {
    var twoMinutes = 60 * 4,
        display = $('#time-left');
    startTimer(twoMinutes, display);
});
