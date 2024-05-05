var spring_namespace = spring_namespace || {};
spring_namespace.Parameters = class {
  constructor() {
    this.m = 1.;
    this.k = 1.;
    this.x_0 = 0.;
    this.v_0 = 100.;
    this.dt = 0.1;
  }
};
spring_namespace.SpringSystem = class {
  constructor(method) {
    this.method = method;
    this.parameters = new spring_namespace.Parameters();
    this.energy = new energy_namespace.Energy();
    this.initialyzeSystem();
  }
  reset() {
    this.initialyzeSystem();
    this.energy.reset();
  }
  initialyzeSystem() {
    this.x = this.parameters.x_0;
    this.v = this.parameters.v_0;
    this.t = 0.;
    this.calcEnergy();
  }
  calcSystem() {
    this.t += this.parameters.dt;
    if (this.method == 'forward_euler') {
      this.forwardEuler();
    } else if (this.method == 'backward_euler') {
      this.backwardEuler();
    } else if (this.method == 'symplectic_euler') {
      this.symplecticEuler();
    } else if (this.method == 'analitical') {
      this.analitical();
    }
    this.calcEnergy();
  }
  forwardEuler() {
    const eye = math.matrix([[1, 0], [0, 1]]);
    const k = this.parameters.k;
    const m = this.parameters.m;
    let A = new math.matrix([[0., 1], [-k / m, 0]]);
    let p_v_prev = math.matrix([this.x, this.v]);
    let Sys = (math.add(eye, math.multiply(A, this.parameters.dt)));
    let p_v = math.multiply(Sys, p_v_prev);
    this.x = p_v.get([0]);
    this.v = p_v.get([1]);
  }
  backwardEuler() {
    const eye = math.matrix([[1, 0], [0, 1]]);
    const k = this.parameters.k;
    const m = this.parameters.m;
    let A = new math.matrix([[0., 1], [-k / m, 0]]);
    let p_v_prev = math.matrix([this.x, this.v]);
    let Sys =
        math.inv(math.subtract(eye, math.multiply(A, this.parameters.dt)));
    let p_v = math.multiply(Sys, p_v_prev);
    this.x = p_v.get([0]);
    this.v = p_v.get([1]);
  }
  symplecticEuler() {
    const k = this.parameters.k;
    const m = this.parameters.m;
    let acceleration = -k / m * this.x;
    this.v += acceleration * this.parameters.dt;
    this.x += this.v * this.parameters.dt;
  }
  analitical() {
    const k = this.parameters.k;
    const m = this.parameters.m;
    const x_0 = this.parameters.x_0;
    const v_0 = this.parameters.v_0;
    const omega = math.sqrt(k / m);
    const t = this.t;
    this.x = (x_0 * math.cos(omega * t) + v_0 / omega * math.sin(omega * t));
    this.v = (-x_0 * omega * math.sin(omega * t) + v_0 * math.cos(omega * t));
  }
  calcEnergy() {
    const k = this.parameters.k;
    const m = this.parameters.m;
    const x = this.x;
    const v = this.v;
    this.E = 0.5 * m * v ** 2 + 0.5 * k * x ** 2;
    this.energy.storeEnergy(this.E);
  }
};

spring_namespace.SpringSinusoidal = class {
  constructor(numPoints, amplitude, frequency) {
    this.numPoints = numPoints;
    this.amplitude = amplitude;
    this.frequency = frequency;
  }

  draw(p5, startX, startY, endX, endY, opacity = 255) {
    // Calculate the length of the spring
    let length = p5.dist(startX, startY, endX, endY);

    // Calculate the angle between the start and end points
    let angle = p5.atan2(endY - startY, endX - startX);

    // Draw the spring as a sinusoidal line
    p5.noFill();
    p5.beginShape();
    p5.stroke(0, 0, 0, opacity);
    for (let i = 0; i <= this.numPoints; i++) {
      // Calculate the interpolation factor along the spring
      let t = i / this.numPoints;

      // Calculate the x-coordinate of the current point on the spring
      let y = startY + p5.sin(angle) * (length * t);

      // Calculate the y-coordinate of the current point on the spring
      let x = startX + p5.cos(angle) * (length * t) +
          this.amplitude * p5.sin(this.frequency * p5.TWO_PI * t);

      // Draw the current point
      p5.vertex(x, y);
    }
    p5.endShape();
  }
}

spring_namespace.SpringVis = class {
  constructor() {
    this.spring_sinusoidal = new spring_namespace.SpringSinusoidal(100, 5, 8);
  }
  draw(p5, spring_system, r, g, b, o) {
    let spring_pos_x = p5.width / 2;
    let start_point = p5.height / 2;
    let spring_pos_y = start_point + spring_system.x;
    // Draw spring
    this.spring_sinusoidal.draw(
        p5, spring_pos_x, start_point, spring_pos_x, spring_pos_y, o * 0.8);
    // Draw mass
    p5.fill(r, g, b, o);
    p5.ellipse(spring_pos_x, spring_pos_y, 20, 20);
  }
};


spring_namespace.SpringInterfaceEuler = class {
  constructor(method) {
    this.base_name = method + '_euler_spring';
    this.spring_system_euler =
        new spring_namespace.SpringSystem(method + '_euler');
    this.spring_vis_euler = new spring_namespace.SpringVis();
    this.spring_system_an = new spring_namespace.SpringSystem('analitical');
    this.spring_vis_an = new spring_namespace.SpringVis();
  }
  iter(p5) {
    p5.frameRate(30);
    p5.background(220);


    this.spring_system_an.calcSystem();
    this.spring_system_euler.calcSystem();

    drawEnergyGraph(p5, this.spring_system_euler.energy);

    this.spring_vis_an.draw(p5, this.spring_system_an, 0, 255, 0, 100);
    this.spring_vis_euler.draw(p5, this.spring_system_euler, 255, 0, 0, 255);

    // Draw ground
    p5.st
    p5.fill(100);
    p5.rect(0, p5.height - 10, p5.width, 10);

    // Draw info
    p5.fill(0);
    p5.stroke(0);
    p5.text('Full Energy: ' + this.spring_system_euler.E.toFixed(2), 10, 20);
  }
  reset() {
    this.spring_system_euler.reset();
    this.spring_system_an.reset();
  }
};