var sc_grid_namespace = sc_grid_namespace || {};
// class sc_grid that is used to create a grid of cells using p5 on canvas
sc_grid_namespace.sc_grid = class {
  constructor(n_cells_row, n_cells_col) {
    this.n_cells_row = n_cells_row;
    this.n_cells_col = n_cells_col;
  }
  draw(p5) {
    let scribble = new Scribble(p5);
    p5.randomSeed(42);
    scribble.maxOffset = 0.5;
    let cell_width = p5.width / this.n_cells_col;
    let cell_height = p5.height / this.n_cells_row;
    p5.stroke(120, 120, 120, 10);
    for (let i = 0; i < this.n_cells_col; i++) {
      scribble.scribbleLine(i * cell_width, 0, i * cell_width, p5.height);
    }
    for (let i = 0; i < this.n_cells_row; i++) {
      scribble.scribbleLine(0, i * cell_height, p5.width, i * cell_height);
    }
  }
};