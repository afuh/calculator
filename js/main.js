const app = (function(){
  let check = [], // I use this array and 'operList' to check for possible bugs (i.e. dot repetition, operators repetition, etc.)
      operList = ["/", "*", "-", "+", "="],
      display = [],
      divi = false;

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

  const calculator = (resu) => {
        let prev,
            next;

        resu.map((val) => {
          const n = (typeof val === "number" || val === "." || val === "0.");

          if (operList.indexOf(val) >= 0) {
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

  $(document).on("click", "button", function() {
    let input = $(this).data("value");

    const $el = $("#calculator"),
          $results = $el.find("#results"),
          $mini = $el.find("#mini");

    const render = {
          "bigD": (bigD) => { $results.text(bigD); },
          "minD": (miniD) => { $mini.text(miniD); }
    };

    const clearAll = () => {
          check = [];
          evalue.prev = [], evalue.next = [], evalue.operator = "";
          render.minD(0)
          render.bigD(0)
    }

    const evaluation = (val) => {
          if (input === "=") {
            //check = check.slice(0, check.length - 1);
            resuls()
          }
          else if (input === "C") {
            clearAll();
          }
          else {
            check = check.concat(val);
            display = check.join("");
            render.minD(display);
          }
    }

    const resuls = () => {
          display = calculator(check)

          if (display.toString().length <= 7) {
            check = [display];
            render.minD("")
            render.bigD(display)
          }
          else {
            clearAll()
            $mini.css("font-size", "14px");
            render.minD("to many numbers");
            render.bigD("T_T")
          }

          evalue.prev = [evalue.total], evalue.next = [], evalue.operator = "";
    };



    evaluation(input)
  });
})();
