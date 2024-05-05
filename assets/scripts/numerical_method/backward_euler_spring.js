{
  let spring_interface_backward_euler =
      new spring_namespace.SpringInterfaceEuler('backward');
  let main_visualizator_namespace_backward_euler =
      main_visualizator_namespace.getMainVisualizator(
          spring_interface_backward_euler);
  new p5(main_visualizator_namespace_backward_euler);
}