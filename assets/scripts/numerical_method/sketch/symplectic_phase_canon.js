{
  let interface = new canon_namespace.CanonPhaseSpace('symplectic');
  let main_visualizator =
      main_visualizator_namespace.getMainVisualizator(interface);
  new p5(main_visualizator);
}