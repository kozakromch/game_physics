{
  class CanonInterfaceForwardEuler {
    constructor() {
      this.base_name = 'forward_euler_canon';
      this.canon_system_fe = new canon_namespace.CanonSystem('forward_euler');
      this.canon_vis_fe = new canon_namespace.CanonVis();
      this.canon_system_an = new canon_namespace.CanonSystem('analitical');
      this.canon_vis_an = new canon_namespace.CanonVis();
    }
    iter(p5) {
      p5.frameRate(30);
      p5.background(220);


      this.canon_system_an.calcSystem();
      this.canon_system_fe.calcSystem();

      drawEnergyGraph(p5, this.canon_system_fe.energy);

      this.canon_vis_an.draw(p5, this.canon_system_an, 0, 255, 0, 100);
      this.canon_vis_fe.draw(p5, this.canon_system_fe, 255, 0, 0, 255);

      // Draw ground
      p5.st
      p5.fill(100);
      p5.rect(0, p5.height - 10, p5.width, 10);

      // Draw info
      p5.fill(0);
      p5.stroke(0);
      p5.text('Full Energy: ' + this.canon_system_fe.E.toFixed(2), 10, 20);
    }
    reset() {
      this.canon_system_fe.reset();
      this.canon_system_an.reset();
    }
  };

  let canon_interface_forward_euler = new CanonInterfaceForwardEuler();
  let main_visualizator_namespace_forward_euler =
      main_visualizator_namespace.getMainVisualizator(
          canon_interface_forward_euler);
  new p5(main_visualizator_namespace_forward_euler);
};