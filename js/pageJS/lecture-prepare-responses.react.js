/**
 * Created by kinngaileung on 29/10/2015.
 */
$(document).ready(function () {
    var ResultBox = React.createClass({ //props means the parameter pass from parent
        getInitialState: function () {//default data as empty
            return {subList: [], title: "", week: "", qID: "", success: "", listLength: ""};
        },
        loadCommentsFromServer: function () {//load every 2 sec
            $.ajax({
                url: this.props.url + getParameterByName("questionID"),
                dataType: 'json',
                cache: false,
                success: function (data) {
                    this.setState({
                        subList: data.submissionList,
                        title: data.questionTitle,
                        week: data.questionWeek,
                        qID: data.questionID,
                        success: data.success,
                        listLength: data.submissionList.length
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
            return (
                <div>
                    <SubmissionInfo id={this.state.id} title={this.state.title} week={this.state.week}
                                    qID={this.state.qID} success={this.state.success}
                                    listLength={this.state.listLength}/>
                    <SubmissionList subList={this.state.subList}/>
                </div>
            );
        }
    });

    var SubmissionInfo = React.createClass({//basically it shows dynamic data of number of responses and titles
        render: function () {

            return (
                <div>

                    <h2 className="type-body-heading">Question: {this.props.title}</h2>
                    <h3 className="type-body-response"> Responses - {this.props.listLength} -
                        Lecture {this.props.week}</h3>
                </div>
            );
        }
    });


    var SubmissionList = React.createClass({ //fetch and format all submission
        render: function () {
            var counter = -1;
            var submissionNodes = this.props.subList.map(function (submission) {
                counter++;
                return (
                    <Submission std_id={submission.studentID} img_link={submission.submittedImage}
                                id={submission.submissionID} index={counter} date={submission.date}
                                result={submission.result}>
                    </Submission>
                );
            });
            return (
                <div className="grid-container">
                    {submissionNodes}
                </div>

            );
        }
    });

    var Submission = React.createClass({//item of each record
        handleDelete: function () {
            //deleteItem from server
            var confirmDelete = confirm("Are you sure you want to delete this submission?");
            if (confirmDelete) {
                $.ajax({
                    url: "../uqDrawBackend/deleteSubmission.php?submissionID=" + this.props.id,
                    dataType: 'json',
                    cache: false,
                    success: function (data) {

                    }.bind(this),
                    error: function (xhr, status, err) {
                        console.error(this.props.url, status, err.toString());
                    }.bind(this)
                });
            }
        },
        render: function () {
            var markID = "mark" + this.props.index;
            var imgLink = this.props.img_link + "?time=" + this.props.date;
            var deleteFunction = "deleteItem(" + this.props.id + ")";
            var img = getCorrectIcon(parseInt(this.props.result));
            return (
                <div className="grid-response">

                    <img className="single-response" src={this.props.img_link} height='110px' width='110px'></img>
                    <a href={imgLink} data-lightbox='responses' data-title={this.props.std_id}>
                        <button type='button' className='button-hidden'>Expand</button>
                    </a>
                    <button type="button" className="button-hidden" onClick={this.handleDelete}>Delete</button>
                    <div id={markID} value={this.props.id}>
                        <img height="20px" width="20px" className="marked" src={img}></img>
                    </div>
                </div>
            );
        }
    });
    var urlLink = '../uqDrawBackend/getSubmissionsFromQid.php?questionID=' + getParameterByName("questionID");

    React.render( //pass data to SubmissionBox, it relresh every 2sec
        < ResultBox
            url="../uqDrawBackend/getSubmissionsFromQid.php?questionID="
            pollInterval={2000}/>,
        document.getElementById('responseBox')
    )
    ;
});

function getParameterByName(name) { // get url parameter
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getCorrectIcon(result) {//append correct icon in the marking div
    switch (result) {
        case 0:
            return "../assets/images/defaultCorrect.png";
            break;
        case 1:
            return "../assets/images/correct.png";
            break;
        case 2:
            return "../assets/images/incorrect.png";
            break;
        default:
            return "";
    }

}
