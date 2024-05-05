{
  let spring_interface_forward_euler =
      new spring_namespace.SpringInterfaceEuler('forward');
  let main_visualizator_namespace_forward_euler =
      main_visualizator_namespace.getMainVisualizator(
          spring_interface_forward_euler);
  new p5(main_visualizator_namespace_forward_euler);
};