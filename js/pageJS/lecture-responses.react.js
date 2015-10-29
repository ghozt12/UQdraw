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

                    <SubmissionInfo title={this.state.title} week={this.state.week} qID={this.state.qID}
                                    success={this.state.success} listLength={this.state.listLength}/>
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


    var SubmissionList = React.createClass({ //ListView contain mutiple submissions
        render: function () {
            var submissionNodes = this.props.subList.map(function (submission) {

                return (
                    <Submission std_id={submission.studentID} img_link={submission.submittedImage}
                                id={submission.submissionID}>
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

    var Submission = React.createClass({//format of each response box
        render: function () {
            return (
                <div className="grid-response">
                    <img className="single-response" src={this.props.img_link} height='110px' width='110px'></img>
                    <a href={this.props.img_link} data-lightbox='responses' data-title={this.props.std_id}>
                        <button type='button' className='button-hidden'>Expand</button>
                    </a>
                </div>
            );
        }
    });
    var urlLink = '../uqDrawBackend/getSubmissionsFromQid.php?questionID=' + getParameterByName("questionID");
    React.render( //pass data to SubmissionBox, it relresh every 2sec
        < ResultBox url="../uqDrawBackend/getSubmissionsFromQid.php?questionID=" pollInterval={2000}/>,
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

