{
  let canon_interface_symplectic_euler =
      new canon_namespace.CanonInterfaceEuler('symplectic');
  let main_visualizator_namespace_symplectic_euler =
      main_visualizator_namespace.getMainVisualizator(
          canon_interface_symplectic_euler);
  new p5(main_visualizator_namespace_symplectic_euler);
}