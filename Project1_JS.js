function init() {

    // Create variables for Weather Example from DOM elements in the document
    var weather_Button = document.getElementById("weather_Button");
    var cityInput = document.getElementById("weather_input");
    var name = document.getElementById("name");
    var desc = document.getElementById("desc");
    var temp = document.getElementById("temp");
    var advice = document.getElementById("advice");
    var statement = document.getElementById("statement");
    var icon_image = document.getElementById("weather_icon");
    var timezone = document.getElementById("timezone");
    var localTime = document.getElementById("local_time");

    var mykey = config.MY_KEY;

    // Execute a function when the user releases the 'enter' key on their keyboard
    cityInput.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {   // Number 13 is the "Enter" key on the keyboard
            event.preventDefault();
            weather_Button.click();   // Trigger the button element with a click
        }
    });

    // Execute the following function when the weather button is clicked
    weather_Button.onclick = function() {
        
        var city = cityInput.value;  // City variable is subsituted into the API Url
        const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + mykey + '&units=metric';
        fetch(url)  // Fetch the data - return an object once the request has been sent through
        .then(response => response.json())  // Structure the data in a nice format with JSON
        .then(data => {

            console.log(data);

            // Assign the data we want to variables
            var nameValue = data['name'];
            var tempValue = data['main']['temp'];
            var descValue = data['weather'][0]['description'];
            var country = data['sys']['country'];
            var iconcode = data['weather'][0]['icon'];
            var timeoffset = data['timezone'];
            
            // Retrieve the correct icon image for the current weather conditions
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

            var current_d = new Date();

            // Calculate the local time using the utc_offset
            var utc_offset = current_d.getTimezoneOffset() * 60;
            current_d.setSeconds(utc_offset + timeoffset);
            local_t = current_d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});


            // Convert the GMT Time Offset from seconds to hours
            var time_converted = (timeoffset / 3600);
            var adviceValue = "";
            var prefix = "";

            if (time_converted > 0) {
                prefix = "+";
            }

            // Advice provided for current weather conditions
            if (tempValue <= 4) {
                adviceValue = "Its' very cold. Bring a scarf, gloves, and beanie";
            }
            else if (tempValue > 4 && tempValue <= 10) {
                adviceValue = "It's cold, dress warmly";
            }
            else if (tempValue > 10 && tempValue <= 15) {
                adviceValue = "Quite Chilly, bring a jacket";
            }
            else if (tempValue > 15 && tempValue <= 20) {
                adviceValue = "It's cool outside";
            }
            else if (tempValue > 20 && tempValue <= 25) {
                adviceValue = "Even temperature outside";
            }
            else if (tempValue > 25 && tempValue <= 30) {
                adviceValue = "It's warm outside";
            }
            else if (tempValue > 30 && tempValue <= 35) {
                adviceValue = "It's hot outside. Drink lots of water";
            }
            else if (tempValue > 35 && tempValue <= 40) {
                adviceValue = "It's very hot. Consider staying indoors";
            }
            else if (tempValue > 40 && tempValue <= 45) {
                adviceValue = "Extremely hot";
            }
            else if (tempValue > 45) {
                adviceValue = "Warning: Extreme Heat";
            }

            // Assign the variables innerHTML property with the data from the API
            name.innerHTML = nameValue;
            statement.innerHTML = "Current weather information for " + nameValue + ", " + country;
            icon_image.hidden = false;
            icon_image.src = iconurl;
            desc.innerHTML = "<strong>Description:</strong> " + descValue;
            temp.innerHTML = "<strong>Temperature:</strong> " + tempValue + ' degrees (celsius)';
            timezone.innerHTML = "<strong>Time Zone:</strong> GMT " + prefix + time_converted;
            localTime.innerHTML = "<strong>Local Time:</strong> " + local_t;
            advice.innerHTML = "<strong>Advice:</strong> " + adviceValue;
            
        })

        // If the city isn't found, alert the user
        .catch(err => alert("No city found"))
    }
}
document.addEventListener('readystatechange', function() {
    if (document.readyState === "complete") {
        init();  // run the init() function once the page has finished loading
    }
});

// Executed by clicking the first button in DOM Manipulation section
function Example1_Function() {
    var p = document.getElementById("JS_Example_1");  // The Example Box parent element
    var c = document.getElementById("JS_Example_1_Right");  // The Example Box text content (right hand side)
    var div_ele = document.getElementById("dom_manipulation").children[3];
    var intro_para = document.getElementById("dom_manipulation").children[1];

    // Swap the order of the intro paragraph and example box div element 
    // so that it floats to the right of the paragraph
    div_ele.parentNode.insertBefore(div_ele, intro_para);   

    c.children[0].textContent = "The paragraph element's content has been altered dynamically. The 'Example' div element's class has been changed from 'example_long' to 'example', and style property has changed to float right. The elements' order has been swapped to achieve desired text-wrapping. Now you can add and delete some new child elements";

    p.className = "example";   // Change the class of the Example div element from 'example_long' to 'example'
    p.style.float = "right";   // Float the example div element to the right hand side
    

    document.getElementById("to_be_hidden").hidden = true;

    // The buttons, text area boxes, and explanation paragraphs are hidden by default,
    // They will appear when the first button is clicked
    document.getElementById("adding_to_Example_Generic").hidden = false;
    document.getElementById("adding_to_Example_Specific").hidden = false;
    document.getElementById("delete_from_Example_Specific").hidden = false;
    document.getElementById("dom_explanation_1").hidden = false;
    document.getElementById("dom_explanation_2").hidden = false;
    document.getElementById("dom_explanation_3").hidden = false;

}


var count = 0;

// A parent variable is created for the Example Box div element
// A new paragraph element is created, and its text-colour is set to Coral
// A New Text Node is created to hold the text
// The Text Node is appended to the paragraph element as a child
// The paragraph element is appended to the parent Div element as a child
function addChildrenToExample() {
    count = count + 1;
    var parent = document.getElementById("JS_Example_1_Right");
    var new_text = document.createElement("p");
    new_text.style.color = "coral";
    var new_text_node = document.createTextNode("Generic Text " + count);
    new_text.appendChild(new_text_node);
    parent.appendChild(new_text);
}

// The previously added child paragraph elements are removed from the parent Div
function removeChildrenFromExample() {
    var parent = document.getElementById("JS_Example_1_Right");
    var current_length = parent.children.length;
    while (current_length > 1) {
        parent.removeChild(parent.children[current_length - 1]);  // find the last element in the parents collection of child elements
        count = count - 1;
    }
}

function addSpecificChildToExample() {
    var example_new_text = document.getElementById("text_to_example").value;  // value in the text box
    var parent = document.getElementById("JS_Example_1_Right");

    if (!example_new_text.replace(/\s/g, '').length) {  // check if the box is empty
        alert('Box is empty');
        document.getElementById("text_to_example").value = "";
        return false;        
    } else {
        var new_text = document.createElement("p");
        new_text.style.color = "coral";
        var new_text_node = document.createTextNode(example_new_text);  // create text node with the value in the text box
        document.getElementById("text_to_example").value = "";
        new_text.appendChild(new_text_node);
        parent.appendChild(new_text);
        count = count + 1;
    }
}

function removeSpecificChildFromExample() {
    var parent = document.getElementById("JS_Example_1_Right");
    var current_length = parent.children.length;
    var paragraph_number = parseInt(document.getElementById("deletion_input").value);  // ensures the paragraph number is an integer
    if (paragraph_number > (current_length-1)) {
        alert("A paragraph of that number does not exist");
        document.getElementById("deletion_input").value = "";
    }
    y = parent.children[paragraph_number];  // finds the specified element in the parent's collection of child elements
    while (paragraph_number > 0) {
        parent.removeChild(y);
        document.getElementById("deletion_input").value = "";
    }
}


// Validates the contents of the Form
function validateForm() {
    var firstName = document.forms["JS_form"]["fname"].value;
    var lastName = document.forms["JS_form"]["lname"].value;

    var email = document.forms["JS_form"]["email"].value;
    var at_position = email.indexOf("@");  // Position of the @ character
    var dot_position = email.lastIndexOf(".");  // Position of the dot character

    var testdate = document.forms["JS_form"]["birthday"].value;

    var givendate = new Date(testdate);  // The date provided by the user
    var today = new Date();  // Today's date

    var datestring = givendate.toLocaleString( undefined, {   // Format the date in the message to only show the day and month
        month: "long", day: "numeric"
    });

    var letters = /^[a-zA-Z]+$/;  // Letters used to verify that only text is entered into the name input fields

    var success_msg = document.getElementById("success");
    var summary_text = document.getElementById("summary");

    if (firstName == "") {   // Ensure something is entered by the user
        alert("First Name field must be filled");
        document.JS_form.fname.focus();  // Bring the user back to the input box so they can re-try
        return false;
    }
    if (!letters.test(firstName)) {   // Check that only letters were entered
        alert("The name fields can only contain letters");
        document.JS_form.fname.focus();
        return false;
    }

    if (lastName == "") {
        alert("Last Name field must be filled");
        document.JS_form.lname.focus();
        return false;
    }
    if (!letters.test(lastName)) {
        alert("The name fields can only contain letters");
        document.JS_form.lname.focus();
        return false;
    }

    if (email == "") {
        alert("Email field must be filled");
        document.JS_form.email.focus();
        return false;
    }

    // Ensure that the email address contains the @ and . character
    // There must be at least one character before and after the @
    // There must be at least two characters after the dot
    if (at_position<1 || dot_position<at_position+2 || dot_position+2>=email.length){  
        alert("Please enter a valid e-mail address");
        document.JS_form.email.focus();
        return false;  
    }


    // Checks that the date is valid
    if (isNaN(givendate)) {
        alert("Please enter a valid date in the correct format: MM/DD/YYYY");
        document.JS_form.birthday.focus();
        return false;
    }
    if (givendate == "") {
        alert("Birthday field must be filled");
        document.JS_form.birthday.focus();
        return false;
    }
    if (givendate >= today) {   // Ensure that the date provided is in the past
        alert("Birthdate must be in the past");
        document.JS_form.birthday.focus();
        return false;
    }

    // Message that appears once the form has been validated successfully
    success_msg.innerHTML = "Form Validation Successful!";
    summary_text.innerHTML = "Hello " + firstName + " " + lastName + "," + "<br />" + "We will send you an email at: " + email + "<br />" + " On your birthday: " + datestring;

}