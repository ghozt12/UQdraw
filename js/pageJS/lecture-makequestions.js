/**
 * Created by kinngaileung on 29/10/2015.
 */
var courseID = "";
var haveImage = 0;// set to 1 if a image is imported
var fileFormat = "";
var title = "";
var imageBlob = "";
$(document).ready(function () {
    $.ajax({//retrieve JSON through ajax, if the parameter(courseID) from url is wrong, nothing shows
        type: 'GET',
        url: '../uqDrawBackend/retrieveQuestionsfromCourseId.php?courseID=' + getParameterByName("courseID"),
        success: function (data) {
            //alert(data);
            //alert("success");
            var questionsListObject = JSON.parse(data);
            if (questionsListObject.success == 1) {
                courseID = questionsListObject.subjectFull;
                var questionListHTML = "";
                var question = questionsListObject.questionsList[0];
                var index = 0;
                console.log(question);
                for (var key in question) {
                    if (question.hasOwnProperty(key)) {
                        questionListHTML += getQuestionItem(question[key], Object.keys(question)[index]);
                        console.log("print HTML");
                        index++;
                    }
                }
                console.log(index);
                document.getElementById("questionsList").innerHTML = questionListHTML;
                document.getElementById("goto-lecture-mode").href = "lecture-questions.html?courseID=" + getParameterByName("courseID");
            } else {
                alert("Fail to retrieve data please signon");
            }
        },
        error: function () {
            alert('There was an error adding your courses');
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
    var lectureHeader = "<li><label>Lecture " + week + "</label></li>";
    var questionList = "";
    for (var i = 0; i < questionObjbyWeek.length; i++) {
        var questionItem = questionObjbyWeek[i];
        questionList += "<li id='" + questionItem.questionID + "'><div class='question-container'><div class='question'>"
            + questionItem.title + "</div>"
            + "<div class='question-button'><button class='button' onclick='deleteQuestion("
            + questionItem.questionID + ")'>Delete</button> "
            + "<button class='button' onClick='window.location.href=" + '"lecture-prepare-responses.html?questionID=' + questionItem.questionID + '"' + "'>Responses</button>"
            + "<button class='button' onClick='editQuestion(" + '"' + questionItem.questionID + '","' + questionItem.title + '","' + week + '")' + "'>Edit</button></div></div></li>";

    }
    return lectureHeader + questionList;
}
//Creates a form to add a question
function addQuestion() {
    document.getElementById("addButton").innerHTML = "";
    document.getElementById("addButton").innerHTML = "<div id ='addSubjectForm' class='subject-form' style='background:#410C54'><li><span class='input-m-t input--isao-m'><input id='title' style='width:100%;'type='text' name='addTitle' maxlength='100' data-inputmask='AAAA9999' class='input__field-m input__field--isao-m' autocomplete='off'><label class='input__label-m input__label--isao-m' for='title' data-content='Question Title'><span class='input__label-content-m input__label-content--isao-m'>Question Title</span></label></span>" +
        "<span class='input-m input--isao-m'><input id='year' style='width:100%;'type='number' name='lectureWeek' maxlength='2' class='input__field-m input__field--isao-m'><label class='input__label-m input__label--isao-m' for='lectureWeek' data-content='Lecture Week'><span class='input__label-content-m input__label-content--isao-m'>Lecture Week</span></label></span>" +
        "<button  class='add-button-m' onclick='submitQuestion()' >Add</button></li>" +
        "<li><label><input type='file' class='inputfile' onchange='parseImage()''><span class='upload-file'>Upload Image</span></label></span></li>" +
        "<li><img outline='none' class='preview' id='preview'src='' height='200px' width='auto' alt='Image preview'/></li></li><div>";
}

var questionContent;

//Creates a form that will edit a question
function editQuestion(questionID, title, lectureWeek) {

    window.questionContent = document.getElementById(questionID).innerHTML;
    document.getElementById(questionID).innerHTML = "<div class='question-container'><div class='question' style='width: 37vw;''><span class='input-e-t input--isao-e' style='max-width: 70%;'><input id='title' style='width:100%;'type='text' name='title' maxlength='100' data-inputmask='AAAA9999' class='input__field-e input__field--isao-e' autocomplete='off' value='" + title + "'><label class='input__label-e input__label--isao-e' for='title' data-content='Question Title'><span class='input__label-content-e input__label-content--isao-e'>Question Title</span></label></span><span class='input-e input--isao-e' style='max-width: 20%;''><input id='year' style='width:100%;'type='number' name='lectureWeek' maxlength='2' class='input__field-e input__field--isao-e' value='" + lectureWeek + "'><label class='input__label-e input__label--isao-e' for='lectureWeek' data-content='Lecture Week'><span class='input__label-content-e input__label-content--isao-e'>Lecture Week</span></label></span></div><div class='question-button' style='width:22.5%;'><button class='add-button-e' onclick='cancelEdit(" + questionID + ")'style='margin-right:5px;'>Cancel</button><button class='add-button-e' onclick='submitChanges(" + questionID + ")'>Submit</button></div>";
}

//Cancel button to return the list of the question
function cancelEdit(questionID) {
    document.getElementById(questionID).innerHTML = window.questionContent;
}

//Submits the changes from the edit form
function submitChanges(questionID) {
    var title = document.getElementsByName("title")[0].value;
    var questionWeek = document.getElementsByName("lectureWeek")[0].value;
    $(document).ready(function () {
        $.ajax({//delete question through ajax so it updates instantly
            type: "POST",
            url: '../uqDrawBackend/editQuestion.php',
            data: {
                title: title,
                questionWeek: questionWeek,
                questionID: questionID,
            },
            success: function (data) {
                //alert(data);
                location.reload();

            },
            error: function (data) {
                alert("Can't Reach server");
            }
        });
    });
}

function parseImage() {
    //Change image to blob}
    var preview = document.getElementById('preview'); //preview box
    var file = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader = new FileReader();
    var canvas = document.createElement("canvas"),
        canvasContext = canvas.getContext("2d");
    haveImage = true;//set true if validate as a image

    reader.onloadend = function (readerEvt) {
        preview.src = reader.result; // show the upload photo on .preview
    }

    if (file) {
        reader.readAsDataURL(file)//reads the data as a URL

    } else {
        preview.src = "";
    }
    preview.onload = function () {
        //Set canvas size is same as the picture
        canvas.width = preview.width;
        canvas.height = preview.height;
        // draw image into canvas element
        canvasContext.drawImage(preview, 0, 0, preview.width, preview.height);
        // get canvas contents as a data URL (returns png format by default)
        var dataURL = canvas.toDataURL();
        imageBlob = dataURL; // image blob reference that are going to POST
    };
    console.log(imageBlob);
}

//Deleting question from the DB
function deleteQuestion(questionID) {
    var confirmDelete = confirm("Are you sure you want to delete this question?");
    if (confirmDelete) {
        $(document).ready(function () {
            $.ajax({//delete question through ajax so it updates instantly
                type: "POST",
                url: '../uqDrawBackend/deleteQuestion.php',
                data: {
                    questionID: questionID,
                },
                success: function (data) {
                    //alert(result);
                    location.reload();

                },
                error: function (data) {
                    alert("Can't Reach server")
                }
            });
        });
    }
}

//Add question onto the DB 
function submitQuestion() {
    var title = document.getElementsByName("addTitle")[0].value;
    var questionWeek = document.getElementsByName("lectureWeek")[0].value;
    if (title != "") {
        var DataObj = {
            courseID: courseID,
            title: title,
            questionWeek: questionWeek,
            haveImage: haveImage,
            fileFormat: ".jpg", // since it is blob, no matter it is .jpg / .png, it will still saved in .png format
            image: imageBlob,
        };
        $.post('../uqDrawBackend/addQuestion.php', DataObj, function (data) {//url must be in file path, Can't POST data through HTTP
          console.log(data);
            window.location.href = "lecture-makequestions.html?courseID=" + courseID;
            // reload page when data is inserted
        }).fail(function () {
            // just in case posting your form failed
            alert("Posting failed.");
        });
    } else {
        alert("Please enter all input text");
    }


}
