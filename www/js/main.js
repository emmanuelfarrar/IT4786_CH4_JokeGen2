//AJAX retrieval 
var xmlhttp;        //XMLHttpRequest object

//when the app loads and the device is ready, call the init()
window.onload = function () {
    document.addEventListener("deviceready", init, false);
    init();
}

/**function that attaches a click event listener to btnGetJoke and then
 * prepare the XMLHttpRequest object. 
 * we set
xmlhttp.onreadystatechange to the function receiveJoke(), so whenever
the ready
state of xmlhttp changes, receiveJoke() is executed.
*/
function init() {
    document.getElementById('btnGetJoke').addEventListener('click', getJoke, false);

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = receiveJoke;
}

/**function that communicates with the server
 * Using the XMLHttpRequest object (xmlhttp) to communicate with the remote server
 * GET method is used to comm with API 
 * 
 * Version 2 of this was modified to allow the user to input the name
 */

function getJoke(){
var firstName = document.getElementById("firstName").value;
var lastName = document.getElementById("lastName").value;
var jokeURL = "http://api.icndb.com/jokes/random?firstName=";
    jokeURL += firstName;
    jokeURL += "&lastName=";
    jokeURL += lastName;

    xmlhttp.open('GET', jokeURL, true);
    xmlhttp.send();
}

/** function that parses the data recieved from API
 * To determine if data is valid we use readyState and status,
 * these come from the XMLHttpRequest object.
 * - readyState value reflects the status of the client side of the communication.
 * - status refers to the status of the server and can only be HTTP status code.
 * 
 * One we knoe we can reach the server ( 4 && 200) we parse the JSON data, since this website returns it in that format. 
 * In this case we are using parsonJASON() from jQuery to make it easier.
 */
function receiveJoke(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        var json = jQuery.parseJSON(xmlhttp.responseText);

        document.getElementById('joke').innerHTML = json.value.joke;
    }
}

