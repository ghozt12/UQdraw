/**
 * Created by kinngaileung on 26/10/2015.
 */
var courseID = "";
var enteringCode = "";
var Requesturl = "";
$(document).ready(function () {//request from different link depends on the parameter
    if (getParameterByName("courseID") != "") {
        courseID = getParameterByName("courseID");
        Requesturl = "../uqDrawBackend/retrieveStudentQuestionsbyCourseId.php?courseID=" + courseID;
        //console.log(Requesturl);
    }
    else {
        if (getParameterByName("enteringCode") != "") {
            enteringCode = getParameterByName("enteringCode");
            Requesturl = "../uqDrawBackend/retrieveQuestionsfromThreeDigitCode.php?enteringCode=" + enteringCode;
        }
    }

    //-------React JS -------
    var QuestionBox = React.createClass({//the whole container of all questions
        getInitialState: function () {//default data as empty
            return {subList: [], enteringCode: "", subject: "", success: ""};
        },
        loadCommentsFromServer: function () {//load every 2 sec
            $.ajax({
                url: Requesturl,
                dataType: 'json',
                cache: false,
                success: function (data) {
                    this.setState({
                        subList: data.questionsList,
                        enteringCode: data.enteringCode,
                        subject: data.subject,
                        success: data.success
                    });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }, componentDidMount: function () {//initial run
            this.loadCommentsFromServer();
            setInterval(this.loadCommentsFromServer, this.props.pollInterval);
        },
        render: function () {//pass data to different Items
            console.log(this.state.subList);
            return (
                <div>
                    <section className="student-question">
                        <CourseInfo enteringCode={this.state.enteringCode} subject={this.state.subject}/>
                        <QuestionsList subList={this.state.subList}/>
                    </section>
                </div>

            );
        }
    });

    var CourseInfo = React.createClass({//shows course code and 3digit code
        render: function () {
            return (
                <div>
                    <h2 className="type-body-heading"> {this.props.subject} CODE: {this.props.enteringCode}</h2>
                </div>
            );
        }
    });


    var QuestionsList = React.createClass({// sort and show questions
        render: function () {
            var counter = -1;
            var openQuestions = this.props.subList.map(function (question) {
                if (question.status == 1 && question.attempted == 0) {//the question is open and std havn't answered yet
                    return (<OpenQuestion questionID={question.questionID} title={question.title}>
                    </OpenQuestion>);
                }
                return null;
            });
            var notOpenQuestions = this.props.subList.map(function (question) {//the question is closed and std havn't answered yet
                if (question.status == 0 && question.attempted == 0) {
                    return (<NotOpenQuestion questionID={question.questionID} title={question.title}>
                    </NotOpenQuestion>);
                }
                return null;
            });
            var prevQuestions = this.props.subList.map(function (question) {//answered question
                if (question.attempted == 1) {
                    return (<PrevQuestion questionID={question.questionID} title={question.title}>
                    </PrevQuestion>);
                }
                return null;
            });
            return (
                <section className="student-responses">
                    <h2 className="type-body-heading"><span> Open Questions </span></h2>
                    <ul className="student-list">  {openQuestions}</ul>
                    <h2 className="type-body-heading"><span> Closed Questions</span></h2>
                    <ul className="closed-questions">  {notOpenQuestions}</ul>
                    <h2 className="type-body-heading"><span> PREVIOUS RESPONSES </span></h2>
                    <ul className="student-list"> {prevQuestions}</ul>
                </section>

            );
        }
    });

    var OpenQuestion = React.createClass({
        render: function () {
            var drawingLink = "drawing-app.html?questionID=" + this.props.questionID + "&questionTitle=" + this.props.title;
            return (
                <div>
                    <a href={drawingLink}>
                        <li>
                            <span> {this.props.title} </span></li>
                    </a>
                </div>
            );
        }
    });
    var NotOpenQuestion = React.createClass({
        render: function () {
            return (
                <div>
                    <li >
                        <span> {this.props.title} </span></li>
                </div>
            );
        }
    });
    var PrevQuestion = React.createClass({
        render: function () {
            var resultLink = "student-correctanswers.html?questionID=" + this.props.questionID;//tobe confirm
            return (
                <div>
                    <a href={resultLink}>
                        <li>
                            <span> {this.props.title} </span></li>
                    </a>
                </div>
            );
        }
    });

    React.render(// start react js, refresh every 2 sec
        <QuestionBox
            pollInterval={2000}/>,
        document.getElementById('questionController')
    );


});
function getParameterByName(name) { // get url parameter
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


