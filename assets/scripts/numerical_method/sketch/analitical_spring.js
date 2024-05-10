{
  class SpringInterfaceAnalitical {
    constructor() {
      this.method = 'analitical';
      this.base_name = 'analitical_spring';
      this.spring_system = new spring_namespace.SpringSystem(this.method);
      this.spring_vis = new spring_namespace.SpringVis();
    }
    iter(p5) {
      this.spring_system.calcSystem();
      drawEnergyGraph(p5, this.spring_system.energy);
      this.spring_vis.draw(p5, this.spring_system, color_scheme.GREEN(p5), 255);

      // Draw info
      p5.fill(0);
      p5.stroke(0);
      p5.text('Full Energy: ' + this.spring_system.E.toFixed(2), 10, 20);
    }
    reset() {
      this.spring_system.reset();
    }
  };

  let spring_interface_analitical = new SpringInterfaceAnalitical();
  let main_visualizator_namespace_analitical =
      main_visualizator_namespace.getMainVisualizator(
          spring_interface_analitical);
  new p5(main_visualizator_namespace_analitical);
};
