function validateForm() {
	var x = document.forms["signup"]["username"].value;
	var y = document.forms["signup"]["password"];
	var z = document.forms["signup"]["cpassword"];
	var u = document.forms["signup"]["name"].value;
	var i = document.forms["signup"]["surname"].value;
	var notification = notification;
var 	returnToPreviousPage = returnToPreviousPage;
	
	if (x == "") {
		event.preventDefault();
		notification("Email field must be filled out");
		x.focus();
		returnToPreviousPage();
		return false;
	} else if (u == "") { 
		event.preventDefault();
		notification("First name field must be filled out");
		z.focus();
		returnToPreviousPage();
		return false; 
	} else if (i == "") {
		event.preventDefault();
		notification("Last name field must be filled out");
		z.focus();
		returnToPreviousPage();
		return false; 
	} else if (y.value != z.value) { 
		event.preventDefault();
		notification("Given password and confirmation password do not match.");
		z.focus();
		returnToPreviousPage();
		return false; 
	} else {
		return true;
	}
}

// Set the date we're counting down to
var countDownDate = new Date("Jan 5, 2018 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now an the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
    
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);
