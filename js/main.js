const calculator = (function(){
  let calc = [],
      bigScreen = [],
      oper = ["/", "*", "-", "+", "="],
      divi = false;

  // Button data input
  $(document).on("click", "button", function() {
      //cache DOM
      let buttonValue = $(this).data("value");
      const $el = $("#calculator"),
            $results = $el.find("#results"),
            $mini = $el.find("#mini"),
            $button = $el.find("button");

      // Render content in the screens
      const render = (miniScr, bigScr) => {
            $mini.text(miniScr);
            $results.text(bigScr);
      }
      //Clear All
      const clearAll = () => {
            calc = [];
            divi = false;
            render(0, 0)
      }
      //Check for dots between operators
      const betweenOperators = (n) => {
            if (oper.indexOf(n) > -1) {
                  divi = true;
            }
            else if (calc.join("").substr(-1) === ".") {
                  divi = false;
            }
      }


      if (buttonValue === "C") {
          clearAll()
      }

      // First digit must be a number
      else if (calc.length === 0 && oper.indexOf(buttonValue) > -1) {
          render("", "T_T")
      }

      // Convert to decimals
      else if ((calc.length === 0 || oper.indexOf(calc.join("").substr(-1)) > -1) && buttonValue === ".") {
          buttonValue = "0.";
          calc = calc.concat(buttonValue);
          bigScreen = calc.join("");
          render(bigScreen);
      }

      // evaluation, total and results
      else if (buttonValue === "=") {
        divi = false;
        bigScreen = Math.round(eval(calc.join("")) * 100) / 100; //I know... I know...  evil!!

        if (bigScreen.toString().length <= 7) {
          calc = [bigScreen];
          render("", bigScreen);
        }
        else {
            $mini.css("font-size", "14px");
            render("to many numbers", "T_T");
        }
      }

      // prevent decimal marks repetition
      else if (($results.text().includes(".") || calc.includes(".") || calc.includes("0.")) && divi === false && buttonValue === "." ) {
          return;
      }
      // prevent zero repetition
      else if (calc.length === 0 && buttonValue === 0) {
          return;
      }
      // prevent operators repetition
      else if (oper.includes(calc.join("").substr(-1)) && oper.indexOf(buttonValue) > -1) {
          return;
      }
      // Screen max chars.
      else if (bigScreen.length >= 15) {
          calc = [];
          bigScreen = [];
      }

      // join the input in one.
      else {
          calc = calc.concat(buttonValue);
          bigScreen = calc.join("");
          render(bigScreen);
          }


    betweenOperators(buttonValue)
  }); // end click function


  //animations
  // $(function() {
  //     $el.draggable();
  //     $("#results, #mini").fadeTo(200, 0.1, function() {
  //       $(this).fadeTo(100, 1);
  //     });
  //
  //
  //     $button.click(function () {
  //       var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
  //
  //       $("body").animate( {
  //         backgroundColor: hue
  //       }, 30000);
  //     });
  // });


})();
