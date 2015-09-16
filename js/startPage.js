$('#someInput').bind('input', function() { 
    $(this).val(); 
    var value = $("#element").val();
    alert(value);
});

// Auto Focus
document.getElementById("CodeInputOne").focus();

// Auto Move to next input on entry
$(window).keyup(function(e) {

	// If not on a input
	if ($('input:focus').length == 0) {
		var c = String.fromCharCode(e.which);
		$("#CodeInputOne").val(c);
		document.getElementById("CodeInputTwo").focus();
		
		return;
	}



	// Find out which element we are focused on
	var focused = document.activeElement;
	var focusedNumber = 0;
	
	// 
	switch (focused.id) {
		case "CodeInputOne":
			focusedNumber = 1;
			break;
		case "CodeInputTwo":
			focusedNumber = 2;
			break;
		case "CodeInputThree":
			focusedNumber = 3;
			break;
	}
	
	// if backspace is pressed and the focused input is empty,
	// the remove the previous input
	if (e.which == 8 || e.which == 46) {

		// We are already at the edge
		if (focusedNumber == 1)
			return;

		if (focusedNumber == 2) {
			$("#CodeInputOne").val('');
			$("#CodeInputOne").focus();
		}

		if (focusedNumber == 3) {
			$("#CodeInputTwo").val('');
			$("#CodeInputTwo").focus();
		}

		return;
	}

		// Simple move to next input
	if ($("#CodeInputOne").val())
		document.getElementById("CodeInputTwo").focus();
	if ($("#CodeInputTwo").val())
		document.getElementById("CodeInputThree").focus();

	// Check if we have all the numbers
	if ( e.which != 13 && $("#CodeInputOne").val() != '' && $("#CodeInputTwo").val() != '' && $("#CodeInputThree").val() != '') {
		var code;
		code = $("#CodeInputOne").val() + $("#CodeInputTwo").val() + $("#CodeInputThree").val();
		//alert("YOU ENTERED CODE:" + code);

		$.ajax({//check if the course exists
			type: 'GET',
			url: 'uqDrawBackend/checkEnteringCode.php?enteringCode='+code,//
			success: function(data){
				var checkObject = JSON.parse(data);
				if(checkObject.success==0) {
					alert("Wrong course");//if wrong, clear inputs and reset focus
					$("#CodeInputOne").val('');
					$("#CodeInputTwo").val('');
					$("#CodeInputThree").val('');
					document.getElementById("CodeInputOne").focus();
				}
				if(checkObject.success==1) {
					window.location.href = "http://teamone.uqcloud.net/pages/student-questions.html?enteringCode="+code;
				}
			},
			error: function(){
				alert("can't reach server" );
			}
		});

	}

});