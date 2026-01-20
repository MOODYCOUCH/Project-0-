function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  noLoop();
}

function draw() {
  background(10, 12, 18);
  colorMode(HSB, 360, 100, 100, 255);

 
  noStroke();
  for (let r = 900; r > 0; r -= 18) {
    const a = map(r, 900, 0, 0, 26);
    fill(220, 20, 8, a);
    ellipse(width * 0.55, height * 0.45, r, r * 0.75);
  }

  translate(width * 0.52, height * 0.42);

  const vanishY = height * 0.55;

 
  const wallHue = 220;
  noStroke();
  fill(wallHue, 18, 18, 110);
  beginShape();
  vertex(-360, -260);
  vertex(-240, -260);
  vertex(-26, vanishY);
  vertex(-70, vanishY);
  endShape(CLOSE);

  fill(wallHue, 18, 18, 110);
  beginShape();
  vertex(360, -260);
  vertex(240, -260);
  vertex(70, vanishY);
  vertex(26, vanishY);
  endShape(CLOSE);

 
  stroke(wallHue, 18, 85, 70);
  strokeWeight(1.6);
  line(-300, -250, -28, vanishY);
  line(300, -250, 28, vanishY);

  
  stroke(wallHue, 12, 85, 35);
  strokeWeight(1.2);
  line(-240, -250, -20, vanishY);
  line(240, -250, 20, vanishY);

 
  stroke(wallHue, 10, 95, 22);
  strokeWeight(1);
  line(0, -250, 0, vanishY);

 
  stroke(wallHue, 20, 95, 30);
  strokeWeight(1.4);
  for (let i = 0; i < 14; i++) {
    const tt = i / 13;
    const yy = lerp(-210, vanishY - 20, tt);
    const inset = lerp(250, 35, pow(tt, 1.1)); 
    const tick = lerp(26, 10, tt);

    
    line(-inset, yy, -inset + tick, yy + tick * 0.35);
   
    line(inset, yy, inset - tick, yy + tick * 0.35);
  }

 
  noStroke();
  const topY = -160;
  const bottomY = vanishY - 8;

  let y = topY;

  let stepW = 520;
  let stepH = 28;
  let gap = 22;

  
  const twistTotal = radians(280); 
  const orbitMax = 85;

  while (y < bottomY && stepW > 12 && stepH > 2) {
    const t = map(y, topY, bottomY, 0, 1);

   
    const alpha = lerp(210, 55, t);
    const hue = lerp(220, 20, pow(t, 1.35));
    const sat = 78;
    const bri = lerp(92, 100, t);

    
    const twist = twistTotal * pow(t, 1.15);

   
    const orbit = lerp(14, orbitMax, pow(t, 0.9)) * (1 - 0.25 * t);

    push();
    translate(2, y);
    rotate(twist);
    translate(orbit, 5);

   
    fill(hue, sat, bri, alpha);
    rectMode(CENTER);
    rect(0, 0, stepW, stepH, 6);

    
    stroke(hue, sat, 20, alpha * 0.35);
    strokeWeight(1);
    noFill();
    rect(0, 0, stepW, stepH, 6);
    noStroke();

   
    fill(hue, sat * 0.7, 100, alpha * 0.18);
    rect(0, -stepH * 0.18, stepW * 0.92, max(2, stepH * 0.12), 6);

    pop();

    y += stepH + gap;

   
    stepW *= 0.915;
    stepH *= 0.895;
    gap *= 0.865;
    gap = max(gap, 1.1);
  }
}
