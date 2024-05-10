{
  class CanonInterfaceAnalitical {
    constructor() {
      this.method = 'analitical';
      this.base_name = 'analitical_canon';
      this.canon_system = new canon_namespace.CanonSystem(this.method);
      this.canon_vis = new canon_namespace.CanonVis();
    }
    iter(p5) {
      this.canon_system.calcSystem();
      drawEnergyGraph(p5, this.canon_system.energy);
      this.canon_vis.draw(p5, this.canon_system, 0, 255, 0, 255);

      // Draw info
      p5.fill(0);
      p5.stroke(0);
      p5.text('Full Energy: ' + this.canon_system.E.toFixed(2), 10, 20);
    }
    reset() {
      this.canon_system.reset();
    }
  };

  let canon_interface_analitical = new CanonInterfaceAnalitical();
  let main_visualizator_namespace_analitical =
      main_visualizator_namespace.getMainVisualizator(
          canon_interface_analitical);
  new p5(main_visualizator_namespace_analitical);
};
