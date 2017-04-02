"use strict";

// TODO: The results aren't always correct. It need more work and resolve this case: 2*2+2*2

var app = function () {
  var check = [],
      // I use this array and 'operList' to check for possible bugs (i.e. dot repetition, operators repetition, etc.)
  input = 0,
      oper = ["/", "*", "-", "+"],
      display = [],
      divi = false;

  //Used in the calculator function
  var evalue = {
    "prev": [],
    "next": [],
    "operator": "",
    "total": 0,
    "operation": {
      "/": function _(prev, next) {
        return prev / next;
      },
      "*": function _(prev, next) {
        return prev * next;
      },
      "+": function _(prev, next) {
        return prev + next;
      },
      "-": function _(prev, next) {
        return prev - next;
      }
    }
  };
  //The calculator. It receives an array and it maps that array in three grups 'prev, operator, next'. Then it uses the method 'evaulue.operation' to return the result.
  var calculate = function calculate(calc) {
    var prev = void 0,
        next = void 0,
        opera = false;

    if (calc.length <= 1) {
      return;
    } else {
      calc.map(function (val) {
        var n = typeof val === "number" || val === "." || val === "0.";

        if (!opera && oper.indexOf(val) >= 0) {
          evalue.operator = val;
          opera = true;
        } else if (opera && oper.indexOf(val) >= 0) {
          evalue.total = Math.round(evalue.operation[evalue.operator](prev, next) * 100) / 100;
          evalue.operator = val;
          evalue.prev = [evalue.total];
          evalue.next = [];
        } else if (n && !opera) {
          evalue.prev.push(val);
        } else if (n && opera) {
          evalue.next.push(val);
        }

        prev = parseFloat(evalue.prev.join(""));
        next = parseFloat(evalue.next.join(""));

        console.log("prev: " + prev, "oper: " + evalue.operator, "next: " + next);
      });
    }
    evalue.total = Math.round(evalue.operation[evalue.operator](prev, next) * 100) / 100;
    return evalue.total;
  };

  // Button data input
  $(document).on("click", "button", function () {
    //Hold the values of each button
    input = $(this).data("value");

    //cache DOM
    var $el = $("#calculator"),
        $results = $el.find("#results"),
        $mini = $el.find("#mini");

    var render = {
      "bigD": function bigD(_bigD) {
        $results.text(_bigD);
      },
      "minD": function minD(miniD) {
        $mini.text(miniD);
      }
    };

    var clearAll = function clearAll() {
      check = [];
      divi = false;
      evalue.prev = [];evalue.next = [];evalue.operator = "";
      render.bigD(0);
      render.minD(0);
    };

    var message = {
      "toManyNumbers": function toManyNumbers() {
        $mini.css("font-size", "14px");
        render.bigD("T_T");
        render.minD("to many numbers");
      },
      "cry": function cry() {
        render.bigD("T_T");
        render.minD("");
      }
    };

    //Evaluate and prevent things
    var evaluation = function evaluation(val) {
      var lastInput = check.join("").substr(-1),
          inputIsOperator = oper.indexOf(val) > -1,
          lastInputIsOperator = oper.indexOf(lastInput) > -1,
          lastInputIsNumber = oper.indexOf(lastInput) === -1;

      //Check for dots between operators
      if (inputIsOperator) {
        divi = true;
      } else if (lastInput === ".") {
        divi = false;
      }
      //Preven +=
      if (lastInputIsOperator && val === "=") {
        return;
      }
      //Only when the last input is a Naumber call for a calucation.
      else if (lastInputIsNumber && val === "=") {
          results(check);
        }
        //Clear all
        else if (val === "C") {
            clearAll();
          }
          //First digit must be a number
          else if (check.length === 0 && inputIsOperator) {
              input = "";
              message.cry();
            }
            // prevent operator repetition
            else if (oper.includes(lastInput) && inputIsOperator) {
                return;
              }
              //Convert to 0.
              else if ((check.length === 0 || lastInputIsOperator) && val === ".") {
                  input = "0.";
                  check = check.concat(input);
                  render.minD(check.join(""));
                }
                //prevent decimal repetition
                else if (!divi && val === "." && (evalue.total.toString().includes(".") || check.includes(".") || check.includes("0."))) {
                    return;
                  }
                  // prevent zero repetition
                  else if (check.length === 0 && input === 0) {
                      return;
                    }
                    // Display max chars.
                    else if (check.length >= 15) {
                        check = [];
                        message.toManyNumbers();
                      }
                      // If every test is passed, the values are displayed
                      else {
                          check = check.concat(val);
                          display = check.join("");
                          render.minD(display);
                        }
    };
    //Call the Calculator and watch for the length of the result
    var results = function results(val) {
      divi = false;
      display = calculate(val);

      if (typeof display === "undefined") {
        return;
      } else if (display.toString().length <= 7) {
        check = [display];
        render.bigD(display);
      } else {
        clearAll();
        message.toManyNumbers();
      }
      evalue.prev = [];evalue.next = [];evalue.operator = "";
    };
    evaluation(input);
  });

  //animations
  $(function () {
    var $el = $("#calculator"),
        $results = $el.find("#results"),
        $button = $el.find("button");

    $el.draggable();
    $results.fadeTo(200, 0.1, function () {
      $(this).fadeTo(820, 1);
    });
    $button.click(function () {
      var randomR = Math.floor(Math.random() * 256),
          randomG = Math.floor(Math.random() * 256),
          randomB = Math.floor(Math.random() * 256),
          hue = 'rgb(' + randomR + ',' + randomG + ',' + randomB + ')';

      $("body").animate({
        backgroundColor: hue
      }, 30000);
    });
  });
}();