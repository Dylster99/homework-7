// Steps to complete:

// 1. Create Firebase link
// 2. Create initial train data in database
// 3. Create button for adding new trains - then update the html + update the database
// 4. Create a way to retrieve trains from the trainlist.
// 5. Create a way to calculate the time way. Using difference between start and current time.
//    Then take the difference and modulus by frequency. (This step can be completed in either 3 or 4)

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCtMAuTIbqb37jM1HIhGkr8jEWs8hHT7SA",
    authDomain: "homework-07.firebaseapp.com",
    databaseURL: "https://homework-07.firebaseio.com",
    projectId: "homework-07",
    storageBucket: "homework-07.appspot.com",
    messagingSenderId: "613796478181",
    appId: "1:613796478181:web:6d87757d7fc53c412d680c",
    measurementId: "G-9J0HFVRSND"
  };
  
  firebase.initializeApp(config);
  
  const database = firebase.database();

// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  const empName = $("#employee-name-input").val().trim();
  const empRole = $("#role-input").val().trim();
  const empStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
  const empRate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding employee data
  const newEmp = {
    name: empName,
    role: empRole,
    start: empStart,
    rate: empRate
  };

  // Uploads employee data to the database
  database.ref().push(newEmp);

  // Logs everything to console
  console.log(newEmp.name);
  console.log(newEmp.role);
  console.log(newEmp.start);
  console.log(newEmp.rate);

  alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  const empName = childSnapshot.val().name;
  const empRole = childSnapshot.val().role;
  const empStart = childSnapshot.val().start;
  const empRate = childSnapshot.val().rate;

  // Employee Info
  console.log(empName);
  console.log(empRole);
  console.log(empStart);
  console.log(empRate);

  // Prettify the employee start
  let empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  let empMonths = moment().diff(moment(empStart, "X"), "months");
  console.log(empMonths);

  // Calculate the total billed rate
  let empBilled = empMonths * empRate;
  console.log(empBilled);

  // Create the new row
  let newRow = $("<tr>").append(
    $("<td>").text(empName),
    $("<td>").text(empRole),
    $("<td>").text(empStartPretty),
    $("<td>").text(empMonths),
    $("<td>").text(empRate),
    $("<td>").text(empBilled)
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});
  