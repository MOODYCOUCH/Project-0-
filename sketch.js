function setup() {
  createCanvas(900, 520);
  pixelDensity(2);
  noLoop(); // keep it non-moving for the assignment
}

function draw() {
  background(10, 12, 18);

  // Heatmap coloring uses HSB
  colorMode(HSB, 360, 100, 100, 255);

  translate(width * 0.52, height * 0.42);

  const vanishY = height * 0.55;

  // Inner wall hints (now in HSB too)
  stroke(210, 20, 85, 45); // cool steel tone
  strokeWeight(1.5);
  line(-300, -250, -28, vanishY);
  line(300, -250, 28, vanishY);

  noStroke();
  const topY = -160;
  const bottomY = vanishY - 8;

  let y = topY;

  let stepW = 520;
  let stepH = 28;
  let gap = 22;

  const twistTotal = radians(220);
  const orbitMax = 80;

  while (y < bottomY && stepW > 12 && stepH > 2) {
    const t = map(y, topY, bottomY, 0, 1);

    // --- OPTION 3: Speed heatmap (blue -> red as it "accelerates") ---
    const alpha = lerp(220, 60, t);
    const hue = lerp(220, 20, pow(t, 1.3));  // 220=blue, 20=red
    const sat = 80;
    const bri = lerp(90, 100, t);

    // Twist + orbit
    const twist = twistTotal * pow(t, 1.2);
    const orbit = lerp(10, orbitMax, t);

    push();
    translate(2, y);
    rotate(twist);
    translate(orbit, 5);

    fill(hue, sat, bri, alpha);
    rectMode(CENTER);
    rect(0, 0, stepW, stepH, 6);

    pop();

    y += stepH + gap;

    // stair spacing
    stepW *= 0.92;
    stepH *= 0.90;
    gap *= 0.88;
    gap = max(gap, 1.2);
  }
}
