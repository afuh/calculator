let input = [],
    calc = [],
    bigScreen = [],
    oper = ["/", "*", "-", "+", "="],
    divi = false;

// Button data input
$(document).on("click", "button", function() {
    input = $(this).data("value");

    if (oper.indexOf(input) > -1) {
          divi = true;
    }
    else if (calc.join("").substr(-1) === ".") {
          divi = false;
    }

    // Clear all
    if (input === "C") {
        calc = [];
        divi = false;
        $("#results").text(0);
        $("#mini").text(0);
    }

    // First digit must be a number
    else if (calc.length === 0 && oper.indexOf(input) > -1) {
        $("#results").text("T_T");
        $("#mini").text("");
    }

    // Convert to decimals
    else if ((calc.length === 0 || oper.indexOf(calc.join("").substr(-1)) > -1) && input === ".") {
        input = "0.";
        calc = calc.concat(input);
        bigScreen = calc.join("");
        $("#mini").text(bigScreen);
    }

    // evaluation, total and results
    else if (input === "=") {
      divi = false;
      bigScreen = Math.round(eval(calc.join("")) * 100) / 100; //I know... I know...  evil!!

      if (bigScreen.toString().length <= 7) {
        calc = [bigScreen];
        $("#results").text(bigScreen);
      }
      else {
          $("#mini").css("font-size", "14px");
          $("#results").text("T_T");
          $("#mini").text("to many numbers");
      }
    }

    // prevent decimal marks repetition
    else if (($("#results").text().includes(".") || calc.includes(".") || calc.includes("0.")) && divi === false && input === "." ) {
        return;
    }
    // prevent zeros repetition
    else if (calc.length === 0 && input === 0) {
        return;
    }
    // prevent operators repetition
    else if (oper.includes(calc.join("").substr(-1)) && oper.indexOf(input) > -1) {
        return;
    }
    // Screen max chars.
    else if (bigScreen.length >= 15) {
        calc = [];
        bigScreen = [];
    }

    // join the input in one.
    else {
        calc = calc.concat(input);
        bigScreen = calc.join("");
        $("#mini").text(bigScreen);
        }

}); // end click function


//animations
$(document).ready(function() {
    $("#calculator").draggable();
    $("#results, #mini").fadeTo(200, 0.1, function() {
      $(this).fadeTo(100, 1);
    });


    $("button").click(function () {
      let hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

      $("body").animate( {
        backgroundColor: hue
      }, 30000);
    });
});
