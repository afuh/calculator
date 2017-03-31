const app = (function(){
  let calc = [],
      display = [],
      operList = ["/", "*", "-", "+", "="],
      divi = false;

  //Used in the calculator function
  const evalue = {
        "prev": [],
        "next": [],
        "operator": "",
        "total": 0,
        "operation":  {
              "/": (prev, next) => prev / next,
              "*": (prev, next) => prev * next,
              "+": (prev, next) => prev + next,
              "-": (prev, next) => prev - next
        }
  };

  // Button data input
  $(document).on("click", "button", function() {
      //cache DOM
      let buttonValue = $(this).data("value");
      const $el = $("#calculator"),
            $results = $el.find("#results"),
            $mini = $el.find("#mini"),
            $button = $el.find("button");

      // Render content into the displays
      const render = (miniD, bigD) => {
            $mini.text(miniD);
            $results.text(bigD);
      }
      //Clear All
      const clearAll = () => {
            calc = [];
            divi = false;
            evalue.prev = [], evalue.next = [], evalue.operador = ""
            render(0, 0)
      }
      //Check for dots between operators
      const betweenOperators = (n) => {
            if (operList.indexOf(n) > -1) {
                  divi = true;
            }
            else if (calc.join("").substr(-1) === ".") {
                  divi = false;
            }
      }
      //The calculator itself
      const calculator = (val) => {
        const n = (typeof val === "number" || val === "." || val === "0.");

            // A number, ".", or "0." will pass through here if there isn't an operator stored.
            if (n && evalue.operator.length === 0) {
              evalue.prev.push(val)
            }
            // Do the maths
            else if (val === "=" && evalue.prev.length > 0 && evalue.next.length > 0) {
              evalue.total = Math.round( evalue.operation[evalue.operator](parseFloat(evalue.prev.join("")), parseFloat(evalue.next.join(""))) * 100) / 100;
              evalue.prev = [evalue.total], evalue.next = [], evalue.operator = "";
              //render("", evalue.total)
            }
            // Check in the operator list, if it exist will through here
            else if (operList.indexOf(val) >= 0) {
              evalue.operator = val
            }
            // A number, ".", or "0." will pass through here if there is an operator.
            else if (n && evalue.operator.length > 0) {
              evalue.next.push(val)
            }
            // Reset the calculator
            else if (val === "C") {
              clearAll()
            }
            console.log("prev number: " + evalue.prev.join(""), "operator: " + evalue.operator, "next number: " + evalue.next.join(""));
      }


      // First digit must be a number
       if (calc.length === 0 && operList.indexOf(buttonValue) > -1) {
          buttonValue = "";
          render("", "T_T")
      }

      // Convert to decimals
      else if ((calc.length === 0 || operList.indexOf(calc.join("").substr(-1)) > -1) && buttonValue === ".") {
          buttonValue = "0.";
          calc = calc.concat(buttonValue);
          display = calc.join("");
          render(display);
      }

    //  evaluation, total and results
      // else if (buttonValue === "=") {
      //   divi = false;
      //   display = evalue.total
      //
      //
      //   if (display.toString().length <= 7) {
      //     calc = [display];
      //     render("", display);
      //   }
      //   else {
      //       $mini.css("font-size", "14px");
      //       render("to many numbers", "T_T");
      //   }
      // }

      // prevent decimal repetition
      else if (($results.text().includes(".") || calc.includes(".") || calc.includes("0.")) && divi === false && buttonValue === "." ) {
          return;
      }
      // prevent zero repetition
      else if (calc.length === 0 && buttonValue === 0) {
          return;
      }
      // prevent operator repetition
      else if (operList.includes(calc.join("").substr(-1)) && operList.indexOf(buttonValue) > -1) {
          return;
      }
      // Screen max chars.
      else if (display.length >= 15) {
          calc = [];
          display = [];
      }

      // join them all
      else {
          calc = calc.concat(buttonValue);
          display = calc.join("");
          render(display);
          }




    calculator(buttonValue)
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
