//Jurriaan Declerc
//htpp://(projects.)jurriaan.be
//Heavily inspired by @shiffman's videos: https://www.youtube.com/watch?v=jPsZwrV9ld0 and https://www.youtube.com/watch?v=bEyTZ5ZZxZs

//Max distance a triangle can be from the center, used to determine the stroke()
let maxd;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  maxd = width * width / 16 + height * height / 16;
  //Right now, I just calculate everything in one go
  //I'd love to see someone make it more frame-per-frame!
  noLoop();
}

function draw() {
  background(0);
  noFill();
  translate(width / 2, 3 * height / 4.5);
  drawTriangle(0, 0, width / 4);
}

//Regenerate everything when the user clicks
function mouseClicked() {
  resetMatrix();
  draw();
}

function drawTriangle(x, y, w) {
  //We're going to call this function recursively until the width is 2px or less
  if (w > 2) {
    let d = x * x + y * y;
    stroke('hsl(' + floor(map(d, 0, maxd, 0, 360)) + ', 100%, 50%)');
    //All of our triangles are equilateral
    //With a bit of Pythagoras magic can we easily find the height of the triangle
    let h = 0.5 * w * sqrt(3);
    //triangle(x - w / 2, y - h / 2, x + w / 2, y - h / 2, x, y + h / 2);

    //That was the easy part. Now we have to fit the 10PRINT in there
    //The biggest problem is the decreasing width in our triangle
    //Forcing us to calculate the bounds for 10PRINT each line
    if (w >= width / 64) {
      //Triangles get smaller --> length of 10PRINT lines gets smaller
      let l = map(w, width / 64, width / 4, 5, 20);
      //Offset for the top line so we won't have lines sticking out of the triangle
      let xoff = (w - floor(w / l) * l) / 2
      stroke(255);

      for (let j = 0; j < floor(h / l) - 1; j++) {
        //We reuse the formula of the height in an equilateral triangle: h = 0.5*b*sqrt(3)
        let levelWidth = (h - j * l) * 2 / sqrt(3);
        //We also need to make sure that all rows lined up
        //So we start with the offset of the first row and add the width of 1 element until
        //the offset is 'inside' our triangle
        let levelOff = xoff;
        while (levelOff < (w - levelWidth) / 2) {
          levelOff += l;
        }
        //Finally, draw the lines with their correct offset
        for (let i = levelOff + l; i <= w - levelOff - 2 * l; i += l) {
          let r = random();
          if (r > .75) {
            //Top left to bottom right
            line(x - w / 2 + i, y - h / 2 + j * l, x - w / 2 + i + l, y - h / 2 + j * l + l);
          } else if (r > .5) {
            //Bottom left to top right
            line(x - w / 2 + i, y - h / 2 + j * l + l, x - w / 2 + i + l, y - h / 2 + j * l);
          } else if (r > 0.25) {
            //Straight vertical
            line(x - w / 2 + i, y - h / 2 + j * l, x - w / 2 + i, y - h / 2 + j * l + l);
          } else {
            //Straight horizontal
            line(x - w / 2 + i, y - h / 2 + j * l, x - w / 2 + i + l, y - h / 2 + j * l);
          }
        }
      }
    }

    //Recursion is pretty cool.
    drawTriangle(x - w / 2, y + h / 4, w / 2);
    drawTriangle(x + w / 2, y + h / 4, w / 2);
    drawTriangle(x, y - h / 2 - h / 4, w / 2);
  }
}
