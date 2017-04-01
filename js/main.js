// TODO: 5+= : NaN (debería ser 5+5)
// TODO: Si clickeo dos veces == se bugea todo
// TODO: 2.3 + 2.3 = 2.6 // en este caso puedo escribir 2.6.1
// TODO: Resolver 5+5+5

const app = (function(){
  let check = [], // I use this array and 'operList' to check for possible bugs (i.e. dot repetition, operators repetition, etc.)
      input = 0,
      oper = ["/", "*", "-", "+", "="],
      display = [],
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
  //The calculator. It receives an array and it maps that array in three grups 'prev, operator, next'. Then it uses the method 'evaulue.operation' to return the result.
  const calculator = (resu) => {
        let prev,
            next;

        resu.map((val) => {
          const n = (typeof val === "number" || val === "." || val === "0.");

          if (oper.indexOf(val) >= 0) {
            evalue.operator = val;
          }
          else if (n && evalue.operator.length === 0) {
            evalue.prev.push(val);
          }
          else if (n && evalue.operator.length > 0) {
            evalue.next.push(val);
          }

          prev = parseFloat(evalue.prev.join(""));
          next = parseFloat(evalue.next.join(""));

          console.log("prev: " + prev, "oper: " + evalue.operator, "next: " + next);
            // evalue.prev = [evalue.total], evalue.next = [], evalue.operator = "";

        });
        // Do the maths
      return Math.round( evalue.operation[evalue.operator](prev, next) * 100) / 100;
  };

  // Button data input
  $(document).on("click", "button", function() {
    //Value of each button
    input = $(this).data("value");

    //cache DOM
    const $el = $("#calculator"),
          $results = $el.find("#results"),
          $mini = $el.find("#mini");

    const render = {
          "bigD": (bigD) => { $results.text(bigD); },
          "minD": (miniD) => { $mini.text(miniD); }
    };

    const clearAll = () => {
          check = [];
          divi = false;
          evalue.prev = [], evalue.next = [], evalue.operator = "";
          render.bigD(0)
          render.minD(0)
    };

    const message = {
          "toManyNumbers": () => {
            $mini.css("font-size", "14px");
            render.bigD("T_T");
            render.minD("to many numbers");
          },
          "cry": () => {
            render.bigD("T_T")
            render.minD("")
          }
    };

    //Evaluate and prevent things
    const evaluation = (val) => {
          let lastInput = check.join("").substr(-1),
              inputIsOperator = oper.indexOf(val) > -1;

              //Check for dots between operators
              if (inputIsOperator) {
                    divi = true;
              }
              else if (lastInput === ".") {
                    divi = false;
              }

          if (input === "=") {
            resuls();
          }
          else if (input === "C") {
            clearAll();
          }
          //First digit must be a number
          else if (check.length === 0 && inputIsOperator) {
            input = "";
            message.cry()
          }
          // prevent operator repetition
          else if (oper.includes(lastInput) && inputIsOperator) {
            return;
          }
          //Convert to 0.
          else if ((check.length === 0 || oper.indexOf(lastInput) > -1) && val === ".") {
            input = "0.";
            check = check.concat(input);
            render.minD(check.join(""));
          }
          //prevent decimal repetition
          else if ((evalue.prev.includes(".") || check.includes(".") || check.includes("0.")) && divi === false && val === "." ) {
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
          // If every test is passed, the charachter is displayed
          else {
            check = check.concat(val);
            display = check.join("");
            render.minD(display);
          }
    };

    const resuls = () => {
          display = calculator(check);
          divi = false

          if (display.toString().length <= 7) {
            check = [display];
            render.bigD(display);
            //render.minD("")
          }
          else {
            clearAll()
            message.toManyNumbers();
          }
          evalue.prev = [evalue.total], evalue.next = [], evalue.operator = ""
    };


    evaluation(input);
  });



  //animations
  // $(function() {
  //     const $el = $("#calculator"),
  //           $results = $el.find("#results"),
  //           $button = $el.find("button");
  //
  //     $el.draggable();
  //
  //     $results.fadeTo(200, 0.1, function() {
  //       $(this).fadeTo(100, 1);
  //     });
  //
  //     $button.click(() => {
  //       const hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
  //
  //       $("body").animate( {
  //         backgroundColor: hue
  //       }, 30000);
  //     });
  // });


})();
