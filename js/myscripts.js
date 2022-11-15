/*
Name: Anthony Lawlor
Contact: AnthonyMichaelLawlor@gmail.com
*/

//Check if the html document is fully loaded before running the javascript/jQuerry
$(document).ready(function(){

 
//Function to check if a numbered entered has any decimal place
//Source: https://stackoverflow.com/questions/241145/jquery-validate-plugin-how-to-create-a-simple-custom-rule
  $.validator.addMethod("onlyInteger",function(value, element){
    if(value % 1 != 0)
      return false;
    else
      return true;
  }, "Error: Please only enter Integers no decimal places");

  //Decleration of function to track if the mulitplier miniumum is less than or equal to maximum otherwise display error
  $.validator.addMethod("multiplierMinLessThanMax",function(value, element){
    if( parseInt(value) <= parseInt($('#multiplierMaximum').val()) || $('#multiplierMaximum').val() == '')
      return true;
    else
      return false;
  }, "Error: Minimum column value must be less than or equal to maximum column value");

    //Decleration of function to track if the multiplicand miniumum is less than or equal to maximum otherwise display error
  $.validator.addMethod("multiplicandMinLessThanMax",function(value, element){
    if( parseInt(value) <= parseInt($('#multiplicandMaximum').val()) || $('#multiplicandMaximum').val() == '')
      return true;
    else
      return false;
  }, "Error: Minimum row value must be less than or equal to maximum row value");


  //jQuerry Validator form that checks for errors and parameters and modifies messages to display underneath for input if false.
  //SourceL https://www.youtube.com/watch?v=ZQ7QlYX_UwI
  var $commentForm = $("#inputForm");
  if($commentForm.length){
    $commentForm.validate({
      rules:{
        multiplierMinimum:{
          required: true,
          max: 200,
          min: -200,
          onlyInteger: true,
          multiplierMinLessThanMax: true
          
        },
        multiplierMaximum:{
          required: true,
          max: 200,
          min: -200,
          onlyInteger: true,
        },
        multiplicandMinimum:{
          required: true,
          max: 200,
          min: -200,
          onlyInteger: true,
          multiplicandMinLessThanMax: true
        },
        multiplicandMaximum:{
          required: true,
          max: 200,
          min: -200,
          onlyInteger: true,
        }
      },
      messages:{ //Overwrites the default error messages when the input does not meet the specific validation requirements
        multiplierMinimum:{
          required: "Error: minimum column value required",
          number: "Error: Please Enter valid numerical number (Integer) only",
          max: "Error: Please enter a number (Integer) less than 200",
          min: "Error: Please enter a number (Integer) greater than -200"
     
        },
        multiplierMaximum:{
          required: "Error: minimum column value required",
          number: "Error: Please Enter valid numerical numbers (Integers) only",
          max: "Error: Please enter a number (Integer) less than 200",
          min: "Error: Please enter a number (Integer) greater than -200"
        },
        multiplicandMinimum:{
          required: "Error: minimum row value required",
          number: "Error: Please Enter valid numerical numbers (Integers) only" ,
          max: "Error: Please enter a number (Integer) less than 200",
          min: "Error: Please enter a number (Integer) greater than -200"
        },
        multiplicandMaximum:{
          required: "Error: maximum row value required",
          number: "Error: Please Enter valid numerical numbers (Integers) only",
          max: "Error: Please enter a number (Integer) less than 200",
          min: "Error: Please enter a number (Integer) greater than -200"
        }
      }
    })
  }
  //Submit function button for jQuerry to check if the form is valid, sets up variables using jQuerry and runs it thought table generate function
  $('#submitButton').click(function(){
    if ($('#inputForm').valid()){ 
      var multiplierMin = $('#multiplierMinimum').val();
      var multiplierMax = $('#multiplierMaximum').val();
      var multiplicandMin = $('#multiplicandMinimum').val();
      var multiplicandMax = $('#multiplicandMaximum').val();

       /*Create empty table variable and initialize first cell to have the * symbol
         Source: https://www.w3schools.com/html/html_tables.asp*/
      var table = "<thead> <tr> <th>" + "*" + "</th>";
      

      //Generate the top row of integers in the table based on form input
      for (let i = multiplierMin; i <= multiplierMax ;i++) {
        table += "<th>" + i + "</th>";
      }
      table += "</tr> </thead> <tbody> ";
    

      //Generates the first row of the table by adding the values from minimum row value up through maximum
      //https://www.freecodecamp.org/news/nesting-for-loops-in-javascript/
      for(let j = multiplicandMin; j <= multiplicandMax; j++){
        table += "<tr> <th scope=\"row\">" + j + "</td>";
        //Generates content of the table and adds the resulting valyes into individual cells
        for(let i = multiplierMin; i <= multiplierMax; i++){
          table += "<td>" + j*i + "</td>";
          }
      } 
      //Set the table element in the HTML to be equal to variable table to be displayed.
      $('#tableDisplay').html(table);
    } 
  });
})





