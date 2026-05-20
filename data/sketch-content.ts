// Auto-generated from public/blogs/*.md
export const SKETCH_CONTENT: Record<string, string> = {
  "cardioid": `<h4 id="things-to-try-in-the-interactive-demo">Things to try in the Interactive Demo:</h4>
<ul>
<li>Try changing totalPoints - More number of points on the circle can result in a clear image of the cardiod.</li>
<li>You can share the downloaded image after changing the colors to something more interesting.</li>
</ul>
<h4 id="where-it-is-found-in-nature">Where it is found in nature</h4>
<p>The cardioid shape appears naturally in light patterns and sound waves. For example:</p>
<ul>
<li>Light Caustics: When light reflects off a curved surface or passes through a transparent material, it can create a cardioid-shaped caustic pattern.</li>
<li>Microphone Sound Patterns: Cardioid patterns are used in directional microphones to capture sound from the front while minimizing background noise from other directions.</li>
</ul>
<p><img src="/assets/images/cardiod-in-nature.png" alt=""></p>
<h4 id="the-math-behind-it">The Math Behind It</h4>
<p>The cardioid can be represented by the polar equation: <code>r=a(1+cos(θ))</code>
where:</p>
<ul>
<li>r is the radial distance from the origin,</li>
<li>a is a constant that determines the cardioid's size,</li>
<li>θ is the angle from the positive x-axis.</li>
</ul>
<p>This equation generates a symmetric curve with a cusp, or pointed top, that gives the cardioid its distinct heart shape. The cardioid is a type of limaçon and exhibits unique properties like self-duality, meaning it remains unchanged under specific geometric transformations.</p>
<hr>
<h4 id="how-can-we-reproduce-this-pattern">How can we reproduce this pattern</h4>
<pre><code class="language-js">let factor = 2
let totalPoints = 10
let radius

const setup = () => {
  createCanvas(500, 500);
  radius = width/2 - 20
};

function getVector(index){
  let angle = map(index % totalPoints, 0, totalPoints, 0, TWO_PI)
  
  let v = {
    x: cos(angle + PI)*radius,
    y: sin(angle + PI)*radius
  }

  return v
}

const draw = () => {
  background(255);

  translate(width/2, height/2)
  circle(0, 0, radius*2)

  if(totalPoints &#x3C; 200)
  totalPoints += 0.5

  for(let i = 0; i &#x3C; totalPoints; i++){
    circle(getVector(i).x , getVector(i).y, 5)
    line(getVector(i).x , getVector(i).y , getVector(i * factor).x , getVector(i*factor).y)
  }
}
</code></pre>
<h4 id="interesting-facts-about-the-cardioid">Interesting Facts About the Cardioid</h4>
<ol>
<li>
<p><strong>Geometric Shape</strong>: The cardioid is a plane curve, a type of limaçon, that resembles the shape of a heart with a pointed cusp at the top and a loop-like curve extending downwards.</p>
</li>
<li>
<p><strong>Polar Equation</strong>: The cardioid can be represented in polar coordinates by the equation r = a(1 + cos(θ)), where 'r' is the distance from the origin, 'a' is a constant determining the size of the curve, and 'θ' is the angle from the positive x-axis.</p>
</li>
<li>
<p><strong>Duality</strong>: The cardioid is self-dual, meaning that it remains unchanged under a specific geometric transformation. If you reflect the cardioid about a line through the origin at an angle of 45 degrees, the resulting curve is identical to the original one.</p>
</li>
<li>
<p><strong>Heart Symbol</strong>: The cardioid's heart-like shape has made it a popular symbol of love and affection, and it is often used in various contexts, including romantic art, greeting cards, and Valentine's Day decorations.</p>
</li>
<li>
<p><strong>Planetary Orbits</strong>: The cardioid appears in the parametric equations that describe the motion of planets around a star. It is related to the path of a planet under certain gravitational forces.</p>
</li>
<li>
<p><strong>Directional Microphones</strong>: The cardioid pattern is widely used in directional microphones in audio engineering. This pattern is sensitive to sound sources from one direction while rejecting noise from other angles, making it ideal for recording specific sounds.</p>
</li>
<li>
<p><strong>Roulette Curve</strong>: The cardioid is a special case of a roulette, a curve traced by a point on a fixed shape as it rolls without slipping around a circle. The cardioid is the result of a circle rolling around another circle of the same size.</p>
</li>
<li>
<p><strong>Circle Inversion</strong>: The cardioid is one of the shapes that remain unchanged under a specific type of geometric transformation called circle inversion. When a circle is inverted through another circle, the cardioid is one of the curves that remain fixed.</p>
</li>
<li>
<p><strong>Acoustic Properties</strong>: The cardioid shape has unique acoustic properties, making it useful in sound engineering and loudspeaker designs. It helps direct sound in specific directions, minimizing unwanted reflections and enhancing sound quality.</p>
</li>
<li>
<p><strong>Applications in Mathematics and Science</strong>: The cardioid has applications in various fields, including physics, engineering, and computer graphics. It continues to be a subject of fascination and study in mathematics due to its intriguing properties and aesthetic appeal.</p>
</li>
</ol>
<p>These major facts highlight the cardioid's significance and versatility, both as a mathematical curve and as an inspiration in various artistic and scientific endeavors.</p>`,
  "julia-set": `<p>The Julia set and the Mandelbrot set are both fascinating mathematical fractals that are closely related. They share several similarities and are often studied together due to their interconnectedness. Here's a description of the resemblance between the Julia set and the Mandelbrot set:</p>
<blockquote>
<p>Both the Julia set and the Mandelbrot set are generated using iterative formulas. The <strong>Mandelbrot set</strong> is created by iterating the function <strong>z(n+1) = z(n)^2 + c</strong>, where z is a complex number, and c is a constant complex number that varies for each point in the complex plane. The <strong>Julia set</strong> is also created using a similar iterative formula, but the <strong>constant c remains fixed</strong>, while the starting complex number z varies for each point in the complex plane.</p>
</blockquote>
<p>The constant C, here is a complex number of the form C = a + bi, where i stands for <strong>sqrt(-1)</strong>. Hence, by changing the combination of value of <strong>a</strong> and <strong>b</strong>. we will get various shapes and patterns. These sets are called <strong>Julia Set</strong></p>
<p>Here are some of the prominant figures with specific values of C.</p>
<p><img src="https://firebasestorage.googleapis.com/v0/b/dummyproject-d0c53.appspot.com/o/Screenshot%202023-07-27%20at%201.27.31%E2%80%AFAM.png?alt=media&#x26;token=665bf3c9-47df-4ea1-8de3-9522f49f7231" alt="julia set examples"></p>
<p>The Animation you see is the oscillation of a and b values from -1 to 1. The Oscillation is produced by taking the a = cos(angle) and b = sin(angle). And the angle is between 0 and 2PI.</p>
<h4 id="here-is-to-replicate-this">Here is to replicate this</h4>
<pre><code class="language-js">let angle = 0;
const maxiterations = 100;

const colorsRed = [];
const colorsGreen = [];
const colorsBlue = [];

function setup() {
  pixelDensity(1);
  createCanvas(640, 360);
  colorMode(HSB, 1);

  for (let n = 0; n &#x3C; maxiterations; n++) {
    let hu = sqrt(n / maxiterations);
    let col = color(hu, 255, 150);
    colorsRed[n] = red(col);
    colorsGreen[n] = green(col);
    colorsBlue[n] = blue(col);
  }
}

function draw() {
  let ca = cos(angle * 3.213);
  let cb = sin(angle);

  angle += 0.001;

  background(255);
  
  let w = 5;
  let h = (w * height) / width;

  let xmin = -w / 2;
  let ymin = -h / 2;

  loadPixels();

  let xmax = xmin + w;
  let ymax = ymin + h;

  let dx = (xmax - xmin) / width;
  let dy = (ymax - ymin) / height;

  let y = ymin;
  for (let j = 0; j &#x3C; height; j++) {
    let x = xmin;
    for (let i = 0; i &#x3C; width; i++) {
      
      let a = x;
      let b = y;
      let n = 0;
      while (n &#x3C; maxiterations) {
        let aa = a * a;
        let bb = b * b;
        
        if (aa + bb > 4.0) {
          break; 
        }
        let twoab = 2.0 * a * b;
        a = aa - bb + ca;
        b = twoab + cb;
        n++;
      }

      let pix = (i + j * width) * 4;
      if (n == maxiterations) {
        pixels[pix + 0] = 0;
        pixels[pix + 1] = 0;
        pixels[pix + 2] = 0;
      } else {
        pixels[pix + 0] = colorsRed[n];
        pixels[pix + 1] = colorsGreen[n];
        pixels[pix + 2] = colorsBlue[n];
      }
      x += dx;
    }
    y += dy;
  }
  updatePixels();
}
</code></pre>
<h4 id="some-key-points-of-julia-set">Some Key Points of Julia Set</h4>
<ol>
<li>
<p><strong>Definition</strong>: The Julia set is named after the French mathematician Gaston Julia and was introduced in the early 20th century. It is a set of complex numbers generated by an iterative process based on a fixed complex constant.</p>
</li>
<li>
<p><strong>Iterative formula</strong>: The Julia set is created by iteratively applying a function to a complex number z and observing its behavior. The formula is given by z(n+1) = z(n)^2 + c, where z is a complex number, and c is a fixed complex constant. The iteration starts with an initial value of z, typically chosen from the complex plane.</p>
</li>
<li>
<p><strong>Membership</strong>: Points in the complex plane that remain bounded under iteration are considered to be part of the Julia set. If the values of z grow infinitely large (escape condition), the point is considered to be outside the Julia set.</p>
</li>
<li>
<p><strong>Connectedness</strong>: The Julia set can exhibit various levels of connectedness. Some Julia sets are single connected curves, while others may have multiple disconnected components. The connectedness of the Julia set depends on the value of the constant c.</p>
</li>
<li>
<p><strong>Parameter space</strong>: The Julia set forms a one-dimensional parameter space, with each point in the complex plane representing a different initial value of z. As the value of c varies, the shape and properties of the Julia set change accordingly.</p>
</li>
<li>
<p><strong>Attractors and Repellors</strong>: Within the Julia set, there are points known as "attractors" and "repellors." Attractors are points where the iterative process converges to a specific value, while repellors are points where the process diverges and moves away.</p>
</li>
<li>
<p><strong>Self-similarity</strong>: The Julia set exhibits self-similarity, meaning that zooming in on different regions of the set reveals similar patterns to the overall set. This property is one of the defining characteristics of fractals.</p>
</li>
<li>
<p><strong>Complexity and Beauty</strong>: Julia sets are renowned for their intricate and aesthetically appealing patterns. The complexity of the Julia set increases as you zoom in, revealing an endless array of details and shapes.</p>
</li>
<li>
<p><strong>Julia Set Fractal Art</strong>: Julia sets have inspired artists and mathematicians alike to create beautiful fractal art using computer algorithms. By exploring different values of the constant c, artists can produce a wide range of visually stunning images.</p>
</li>
<li>
<p><strong>Connection with the Mandelbrot Set</strong>: The Julia set and the Mandelbrot set are deeply connected. Each point in the Mandelbrot set corresponds to a different constant c for which the Julia set takes on a unique shape. The Mandelbrot set can be seen as a map of Julia sets.</p>
</li>
</ol>
<p>The Julia set, with its mesmerizing properties and infinite complexity, remains an intriguing topic of study and artistic expression in the realm of fractal geometry and chaos theory.</p>`,
  "koch-curve": `<p>Fractals have long been a subject of fascination in the world of mathematics, captivating mathematicians, scientists, and artists with their mesmerizing properties. One such captivating fractal is the Koch curve, also known as the Koch snowflake curve, which holds immense mathematical significance. Named after the Swedish mathematician Helge von Koch, this intriguing curve not only showcases the beauty of self-similarity but also offers profound insights into the realm of infinite complexity.</p>
<p><strong>Iterative Construction and Self-Similarity</strong>:
At the heart of the Koch curve lies its iterative construction, a process that unfolds the infinite intricacy of the curve.</p>
<ul>
<li>Starting with a single line segment, each segment undergoes a transformation, where it is divided into four smaller segments.</li>
<li>The middle segment is then replaced by two smaller segments forming a new shape.</li>
<li>This iterative process continues indefinitely, leading to an infinitely complex curve.</li>
<li>At each iteration, the Koch curve exhibits self-similarity-smaller parts of the curve resemble the whole, albeit at different scales.</li>
<li>This remarkable property emphasizes the fractal nature of the Koch curve, where complexity remains constant, regardless of the level of magnification.</li>
</ul>
<p><em>We can create a snowflake like pattern using this koch curve. This snowflake pattern is called the <a href="/sketch/koch_snowflake">Koch SnowFlake</a>. You can read about that in this <a href="/sketch/koch_snowflake">article</a></em></p>
<h4 id="here-is-how-we-can-reproduce-it">Here is how we can reproduce it</h4>
<pre><code class="language-js">let start, end

const setup = () => {  
  createCanvas(500, 500)
  let length = 400;

  start = {
    x: width / 2 - length / 2,
    y: height / 2
  }

  end = {
    x: width / 2 + length / 2,
    y: height / 2
  }
};

const draw = (p5) => {
  background(255)
  kochSnowflake(start, end, currDepth);
}

</code></pre>
<p><em>kochSnowflake()</em> is defined below. This is the main function that divides a line segment into four new line segment according to the koch's algorithm.</p>
<pre><code class="language-js">function kochSnowflake(start, end, depth) {
  if (depth === 0) {
    drawLine(start, end);
  } else {
    let a = { x: start.x, y: start.y };
    let b = { x: start.x + (end.x - start.x) / 3, y: start.y + (end.y - start.y) / 3 };
    let c = { x: start.x + 2 * (end.x - start.x) / 3, y: start.y + 2 * (end.y - start.y) / 3 };
    let d = { x: end.x, y: end.y };

    let v = rotateVector(subtractVector(c, b), -PI / 3);
    let e = addVector(b, v);

    kochSnowflake(a, b, depth - 1);
    kochSnowflake(b, e, depth - 1);
    kochSnowflake(e, c, depth - 1);
    kochSnowflake(c, d, depth - 1);
  }
}

function drawLine(start, end) {
  line(start.x, start.y, end.x, end.y);
}

function subtractVector(v1, v2) {
  return { x: v1.x - v2.x, y: v1.y - v2.y };
}

function addVector(v1, v2) {
  return { x: v1.x + v2.x, y: v1.y + v2.y };
}

function rotateVector(v, angle) {
  let x = v.x * cos(angle) - v.y * sin(angle);
  let y = v.x * sin(angle) + v.y * cos(angle);
  return { x, y };
}
</code></pre>
<h4 id="fractal-dimension-and-infinite-length">Fractal Dimension and Infinite Length:</h4>
<p>One of the most intriguing aspects of the Koch curve is its fractal dimension. Unlike regular geometric shapes, which have integer dimensions (e.g., lines are 1D, squares are 2D), fractals can have non-integer dimensions. The Koch curve's fractal dimension is approximately 1.2618, lying between that of a 1D line and a 2D plane. This non-integer dimensionality reflects the curve's intricate structure, allowing it to fill more space than a typical one-dimensional line, yet not enough to qualify as a two-dimensional shape.</p>
<p>Moreover, the Koch curve exhibits an astonishing paradox. While each iteration adds a finite amount of length to the curve, the total length of the curve approaches infinity as the number of iterations increases. This property defies our intuitive understanding of curves and raises fascinating questions about the concept of infinity in mathematics.</p>
<h4 id="some-key-points">Some Key Points</h4>
<ol>
<li>
<p><strong>Fractals and Self-Similarity:</strong> The Koch Curve is a prime example of a fractal, showcasing the property of self-similarity. At every iteration, smaller parts of the curve resemble the entire curve, albeit at different scales. This characteristic is fundamental to understanding fractals.</p>
</li>
<li>
<p><strong>Infinite Complexity from Simplicity:</strong> The Koch Curve's infinite complexity arises from a deceptively simple rule of iteratively dividing line segments. This illustrates how a basic rule can lead to an infinitely intricate geometric shape.</p>
</li>
<li>
<p><strong>Fractal Dimension:</strong> Unlike regular geometric shapes, the Koch Curve has a non-integer fractal dimension (approximately 1.2618), which reflects its intricate structure and ability to fill more space than a typical one-dimensional line.</p>
</li>
<li>
<p><strong>Paradox of Infinite Length:</strong> Although each iteration of the Koch Curve adds a finite length, the total length of the curve approaches infinity as the number of iterations increases. This paradox challenges conventional notions of curves and raises fascinating questions about infinity in mathematics.</p>
</li>
<li>
<p><strong>Practical Applications:</strong> The Koch Curve has found practical applications in various fields, including computer graphics, data compression, and antenna design. Its self-replicating nature and intricate patterns contribute to generating complex landscapes, reducing file sizes, and improving antenna efficiency.</p>
</li>
<li>
<p><strong>Educational Tool:</strong> The Koch Curve serves as an excellent educational tool to introduce fractals and recursion to learners. Its simple construction process and visually appealing iterations inspire curiosity and further exploration of fractal geometry.</p>
</li>
<li>
<p><strong>Mathematical Beauty:</strong> The Koch Curve exemplifies the elegance and beauty of mathematics, where a seemingly straightforward concept can lead to mesmerizing and unending complexity. It serves as a reminder of the vastness and enigmatic allure of the mathematical universe.</p>
</li>
<li>
<p><strong>Gateway to Fractal World:</strong> Understanding the Koch Curve can act as a gateway to delving deeper into the captivating world of fractals. It provides a foundation for exploring more complex fractal patterns and their applications in various scientific and artistic domains.</p>
</li>
<li>
<p><strong>Impact on Art and Design:</strong> The Koch Curve, with its visually striking iterations, has influenced art and design, inspiring artists to incorporate fractal patterns into their work, creating mesmerizing and visually appealing artwork.</p>
</li>
<li>
<p><strong>Fractals in Nature:</strong> While the Koch Curve is a mathematical construct, fractal patterns akin to it can be found in nature, from coastlines to snowflakes. Understanding fractals helps us appreciate the inherent complexity and beauty found in natural phenomena.</p>
</li>
</ol>
<p>In conclusion, the Koch Curve offers profound insights into the world of fractals and their infinite complexity. It highlights the interplay between simplicity and complexity, challenging our understanding of geometry and infinity. As a powerful educational tool and a source of inspiration for artists and mathematicians alike, the Koch Curve continues to leave a lasting impact on the realms of mathematics, science, and art.</p>`,
  "koch-snowflake": `<p>This is the follow up of the <a href="/sketch/koch_curve">Koch Curve</a>, You can read about the mathematical significance of the Koch Curve in this <a href="/sketch/koch_curve">article</a>.</p>
<p>At its core, the Koch snowflake begins with an equilateral triangle-a straightforward geometric shape. However, this seemingly simple shape undergoes a series of transformations that unveil its true magic. By iteratively replacing each straight line segment of the initial triangle with smaller segments, the snowflake pattern emerges. In each iteration, four smaller triangles are added to the previous segment, and this process repeats indefinitely. What starts as a basic geometric shape evolves into an infinitely intricate boundary.</p>
<p>One of the most fascinating features of the Koch snowflake is its self-similarity. At any level of iteration, a smaller portion of the snowflake looks like a scaled-down version of the entire shape. This property reveals the fractal nature of the Koch snowflake, where the complexity is maintained across different scales.</p>
<h4 id="how-can-we-reproduce-this-pattern">How can we reproduce this pattern</h4>
<pre><code class="language-js">let segments = []
let depth = 6
let currDepth = 0
let isMobile = false

const setup = () => {  
  createCanvas(500, 500)
  let length = 300;

  segments[0] = {
    start: { x: width / 2 - length / 2, y: height / 2 - sqrt(3) * length / 4 },
    end: { x: width / 2 + length / 2, y: height / 2 - sqrt(3) * length / 4 }
  }
  
  segments[1] = {
    start: { x: width / 2 - length / 2, y: height / 2 - sqrt(3) * length / 4 },
    end: { x: width / 2, y: height / 2 + sqrt(3) * length / 4 }
  }

  segments[2] = {
    start: { x: width / 2, y: height / 2 + sqrt(3) * length / 4 },
    end: { x: width / 2 + length / 2, y: height / 2 - sqrt(3) * length / 4 }
  }
};

const draw = () => {
  background(255)

  kochSnowflake(segments[0].start, segments[0].end, currDepth, p5);
  kochSnowflake(segments[1].end, segments[1].start, currDepth, p5);
  kochSnowflake(segments[2].end, segments[2].start, currDepth, p5);
}
</code></pre>
<p>And, the kochSnowflake() is nothing but the <a href="/sketch/koch_curve">Koch Curve</a>. You can find the function in this article. In this article, I have explained the mathematical signicance of the Koch Curve itself.</p>
<h4 id="some-of-the-facts-about-koch-snowflake">Some of the Facts about Koch Snowflake</h4>
<ol>
<li>
<p><strong>Fractal Geometry:</strong> The Koch snowflake is one of the earliest and most well-known examples of a fractal-a geometric shape that exhibits self-similarity and complexity at every level of magnification.</p>
</li>
<li>
<p><strong>Named After Helge von Koch:</strong> The fractal was first described by the Swedish mathematician Helge von Koch in 1904. He introduced it as a way to illustrate the concept of a continuous curve with an infinite length, despite starting from a finite initial shape.</p>
</li>
<li>
<p><strong>Infinite Perimeter, Finite Area:</strong> The Koch snowflake has a remarkable property-the perimeter of the shape becomes infinitely long as the number of iterations approaches infinity, while the area remains finite.</p>
</li>
<li>
<p><strong>Iterative Construction:</strong> The Koch snowflake is constructed through a recursive process. Starting with an equilateral triangle, each side is divided into four segments, and the middle segment is replaced by two smaller segments to create a new shape. This process is repeated infinitely.</p>
</li>
<li>
<p><strong>Fractal Dimension:</strong> The Koch snowflake's fractal dimension is approximately 1.2618, which lies between the dimensions of a 1D line (dimension = 1) and a 2D plane (dimension = 2).</p>
</li>
<li>
<p><strong>Self-Similarity:</strong> At every level of iteration, the Koch snowflake exhibits self-similarity. Each smaller portion of the snowflake looks similar to the whole, albeit at a different scale.</p>
</li>
<li>
<p><strong>Fractal Art:</strong> The Koch snowflake, with its beautiful and intricate patterns, has become a popular subject for fractal art-a form of digital or traditional art that employs mathematical algorithms to create stunning visual representations.</p>
</li>
<li>
<p><strong>Applications:</strong> Fractals, including the Koch snowflake, have found applications in various fields such as computer graphics, terrain generation, data compression, and even antenna design.</p>
</li>
<li>
<p><strong>Inspiration for Mathematics Education:</strong> The Koch snowflake is often used as an educational tool to introduce students to the concept of fractals, infinite series, and self-replicating patterns.</p>
</li>
<li>
<p><strong>Limitations of Realization:</strong> While the concept of the Koch snowflake is infinite, in reality, its realization is limited by the resolution of the medium used to draw or represent it. Nevertheless, the concept of infinity remains a fundamental aspect of the fractal's beauty and intrigue.</p>
</li>
</ol>
<p>The Koch snowflake's charm lies in its ability to transform a simple triangle into a boundary of infinite complexity, illustrating the captivating nature of mathematics and the profound beauty of fractal geometry.</p>`,
  "mandelbrot-set": `<p>The Pattern you see is a depiction of the set of bounded complex numbers. Following a particular rule. The larges shape in the picture is called the Cardiod. This shape is particularly special and occurs more often in nature than u might think. You can read the <a href="/sketch/cardiod">Cardiod</a> Blog.</p>
<p>At its heart, the Mandelbrot Set is formed by iterating a deceptively basic mathematical formula. Starting with a complex number c, each point in the complex plane undergoes an iterative process:</p>
<p>Z(n+1) = Z(n)^2 + C, where Z(n) starts from 0</p>
<p>The crucial distinction lies in whether these iterations remain bounded or escape to infinity for each <strong>C</strong> value. Points that remain bounded are considered part of the Mandelbrot Set and are often colored black, while points that diverge are outside the set and colored based on the speed of divergence.</p>
<p>When the Mandelbrot Set is visualized on the complex plane, its extraordinary complexity is revealed. An infinite landscape of intricate patterns emerges, characterized by self-similarity and self-replication. As one zooms into any part of the set, smaller copies of the overall pattern continuously emerge, perpetuating the mesmerizing nature of the fractal. This property of "fractal self-similarity" ensures that the Mandelbrot Set holds mysteries and surprises at every level of magnification, effectively drawing observers into an infinite corridor of discovery.</p>
<h4 id="how-to-reproduce-the-pattern">How to Reproduce the Pattern</h4>
<pre><code class="language-js">let minval = -2.0;
let maxval = 1.5;

function setup() {
  createCanvas(500, 500);
  pixelDensity(1);
}

function draw() {
  let maxiterations = 50;

  loadPixels();
  for (let x = 0; x &#x3C; width; x++) {
    for (let y = 0; y &#x3C; height; y++) {

      let a = map(x, 0, width, minval, maxval);
      let b = map(y, 0, height, minval, maxval);

      let ca = a;
      let cb = b;

      let n = 0;

      while (n &#x3C; maxiterations) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (a * a + b * b > 16) {
          break;
        }
        n++;
      }

      let bright = map(n, 0, maxiterations, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);

      if (n == maxiterations) {
        bright = 0;
      }

      let pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}
</code></pre>
<h4 id="here-are-some-of-the-facts-about-the-mandelbrot-set">Here are some of the facts about the Mandelbrot Set</h4>
<ol>
<li>
<p><strong>Discovery:</strong> The Mandelbrot Set is named after its discoverer, Benoît B. Mandelbrot, a Polish-born French-American mathematician. He introduced the set to the world in 1980, revolutionizing the field of fractal geometry.</p>
</li>
<li>
<p><strong>Fractal Nature:</strong> The Mandelbrot Set is a classic example of a fractal, a mathematical object that exhibits self-similarity and complexity at all levels of magnification. This means that as you zoom into any part of the set, you encounter smaller copies of the overall pattern.</p>
</li>
<li>
<p><strong>Iterative Process:</strong> The Mandelbrot Set is defined by an iterative process in the complex plane. For each point ( c ) in the complex plane, the iteration ( z_{n+1} = z_n^2 + c ) is repeated with ( z_0 = 0 ) to determine if the sequence of ( z_n ) remains bounded or escapes to infinity.</p>
</li>
<li>
<p><strong>Infinite Complexity:</strong> The boundary of the Mandelbrot Set, known as the "Mandelbrot boundary" or "seahorse valley," contains infinitely intricate structures, such as filaments and seahorse-like shapes. These patterns are a key feature of the set's mesmerizing complexity.</p>
</li>
<li>
<p><strong>Coloring:</strong> Points inside the Mandelbrot Set (bounded iterations) are typically colored black, while points outside the set (escaping iterations) are colored based on the speed of divergence. This color scheme allows for stunning visual representations of the fractal.</p>
</li>
<li>
<p><strong>Uncomputable Exact Area:</strong> The Mandelbrot Set has an infinite and infinitely complex boundary, and its exact area cannot be computed due to its infinitely intricate nature.</p>
</li>
<li>
<p><strong>Real and Imaginary Axis:</strong> The Mandelbrot Set is plotted on the complex plane, with the horizontal axis representing the real numbers and the vertical axis representing the imaginary numbers.</p>
</li>
<li>
<p><strong>Scientific and Artistic Impact:</strong> The Mandelbrot Set has inspired artists, musicians, and writers, influencing various forms of art and cultural expressions. Additionally, it has found applications in computer graphics, image compression, and the study of natural phenomena with fractal-like characteristics.</p>
</li>
<li>
<p><strong>Continuously Explored:</strong> The Mandelbrot Set remains a subject of active research, and mathematicians continue to study its properties and explore new aspects of this intriguing fractal.</p>
</li>
<li>
<p><strong>Popular Visualizations:</strong> The Mandelbrot Set has become famous for its mesmerizing visualizations and zooms, where computer-generated images and animations take viewers on breathtaking journeys through its intricate structures.</p>
</li>
</ol>
<p>In summary, the Mandelbrot Set is a captivating mathematical construct with infinite complexity and self-similarity. Its discovery has had a profound impact on mathematics, art, and popular culture, while its intricate beauty continues to inspire awe and fascination among enthusiasts and researchers alike.</p>`,
  "nephroid": `<p><strong>The nephroid</strong> is a fascinating mathematical curve with a kidney bean-like shape, known for its constant curvature and elegant geometric properties. It is a type of hypocycloid, formed by tracing a point on the circumference of a circle as it rolls around the inside of another fixed circle. Named after "nephros," the Greek word for kidney, the nephroid has historical significance and has intrigued mathematicians for centuries. Its simplicity and symmetrical nature find applications in engineering, particularly in gear design. With its constant curvature and dual curve property, the nephroid continues to captivate the curiosity of mathematicians and geometric enthusiasts alike</p>
<h4 id="how-can-we-reproduce-this-pattern">How can we reproduce this pattern</h4>
<pre><code class="language-js">let factor = 3
let totalPoints = 10
let radius

const setup = () => {
  createCanvas(500, 500);
  radius = width/2 - 20
};

function getVector(index){
  let angle = map(index % totalPoints, 0, totalPoints, 0, TWO_PI)
  
  let v = {
    x: cos(angle + PI)*radius,
    y: sin(angle + PI)*radius
  }

  return v
}

const draw = () => {
  background(255);

  translate(width/2, height/2)
  circle(0, 0, radius*2)

  if(totalPoints &#x3C; 200)
  totalPoints += 0.5

  for(let i = 0; i &#x3C; totalPoints; i++){
    circle(getVector(i).x , getVector(i).y, 5)
    line(getVector(i).x , getVector(i).y , getVector(i * factor).x , getVector(i*factor).y)
  }
}
</code></pre>
<h4 id="some-facts-about-cardiod">Some Facts about Cardiod</h4>
<ol>
<li>
<p><strong>Mathematical Curiosity</strong>: The nephroid is a fascinating mathematical curve known for its elegant geometric properties. It is a member of the family of hypocycloids, a type of curve formed by tracing a point on the circumference of a circle as it rolls around the inside of another fixed circle.</p>
</li>
<li>
<p><strong>Shape and Parametric Equation</strong>: The nephroid is a simple and symmetric curve, resembling a kidney bean. In polar coordinates, it can be represented by the equation r = a(1 + 2cos(θ)), where 'r' represents the distance from the origin, 'a' is a constant determining the size of the curve, and 'θ' is the angle from the positive x-axis.</p>
</li>
<li>
<p><strong>Constant Curvature</strong>: The nephroid has constant curvature, which means that the curvature of the curve remains the same at all points. This unique property makes it an intriguing object of study in differential geometry.</p>
</li>
<li>
<p><strong>Named After "Nephros"</strong>: The term "nephroid" is derived from the Greek word "nephros," which means kidney. The curve's kidney bean-like shape led to its name, paying homage to its visual resemblance.</p>
</li>
<li>
<p><strong>Area Enclosed</strong>: The nephroid encloses exactly three times the area of the circle from which it is derived. This relationship between the area of the nephroid and its generating circle is a notable geometric property.</p>
</li>
<li>
<p><strong>Applications in Engineering</strong>: The nephroid's constant curvature and symmetrical shape have practical applications in engineering, particularly in the design of gears and other mechanisms where smooth motion and constant velocity are essential.</p>
</li>
<li>
<p><strong>Dual Curve</strong>: The nephroid is self-dual, meaning that it remains unchanged under a specific geometric transformation. If you reflect the nephroid about its own tangent line at any point, the resulting curve is identical to the original one.</p>
</li>
<li>
<p><strong>Cycloidal Property</strong>: The nephroid is a special case of a hypocycloid, a curve formed by rolling a circle inside another circle. In particular, the nephroid is a 3-cusped hypocycloid, where the rolling circle completes three full rotations before closing the curve.</p>
</li>
<li>
<p><strong>Compass and Straightedge Construction</strong>: The nephroid can be constructed using only a compass and a straightedge, making it a classical example of a curve that is constructible with these simple tools.</p>
</li>
<li>
<p><strong>Historical Significance</strong>: The nephroid has a rich mathematical history and has been studied by several prominent mathematicians throughout the centuries, contributing to the exploration of various geometric and algebraic concepts.</p>
</li>
</ol>
<p>Overall, the nephroid is a captivating and historically significant mathematical curve, boasting elegant properties and connections to various areas of mathematics and engineering. Its intriguing shape and constant curvature continue to inspire mathematicians and geometric enthusiasts, making it a delightful subject of exploration and study.</p>`,
  "sierpinski-carpet": `<p>The interesting thing is that no matter how closely you look at this pattern, you will always see more squares and holes appearing, and it never stops. It's like looking at a magic carpet with an endless, mesmerizing design! This is why the Sierpiensky Carpet is so special and loved by mathematicians and artists alike. Although, in computer screen we are limited with no of pixels and the no of pixel size.</p>
<p>At it's core, we are following very simple steps:</p>
<ol>
<li>
<p>First, draw a small square in the middle of the big square. This small square is like a hole.</p>
</li>
<li>
<p>Now, divide the big square into nine equal smaller squares, like a 3x3 grid.</p>
</li>
<li>
<p>We'll ignore the center square (the hole) we drew in step 1. For each of the remaining eight smaller squares, we'll repeat the same process we did in step 1. That means, in each of those squares, we'll draw another smaller square in the middle.</p>
</li>
<li>
<p>Now, for each of these smaller squares we just created, we'll divide them into nine even smaller squares, again ignoring the center one, and repeat the process of drawing a square in the middle for each of them.</p>
</li>
<li>
<p>We'll keep doing this over and over again, making smaller and smaller squares in the middle of the remaining squares, each time reducing their size.</p>
</li>
<li>
<p>We continue this process infinitely, always making smaller and smaller squares in the middle of the remaining ones.</p>
</li>
</ol>
<h4 id="here-is-how-we-can-create-this-pattern">Here is how we can create this pattern</h4>
<pre><code class="language-js">let len
let squares = []

class Squares {
  constructor(x, y, len) {
    this.x = x
    this.y = y
    this.len = len
  }

  show() {
    rectMode(CENTER)
    fill(255)
    rect(this.x, this.y, this.len/3, this.len/3)
  }

  generateSquares() {
    let x = this.x
    let y = this.y
    let _len = this.len

    squares.push(new Squares(x - _len/3, y - _len/3, _len/3))
    squares.push(new Squares(x, y - _len/3, _len/3))
    squares.push(new Squares(x + _len/3, y - _len/3, _len/3))

    squares.push(new Squares(x - _len/3, y , _len/3))
    squares.push(new Squares(x + _len/3, y , _len/3))

    squares.push(new Squares(x - _len/3, y + _len/3, _len/3))
    squares.push(new Squares(x , y + _len/3, _len/3))
    squares.push(new Squares(x + _len/3, y + _len/3, _len/3))
  }

  returnLen () {
    return this.len
  }
}

const setup = (p5, canvasParentRef) => {
  createCanvas(500, 500)
  len = 500
  squares[0] = new Squares(width/2, height/2, len)
};

let stop = false

const draw = () => {
  background(0)

  for(let a of squares){
    
    a.show(p5)

    if(a.returnLen() &#x3C; 10){
      stop = true
    } else {
      a.generateSquares()
    }
  }

  if(stop) {
    noLoop()
  }
}

</code></pre>
<h4 id="some-facts-about-sierpiensky-carpet">Some Facts about Sierpiensky Carpet</h4>
<ol>
<li>
<p><strong>Fractals and Self-Similarity</strong>: The Sierpiensky Carpet is a classic example of a fractal, a geometric pattern that exhibits self-similarity at various scales. As you zoom in or out on the carpet, you will find smaller and smaller copies of the original pattern, repeating infinitely. This property makes fractals essential in understanding natural phenomena, such as coastlines, mountain ranges, and even some biological structures.</p>
</li>
<li>
<p><strong>Dimensionality</strong>: Despite being a 2D object, the Sierpiensky Carpet has a non-integer dimension, known as a fractal dimension. While its surface area is zero due to the holes and voids, its fractal dimension lies between 1 and 2, indicating that it fills more space than a simple line but less than a complete 2D surface. This concept challenges conventional Euclidean geometry and opens up new avenues for studying irregular shapes.</p>
</li>
<li>
<p><strong>Iterative Construction</strong>: The Sierpiensky Carpet's construction is based on a simple and elegant iterative process, where a square is repeatedly subdivided and central portions removed. This recursive approach helps mathematicians analyze the pattern's self-replicating nature and study how complex structures can arise from relatively straightforward rules.</p>
</li>
<li>
<p><strong>Mathematical Visualization</strong>: The Sierpiensky Carpet serves as an excellent tool for visually demonstrating complex mathematical concepts to students and researchers. Its beautiful and intricate design sparks interest in the study of mathematics and encourages exploration of more advanced topics, such as chaos theory and non-linear dynamics.</p>
</li>
<li>
<p><strong>Connection to Number Theory</strong>: The Sierpiensky Carpet also has interesting connections to number theory. For instance, it can be used to illustrate certain properties of the so-called "Cantor set," which is a well-known and fundamental mathematical construct in number theory.</p>
</li>
</ol>
<p>When we step back and look at the big picture, what we see is an incredibly fascinating pattern with lots of squares and holes, and this pattern continues forever with no end. This is the Sierpiensky Carpet!</p>`,
  "sierpinski-triangle": `<p><strong>The Sierpiensky Triangle</strong>, a captivating mathematical construct, has enthralled mathematicians, artists, and enthusiasts for over a century. Named after the Polish mathematician Wacław Sierpiński, this mesmerizing fractal showcases the mesmerizing beauty of self-similarity and infinite complexity.</p>
<p>At its core, the Sierpiensky Triangle is an equilateral triangle divided into four smaller congruent equilateral triangles. The process continues as each of these smaller triangles is further divided into four even tinier triangles, ad infinitum. The central triangle from each iteration is removed, leaving behind a pattern of triangles nested within triangles.</p>
<h4 id="algorithm-to-reproduce-this-pattern">Algorithm to reproduce this pattern</h4>
<ul>
<li>Take a Square at the center</li>
<li>Then, add more square half the length of the previously taken square and place on any three sides of the squares.</li>
<li>Repeat this step over and over to get this pattern</li>
</ul>
<p>We can use p5.js to code the pattern. p5 is a javascript library for drawing and animation. Here is the following code.</p>
<pre><code class="language-js">const setup = (canvasParentRef) => {
  createCanvas(500, 500).parent(canvasParentRef);
  background(255);
};

const drawRect = (x,y,d) => {
  noFill();
  rectMode(CENTER)
  rect(x, y, d, d);
  strokeWeight(0.5);
  
  if(d &#x3C; 1) return;

  setTimeout(() => {
    drawRect(x, y - d/2, d/2);
  }, 10)

  setTimeout(() => {
    drawRect(x + d/2, y, d/2);
  }, 20)

  setTimeout(() => {
    drawRect(x - d/2, y, d/2);
  }, 30)
}

const draw = (p5) => {
  drawRect(width/2, height/2, 200)
}
</code></pre>
<h4 id="some-of-the-facts-about-sierpiensky-triangle">Some of the facts about Sierpiensky Triangle</h4>
<ol>
<li>
<p><strong>Fractal Construction</strong>: The Sierpiński Triangle is a classic example of a fractal, a geometric shape that displays self-similarity at different scales. It is formed through an iterative process of subdividing an equilateral triangle into smaller triangles and removing the central triangle repeatedly.</p>
</li>
<li>
<p><strong>Named After Wacław Sierpiński</strong>: The Sierpiński Triangle is named after the Polish mathematician Wacław Sierpiński, who studied its properties and introduced it in 1915. Sierpiński made significant contributions to various areas of mathematics, and the Sierpiński Triangle remains one of his most famous works.</p>
</li>
<li>
<p><strong>Infinite Self-Similarity</strong>: At each iteration, the Sierpiński Triangle generates smaller copies of itself, and the pattern continues infinitely. No matter how much you zoom in or out, the structure looks similar, revealing an infinite level of detail.</p>
</li>
<li>
<p><strong>Fractal Dimension</strong>: The Sierpiński Triangle has a fractal dimension of approximately 1.585, which is a non-integer value between 1 and 2. Fractal dimensions represent the "degree of crinkliness" or "space-filling capacity" of a fractal object.</p>
</li>
<li>
<p><strong>Mathematical Representation</strong>: The Sierpiński Triangle can be represented using various mathematical notations, including recursive formulas and algorithms. One common approach is through the use of a chaotic dynamical system called the chaos game, which creates the fractal by randomly choosing points and repeatedly applying specific rules.</p>
</li>
<li>
<p><strong>Simple Construction Rules</strong>: Despite its complex and mesmerizing appearance, the Sierpiński Triangle is constructed through straightforward rules. Starting with an equilateral triangle, removing the central triangle at each iteration generates the intricate pattern.</p>
</li>
<li>
<p><strong>Popularity in Education and Art</strong>: The Sierpiński Triangle's aesthetic appeal and simplicity in construction have made it a popular subject in educational settings. It serves as an excellent introduction to fractals and recursive algorithms for students of mathematics and computer science. Moreover, the triangle's mesmerizing patterns have inspired artists to create captivating artworks based on fractal geometry.</p>
</li>
<li>
<p><strong>Variations and Extensions</strong>: The Sierpiński Triangle has several variations and extensions, such as the Sierpiński Arrowhead Curve and the Sierpiński Carpet. These variations involve similar principles of self-replication and showcase the versatility of fractal geometry.</p>
</li>
<li>
<p><strong>Connections to Chaos Theory</strong>: The Sierpiński Triangle is connected to chaos theory, a branch of mathematics that studies complex and unpredictable systems. The chaotic nature of the Sierpiński Triangle's construction using the chaos game makes it an intriguing subject in this field.</p>
</li>
<li>
<p><strong>Real-World Fractals</strong>: Fractal patterns similar to the Sierpiński Triangle are found in various natural and artificial phenomena, such as the branching of trees, coastlines, and certain types of antennas. These real-world examples highlight the ubiquity and significance of fractals in nature and human creations.</p>
</li>
</ol>
<p>Overall, the Sierpiński Triangle is an enchanting and fundamental example of fractal geometry, displaying infinite self-similarity and offering insights into the complexity and beauty of mathematics and the natural world.</p>`,
  "fractal-tree": `<p>Fractals are geometric shapes with self-similar patterns that appear regardless of the level of magnification. Fractal trees mimic the branching structures of real trees, where each branch serves as a foundation for smaller branches, creating a seemingly infinite level of detail. These self-replicating patterns give rise to mesmerizing and complex shapes that evoke a sense of wonder and aesthetic appeal.</p>
<h4 id="the-basic-steps-involved">The Basic Steps involved</h4>
<ul>
<li>Start with a trunk (main branch) that will act as the base of the fractal tree.</li>
<li>Define the angle between branches and the ratio by which each branch's length reduces compared to its parent branch.</li>
<li>Draw a straight line segment to represent the trunk of the fractal tree.</li>
<li>Create a recursive function that takes the following inputs: starting point (end of the trunk), length of the branch, angle between branches, and the current recursion depth.</li>
<li>Base case: If the recursion depth exceeds a predefined limit, return.</li>
<li>Calculate the end point of the new branch using the length and angle parameters.</li>
<li>Draw the new branch.</li>
<li>Recursively call the function with the new end point, a reduced branch length, an adjusted angle, and an incremented recursion depth.</li>
</ul>
<h4 id="here-is-how-we-can-implement-the-algorithm">Here is how we can implement the algorithm</h4>
<pre><code class="language-js">let angle = 0;
let slider;

function setup() {
  createCanvas(640, 360);
  slider = createSlider(0, TWO_PI, PI / 4, 0.01);
}

function draw() {
  background(0);
  angle = slider.value();
  stroke(255);
  strokeWeight(2);
  translate(width * 0.5, height);
  branch(100);
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 4) {
    push();
    rotate(angle);
    branch(len * 0.67);
    pop();
    push();
    rotate(-angle);
    branch(len * 0.67);
    pop();
  }
}
</code></pre>
<h4 id="some-facts-about-fractal-tree">Some facts about fractal tree</h4>
<ol>
<li>
<p><strong>Self-Similarity</strong>: One of the defining features of fractal trees is their self-similarity. At each level of branching, the structure closely resembles the whole tree, resulting in an iterative pattern that echoes throughout the entire shape.</p>
</li>
<li>
<p><strong>Infinite Complexity</strong>: While we can visually perceive only a few levels of branching, fractal trees possess infinite complexity, making them both intriguing and challenging to model.</p>
</li>
<li>
<p><strong>Real-world Applications</strong>: Fractal trees find practical applications in various fields. From computer graphics and animation to modeling natural phenomena like lightning and blood vessels, fractals help create realistic and visually stunning representations.</p>
</li>
</ol>
<p>Coding a fractal tree is a fascinating journey into the world of self-similarity and infinite complexity. By using recursion and basic geometric principles, we can create visually stunning representations that echo the beauty of nature's branching structures. As we venture further into the realm of fractals, we discover the harmonious interplay between mathematics and art, unlocking new possibilities in computer graphics, modeling, and creative expression.</p>`,
  "ten-print": `<p>The lines are originally created by printing various characters from the character set of the Commodore 64 computer. These characters include diagonal lines, horizontal lines, and other symbols, which, when combined, create the appearance of a continuous and interconnected labyrinth.</p>
<p>Due to the random nature of the program, the specific characters used in each run of the code will differ. As a result, the pattern is continuously evolving, never repeating the exact same arrangement. This randomness adds to the hypnotic and mesmerizing quality of the pattern, capturing the viewer's attention as they observe the fluid and ever-changing artwork.</p>
<p>Though the "10 PRINT" pattern may seem simple on the surface, its repeated and overlapping diagonal lines give rise to a rich and visually engaging design that has fascinated programmers, artists, and enthusiasts for decades. The pattern's aesthetic appeal and its ability to evoke a sense of exploration and discovery within the viewer make it a captivating example of generative art and the elegance that can be achieved with minimalistic code.</p>
<h4 id="the-code-to-print-the-pattern">The code to print the Pattern</h4>
<pre><code class="language-js">let x = 0;
let y = 0;
let len = 20;

function setup() {
  createCanvas(400, 400);
  background(0);
}

function draw() {
  stroke(255);
  if (random(1) &#x3C; 0.5) {
    line(x, y, x + len, y + len);
  } else {
    line(x, y + len, x + len, y);
  }
  x = x + len;
  if (x > width) {
    x = 0;
    y = y + len;
  }
}
</code></pre>
<h4 id="here-are-some-interesting-facts-about-the-10-print-program">Here are some interesting facts about the "10 PRINT" program:</h4>
<ol>
<li>
<p><strong>Publication and Influence</strong>: The "10 PRINT" program first appeared in a book titled "BASIC Computer Games" in 1973, which was edited by David H. Ahl. The book was influential and contributed to the widespread adoption of BASIC programming among early computer enthusiasts.</p>
</li>
<li>
<p><strong>Maze or Labyrinth Pattern</strong>: The pattern created by "10 PRINT" is often described as resembling a maze or labyrinth due to the overlapping diagonal lines, creating an illusion of interconnected paths.</p>
</li>
<li>
<p><strong>Commodore 64</strong>: The program was initially written for the Commodore 64, an iconic 8-bit home computer that was immensely popular in the 1980s and early 1990s.</p>
</li>
<li>
<p><strong>Generative Art</strong>: "10 PRINT" is considered an early example of generative art, a form of art that relies on algorithms and randomization to create visuals and sounds. It demonstrates how a simple algorithm can produce complex and visually appealing patterns.</p>
</li>
<li>
<p><strong>Endless Variations</strong>: Each time the program is executed, it generates a unique variation of the pattern because of the random nature of the characters selected. This endless variety has made it a favorite among programmers and artists exploring generative art.</p>
</li>
<li>
<p><strong>Cultural Impact</strong>: The "10 PRINT" program has gained a cult following and has been referenced and celebrated in various art installations, exhibitions, and programming communities.</p>
</li>
<li>
<p><strong>Retro Programming Challenges</strong>: Recreating the "10 PRINT" pattern has become a popular challenge among retro programmers and enthusiasts aiming to implement it in various programming languages or on different platforms.</p>
</li>
<li>
<p><strong>Educational Tool</strong>: The simplicity of the "10 PRINT" code makes it an excellent educational tool for introducing programming concepts and inspiring creativity among learners.</p>
</li>
<li>
<p><strong>Literary Analysis</strong>: Beyond its programming significance, "10 PRINT" has also been the subject of academic study and literary analysis. In 2012, the MIT Press published a book titled "10 PRINT CHR$(205.5+RND(1)); : GOTO 10," which delves into the cultural implications and artistic aspects of the program.</p>
</li>
</ol>
<p>The "10 PRINT" program's legacy as an iconic piece of code showcases the artistic and creative possibilities that exist within the world of programming. Its elegance lies in its simplicity, proving that a few lines of code can create captivating and visually striking results.</p>`,
  "times-table-animation": `<p>The <strong>Times Table Animation</strong> holds a surprising secret beyond its educational benefits-it can produce captivating mathematical curves like the cardiod, nephroid, and more. By cleverly combining multiplication tables with geometric shapes, this animation uncovers the hidden beauty of mathematics. As each multiplication fact is represented by a specific movement or pattern, these intricate shapes emerge on the screen, mesmerizing viewers with their elegance. The cardioid, with its heart-like form, comes to life through the animation's rhythmic multiplication patterns. Similarly, the nephroid, resembling a kidney bean, appears as the animation unravels the multiplication secrets. This intriguing fusion of math and art not only enriches students' understanding of multiplication but also introduces them to the fascinating world of mathematical curves, sparking curiosity and appreciation for the wonders of mathematics.</p>
<h4 id="how-can-we-reproduce-this">How can we reproduce this</h4>
<pre><code class="language-js">let factor = 2
let totalPoints = 400
let radius

const setup = () => {
  createCanvas(500, 500);
  radius = width/2 - 20
};

function getVector(index){
  let angle = map(index % totalPoints, 0, totalPoints, 0, TWO_PI)
  
  let v = {
    x: cos(angle + PI)*radius,
    y: sin(angle + PI)*radius
  }

  return v
}

const draw = () => {
  background(255);

  translate(width/2, height/2)
  circle(0, 0, radius*2)

  if(factor &#x3C; 10)
  factor += 0.03

  for(let i = 0; i &#x3C; totalPoints; i++){
    circle(getVector(i).x , getVector(i).y, 5)
    line(getVector(i).x , getVector(i).y , getVector(i * factor).x , getVector(i*factor).y)
  }
}
</code></pre>
<h4 id="some-of-the-facts-about-this-animation">Some of the Facts about this Animation</h4>
<ol>
<li>
<p><strong>Innovative Educational Tool</strong>: The Times Table Animation would be an innovative and interactive educational tool that combines mathematical learning with art, engaging students and learners in a unique and captivating way.</p>
</li>
<li>
<p><strong>Visualization of Mathematical Concepts</strong>: The animation would provide a visual representation of multiplication tables and their relationships, enabling students to better understand multiplication concepts and their applications.</p>
</li>
<li>
<p><strong>Introduction to Geometric Shapes</strong>: By producing shapes like the cardioid, nephroid, and others, the animation would introduce learners to advanced mathematical curves and their properties, fostering interest in higher-level mathematics.</p>
</li>
<li>
<p><strong>Encouraging Creativity</strong>: The animation's fusion of math and art would encourage creativity and curiosity in learners, inspiring them to explore the beauty of mathematics beyond traditional arithmetic.</p>
</li>
<li>
<p><strong>Potential for Further Exploration</strong>: Such an animation could serve as a stepping stone for learners to delve into more complex mathematical topics, including fractals, differential geometry, and other fascinating branches of mathematics.</p>
</li>
<li>
<p><strong>Interactive Learning Experience</strong>: Through interactive features and dynamic visuals, the Times Table Animation would create an immersive learning experience, making math more enjoyable and accessible to a wider audience.</p>
</li>
<li>
<p><strong>Application in Educational Settings</strong>: The animation could be used in classrooms, online learning platforms, and educational apps to enhance math lessons and engage students in mathematical exploration.</p>
</li>
<li>
<p><strong>Multidisciplinary Appeal</strong>: The animation's combination of mathematics and art would have multidisciplinary appeal, attracting learners with different interests and backgrounds to explore mathematical concepts creatively.</p>
</li>
</ol>
<p>While this concept of a Times Table Animation producing geometric shapes is fictional at the moment, it highlights the potential for creative approaches to teaching and learning mathematics, and it may inspire future developments in educational technology.</p>`,
  "toothpick-sequence": `<p>The toothpick sequence is a mathematical and geometric pattern that involves repeatedly adding toothpicks to a set of existing toothpicks based on specific rules. It was popularized by the mathematician Martin Gardner in his column in the August 1971 issue of Scientific American.</p>
<p>A two-dimensional arrangement of toothpicks is constructed by the following iterative procedure.</p>
<ol>
<li>At stage 1, place a single toothpick of length 1
on a square grid, aligned with the y-axis.</li>
<li>At each subsequent stage, for every exposed toothpick end, place a perpendicular toothpick centered at that end.</li>
<li>The resulting structure has a fractal-like appearance.</li>
</ol>
<h4 id="here-is-how-we-can-simulate-the-sequence">Here is how we can simulate the sequence</h4>
<pre><code class="language-js">let picks = [];

let len = 63;

let minX;
let maxX;

function setup() {
  createCanvas(600, 600);
  minX = -width / 2;
  maxX = width / 2;
  picks.push(new Toothpick(0, 0, 1));
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  let factor = float(width) / (maxX - minX);
  scale(factor);
  for (let t of picks) {
    t.show(factor);
    minX = min(t.ax, minX);
    maxX = max(t.ax, maxX);
  }

  let next = [];
  for (let t of picks) {
    if (t.newPick) {
      let nextA = t.createA(picks);
      let nextB = t.createB(picks);
      if (nextA != null) {
        next.push(nextA);
      }
      if (nextB != null) {
        next.push(nextB);
      }
      t.newPick = false;
    }
  }

  picks = picks.concat(next);
  if (frameCount > 200) {
    noLoop(); 
  }
}
</code></pre>
<p>Thats the main functions and the Class Toothpick that has been used here is as follows:</p>
<pre><code class="language-js">class Toothpick {

  constructor(x, y, d) {
    this.newPick = true;

    this.dir = d;
    if (this.dir == 1) {
      this.ax = x - len / 2;
      this.bx = x + len / 2;
      this.ay = y;
      this.by = y;
    } else {
      this.ax = x;
      this.bx = x;
      this.ay = y - len / 2;
      this.by = y + len / 2;
    }
  }

  intersects(x,y) {
    if (this.ax == x &#x26;&#x26; this.ay == y) {
      return true;
    } else if (this.bx == x &#x26;&#x26; this.by == y) {
      return true;
    } else {
      return false;
    }
  }

  createA(others) {
    let available = true;
    for (let other of others) {
      if (other != this &#x26;&#x26; other.intersects(this.ax, this.ay)) {
        available = false;
        break;
      }
    }
    if (available) {
      return new Toothpick(this.ax, this.ay, this.dir * -1);
    } else {
      return null;
    }
  }

   createB(others) {
    let available = true;
    for (let other of others) {
      if (other != this &#x26;&#x26; other.intersects(this.bx, this.by)) {
        available = false;
        break;
      }
    }
    if (available) {
      return new Toothpick(this.bx, this.by, this.dir * -1);
    } else {
      return null;
    }
  }

  show(factor) {
    stroke(0);
    if (this.newPick) {
      stroke(0, 0, 255);
    }
    strokeWeight(1 / factor);
    line(this.ax, this.ay, this.bx, this.by);
  }
}
</code></pre>
<h4 id="here-are-some-basic-facts-about-the-toothpick-sequence">Here are some basic facts about the toothpick sequence:</h4>
<ol>
<li>
<p><strong>Growth Rate</strong>: The toothpick sequence exhibits exponential growth. As each step generates more toothpicks, the number of toothpicks in the sequence grows rapidly.</p>
</li>
<li>
<p><strong>Self-Similarity</strong>: At each step of the sequence, the overall structure retains self-similarity. That means the pattern at a larger scale resembles the pattern at a smaller scale.</p>
</li>
<li>
<p><strong>Infinitely Many Toothpicks</strong>: The toothpick sequence continues indefinitely, and there is no known end to the number of toothpicks that can be generated.</p>
</li>
<li>
<p><strong>Fractal Nature</strong>: The toothpick sequence displays fractal properties due to its self-replicating and self-similar nature.</p>
</li>
<li>
<p><strong>Unpredictability</strong>: Although the rules for generating toothpicks are simple, the resulting patterns can be highly unpredictable and complex, often leading to unexpected formations.</p>
</li>
<li>
<p><strong>Mathematical Exploration</strong>: The toothpick sequence has attracted the attention of mathematicians and researchers, who study its properties and analyze its growth behavior.</p>
</li>
<li>
<p><strong>Mathematical Notation</strong>: The toothpick sequence is sometimes represented using a notation system to describe the number of toothpicks at each step. For instance, the nth step may be denoted as T(n).</p>
</li>
<li>
<p><strong>Open Question</strong>: Despite its simplicity, some aspects of the toothpick sequence remain challenging to understand fully. As a result, there might be unsolved questions and conjectures related to its growth and behavior.</p>
</li>
<li>
<p><strong>Variants and Extensions</strong>: Over time, variations of the toothpick sequence have been proposed, exploring different ways of adding and arranging toothpicks, leading to diverse patterns and structures.</p>
</li>
<li>
<p><strong>Recreational Mathematics</strong>: The toothpick sequence is often considered a topic in recreational mathematics, as it offers an intriguing visual representation of how simple rules can create complex and captivating patterns.</p>
</li>
</ol>
<p>Overall, the toothpick sequence serves as an interesting example of how basic mathematical rules can lead to fascinating and intricate structures, sparking curiosity and interest among mathematicians and enthusiasts alike.</p>`
}
