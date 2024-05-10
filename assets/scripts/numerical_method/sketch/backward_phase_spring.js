{
  let interface = new spring_namespace.SpringPhaseSpaceEuler('backward');
  let main_visualizator =
      main_visualizator_namespace.getMainVisualizator(interface);
  new p5(main_visualizator);
}