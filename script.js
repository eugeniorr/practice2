class Graphics1d {
  constructor(
    xmin = -10.0,
    xmax = 10.0,
    ymin = -10.0,
    ymax = 10.0,
    W = 512,
    H = 512,
    f = function(x) {
      return x * x - 9;
    }
  ) {
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
    this.W = W;
    this.H = H;
    this.f = f;
    this.ev = 0;
  }
  evaluate() {
    let count = 0;
    this.fvalues = new Float64Array(this.H * this.W);
    this.dots = new Array(this.H * this.W);
    for (
      let i = this.xmin;
      i <= this.xmax;
      i += (-this.xmin + this.xmax) / this.W
    ) {
      this.dots[count] = i;
      this.fvalues[count++] = this.f(i);
    }
    this.ev = 1;
  }
  draw(
    dots = "red",
    axis = "green",
    zeros = "indigo",
    gaps = "magenta",
    bg = "gray"
  ) {
    var func = document.getElementById("mycanvas");
    func.width = this.W;
    func.height = this.H;
    var tx = func.getContext("2d");
    var drawed = new Graphics1d();
    if (this.ev == 0) this.evaluate();
    let stepx = this.W / (-this.xmin + this.xmax),
      stepy = this.H / (-this.ymin + this.ymax),
      zerox = -this.xmin * stepx,
      zeroy = this.ymax * stepy;
    tx.fillStyle = bg;
    tx.fillRect(0, 0, ng.W, ng.H);
    tx.beginPath();
    tx.lineWidth = 2;
    tx.strokeStyle = axis;
    tx.moveTo(0, zeroy);
    tx.lineTo(ng.W, zeroy);
    tx.moveTo(zerox, 0);
    tx.lineTo(zerox, ng.H);
    tx.closePath();
    tx.stroke();
    tx.lineWidth = 0.2;
    tx.strokeStyle = axis;
    for (let i = zerox; i < this.W; i += x * stepx) {
      tx.beginPath();
      tx.moveTo(i, 0);
      tx.lineTo(i, this.H);
      tx.closePath();
      tx.stroke();
    }
    for (let j = zeroy; j < this.H; j += y * stepy) {
      tx.beginPath();
      tx.lineTo(0, j);
      tx.lineTo(this.W, j);
      tx.closePath();
      tx.stroke();
    }
    for (let i = zerox; i > 0; i -= x * stepx) {
      tx.beginPath();
      tx.moveTo(i, 0);
      tx.lineTo(i, this.H);
      tx.closePath();
      tx.stroke();
    }
    for (let j = zeroy; j > 0; j -= y * stepy) {
      tx.beginPath();
      tx.lineTo(0, j);
      tx.lineTo(this.W, j);
      tx.closePath();
      tx.stroke();
    }
    tx.beginPath();
    tx.lineWidth = 1;
    tx.strokeStyle = dots;
    tx.moveTo(zerox + this.xmin * stepx, zeroy - this.f(this.xmin) * stepy);
    for (let i = 0; i <= this.H * this.W; i++) {
      if (this.dots[i] != this.xmin) {
        let cur = this.fvalues[i];
        let prev = this.fvalues[i - 1];
        if (cur * prev <= 0) {
          if (Math.abs(cur - prev) > this.ymax - this.ymin) {
            tx.stroke();
            tx.closePath();
            tx.beginPath();
            tx.fillStyle = gaps;
            tx.arc(
              zerox + this.dots[i] * stepx,
              zeroy - stepy * this.ymax,
              stepx / 10,
              0,
              180
            );
            tx.arc(
              zerox + this.dots[i] * stepx,
              zeroy - stepy * this.ymin,
              stepx / 10,
              0,
              180
            );
            tx.fill();
            tx.closePath();
            tx.beginPath();
          } else {
            tx.stroke();
            tx.closePath();
            tx.beginPath();
            tx.fillStyle = zeros;
            tx.arc(zerox + this.dots[i] * stepx, zeroy, stepx / 10, 0, 180);
            tx.fill();
            tx.closePath();
            tx.beginPath();
            tx.moveTo(
              zerox + this.dots[i - 1] * stepx,
              zeroy - this.fvalues[i - 1] * stepy
            );
            tx.lineTo(
              zerox + this.dots[i] * stepx,
              zeroy - this.fvalues[i] * stepy
            );
          }
        } else
          tx.lineTo(
            zerox + this.dots[i] * stepx,
            zeroy - this.fvalues[i] * stepy
          );
      }
    }
    tx.stroke();
    tx.closePath();
    tx.font = "25px Consolas";
    tx.textBaseline = "ideographic";
    tx.fillStyle = "black";
    let mx = "(" + this.xmax + ", " + this.ymax + ")",
      mn = "(" + this.xmin + ", " + this.ymin + ")";
    tx.fillText(
      mx,
      zerox + this.xmax * stepx - (25 * mx.length) / 1.8,
     zeroy - this.ymax * stepy + 25
    );
    tx.fillText(mn, zerox + this.xmin * stepx, zeroy - this.ymin * stepy);
    }
  autodraw(
    dots = "red",
    axis = "green",
    zeros = "indigo",
    gaps = "magenta",
    bg = "gray"
  ) {
    this.ymin = Math.min(this.f(this.xmin),this.f(this.xmax));
    this.ymax = Math.max(this.f(this.xmin),this.f(this.xmax));
    this.draw(dots, axis, zeros, gaps, bg);
  }
}
function replaceSpecialSequence(str) {
  str = str.split("cos").join("Math.cos");
  str = str.split("sin").join("Math.sin");
  str = str.split("tan").join("Math.tan");
  str = str.split("aMath.cos").join("Math.acos");
  str = str.split("aMath.sin").join("Math.asin");
  str = str.split("aMath.tan").join("Math.atan");
  str = str.split("pi").join("Math.PI");
  str = str.split("ln2").join("Math.LN2");
  str = str.split("ln10").join("Math.LN10");
  str = str.split("log2e").join("Math.LOG2E");
  str = str.split("log10e").join("Math.LOG10E");
  str = str.split("sqrt1_2").join("Math.SQRT1_2");
  str = str.split("sqrt2").join("Math.SQRT2");
  str = str.split("abs").join("Math.abs");
  str = str.split("ceil").join("Math.ceil");
  str = str.split("exp").join("Math.exp");
  str = str.split("floor").join("Math.floor");
  str = str.split("ln").join("Math.log");
  str = str.split("max").join("Math.max");
  str = str.split("min").join("Math.min");
  str = str.split("pow").join("Math.pow");
  str = str.split("round").join("Math.round");
  str = str.split("lg").join("logab");
  str = str.split("sqrt").join("Math.sqrt");
  str = str.split("e").join("Math.E");
  return str;
}
var x = 1,
  y = 1;
var ng = new Graphics1d();
ng.draw();
function doit() {
  var xmin = parseFloat(document.getElementById("xmin").value),
    xmax = parseFloat(document.getElementById("xmax").value),
    ymin = parseFloat(document.getElementById("ymin").value),
    ymax = parseFloat(document.getElementById("ymax").value),
    W = parseFloat(document.getElementById("W").value),
    H = parseFloat(document.getElementById("H").value),
    f = document.getElementById("f").value;
    x = parseFloat(document.getElementById("x").value);
    y = parseFloat(document.getElementById("y").value);
    f = replaceSpecialSequence(f);
  var m = function(x) {
    return eval(f);
  };
  ng = new Graphics1d(xmin, xmax, ymin, ymax, W, H, m);
  ng.draw();
}
