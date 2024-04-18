{
    class SpringInterfaceForwardEuler {
        constructor() {
            this.base_name = "forward_euler_spring";
            this.spring_system_fe = new spring_namespace.SpringSystem("forward_euler");
            this.spring_vis_fe = new spring_namespace.SpringVis();
            this.spring_system_an = new spring_namespace.SpringSystem("analitical");
            this.spring_vis_an = new spring_namespace.SpringVis();

        }
        iter(p5) {
            p5.frameRate(30);
            p5.background(220);


            this.spring_system_an.calcSystem();
            this.spring_system_fe.calcSystem();

            drawEnergyGraph(p5, this.spring_system_fe.energy);

            this.spring_vis_an.draw(p5, this.spring_system_an, 0, 255, 0, 100);
            this.spring_vis_fe.draw(p5, this.spring_system_fe, 255, 0, 0, 255);

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

    let spring_interface_forward_euler = new SpringInterfaceForwardEuler();
    let main_visualizator_namespace_forward_euler = main_visualizator_namespace.getMainVisualizator(spring_interface_forward_euler);
    new p5(main_visualizator_namespace_forward_euler);
};