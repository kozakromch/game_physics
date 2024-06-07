var soft_ball_namespace = soft_ball_namespace || {};
soft_ball_namespace.Parameters = class {
  constructor() {
    this.m = 10.0;
    this.g = 0.0;
    this.num_points = 20;
    this.radius = 1.;
    this.x_0 = 200.;
    this.y_0 = 200.;
    this.vx_0 = 0.;
    this.vy_0 = 0.;
    this.dt = 0.3;
  }
};
soft_ball_namespace.Point = class {
  constructor(x, y, vx, vy, ax, ay) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.ax = ax;
    this.ay = ay;
  }
};
soft_ball_namespace.SpringConstraint = class {
  constructor(point1, point2, distance) {
    this.point1 = point1;
    this.point2 = point2;
    this.distance = distance;
  }
};
// constraint for volume conservation
soft_ball_namespace.VolumeConstraint = class {
  constructor(points, volume) {
    this.points = points;
    this.volume = volume;
  }
};
soft_ball_namespace.SoftBallSystem = class {
  constructor() {
    this.parameters = new soft_ball_namespace.Parameters();
    this.initialyzeSystem();
  }
  reset() {
    this.initialyzeSystem();
  }
  distance(point1, point2) {
    return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
  }
  initialyzeSystem() {
    this.x = this.parameters.x_0;
    this.y = this.parameters.y_0;
    this.vx = this.parameters.vx_0;
    this.vy = this.parameters.vy_0;
    this.t = 0.;
    // create 2d circle points
    this.points = [];
    for (let i = 0; i < this.parameters.num_points; i++) {
      let angle = (Math.PI - 2 * Math.PI / this.parameters.num_points) * i;
      // position of the point
      let x = this.x + this.parameters.radius * Math.cos(angle);
      let y = this.y + this.parameters.radius * Math.sin(angle);
      // velocity of the point
      let vx = this.vx;
      let vy = this.vy;
      // acceleration of the point
      let ax = 0;
      let ay = -this.parameters.g;
      this.points.push(new soft_ball_namespace.Point(x, y, vx, vy, ax, ay));
    }

    // create constraints between neibohour points
    this.spring_constraints = [];
    for (let i = 0; i < this.parameters.num_points; i++) {
      let point1 = this.points[i];
      let point2 = this.points[(i + 1) % this.parameters.num_points];
      this.spring_constraints.push(new soft_ball_namespace.SpringConstraint(
          point1, point2, this.distance(point1, point2)));
    }
    // create volume constraint
    this.volume_constraint = new soft_ball_namespace.VolumeConstraint(
        this.points, Math.PI * this.parameters.radius ** 2 * 1000.);

    // create  soft constraints
    this.soft_constraints = [];
    for (let i = 0; i < this.parameters.num_points; i++) {
      let point1 = this.points[i];
      let point2 = this.points[(i + 5) % this.parameters.num_points];
      this.soft_constraints.push(new soft_ball_namespace.SpringConstraint(
          point1, point2, this.distance(point1, point2)));
    }
  }

  calcSystem() {
    // fix the first point

    this.t += this.parameters.dt;
    this.prev_points = this.points;
    this.fixFirstPoint();
    this.calcPoints();
    this.calcVolumeConstraint();


    this.fixFirstPoint();
    this.calcSpringConstraints(this.spring_constraints);

    this.fixFirstPoint();
    this.calcSpringConstraints(this.spring_constraints);


    this.fixFirstPoint();

    this.updateVelocity();
  }
  fixFirstPoint() {
    this.points[0].x = this.x;
    this.points[0].y = this.y;
    this.points[0].vx = this.vx;
    this.points[0].vy = this.vy;
  }
  calcPoints() {
    for (let i = 0; i < this.parameters.num_points; i++) {
      let point = this.points[i];
      let ax = point.ax;
      let ay = point.ay;
      point.vx += ax * this.parameters.dt;
      point.vy += ay * this.parameters.dt;
      point.x += point.vx * this.parameters.dt;
      point.y += point.vy * this.parameters.dt;
    }
  }
  calcSpringConstraints(constraints) {
    for (let i = 0; i < constraints.length; i++) {
      let constraint = constraints[i];
      let point1 = constraint.point1;
      let point2 = constraint.point2;
      let constraint_distance = constraint.distance;
      let distance = this.distance(point1, point2);
      let delta = distance - constraint_distance;
      let dx = (point2.x - point1.x) / distance;
      let dy = (point2.y - point1.y) / distance;
      let fx = delta * dx;
      let fy = delta * dy;
      let damping = 0.5;
      point1.x += fx / 2 * damping;
      point1.y += fy / 2 * damping;
      point2.x -= fx / 2 * damping;
      point2.y -= fy / 2 * damping;
      // calculate acceleration
      point1.ax += fx / this.parameters.m;
      point1.ay += fy / this.parameters.m;
      point2.ax -= fx / this.parameters.m;
      point2.ay -= fy / this.parameters.m;
    }
  }
  calcVolumeConstraint() {
    let volume = 0;
    // calculate volume by summing the area of the triangles
    for (let i = 0; i < this.parameters.num_points; i++) {
      let point1 = this.points[i];
      let point2 = this.points[(i + 1) % this.parameters.num_points];
      volume += 0.5 * (point1.x * point2.y - point2.x * point1.y);
    }

    console.log(volume, this.volume_constraint.volume);
    let delta_volume = volume - this.volume_constraint.volume;
    let damping = 1.;
    // calculate differential volume by points coordinate
    let grads = [];
    for (let i = 0; i < this.parameters.num_points; i++) {
      let point2 = this.points[(i + 1) % this.parameters.num_points];
      let point0 =
          this.points[(i - 1 + this.parameters.num_points) % this.parameters.num_points];

      let diff_p_x = 0.5 * (point2.y - point0.y);
      let diff_p_y = 0.5 * (point0.x - point2.x);
      grads.push([diff_p_x, diff_p_y]);
    }
    let sum_sqr_grads = 0;
    for (let i = 0; i < this.parameters.num_points; i++) {
      let grad = grads[i];
      sum_sqr_grads += grad[0] ** 2 + grad[1] ** 2;
    }

    let scaling = delta_volume / sum_sqr_grads;
    for (let i = 0; i < this.parameters.num_points; i++) {
      let point = this.points[i];
      let grad = grads[i];
      point.x += -grad[0] * scaling * damping;
      point.y += -grad[1] * scaling * damping;
    }
  }
  updateVelocity() {
    for (let i = 0; i < this.parameters.num_points; i++) {
      let point = this.points[i];
      let prev_point = this.prev_points[i];
      point.vx = (point.x - prev_point.x) / this.parameters.dt;
      point.vy = (point.y - prev_point.y) / this.parameters.dt;
    }
  }
};

soft_ball_namespace.SoftBallVis = class {
  constructor() {}
  draw(p5, system, color) {
    // Draw ball
    p5.stroke(0);
    p5.fill(color);
    for (let i = 0; i < system.parameters.num_points; i++) {
      let point = system.points[i];
      p5.ellipse(point.x, p5.height - point.y, 5, 5);
    }
  }
};


soft_ball_namespace.SoftBallInterface = class {
  constructor() {
    this.soft_ball = new soft_ball_namespace.SoftBallSystem();
    this.soft_ball_vis = new soft_ball_namespace.SoftBallVis();
    this.base_name = 'soft_ball_sketch';
  }
  iter(p5) {
    this.calcSystem();
    this.soft_ball_vis.draw(p5, this.soft_ball, color_scheme.RED(p5));
  }
  reset() {
    this.soft_ball.reset();
  }
  calcSystem() {
    this.soft_ball.calcSystem();
  }
};