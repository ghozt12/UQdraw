/**
 * Created by kinngaileung on 29/10/2015.
 */
$(document).ready(function () {
    $("#subjects").load("../uqDrawBackend/lecturerSubjects.php");
});

function addCourse() {
    var year = getCurrentYear();
    var semester = getCurrentSem();
    document.getElementById("addButton").innerHTML = "<li><span id ='addSubjectForm' class='subject-form'>" +
        "<div class='input input--isao'><input id='courseID' style='width:100%;'type='text' name='courseID' maxlength='8' data-inputmask='AAAA9999' class='input__field input__field--isao' autocomplete='off'>" +
        "<label class='input__label input__label--isao' for='courseID' data-content='Course Code'>" +
        "<span class='input__label-content input__label-content--isao'>Course Code</span></label></div>" +
        "<span class='input input--isao'><input id='year' style='width:100%;'type='number' name='year' maxlength='2' class='input__field input__field--isao' value='" + year + "'>" +
        "<label class='input__label input__label--isao' for='year' data-content='Year' ><span class='input__label-content input__label-content--isao'>Year</span></label></span>" +
        "<span class='input input--isao'><input id='semester' style='width:100%;'type='number' name='semester' maxlength='1' class='input__field input__field--isao' value='" + semester + "'>" +
        "<label class='input__label input__label--isao' for='semester' data-content='Semester'><span class='input__label-content input__label-content--isao'>Semester</span>" +
        "</label></span><button class='add-button' onclick='submitCourse()'>Add</button></div></span></li>";
}
function submitCourse() {//get data from the form
    //alert("submit course");
    var courseCode = document.getElementsByName("courseID")[0].value;
    var year = document.getElementsByName("year")[0].value;
    var sem = document.getElementsByName("semester")[0].value;
    var postCourseCode = "";
    if (courseCode == "" || year == "" || sem == "") {
        alert("Please complete all fields");
    }
    else {
        postCourseCode = postCourseCode.concat(courseCode, "-", year, "_", sem);
        console.log("Post course COde: " + postCourseCode);
        var url = "../uqDrawBackend/addCourse.php?courseID=" + postCourseCode;
        var data = "";
        $.post(url, data, function (data, status) {
            alert(data);
        });
    }

}
function getCurrentYear() {
    var d = new Date();
    var year = d.getFullYear();
    return year.toString().substring(2, 4);
}
function getCurrentSem() {
    var d = new Date();
    var month = d.getMonth();
    if (month >= 2 && month <= 6) {
        return 1;
    }
    if (month >= 7 && month <= 11) {
        return 2;
    }
    if (month >= 12 && month <= 1) {
        return 3;
    }

}