var main_visualizator_namespace = main_visualizator_namespace || {};

main_visualizator_namespace.getMainVisualizator = function (spring_interface) {
    var context = spring_interface
    let MainVisualizator = function (p5) {
        let base_vis = new base_canvas_namespace.BaseCanvasController(context.base_name);

        p5.setup = function () {
            p5.createCanvas(base_vis.width, base_vis.height, p5.P2D, base_vis.canvas);
            context.iter(p5);
        }
        p5.draw = function () {
            if (!base_vis.is_paused) {
                context.iter(p5);
            } else {
                p5.background(125, 125, 125, 10);
            }
            if (base_vis.is_reset) {
                context.reset();
                base_vis.is_reset = false;

            }
        }
    };
    return MainVisualizator;
};