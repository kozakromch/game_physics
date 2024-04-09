const forward = p => {

let mass = 1;
let springFrequency = 0.5*3.14;
let damping = 0.0;
let springPos;
let middlePoint;
let velocity = 100.0; 
let totalEnergy = 0.;
let initialTotalEnergy = 0.;
let minEnergy = undefined;
let maxEnergy = undefined; // Variables to store min and max energy values
let eye = math.matrix([[1, 0], [0, 1]]);
let dt = 0.1;
let isPaused = false;

let energyHistory = []; // Stores energy values over time
const maxHistoryLength = 400; // Max number of energy points to store

p.setup = function() {
  width = document.getElementById("forward_euler_cn_id").clientWidth;
  console.log(width);
  let canv = document.getElementById("forward_euler_canvas_id");
  const canvas = p.createCanvas(width, 300, p.P2D, canv);

  springPos = p.createVector(p.width / 2, p.height / 2);
  middlePoint = springPos.y;  

  let pauseButton = document.getElementById('forward_euler_stop_button_id');
  pauseButton.onclick = pauseSimulation;

  let resetButton = document.getElementById('forward_euler_reset_button_id');
  resetButton.onclick = resetSimulation;
}

p.draw = function()  {
  p.background(220);
  p.frameRate(30);
  p.fill(0);

  // Calculate spring force
  if (!isPaused) {
    let displacement = getDisplacement();
    forwardEuler(displacement);
    // backwardEuler(displacement);
    // symplecticEuler(displacement);
    // Store energy in history
    calculateTotalEnergy(displacement);

  }
  drawEnergyGraph();

  // Draw spring
  p.stroke(0);
  p.line(p.width / 2, middlePoint, springPos.x, springPos.y);

  // Draw mass
  p.fill(255);
  p.ellipse(springPos.x, springPos.y, 20, 20);

  // Draw ground
  p.fill(100);
  p.rect(0, p.height - 10, p.width, 10);

  // Draw info
  p.fill(0);
  p.text("Full Energy: " + totalEnergy.toFixed(2), 10, 20);
  p.text("Spring Position: " + springPos.y.toFixed(2), 10, 40);
  p.text("Velocity: " + velocity.toFixed(2), 10, 60);
  
}

function getDisplacement() {
  return springPos.y - middlePoint;
}

function forwardEuler(displacement) {
let A = new math.matrix([[0., 1],[-(springFrequency**2),  - 2*damping*springFrequency]]);
let p_v_prev = math.matrix([displacement, velocity]);
let Sys = (math.add(eye,math.multiply(A,dt)));
let p_v = math.multiply(Sys, p_v_prev);
springPos.y = middlePoint + p_v.get([0]);
velocity = p_v.get([1]);
}
function backwardEuler(displacement) {
  let A = new math.matrix([[0., 1],[-(springFrequency**2),  - 2*damping*springFrequency]]);
  let p_v_prev = math.matrix([displacement, velocity]);
  let Sys = math.inv(math.subtract(eye,math.multiply(A,dt)));
  let p_v = math.multiply(Sys, p_v_prev);
  springPos.y = middlePoint + p_v.get([0]);
  velocity = p_v.get([1]);
}

function symplecticEuler(displacement) {
  let acceleration = -(springFrequency ** 2) * displacement - 2. * damping * springFrequency * velocity;
  velocity += acceleration * dt;
  springPos.y += velocity * dt;
  
}

function calculateTotalEnergy(displacement) {
  // Calculate total energy
  let kineticEnergy = 0.5 * 1. * velocity ** 2;
  let potentialEnergy = 0.5 * springFrequency * displacement ** 2;

  totalEnergy = kineticEnergy + potentialEnergy;
  energyHistory.push(totalEnergy);
  if (energyHistory.length > maxHistoryLength) {
    energyHistory.shift(); // Remove oldest energy point
  }
  // Update min and max energy values
  if (totalEnergy < minEnergy || minEnergy === undefined) {
    minEnergy = totalEnergy;
  }
  if (totalEnergy > maxEnergy || maxEnergy === undefined) {
    maxEnergy = totalEnergy;
  }
}

function drawEnergyGraph() {
  p.noFill();
  p.beginShape();
  p.stroke(255, 0, 0); 
  for (let i = 0; i < energyHistory.length; i++) {
    let x = p.map(i, 0, energyHistory.length - 1, 0, p.width);
    let y = p.map(energyHistory[i], minEnergy, maxEnergy, p.height, 0); // Scale the energy graph
    p.vertex(x, y);
  }
  p.endShape();
}

function pauseSimulation() {
  isPaused = !isPaused;
}

function resetSimulation() {
  springPos.y = p.height / 2;
  velocity = 10.; 
  acceleration = 0;
  energyHistory = [initialTotalEnergy];
  minEnergy = undefined;
  maxEnergy = undefined;
}
};

new p5(forward);