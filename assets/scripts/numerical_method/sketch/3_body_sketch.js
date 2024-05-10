{
  let interface = new three_body_namespace.ThreeBodyInterface();
  let main_visualizator =
      main_visualizator_namespace.getMainVisualizator(interface);
  new p5(main_visualizator);
}