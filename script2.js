class Graphics2d {
  constructor(
    xmin = -10.0,
    xmax = 10.0,
    ymin = -10.0,
    ymax = 10.0,
    W = 512,
    H = 512,
    f = function(x, y) {
      return x * x + y * y - 81;
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
    this.fvalues = new Float64Array(this.H * this.W);
    this.dots = new Array (this.H * this.W);
    let count = 0;
    for (
      let i = this.xmin;
      i <= this.xmax;
      i += (-this.xmin + this.xmax) / this.W
    )
      for (
        let j = this.ymin;
        j <= this.ymax;
        j += (-this.ymin + this.ymax) / this.H
      ) {
        this.dots[count] = [i, j];
        this.fvalues[count++] = this.f(i, j);
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
    var graph = document.getElementById("mycanvas2");
    graph.width = this.W;
    graph.height = this.H;
    var tx = graph.getContext("2d");
    if (this.ev == 0) this.evaluate();
    let stepx = this.W / (-this.xmin + this.xmax),
      stepy = this.H / (-this.ymin + this.ymax),
      zerox = Math.abs(this.xmin) * stepx,
      zeroy = Math.abs(this.ymin) * stepy;
    tx.fillStyle = bg;
    tx.fillRect(0, 0, nd.W, nd.H);
    tx.beginPath();
    tx.lineWidth = 2;
    tx.strokeStyle = axis;
    tx.moveTo(0, zeroy);
    tx.lineTo(nd.W, zeroy);
    tx.moveTo(zerox, 0);
    tx.lineTo(zerox, nd.H);
    tx.closePath();
    tx.stroke();
    tx.lineWidth = 0.2;
    tx.strokeStyle = axis;
    for (let i = 0; i < this.W; i += x2 * stepx) {
      tx.beginPath();
      tx.moveTo(i, 0);
      tx.lineTo(i, this.H);
      tx.closePath();
      tx.stroke();
    }
    for (let j = 0; j < this.H; j += y2 * stepy) {
      tx.beginPath();
      tx.lineTo(0, j);
      tx.lineTo(this.W, j);
      tx.closePath();
      tx.stroke();
    }

    tx.lineWidth = 1;
    tx.strokeStyle = dots;
    console.log(this.fvalues.length, this.dots.length);
    for (let i = 0; i < this.W * this.H; ++i) {
      tx.beginPath();
      if (this.fvalues[i] < 0) {
        tx.fillStyle = "rgba(0, 0, 255, 0.2)";
      } else if (this.fvalues[i] > 0) {
        tx.fillStyle = "rgba(255, 0, 0, 0.2)";
      } else if (this.fvalues[i] == 0)
        tx.fillStyle = "rgba(255, 255, 255, 0.2)";
      
      tx.arc(zerox + this.dots[i][0] * stepx, zeroy - this.dots[i][1] * stepy, 1, 0, 360);
      tx.fill();
      tx.closePath();
    }
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
var x2 = 1, y2 = 1;
var nd = new Graphics2d();
nd.draw();
function mult() {
  document.getElementById("xmin2").value = -15;
  document.getElementById("xmax2").value = 15;
  document.getElementById("ymin2").value = -15;
  document.getElementById("ymax2").value = 15;
  document.getElementById("f2").value = "(abs(x-y+5)+abs(x+y-5)-10)*(x*x+(y-5)*(y-5)-9)*((y-10)*(y-x-15)*(y+x-15))*(((x+7)*(x+7))+((y+5.6)*(y+5.6)) - 3)*(((x+8)*(x+8))/0.8 + ((y+7.6)*(y+7.6))/0.2 - 1)*(((x+6)*(x+6))/0.8 + ((y+7.6)*(y+7.6))/0.2 - 1)*(((x+9.1)*(x+9.1))/0.2 + ((y+6.2)*(y+6.2))/0.6 - 1)*(((x+4.9)*(x+4.9))/0.2 + ((y+6.2)*(y+6.2))/0.6 - 1)*(((x+6)*(x+6))/0.2 + ((y+2.7)*(y+2.7))/2.3 - 1)*(((x+8)*(x+8))/0.2 + ((y+2.7)*(y+2.7))/2.3 - 1)*((x+7.8)*(x+7.8)+(y+5.4)*(y+5.4)-0.2)*((x+6.3)*(x+6.3)+(y+5.4)*(y+5.4)-0.2)*(((x+7)*(x+7))/5+((y+6.5)*(y+6.5))/0.2 - 0.1)*(((x-7)*(x-7))+((y+5.6)*(y+5.6)) - 3)*(((x-7.6)*(x-7.6))/0.1 + ((y+7.8)*(y+7.8))/0.3 - 1)*(((x-6.4)*(x-6.4))/0.1 + ((y+7.8)*(y+7.8))/0.3 - 1)*(((x-9)*(x-9))/0.1 + ((y+6)*(y+6))/0.3 - 1)*(((x-5)*(x-5))/0.1 + ((y+6)*(y+6))/0.3 - 1)*(((x-7)*(x-7))/2 + ((y+6.5)*(y+6.5))/0.1 - 0.1)*((x-7.6)*(x-7.6)+(y+5.4)*(y+5.4)-0.1)*((x-6.4)*(x-6.4)+(y+5.4)*(y+5.4)-0.1)*((x-7.6)*(x-7.6)+(y+5.4)*(y+5.4)-0.3)*((x-6.4)*(x-6.4)+(y+5.4)*(y+5.4)-0.3)*((x-5.5)*(x-5.5)/0.01+(y+4.1)*(y+4.1)/0.3-1)*((x-5.9)*(x-5.9)/0.01+(y+3.7)*(y+3.7)/0.3-1)*((x-6.3)*(x-6.3)/0.01+(y+3.4)*(y+3.4)/0.3-1)*((x-6.7)*(x-6.7)/0.01+(y+3.3)*(y+3.3)/0.3-1)*((x-7.1)*(x-7.1)/0.01+(y+3.3)*(y+3.3)/0.3-1)*((x-7.5)*(x-7.5)/0.01+(y+3.4)*(y+3.4)/0.3-1)*((x-7.9)*(x-7.9)/0.01+(y+3.6)*(y+3.6)/0.3-1)*((x-8.3)*(x-8.3)/0.01+(y+3.9)*(y+3.9)/0.3-1)";
  var xmin2 = parseFloat(document.getElementById("xmin2").value),
    xmax2 = parseFloat(document.getElementById("xmax2").value),
    ymin2 = parseFloat(document.getElementById("ymin2").value),
    ymax2 = parseFloat(document.getElementById("ymax2").value),
      W2 = parseFloat(document.getElementById("W2").value),
    H2 = parseFloat(document.getElementById("H2").value),
      f2 = document.getElementById("f2").value;
  var m2 = function(x, y) {
    return eval(f2);
  };
  nd = new Graphics2d(xmin2, xmax2, ymin2, ymax2, W2, H2, m2);
  nd.draw();
}
function doit2() {
  var xmin2 = parseFloat(document.getElementById("xmin2").value),
    xmax2 = parseFloat(document.getElementById("xmax2").value),
    ymin2 = parseFloat(document.getElementById("ymin2").value),
    ymax2 = parseFloat(document.getElementById("ymax2").value),
    W2 = parseFloat(document.getElementById("W2").value),
    H2 = parseFloat(document.getElementById("H2").value),
    f2 = document.getElementById("f2").value;
    x2 = parseFloat(document.getElementById("x2").value);
    y2 = parseFloat(document.getElementById("y2").value);
    f2 = replaceSpecialSequence(f2);
  var m2 = function(x, y) {
    return eval(f2);
  };
  nd = new Graphics2d(xmin2, xmax2, ymin2, ymax2, W2, H2, m2);
  nd.draw();
}
