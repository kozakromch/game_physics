{
  let spring_interface_symplectic_euler =
      new spring_namespace.SpringInterfaceEuler('symplectic');
  let main_visualizator_namespace_symplectic_euler =
      main_visualizator_namespace.getMainVisualizator(
          spring_interface_symplectic_euler);
  new p5(main_visualizator_namespace_symplectic_euler);
};