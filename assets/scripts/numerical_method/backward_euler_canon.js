{
  let canon_interface_backward_euler =
      new canon_namespace.CanonInterfaceEuler('backward');
  let main_visualizator_namespace_backward_euler =
      main_visualizator_namespace.getMainVisualizator(
          canon_interface_backward_euler);
  new p5(main_visualizator_namespace_backward_euler);
}