var canon_namespace = canon_namespace || {};
canon_namespace.Parameters = class {
  constructor() {
    this.m = 100.;
    this.g = 98.1;
    this.x_0 = 0.;
    this.y_0 = 0.;
    this.vx_0 = 100.;
    this.vy_0 = 200.;
    this.dt = 0.1;
  }
};
canon_namespace.CanonSystem = class {
  constructor(method) {
    this.method = method;
    this.parameters = new canon_namespace.Parameters();
    this.energy = new energy_namespace.Energy();
    this.initialyzeSystem();
  }
  reset() {
    this.initialyzeSystem();
    this.energy.reset();
  }
  initialyzeSystem() {
    this.x = this.parameters.x_0;
    this.y = this.parameters.y_0;
    this.vx = this.parameters.vx_0;
    this.vy = this.parameters.vy_0;
    this.history = [];
    this.t = 0.;
    this.calcEnergy();
  }
  calcSystem() {
    this.history.push([this.x, this.y]);
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
    const eye =
        math.matrix([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
    const G = math.multiply(
        math.matrix([0, 0, 0, -this.parameters.g]), this.parameters.dt);
    let A = new math.matrix(
        [[0., 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 1], [0, 0, 0, 0]]);
    let p_v_prev = math.matrix([this.x, this.vx, this.y, this.vy]);
    let Sys = math.add(eye, math.multiply(A, this.parameters.dt));
    let p_v = math.add(math.multiply(Sys, p_v_prev), G);
    this.x = p_v.get([0]);
    this.vx = p_v.get([1]);
    this.y = p_v.get([2]);
    this.vy = p_v.get([3]);
  }
  backwardEuler() {
    const eye =
        math.matrix([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
    const g = this.parameters.g;
    let A = new math.matrix(
        [[0., 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 1], [0, 0, 0, 0]]);
    let p_v_prev = math.matrix([this.x, this.vx, this.y, this.vy]);
    let Sys =
        math.inv(math.subtract(eye, math.multiply(A, this.parameters.dt)));
    let p_v = math.multiply(Sys, p_v_prev);
    this.x = p_v.get([0]);
    this.vx = p_v.get([1]);
    this.y = p_v.get([2]);
    this.vy = p_v.get([3]);
  }
  symplecticEuler() {
    const g = this.parameters.g;
    let acceleration = -g;
    this.vy += acceleration * this.parameters.dt;
    this.y += this.vy * this.parameters.dt;
    this.vx += 0;
    this.x += this.vx * this.parameters.dt;
  }
  analitical() {
    const g = this.parameters.g;
    const x_0 = this.parameters.x_0;
    const y_0 = this.parameters.y_0;
    const vx_0 = this.parameters.vx_0;
    const vy_0 = this.parameters.vy_0;
    const t = this.t;
    this.x = x_0 + vx_0 * t;
    this.y = y_0 + vy_0 * t - 0.5 * g * t * t;
    this.vx = vx_0;
    this.vy = vy_0 - g * t;
  }
  calcEnergy() {
    const m = this.parameters.m;
    const g = this.parameters.g;
    const x = this.x;
    const y = this.y;
    const vx = this.vx;
    const vy = this.vy;
    this.E = 0.5 * m * (vx ** 2 + vy ** 2) + m * g * y;
    this.energy.storeEnergy(this.E);
  }
};

canon_namespace.CanonVis = class {
  constructor() {}
  draw(p5, canon_system, r, g, b, o) {
    let canon_pos_x = canon_system.x;
    let canon_pos_y = p5.height - canon_system.y;

    // Draw canon
    p5.fill(r, g, b, o);
    p5.ellipse(canon_pos_x, canon_pos_y, 20, 20);
    // Draw trajectory
    p5.noFill();
    p5.beginShape();
    p5.stroke(r, g, b, o / 2.);
    for (let i = 0; i < canon_system.history.length; i++) {
      p5.vertex(
          canon_system.history[i][0], p5.height - canon_system.history[i][1]);
    }
    p5.endShape();
  }
};
