/**
 * Simple function to check if the feild is empty or not.
 */
function CheckEmptyFields(fieldValue, fieldPattern, fieldName) {
    if (fieldName == 'Secret Code') {
        if (jQuery.trim(fieldValue) == '') {
            return false;
        }
        return true;
    }

    if (jQuery.trim(fieldValue) == '') {
        alert(fieldName + ' is empty. Please fill that field.', 'Empty Field');
        return false;
    }
    if (fieldPattern != '') {
        var matches = fieldValue.match(fieldPattern);
        if (matches == null) {
            alert(fieldName + ' does not conform to the given pattern.', 'Invalid Field');
            return false;
        }
        matches = matches[0];
        if (matches != fieldValue) {
            alert(fieldName + ' does not conform to the given pattern.', 'Invalid Field');
            return false;
        }
    }
    return true;
}

function Play_splash() {
    preload = document.getElementById("preload_splash");
    loading = 0;
    preload.style.animation = "";
    preload.style.display = "block";

    id = setInterval(frame, 64);

    function frame() {
        if (loading == 100) {
            Stop_splash();

        } else if (loading < 100) {
            loading = loading + 1;
            if (loading == 90) {
                Fade_splash()
            }
        }
    }
}

function Fade_splash() {
    preload.style.animation = "fadeout 1s ease";
    loading = 90;
}

function Stop_splash() {
    preload.style.display = "none";
    clearInterval(id);
}


document.getElementById("collegeForm").onsubmit = function(event) {
    event.preventDefault();
    var secretCode = $('#col_code').val();

    if (!CheckEmptyFields(secretCode, '[a-zA-Z0-9]', 'Secret Code')) {
        alert("Invalid Secret code");
        return false;
    }

    var email = $('#c_email').val();
    if (!CheckEmptyFields(email, '^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$', 'Email')) {
        alert("Invalid E-mail id");
        return false;
    }
    var password = $('#c_passwd').val();
    var passwordCnf = $('#c_conf_passwd').val();
    if (password != passwordCnf) {
        alert('Passwords dont match. Check again.');
        return false;
    }


    //AJAX Confirm
    Play_splash();

    $.post('./response_return.php', {code: secretCode}, function(data){
	setTimeout(function() {
	var response = JSON.parse(data);
	console.log(response);
	if (email == response.email) {
	    $.post('ajax/register2.php', {code: secretCode, email:email, password:password}, function(data1){
		console.log(data1);
	    });
	}
	}, 2000);

    });
/*
var form = new FormData();
form.append("code", secretCode);
// form.append("email", email);
// form.append("password", password);

var settings = {
  "async": true,
  "crossDomain": true,
  //"url": "https://psglogin.in/php/details.php",
  "url":"./test.php",
  "method": "POST",
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

var settings1= {
    "async": true,
    "crossDomain": true,
    "url": "https://hack-a-venture.psglogin.in/ajax/register1.php",
    "method": "POST",
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",
    "data": form
  }

$.ajax(settings).done(function (response) {
  data = JSON.parse(response);
  console.log(data);
  if(email == data['email']){
    $.ajax(settings1).done(function (response1) {
        var jsonData = JSON.parse(response1);
        Stop_splash();
        if (jsonData.status == EnumStatus.OK) {
            setTimeout(function() {
                window.location = 'login.php';
            }, 3500);
        } else {
            console.log('Registration Error');
            alert(jsonData['message']);
        }
    });
  }
});

*/
  /*$.ajax({
 	 type: "POST",
	  url: "https://hack-a-venture.psglogin.in/ajax/register1.php",
	  data: "code="+secretCode+"&email="+email+"&password="+password,
	  success: function(data){
        	alert( data );
		var jsonData = JSON.parse(data);
        Stop_splash();
        console.log(jsonData);
        if (jsonData.status == EnumStatus.OK) {
            setTimeout(function() {
                window.location = 'login.php';
            }, 3500);
        } else {
            console.log('Registration Error');
            alert(jsonData['message']);
	  }
	},
	  error: function(XMLHttpRequest, textStatus, errorThrown) {
	    console.log('XHR ERROR ' + XMLHttpRequest.status);
		console.log( XMLHttpRequest.readyState);
    	    console.log( XMLHttpRequest.responseText);
  	}
	});*/
}

$("#noScroller").css("overflow-y", "hidden");
$("#reg_col_btn").css("width", "100%");
$("#noScroller").css("padding-right", "0px");
$(".reg-html").css("height", "92%");
$("#details_label").css("margin-left", "30%");
