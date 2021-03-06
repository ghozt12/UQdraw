/**
 * Created by kinngaileung on 29/10/2015.
 */
$(document).ready(function () {
    $.ajax({//retrieve JSON through ajax, if the parameter(courseID) from url is wrong, noting shows
        type: 'GET',
        url: '../uqDrawBackend/retrieveQuestionsfromCourseId.php?courseID=' + getParameterByName("courseID"),
        success: function (data) {
            //alert(data);
            //alert("success");
            var questionsListObject = JSON.parse(data);
            document.getElementById("code").textContent = questionsListObject.enteringCode;// 3 digit code
            document.getElementById("subject").textContent = questionsListObject.subject;// course code
            var questionListHTML = "";

            for (var i = 0; i < questionsListObject.questionsList.length; i++) {//generate all question from JSON
                var question = questionsListObject.questionsList[i];
                console.log(question);
                var index = 0;
                for (var key in question) {
                    if (question.hasOwnProperty(key)) {
                        questionListHTML += getQuestionItem(question[key], Object.keys(question)[index]);
                        index++;
                    }
                }
            }
            document.getElementById("questionsList").innerHTML = questionListHTML;
            document.getElementById("goto-prepare-mode").href = "lecture-makequestions.html?courseID="
                + getParameterByName("courseID");
        },
        error: function () {
            console.log(data);
            alert('There was an error adding your comment');
        }
    });
});
function getParameterByName(name) { // get url parameter
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function getQuestionItem(questionObjbyWeek, week) { // input the question Object from JSON array, output a HTML List Item

    var lectureHead = "<li id='" + questionObjbyWeek.questionID + "'> <label> Lecture " + week + " </label></li>";
    var lectureList = "";
    var qidList = [];
    for (var i = 0; i < questionObjbyWeek.length; i++) {
        var questionItem = questionObjbyWeek[i];
        qidList.push(questionItem.questionID);
        lectureList += " <li> <div class='question-container'><div class='question'>"
            + questionItem.title + "</div>"
            + "<div class='question-button'>" +
            "<button class='button' onclick='askQuestion(" + '"' + getParameterByName("courseID") + '","' + questionItem.questionID + '","' + week + '")' + "'> Ask</button>" +
            "<button class='button' onclick='window.location.href=" + '"lecture-responses.html?questionID='
            + questionItem.questionID + '"' + "'> Responses </button> </div></div></li>";
    }
    $.cookie(week, qidList, {expires: 1});
    return lectureHead + lectureList;


}
function setCookie(key, value) { // store Week and Qid in Cookie, so the "NEXT" function can load it everytime
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = key + "=" + cvalue + "; " + expires;
}

function askQuestion(courseID, questionID, week) {
//change question status to open when user click ask question
    $.ajax({
        type: "POST",
        url: "../uqDrawBackend/askQuestion.php",
        data: {
            questionID: questionID,
            courseID: courseID,
            status: 1,
        }
    }).done(function (data) {
        //alert(data);
        window.location.href = 'lecture-question.html?courseID=' + courseID + '&questionID=' + questionID + '&week=' + week;
    });
}