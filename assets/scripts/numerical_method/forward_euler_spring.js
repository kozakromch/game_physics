import { SpringSystem, SpringVis } from "./spring.js";
import { getMainVisualizator } from "../common/main_vis.js";
import { drawEnergyGraph } from "../common/energy.js";

class SpringInterfaceAnalitical {
    constructor() {
        this.base_name = "forward_euler_spring";
        this.spring_system_fe = new SpringSystem("forward_euler");
        this.spring_vis_fe = new SpringVis();
        this.spring_system_an = new SpringSystem("analitical");
        this.spring_vis_an = new SpringVis();

    }
    iter(p5) {
        p5.frameRate(30);
        p5.background(220);

        this.spring_system_fe.calcSystem();
        this.spring_vis_fe.draw(p5, this.spring_system_fe);
        drawEnergyGraph(p5, this.spring_system_fe.energy);

        this.spring_system_an.calcSystem();
        this.spring_vis_an.draw(p5, this.spring_system_an);

        // Draw ground
        p5.st
        p5.fill(100);
        p5.rect(0, p5.height - 10, p5.width, 10);

        // Draw info
        p5.fill(0);
        p5.stroke(0);
        p5.text("Full Energy: " + this.spring_system_fe.E.toFixed(2), 10, 20);

    }
    reset() {
        this.spring_system_fe.reset();
        this.spring_system_an.reset();
    }
};

let spring_interface = new SpringInterfaceAnalitical();
let main_visualizator = getMainVisualizator(spring_interface);
new p5(main_visualizator);
