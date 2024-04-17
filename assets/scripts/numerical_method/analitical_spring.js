import { SpringSystem, SpringVis } from "./spring.js";
import { getMainVisualizator } from "../common/main_vis.js";
import { drawEnergyGraph } from "../common/energy.js";

class SpringInterfaceAnalitical {
    constructor() {
        this.method = "analitical";
        this.base_name = "analitical_spring";
        this.spring_system = new SpringSystem(this.method);
        this.spring_vis = new SpringVis();
    }
    iter(p5) {
        p5.frameRate(30);
        p5.background(220);

        this.spring_system.calcSystem();
        drawEnergyGraph(p5, this.spring_system.energy);
        this.spring_vis.draw(p5, this.spring_system, 0, 255, 0, 255);

        // Draw ground
        p5.fill(100);
        p5.rect(0, p5.height - 10, p5.width, 10);

        // Draw info
        p5.fill(0);
        p5.stroke(0);
        p5.text("Full Energy: " + this.spring_system.E.toFixed(2), 10, 20);

    }
    reset() {
        this.spring_system.reset();
    }
};

let spring_interface = new SpringInterfaceAnalitical();
let main_visualizator = getMainVisualizator(spring_interface);
new p5(main_visualizator);
