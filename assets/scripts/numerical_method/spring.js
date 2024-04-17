class BaseVis {
    constructor(base_name) {
        this.is_paused = true;
        this.is_reset = true;
        this.initializeCanvas(base_name);
        this.pauseText();
    }
    pauseText() {
        this.pause_button.innerHTML = this.is_paused ? "Start" : "Pause";
    }
    pauseSimulation() {
        this.is_paused = !this.is_paused;
        this.pauseText();
    }
    resetSimulation() {
        this.is_reset = true;
    }
    initializeCanvas(base_name) {
        this.width = document.getElementById(base_name + "_base_id").clientWidth;
        this.height = 300;
        this.canvas = document.getElementById(base_name + "_canvas_id");
        this.pause_button = document.getElementById(base_name + "_stop_button_id");

        this.pause_button.onclick = this.pauseSimulation.bind(this);

        this.reset_button = document.getElementById(base_name + "_reset_button_id");
        this.reset_button.onclick = this.resetSimulation.bind(this);
    }
};

class Energy {
    constructor() {
        this.min_energy = undefined;
        this.max_energy = undefined;
        this.energy_history = [];
        this.max_history_length = 400;
    }
    reset() {
        this.min_energy = undefined;
        this.max_energy = undefined;
        this.energy_history = [];
    }
    storeEnergy(energy) {
        this.energy_history.push(energy);
        if (this.energy_history.length > this.max_history_length) {
            this.energy_history.shift(); // Remove oldest energy point
        }
        // Update min and max energy values
        if (energy < this.min_energy || this.min_energy === undefined) {
            this.min_energy = energy;
        }
        if (energy > this.max_energy || this.max_energy === undefined) {
            this.max_energy = energy;
        }
    }
}

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


spring_namespace.SpringVis = class {
    constructor() { }
    initialize(spring_pos) {
        this.spring_pos = spring_pos;
        this.start_point = spring_pos.y;
    }
    draw(p5, spring_system) {
        this.spring_pos.y = this.start_point + spring_system.x;
        // Draw spring
        p5.stroke(0);
        p5.line(p5.width / 2, this.start_point, this.spring_pos.x, this.spring_pos.y);
        // Draw mass
        p5.fill(255);
        p5.ellipse(this.spring_pos.x, this.spring_pos.y, 20, 20);
        this.drawEnergyGraph(p5, spring_system);
        // Draw info
        p5.fill(0);
        p5.stroke(0);
        p5.text("Full Energy: " + spring_system.E.toFixed(2), 10, 20);
    }
    drawEnergyGraph(p5, spring_system) {
        p5.noFill();
        p5.beginShape();
        p5.stroke(255, 0, 0);
        let min_energy = spring_system.energy.min_energy;
        let max_energy = spring_system.energy.max_energy;
        let energy_history = spring_system.energy.energy_history;
        for (let i = 0; i < energy_history.length; i++) {
            let x = p5.map(i, 0, energy_history.length - 1, 0, p5.width);
            let y = p5.map(energy_history[i], min_energy, max_energy, p5.height, 0); // Scale the energy graph
            p5.vertex(x, y);
        }
        p5.endShape();
    }
};

function functor(p5) {
    let base_vis = new BaseVis(global_method);
    let spring_system = new spring_namespace.SpringSystem(global_method);
    let spring_vis = new spring_namespace.SpringVis();
    p5.setup = function () {
        p5.createCanvas(base_vis.width, base_vis.height, p5.P2D, base_vis.canvas);
        let spring_pos = p5.createVector(p5.width / 2, p5.height / 2);
        spring_vis.initialize(spring_pos);
    }
    p5.draw = function () {
        p5.background(220);
        p5.frameRate(30);
        p5.fill(0);
        if (!base_vis.is_paused) {
            spring_system.calcSystem();
        }
        spring_vis.draw(p5, spring_system);

        // Draw ground
        p5.fill(100);
        p5.rect(0, p5.height - 10, p5.width, 10);
        if (base_vis.is_reset) {
            spring_system.reset();
            base_vis.is_reset = false;
        }
    }
};

global_method = "forward_euler";
new p5(functor);