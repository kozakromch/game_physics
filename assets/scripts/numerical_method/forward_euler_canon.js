{
  let canon_interface_forward_euler =
      new canon_namespace.CanonInterfaceEuler('forward');
  let main_visualizator_namespace_forward_euler =
      main_visualizator_namespace.getMainVisualizator(
          canon_interface_forward_euler);
  new p5(main_visualizator_namespace_forward_euler);
}