export interface SketchPost {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  tags: string[]
  code: string
  height: number
}

export const CREATIVE_CODING_SKETCHES: SketchPost[] = [
  {
    slug: "sierpinski-triangle",
    title: "Sierpiński Triangle: Recursive Fractals in Code",
    excerpt:
      "Visualise the Sierpiński triangle through recursive geometry. A simple rule — divide, remove the centre — repeated until you can't see the individual pieces anymore.",
    coverImage: "/assets/thumbnails/sierpiensky.png",
    tags: ["fractals", "generative-art", "recursion", "p5js"],
    height: 520,
    code: `// Sierpiński Triangle — recursive subdivision
function setup() {
  createCanvas(500, 500);
  background(10, 10, 15);
  noLoop();
  stroke(100, 220, 255);
  noFill();
  drawTriangle(
    { x: width / 2, y: 40 },
    { x: 20, y: height - 20 },
    { x: width - 20, y: height - 20 },
    7
  );
}

function draw() {}

function drawTriangle(a, b, c, depth) {
  if (depth === 0) {
    triangle(a.x, a.y, b.x, b.y, c.x, c.y);
    return;
  }
  let ab = midpoint(a, b);
  let bc = midpoint(b, c);
  let ca = midpoint(c, a);
  drawTriangle(a, ab, ca, depth - 1);
  drawTriangle(ab, b, bc, depth - 1);
  drawTriangle(ca, bc, c, depth - 1);
}

function midpoint(p1, p2) {
  return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
}`,
  },

  {
    slug: "ten-print",
    title: "10 PRINT: One-Line Infinite Maze",
    excerpt:
      "A single random decision — slash or backslash — repeated across a grid produces an endlessly varied maze. Originally a one-line Commodore 64 BASIC program.",
    coverImage: "/assets/thumbnails/ten_print.png",
    tags: ["generative-art", "maze", "randomness", "p5js"],
    height: 520,
    code: `// 10 PRINT — infinite maze from a single random choice
let len = 22;
let x = 0;
let y = 0;

function setup() {
  createCanvas(500, 500);
  background(10, 10, 15);
  stroke(100, 220, 255);
  strokeWeight(1.5);
  frameRate(60);
}

function draw() {
  if (y > height) {
    background(10, 10, 15);
    x = 0; y = 0;
    return;
  }
  if (random(1) < 0.5) {
    line(x, y, x + len, y + len);
  } else {
    line(x, y + len, x + len, y);
  }
  x += len;
  if (x >= width) { x = 0; y += len; }
}`,
  },

  {
    slug: "toothpick-sequence",
    title: "Toothpick Sequence: Self-Similar Growth",
    excerpt:
      "Start with a single toothpick. Add new ones at every exposed endpoint. What emerges is a fractal structure that doubles in complexity each generation.",
    coverImage: "/assets/thumbnails/toothpick_sequence.png",
    tags: ["fractals", "sequence", "cellular-automata", "p5js"],
    height: 520,
    code: `// Toothpick Sequence
let picks = [];
let len = 20;
let minX, maxX;

class Toothpick {
  constructor(x, y, d) {
    this.newPick = true;
    this.dir = d;
    if (d === 1) {
      this.ax = x - len/2; this.bx = x + len/2; this.ay = y; this.by = y;
    } else {
      this.ax = x; this.bx = x; this.ay = y - len/2; this.by = y + len/2;
    }
  }
  intersects(x, y) { return (this.ax===x&&this.ay===y)||(this.bx===x&&this.by===y); }
  createA(others) {
    for (let o of others) if (o!==this && o.intersects(this.ax,this.ay)) return null;
    return new Toothpick(this.ax, this.ay, this.dir * -1);
  }
  createB(others) {
    for (let o of others) if (o!==this && o.intersects(this.bx,this.by)) return null;
    return new Toothpick(this.bx, this.by, this.dir * -1);
  }
  show(factor) {
    stroke(this.newPick ? color(80,180,255) : color(200));
    strokeWeight(max(0.5, 1.5/factor));
    line(this.ax, this.ay, this.bx, this.by);
  }
}

function setup() {
  createCanvas(500, 500);
  background(10, 10, 15);
  minX = -width/2; maxX = width/2;
  picks.push(new Toothpick(0, 0, 1));
  frameRate(8);
}

function draw() {
  background(10, 10, 15);
  translate(width/2, height/2);
  let factor = width / (maxX - minX);
  scale(factor);
  for (let t of picks) {
    t.show(factor);
    minX = min(t.ax, minX); maxX = max(t.bx, maxX);
  }
  let next = [];
  for (let t of picks) {
    if (t.newPick) {
      let a = t.createA(picks), b = t.createB(picks);
      if (a) next.push(a); if (b) next.push(b);
      t.newPick = false;
    }
  }
  picks = picks.concat(next);
  if (frameCount > 80) noLoop();
}`,
  },

  {
    slug: "cardioid",
    title: "Cardioid: Uncovering Beauty with the Times Table",
    excerpt:
      "Multiply each point on a circle by 2 and connect them with lines. At enough resolution the curve that emerges is a perfect heart shape — a cardioid.",
    coverImage: "/assets/thumbnails/cardiod.png",
    tags: ["fractals", "generative-art", "mathematics", "p5js"],
    height: 520,
    code: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
html,body{width:100%;height:100%;background:#0a0a0f;overflow:hidden;}
canvas{display:block;}
#ctrl{position:fixed;right:0;top:0;height:100%;width:200px;background:#111827;border-left:1px solid #1f2937;padding:16px;overflow-y:auto;font-family:system-ui,sans-serif;display:flex;flex-direction:column;gap:14px;}
.t{color:#6b7280;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;padding-bottom:8px;border-bottom:1px solid #1f2937;}
.row{display:flex;flex-direction:column;gap:5px;}
.lbl{display:flex;justify-content:space-between;color:#9ca3af;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;}
.val{color:#e5e7eb;font-family:monospace;font-size:11px;}
input[type=range]{width:100%;accent-color:#7c3aed;cursor:pointer;}
input[type=color]{width:100%;height:30px;border:1px solid #374151;background:#1f2937;cursor:pointer;border-radius:6px;padding:2px;}
.btn{width:100%;padding:8px;background:#1f2937;border:1px solid #374151;border-radius:8px;color:#e5e7eb;font-size:12px;font-weight:600;cursor:pointer;}
.btn.on{background:#7c3aed;border-color:#7c3aed;}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script>
</head>
<body>
<div id="ctrl">
  <div class="t">Cardioid</div>
  <div class="row">
    <div class="lbl">Points<span class="val" id="pv">10</span></div>
    <input type="range" id="pts" min="2" max="500" value="10">
  </div>
  <button class="btn on" id="lb" onclick="toggleAnim()">&#9646;&#9646; Animating</button>
  <div class="row">
    <div class="lbl">Stroke<span class="val" id="sv">1.0</span>px</div>
    <input type="range" id="sw" min="0.5" max="3" value="1" step="0.5">
  </div>
  <div class="row">
    <div class="lbl">Line Color</div>
    <input type="color" id="sc" value="#64dcff">
  </div>
  <div class="row">
    <div class="lbl">Background</div>
    <input type="color" id="bc" value="#0a0a0f">
  </div>
</div>
<script>
var pts=10,anim=true;
var ptsEl=document.getElementById('pts'),pvEl=document.getElementById('pv');
var swEl=document.getElementById('sw'),svEl=document.getElementById('sv');
var scEl=document.getElementById('sc'),bcEl=document.getElementById('bc');
var lbEl=document.getElementById('lb');
ptsEl.oninput=function(){pts=+ptsEl.value;pvEl.textContent=pts;anim=false;lbEl.textContent='&#9654; Play';lbEl.classList.remove('on');};
swEl.oninput=function(){svEl.textContent=(+swEl.value).toFixed(1);};
function toggleAnim(){anim=!anim;lbEl.textContent=anim?'&#9646;&#9646; Animating':'&#9654; Play';lbEl.classList.toggle('on',anim);}
function setup(){createCanvas(windowWidth-200,windowHeight).parent(document.body);}
function draw(){
  background(bcEl.value);
  var r=min(width,height)/2-20;
  translate(width/2,height/2);
  stroke(scEl.value);strokeWeight(+swEl.value);noFill();
  circle(0,0,r*2);
  for(var i=0;i<pts;i++){
    var s=gv(i,pts,r),e=gv(i*2,pts,r);
    fill(bcEl.value);circle(s.x,s.y,5);noFill();
    line(s.x,s.y,e.x,e.y);
  }
  if(anim){pts=(pts+1)%500;if(pts<2)pts=2;ptsEl.value=pts;pvEl.textContent=pts;}
}
function gv(i,t,r){var a=map(i%t,0,t,0,TWO_PI);return{x:cos(a+PI)*r,y:sin(a+PI)*r};}
function windowResized(){resizeCanvas(windowWidth-200,windowHeight);}
</script>
</body>
</html>`,
  },

  {
    slug: "nephroid",
    title: "Nephroid: The Three Times Table Curve",
    excerpt:
      "The same circle trick as the cardioid, but multiply by 3 instead of 2. The resulting curve — a kidney-shaped nephroid — appears in reflected light inside a coffee cup.",
    coverImage: "/assets/thumbnails/nephroid.png",
    tags: ["fractals", "generative-art", "mathematics", "p5js"],
    height: 520,
    code: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
html,body{width:100%;height:100%;background:#0a0a0f;overflow:hidden;}
canvas{display:block;}
#ctrl{position:fixed;right:0;top:0;height:100%;width:200px;background:#111827;border-left:1px solid #1f2937;padding:16px;overflow-y:auto;font-family:system-ui,sans-serif;display:flex;flex-direction:column;gap:14px;}
.t{color:#6b7280;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;padding-bottom:8px;border-bottom:1px solid #1f2937;}
.row{display:flex;flex-direction:column;gap:5px;}
.lbl{display:flex;justify-content:space-between;color:#9ca3af;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;}
.val{color:#e5e7eb;font-family:monospace;font-size:11px;}
input[type=range]{width:100%;accent-color:#7c3aed;cursor:pointer;}
input[type=color]{width:100%;height:30px;border:1px solid #374151;background:#1f2937;cursor:pointer;border-radius:6px;padding:2px;}
.btn{width:100%;padding:8px;background:#1f2937;border:1px solid #374151;border-radius:8px;color:#e5e7eb;font-size:12px;font-weight:600;cursor:pointer;}
.btn.on{background:#7c3aed;border-color:#7c3aed;}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script>
</head>
<body>
<div id="ctrl">
  <div class="t">Nephroid</div>
  <div class="row">
    <div class="lbl">Points<span class="val" id="pv">10</span></div>
    <input type="range" id="pts" min="2" max="500" value="10">
  </div>
  <button class="btn on" id="lb" onclick="toggleAnim()">&#9646;&#9646; Animating</button>
  <div class="row">
    <div class="lbl">Stroke<span class="val" id="sv">1.0</span>px</div>
    <input type="range" id="sw" min="0.5" max="3" value="1" step="0.5">
  </div>
  <div class="row">
    <div class="lbl">Line Color</div>
    <input type="color" id="sc" value="#b464ff">
  </div>
  <div class="row">
    <div class="lbl">Background</div>
    <input type="color" id="bc" value="#0a0a0f">
  </div>
</div>
<script>
var pts=10,anim=true;
var ptsEl=document.getElementById('pts'),pvEl=document.getElementById('pv');
var swEl=document.getElementById('sw'),svEl=document.getElementById('sv');
var scEl=document.getElementById('sc'),bcEl=document.getElementById('bc');
var lbEl=document.getElementById('lb');
ptsEl.oninput=function(){pts=+ptsEl.value;pvEl.textContent=pts;anim=false;lbEl.textContent='&#9654; Play';lbEl.classList.remove('on');};
swEl.oninput=function(){svEl.textContent=(+swEl.value).toFixed(1);};
function toggleAnim(){anim=!anim;lbEl.textContent=anim?'&#9646;&#9646; Animating':'&#9654; Play';lbEl.classList.toggle('on',anim);}
function setup(){createCanvas(windowWidth-200,windowHeight).parent(document.body);}
function draw(){
  background(bcEl.value);
  var r=min(width,height)/2-20;
  translate(width/2,height/2);
  stroke(scEl.value);strokeWeight(+swEl.value);noFill();
  circle(0,0,r*2);
  for(var i=0;i<pts;i++){
    var s=gv(i,pts,r),e=gv(i*3,pts,r);
    fill(bcEl.value);circle(s.x,s.y,5);noFill();
    line(s.x,s.y,e.x,e.y);
  }
  if(anim){pts=(pts+1)%500;if(pts<2)pts=2;ptsEl.value=pts;pvEl.textContent=pts;}
}
function gv(i,t,r){var a=map(i%t,0,t,0,TWO_PI);return{x:cos(a+PI)*r,y:sin(a+PI)*r};}
function windowResized(){resizeCanvas(windowWidth-200,windowHeight);}
</script>
</body>
</html>`,
  },

  {
    slug: "times-table-animation",
    title: "Times Table Animation: From 2 to Infinity",
    excerpt:
      "What if you smoothly increased the multiplication factor on the cardioid from 2 to 200? Watch the circle's string art morph through every known times table curve.",
    coverImage: "/assets/thumbnails/times_table_animation.png",
    tags: ["fractals", "generative-art", "animation", "mathematics", "p5js"],
    height: 520,
    code: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
html,body{width:100%;height:100%;background:#0a0a0f;overflow:hidden;}
canvas{display:block;}
#ctrl{position:fixed;right:0;top:0;height:100%;width:200px;background:#111827;border-left:1px solid #1f2937;padding:16px;overflow-y:auto;font-family:system-ui,sans-serif;display:flex;flex-direction:column;gap:14px;}
.t{color:#6b7280;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;padding-bottom:8px;border-bottom:1px solid #1f2937;}
.row{display:flex;flex-direction:column;gap:5px;}
.lbl{display:flex;justify-content:space-between;color:#9ca3af;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;}
.val{color:#e5e7eb;font-family:monospace;font-size:11px;}
input[type=range]{width:100%;accent-color:#7c3aed;cursor:pointer;}
input[type=color]{width:100%;height:30px;border:1px solid #374151;background:#1f2937;cursor:pointer;border-radius:6px;padding:2px;}
.info{background:#1f2937;border-radius:6px;padding:8px;color:#e5e7eb;font-family:monospace;font-size:13px;text-align:center;}
.info-lbl{color:#6b7280;font-size:9px;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:2px;}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script>
</head>
<body>
<div id="ctrl">
  <div class="t">Times Table</div>
  <div class="info"><span class="info-lbl">Factor</span><span id="fv">2.00</span></div>
  <div class="row">
    <div class="lbl">Speed<span class="val" id="spv">0.02</span></div>
    <input type="range" id="sp" min="0.005" max="0.15" value="0.02" step="0.005">
  </div>
  <div class="row">
    <div class="lbl">Points<span class="val" id="ptv">200</span></div>
    <input type="range" id="pts" min="50" max="500" value="200" step="10">
  </div>
</div>
<script>
var factor=2,totalPoints=200,speed=0.02;
var spEl=document.getElementById('sp'),spvEl=document.getElementById('spv');
var ptsEl=document.getElementById('pts'),ptvEl=document.getElementById('ptv');
var fvEl=document.getElementById('fv');
spEl.oninput=function(){speed=+spEl.value;spvEl.textContent=speed.toFixed(3);};
ptsEl.oninput=function(){totalPoints=+ptsEl.value;ptvEl.textContent=totalPoints;};
function setup(){createCanvas(windowWidth-200,windowHeight).parent(document.body);}
function draw(){
  background(10,10,15);
  var r=min(width,height)/2-20;
  translate(width/2,height/2);
  var h=map(factor%20,0,20,0,360);
  colorMode(HSB,360,100,100);stroke(h,80,90);
  colorMode(RGB,255);
  strokeWeight(0.8);noFill();
  circle(0,0,r*2);
  for(var i=0;i<totalPoints;i++){
    var s=gv(i,totalPoints,r),e=gv(i*factor,totalPoints,r);
    line(s.x,s.y,e.x,e.y);
  }
  factor+=speed;
  if(factor>200)factor=2;
  if(factor<2)factor=200;
  fvEl.textContent=factor.toFixed(2);
}
function gv(i,t,r){var a=map(i%t,0,t,0,TWO_PI);return{x:cos(a+PI)*r,y:sin(a+PI)*r};}
function windowResized(){resizeCanvas(windowWidth-200,windowHeight);}
</script>
</body>
</html>`,
  },

  {
    slug: "mandelbrot-set",
    title: "Mandelbrot Set: The Most Famous Fractal",
    excerpt:
      "Defined by a deceptively simple iteration in the complex plane, the Mandelbrot set reveals infinite detail at every level of zoom — a fractal icon of mathematical beauty.",
    coverImage: "/assets/thumbnails/mandelbrot_set.png",
    tags: ["fractals", "mandelbrot", "pixel-art", "mathematics", "p5js"],
    height: 520,
    code: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
html,body{width:100%;height:100%;background:#0a0a0f;overflow:hidden;}
canvas{display:block;}
#ctrl{position:fixed;right:0;top:0;height:100%;width:200px;background:#111827;border-left:1px solid #1f2937;padding:16px;overflow-y:auto;font-family:system-ui,sans-serif;display:flex;flex-direction:column;gap:14px;}
.t{color:#6b7280;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;padding-bottom:8px;border-bottom:1px solid #1f2937;}
.row{display:flex;flex-direction:column;gap:5px;}
.lbl{display:flex;justify-content:space-between;color:#9ca3af;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;}
.val{color:#e5e7eb;font-family:monospace;font-size:11px;}
input[type=range]{width:100%;accent-color:#7c3aed;cursor:pointer;}
input[type=color]{width:100%;height:30px;border:1px solid #374151;background:#1f2937;cursor:pointer;border-radius:6px;padding:2px;}
.btn{width:100%;padding:8px;background:#7c3aed;border:1px solid #7c3aed;border-radius:8px;color:#fff;font-size:12px;font-weight:600;cursor:pointer;}
.note{color:#6b7280;font-size:10px;line-height:1.5;}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script>
</head>
<body>
<div id="ctrl">
  <div class="t">Mandelbrot Set</div>
  <div class="row">
    <div class="lbl">Max Iterations<span class="val" id="iv">80</span></div>
    <input type="range" id="iter" min="20" max="300" value="80" step="10">
  </div>
  <div class="row">
    <div class="lbl">Hue Start<span class="val" id="hv">180</span></div>
    <input type="range" id="hue" min="0" max="300" value="180" step="10">
  </div>
  <div class="row">
    <div class="lbl">Interior Color</div>
    <input type="color" id="ic" value="#000000">
  </div>
  <button class="btn" onclick="doRender()">Re-render</button>
  <p class="note">Higher iterations = more detail but slower to render.</p>
</div>
<script>
var iterEl=document.getElementById('iter'),ivEl=document.getElementById('iv');
var hueEl=document.getElementById('hue'),hvEl=document.getElementById('hv');
var icEl=document.getElementById('ic');
iterEl.oninput=function(){ivEl.textContent=iterEl.value;};
hueEl.oninput=function(){hvEl.textContent=hueEl.value;};
var needsRender=true;
function doRender(){needsRender=true;}
function setup(){
  createCanvas(windowWidth-200,windowHeight).parent(document.body);
  pixelDensity(1);
  colorMode(HSB,360,100,100);
  noLoop();
  renderMandelbrot();
}
function draw(){}
function renderMandelbrot(){
  var maxIter=+iterEl.value;
  var hueStart=+hueEl.value;
  var ic=icEl.value;
  var ir=parseInt(ic.slice(1,3),16),ig=parseInt(ic.slice(3,5),16),ib=parseInt(ic.slice(5,7),16);
  loadPixels();
  for(var px=0;px<width;px++){
    for(var py=0;py<height;py++){
      var a=map(px,0,width,-2.0,1.5),b=map(py,0,height,-1.5,1.5);
      var ca=a,cb=b,n=0;
      while(n<maxIter){var aa=a*a-b*b+ca,bb=2*a*b+cb;a=aa;b=bb;if(a*a+b*b>16)break;n++;}
      var pix=(px+py*width)*4;
      if(n===maxIter){pixels[pix]=ir;pixels[pix+1]=ig;pixels[pix+2]=ib;}
      else{var hu=map(sqrt(n/maxIter),0,1,hueStart,(hueStart+180)%360);var c=color(hu,90,90);pixels[pix]=red(c);pixels[pix+1]=green(c);pixels[pix+2]=blue(c);}
      pixels[pix+3]=255;
    }
  }
  updatePixels();
}
function doRender(){renderMandelbrot();}
function windowResized(){resizeCanvas(windowWidth-200,windowHeight);renderMandelbrot();}
</script>
</body>
</html>`,
  },

  {
    slug: "julia-set",
    title: "Julia Set: Animated Complex Plane Beauty",
    excerpt:
      "The Julia set is the Mandelbrot's sibling — same iteration, but the constant C sweeps over time. Watch the fractal morph through an infinite family of shapes.",
    coverImage: "/assets/thumbnails/julia_set.png",
    tags: ["fractals", "julia-set", "animation", "mathematics", "p5js"],
    height: 520,
    code: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
html,body{width:100%;height:100%;background:#0a0a0f;overflow:hidden;}
canvas{display:block;}
#ctrl{position:fixed;right:0;top:0;height:100%;width:200px;background:#111827;border-left:1px solid #1f2937;padding:16px;overflow-y:auto;font-family:system-ui,sans-serif;display:flex;flex-direction:column;gap:14px;}
.t{color:#6b7280;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;padding-bottom:8px;border-bottom:1px solid #1f2937;}
.row{display:flex;flex-direction:column;gap:5px;}
.lbl{display:flex;justify-content:space-between;color:#9ca3af;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;}
.val{color:#e5e7eb;font-family:monospace;font-size:11px;}
input[type=range]{width:100%;accent-color:#7c3aed;cursor:pointer;}
.info{background:#1f2937;border-radius:6px;padding:8px;color:#e5e7eb;font-family:monospace;font-size:11px;text-align:center;line-height:1.6;}
.info-lbl{color:#6b7280;font-size:9px;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:2px;}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script>
</head>
<body>
<div id="ctrl">
  <div class="t">Julia Set</div>
  <div class="row">
    <div class="lbl">Speed<span class="val" id="spv">0.005</span></div>
    <input type="range" id="sp" min="0.001" max="0.03" value="0.005" step="0.001">
  </div>
  <div class="info">
    <span class="info-lbl">C parameter</span>
    <span id="cv">—</span>
  </div>
</div>
<script>
var angle=0,maxIter=80;
var colorsR=[],colorsG=[],colorsB=[];
var spEl=document.getElementById('sp'),spvEl=document.getElementById('spv');
var cvEl=document.getElementById('cv');
spEl.oninput=function(){spvEl.textContent=(+spEl.value).toFixed(3);};
function setup(){
  createCanvas(windowWidth-200,windowHeight).parent(document.body);
  pixelDensity(1);
  colorMode(HSB,1);
  for(var n=0;n<maxIter;n++){var hu=sqrt(n/maxIter);var c=color(hu,1,0.9);colorsR[n]=red(c);colorsG[n]=green(c);colorsB[n]=blue(c);}
  colorMode(RGB,255);
}
function draw(){
  var spd=+spEl.value;
  var ca=cos(angle*3.213),cb=sin(angle);
  angle+=spd;
  cvEl.textContent=ca.toFixed(3)+' + '+cb.toFixed(3)+'i';
  var w=4,h=(w*height)/width;
  var xmin=-w/2,ymin=-h/2,dx=w/width,dy=h/height;
  loadPixels();
  var yy=ymin;
  for(var j=0;j<height;j++){
    var xx=xmin;
    for(var i=0;i<width;i++){
      var a=xx,b=yy,n=0;
      while(n<maxIter){var aa=a*a-b*b+ca,bb=2*a*b+cb;a=aa;b=bb;if(a*a+b*b>4)break;n++;}
      var pix=(i+j*width)*4;
      if(n<maxIter){pixels[pix]=colorsR[n];pixels[pix+1]=colorsG[n];pixels[pix+2]=colorsB[n];}
      else{pixels[pix]=0;pixels[pix+1]=0;pixels[pix+2]=0;}
      pixels[pix+3]=255;
      xx+=dx;
    }
    yy+=dy;
  }
  updatePixels();
}
function windowResized(){resizeCanvas(windowWidth-200,windowHeight);}
</script>
</body>
</html>`,
  },

  {
    slug: "koch-curve",
    title: "Koch Curve: Infinite Length, Finite Area",
    excerpt:
      "Replace every line segment with four smaller ones. Repeat. The Koch curve has infinite perimeter but encloses a finite area — one of the earliest known fractals.",
    coverImage: "/assets/thumbnails/koch_curve.png",
    tags: ["fractals", "generative-art", "koch", "mathematics", "p5js"],
    height: 520,
    code: `// Koch Curve — step-by-step depth animation
let depth = 0;
let maxDepth = 6;

function setup() {
  createCanvas(500, 500);
  stroke(100, 220, 255);
  strokeWeight(1);
  noFill();
  frameRate(1);
}

function draw() {
  background(10, 10, 15);
  let s = { x: 30, y: height/2 + 40 };
  let e = { x: width - 30, y: height/2 + 40 };
  kochCurve(s, e, depth);
  if (depth < maxDepth) depth++;
  else depth = 0;
}

function kochCurve(s, e, d) {
  if (d === 0) { line(s.x, s.y, e.x, e.y); return; }
  let b = lerp2(s, e, 1/3);
  let c = lerp2(s, e, 2/3);
  let v = rot({ x: c.x - b.x, y: c.y - b.y }, -PI/3);
  let ep = { x: b.x + v.x, y: b.y + v.y };
  kochCurve(s, b, d-1);
  kochCurve(b, ep, d-1);
  kochCurve(ep, c, d-1);
  kochCurve(c, e, d-1);
}

function lerp2(a, b, t) { return { x: lerp(a.x,b.x,t), y: lerp(a.y,b.y,t) }; }
function rot(v, a) { return { x: v.x*cos(a)-v.y*sin(a), y: v.x*sin(a)+v.y*cos(a) }; }`,
  },

  {
    slug: "koch-snowflake",
    title: "Koch Snowflake: Three Curves, One Crystal",
    excerpt:
      "Apply the Koch curve to all three sides of an equilateral triangle and you get a snowflake. Infinite perimeter, finite area, endlessly satisfying.",
    coverImage: "/assets/thumbnails/koch_snowflake.png",
    tags: ["fractals", "generative-art", "snowflake", "mathematics", "p5js"],
    height: 520,
    code: `// Koch Snowflake
let depth = 0;
let maxDepth = 6;

function setup() {
  createCanvas(500, 500);
  stroke(100, 200, 255);
  strokeWeight(1);
  noFill();
  frameRate(1);
}

function draw() {
  background(10, 10, 15);
  let len = width - 100;
  let cx = width / 2, cy = height / 2;
  let h = (sqrt(3) / 2) * len;
  let a = { x: cx - len/2, y: cy + h/3 };
  let b = { x: cx + len/2, y: cy + h/3 };
  let c = { x: cx,         y: cy - 2*h/3 };
  kochCurve(a, b, depth);
  kochCurve(b, c, depth);
  kochCurve(c, a, depth);
  if (depth < maxDepth) depth++; else depth = 0;
}

function kochCurve(s, e, d) {
  if (d === 0) { line(s.x, s.y, e.x, e.y); return; }
  let p1 = lerp2(s, e, 1/3);
  let p2 = lerp2(s, e, 2/3);
  let v = rot({ x: p2.x - p1.x, y: p2.y - p1.y }, -PI/3);
  let peak = { x: p1.x + v.x, y: p1.y + v.y };
  kochCurve(s, p1, d-1);
  kochCurve(p1, peak, d-1);
  kochCurve(peak, p2, d-1);
  kochCurve(p2, e, d-1);
}

function lerp2(a, b, t) { return { x: lerp(a.x,b.x,t), y: lerp(a.y,b.y,t) }; }
function rot(v, a) { return { x: v.x*cos(a)-v.y*sin(a), y: v.x*sin(a)+v.y*cos(a) }; }`,
  },

  {
    slug: "fractal-tree",
    title: "Simple Fractal Tree: Branching Forever",
    excerpt:
      "Each branch splits into two smaller ones at an angle. Change the angle and the tree transforms from a bare winter silhouette to a lush summer canopy.",
    coverImage: "/assets/thumbnails/simple_fractal_tree.png",
    tags: ["fractals", "generative-art", "tree", "recursion", "p5js"],
    height: 520,
    code: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
html,body{width:100%;height:100%;background:#0a0a0f;overflow:hidden;}
canvas{display:block;}
#ctrl{position:fixed;right:0;top:0;height:100%;width:200px;background:#111827;border-left:1px solid #1f2937;padding:16px;overflow-y:auto;font-family:system-ui,sans-serif;display:flex;flex-direction:column;gap:14px;}
.t{color:#6b7280;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;padding-bottom:8px;border-bottom:1px solid #1f2937;}
.row{display:flex;flex-direction:column;gap:5px;}
.lbl{display:flex;justify-content:space-between;color:#9ca3af;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;}
.val{color:#e5e7eb;font-family:monospace;font-size:11px;}
input[type=range]{width:100%;accent-color:#7c3aed;cursor:pointer;}
input[type=color]{width:100%;height:30px;border:1px solid #374151;background:#1f2937;cursor:pointer;border-radius:6px;padding:2px;}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script>
</head>
<body>
<div id="ctrl">
  <div class="t">Fractal Tree</div>
  <div class="row">
    <div class="lbl">Angle<span class="val" id="av">45</span>&deg;</div>
    <input type="range" id="ang" min="5" max="85" value="45" step="1">
  </div>
  <div class="row">
    <div class="lbl">Branch Length<span class="val" id="lv">110</span></div>
    <input type="range" id="len" min="50" max="160" value="110" step="5">
  </div>
  <div class="row">
    <div class="lbl">Branch Color</div>
    <input type="color" id="bc" value="#64dc99">
  </div>
  <div class="row">
    <div class="lbl">Background</div>
    <input type="color" id="bgc" value="#0a0a0f">
  </div>
</div>
<script>
var angEl=document.getElementById('ang'),avEl=document.getElementById('av');
var lenEl=document.getElementById('len'),lvEl=document.getElementById('lv');
var bcEl=document.getElementById('bc'),bgcEl=document.getElementById('bgc');
angEl.oninput=function(){avEl.textContent=angEl.value;};
lenEl.oninput=function(){lvEl.textContent=lenEl.value;};
function setup(){createCanvas(windowWidth-200,windowHeight).parent(document.body);}
function draw(){
  background(bgcEl.value);
  stroke(bcEl.value);
  translate(width/2,height);
  var ang=radians(+angEl.value);
  branch(+lenEl.value,2.5,ang);
}
function branch(len,thick,ang){
  strokeWeight(thick);
  line(0,0,0,-len);
  translate(0,-len);
  if(len>6){
    push();rotate(ang);branch(len*0.67,thick*0.75,ang);pop();
    push();rotate(-ang);branch(len*0.67,thick*0.75,ang);pop();
  }
}
function windowResized(){resizeCanvas(windowWidth-200,windowHeight);}
</script>
</body>
</html>`,
  },

  {
    slug: "sierpinski-carpet",
    title: "Sierpiński Carpet: Infinite Holes",
    excerpt:
      "Divide a square into nine parts, remove the centre, and repeat on the eight remaining squares. The Sierpiński carpet has zero area but a well-defined fractal structure.",
    coverImage: "/assets/thumbnails/sierpiensky_carpet.png",
    tags: ["fractals", "generative-art", "recursion", "mathematics", "p5js"],
    height: 520,
    code: `// Sierpiński Carpet — animated depth
let depth = 0;
let maxDepth = 5;

function setup() {
  createCanvas(500, 500);
  noStroke();
  frameRate(1);
}

function draw() {
  background(10, 10, 15);
  fill(100, 220, 255);
  rect(0, 0, width, height);
  fill(10, 10, 15);
  carpet(0, 0, width, depth);
  if (depth < maxDepth) depth++; else depth = 0;
}

function carpet(x, y, size, d) {
  if (d === 0) return;
  let s = size / 3;
  rect(x + s, y + s, s, s); // remove centre
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i === 1 && j === 1) continue;
      carpet(x + i * s, y + j * s, s, d - 1);
    }
  }
}`,
  },
]
