import { Energy, drawEnergyGraph } from '../common/energy.js';
import { BaseVis } from '../common/base_vis.js';

class Parameters {
    constructor() {
        this.m = 1.;
        this.k = 1.;
        this.x_0 = 0.;
        this.v_0 = 100.;
        this.dt = 0.1;
    }
};
export class SpringSystem {
    constructor(method) {
        this.method = method;
        this.parameters = new Parameters();
        this.energy = new Energy();
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
        if (this.method == "forward_euler") {
            this.forwardEuler();
        } else if (this.method == "backward_euler") {
            this.backwardEuler();
        } else if (this.method == "symplectic_euler") {
            this.symplecticEuler();
        } else if (this.method == "analitical") {
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
        let Sys = math.inv(math.subtract(eye, math.multiply(A, this.parameters.dt)));
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

export class SpringVis {
    constructor() { }
    draw(p5, spring_system) {
        let spring_pos_x = p5.width / 2;
        let start_point = p5.height / 2;
        let spring_pos_y = start_point + spring_system.x;
        // Draw spring
        p5.stroke(0);
        p5.line(p5.width / 2, start_point, spring_pos_x, spring_pos_y);
        // Draw mass
        p5.fill(255);
        p5.ellipse(spring_pos_x, spring_pos_y, 20, 20);
    }
};


