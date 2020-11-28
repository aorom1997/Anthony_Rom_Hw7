/*
Name: Anthony Rom
Email: anthony_rom@student.uml.edu
Affiliation: UMass Lowell Senior; Computer Science Major, UTeach Minor
Date: November 27, 2020
Description: This is the javascript file to add a behavior layer for HW7, no changes were made.
*/


  // Obtain values
  /* method obtained from jquery plugin reference github https://github.com/jquery-validation/jquery-validation/blob/master/src/additional/greaterThan.js */
  $.validator.addMethod( "greaterThan", function( value, element, param ) {
    var target = $( param );
    if ( this.settings.onfocusout && target.not( ".validate-greaterThan-blur" ).length ) {
        target.addClass( "validate-greaterThan-blur" ).on( "blur.validate-greaterThan", function() {
            $( element ).valid();
        } );
    }
    return parseInt(value) >= parseInt(target.val());
  });
  $.validator.addMethod( "invalidAnsDecimals", function( value, element ) {
      return !(value % 1);
  }, "Enter an integer from -50 to 50");

  $.validator.addClassRules("inputValue", {
      required: true,
      number: true,
      min: -50,
      max: 50
  });

  // Set rules for value and constrictions using methods
  $(function() {
    $("#multiply").validate({
      wrapper: "div",
      rules: {
        minColumn: {invalidAnsDecimals: [minColumn, minColumn]},
        minRow: {invalidAnsDecimals: [minRow, minRow]},
        maxColumn: {
          invalidAnsDecimals: [maxColumn, maxColumn],
          greaterThan: [minColumn, minColumn]
        },
        maxRow: {
          invalidAnsDecimals: [maxRow, maxRow],
          greaterThan: [minRow, minRow]
        }
      },

      // use default jquery plugin error messages otherwise
      messages: {
          maxColumn: {greaterThan: "Enter a larger ending multiplier."},
          maxRow: {greaterThan: "Enter a larger ending multiplier."}
      },

      // make table
      submitHandler: function(form){
        generate_table();
      }
    });
  });


function generate_table() {
   //Values
    var minColumn = parseInt(document.getElementById("minColumn").value);
    var maxColumn = parseInt(document.getElementById("maxColumn").value);
    var minRow = parseInt(document.getElementById("minRow").value);
    var maxRow = parseInt(document.getElementById("maxRow").value)

    var table = "<tr>"
    table += "<th> </th>" // first spacer

    for (var h = minColumn; h <= maxColumn; h++) { // Loop for headers
      table += "<th>"+ h + "</th>";
    }
    table += "</tr>"; //end row
    for (var i = minRow ; i < maxRow + 1; i++) { // Loop for rows
      table += "<tr><th>" + i + "</th>";
      for (var j = minColumn; j < maxColumn + 1; j++) { // Loop for columns
        table += "<td>" + i * j + "</td>";
      }
      table += "</tr>";
    }
    document.getElementById("Table").innerHTML = table; // Draw table in html
}
