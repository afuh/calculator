"use strict";

var app = function () {
  var check = [],
      // I use this array and 'operList' to check for possible bugs (i.e. dot repetition, operators repetition, etc.)
  operList = ["/", "*", "-", "+", "="],
      display = [],
      divi = false;

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

  var calculator = function calculator(resu) {
    var prev = void 0,
        next = void 0;

    resu.map(function (val) {
      var n = typeof val === "number" || val === "." || val === "0.";

      if (operList.indexOf(val) >= 0) {
        evalue.operator = val;
      } else if (n && evalue.operator.length === 0) {
        evalue.prev.push(val);
      } else if (n && evalue.operator.length > 0) {
        evalue.next.push(val);
      }

      prev = parseFloat(evalue.prev.join(""));
      next = parseFloat(evalue.next.join(""));

      console.log("prev: " + prev, "oper: " + evalue.operator, "next: " + next);
      // evalue.prev = [evalue.total], evalue.next = [], evalue.operator = "";
    });
    // Do the maths
    return Math.round(evalue.operation[evalue.operator](prev, next) * 100) / 100;
  };

  $(document).on("click", "button", function () {
    var input = $(this).data("value");

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
      evalue.prev = [], evalue.next = [], evalue.operator = "";
      render.minD(0);
      render.bigD(0);
    };

    var evaluation = function evaluation(val) {
      if (input === "=") {
        //check = check.slice(0, check.length - 1);
        resuls();
      } else if (input === "C") {
        clearAll();
      } else {
        check = check.concat(val);
        display = check.join("");
        render.minD(display);
      }
    };

    var resuls = function resuls() {
      display = calculator(check);

      if (display.toString().length <= 7) {
        check = [display];
        render.minD("");
        render.bigD(display);
      } else {
        clearAll();
        $mini.css("font-size", "14px");
        render.minD("to many numbers");
        render.bigD("T_T");
      }

      evalue.prev = [evalue.total], evalue.next = [], evalue.operator = "";
    };

    evaluation(input);
  });
}();