var sc_arrows_namespace = sc_arrows_namespace || {};
sc_arrows_namespace.drawAxis = function(p5, text_x, text_y) {
  let scribble = new Scribble(p5);

  p5.stroke(0);
  p5.strokeWeight(1);
  scribble.maxOffset = 0.5;

  scribble.scribbleLine(p5.width / 2, 0, p5.width / 2, p5.height);
  scribble.scribbleLine(0, p5.height / 2, p5.width, p5.height / 2);
  // Draw small arrows
  let a = 7;
  let b = 20;
  scribble.scribbleLine(p5.width / 2, 0, p5.width / 2 - a, b);
  scribble.scribbleLine(p5.width / 2, 0, p5.width / 2 + a, b);
  scribble.scribbleLine(
      p5.width, p5.height / 2, p5.width - b, p5.height / 2 - a);
  scribble.scribbleLine(
      p5.width, p5.height / 2, p5.width - b, p5.height / 2 + a);
  // draw text nearby the arrows
  let pixel_per_symbol = 10;
  p5.text(
      text_x, p5.width - 20,
      p5.height / 2 - (text_x.length * pixel_per_symbol));

  p5.text(text_y, p5.width / 2 + (text_y.length * pixel_per_symbol), 20);
};
