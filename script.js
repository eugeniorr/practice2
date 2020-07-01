class Graphics1d {
  constructor(
    xmin = -10.0,
    xmax = 10.0,
    ymin = -10.0,
    ymax = 10.0,
    W = 1000,
    H = 1000,
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
    this.values = new Map();

    for (
      let i = this.xmin;
      i <= this.xmax;
      i += (-this.xmin + this.xmax) / this.W
    ) {
      this.values[i] = this.f(i);
    }
    this.ev = 1;
    return this.values;
  }
  draw(
    dots = "red",
    axis = "green",
    zeros = "indigo",
    gaps = "magenta",
    bg = "gray"
  ) {
    var graph = document.getElementById("mycanvas");
    graph.width = this.W;
    graph.height = this.H;
    var tx = graph.getContext("2d");
    var drawe = new Graphics1d();
    if (this.ev == 0) this.evaluate();
    let stepx = this.W / (-this.xmin + this.xmax),
      stepy = this.H / (-this.ymin + this.ymax),
      zerox = Math.abs(this.xmin) * stepx,
      zeroy = Math.abs(this.ymin) * stepy;
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
    for (let i = zerox; i < this.W; i += x * stepx){
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
      for (let i = zerox; i > 0; i -= x * stepx){
      tx.beginPath();
      tx.moveTo(i, 0);
      tx.lineTo(i, this.H);
      tx.closePath();
      tx.stroke();
      }
      for (let j = zeroy; j >0; j -= y * stepy) {
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
    for (
      let i = this.xmin;
      i <= this.xmax;
      i += (-this.xmin + this.xmax) / this.W
    ) {
      console.log(i, this.values[i]);
        if (i!=this.xmin)
            {
                let cur = this.values[i];
                let prev = this.values[i - (-this.xmin + this.xmax) / this.W] ;
                if(cur*prev < 0 && (Math.abs(cur - prev) > this.ymax - this.ymin)) {
                    tx.stroke();
                    tx.closePath();
                    tx.beginPath();
                    tx.fillStyle = gaps;
                    tx.arc(zerox + i  * stepx, zeroy - stepy * this.ymax, stepx / 10, 0, 180);
                    tx.arc(zerox + i  * stepx, zeroy - stepy * this.ymin, stepx / 10, 0, 180);
                    tx.fill();
                    tx.closePath();
                    tx.beginPath();
                } else tx.lineTo(zerox + i * stepx, zeroy - this.values[i] * stepy);
            }else {
        tx.lineTo(zerox + i * stepx, zeroy - this.values[i] * stepy);
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
      zerox + this.xmax * stepx - (stepx * mx.length) / 1.8,
      zeroy + this.ymin * stepy + stepx
    );
    tx.fillText(mn, zerox + this.xmin * stepx, zeroy + this.ymax * stepy);
  }

  autodraw(
    dots = "red",
    axis = "green",
    zeros = "indigo",
    gaps = "magenta",
    bg = "gray"
  ) {
    this.ymin = this.f(this.xmin);
    this.ymax = this.f(this.xmax);
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
var x = 1, y = 1;
var ng = new Graphics1d();
ng.draw();
function yes() {
  var xmin = parseFloat(document.getElementById("xmin").value),
    xmax = parseFloat(document.getElementById("xmax").value),
    ymin = parseFloat(document.getElementById("ymin").value),
    ymax = parseFloat(document.getElementById("ymax").value),
    W = parseFloat(document.getElementById("W").value),
    H = parseFloat(document.getElementById("H").value),
    f = document.getElementById("f").value;
    x = document.getElementById("x").value;
    y = document.getElementById("y").value;
    f = replaceSpecialSequence(f);
  var m = function(x) {
    return eval(f);
  };
  ng = new Graphics1d(xmin, xmax, ymin, ymax, W, H, m);
  ng.draw();
}
