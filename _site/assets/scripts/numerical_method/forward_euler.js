const forward_euler = p => {

let mass;
let springStiffness = 0.1;
let damping = 0.9;
let restLength = 200;
let springPos;
let velocity = 10.; 
let acceleration = 0;
let dampingForce = 0;
let kineticEnergy = 0;
let potentialEnergy = 0;
let initialTotalEnergy = 0;
let minEnergy, maxEnergy; // Variables to store min and max energy values

let isPaused = false;

let energyHistory = []; // Stores energy values over time
const maxHistoryLength = 400; // Max number of energy points to store

let dampingSlider;
let stiffnessSlider;

p.setup = function() {
  const canvas = p.createCanvas(600, 400);
  canvas.parent('forward_euler');
  mass = 20;
  springPos = p.createVector(p.width / 2, p.height / 2);

  // Initialize energyHistory with initial total energy at the middle height
  initialTotalEnergy = calculateTotalEnergy();
  energyHistory.push(initialTotalEnergy);

  // Create buttons
  let pauseButton = p.createButton('Pause');
  pauseButton.parent('forward_euler');
  pauseButton.position(10, 10, 'relative');
  pauseButton.mousePressed(pauseSimulation);

  let resetButton = p.createButton('Reset');
  resetButton.parent('forward_euler');    
  resetButton.position(70, 10, 'relative');
  resetButton.mousePressed(resetSimulation);

  // Create sliders for damping and stiffness
  dampingSlider = p.createSlider(0, 1, damping, 0.01);
  dampingSlider.parent('forward_euler');
  dampingSlider.position(150, 10, 'relative');

  stiffnessSlider = p.createSlider(0, 1, springStiffness, 0.01);
  stiffnessSlider.parent('forward_euler');
  stiffnessSlider.position(10, 10, 'relative');
}
function forwardEuler(acceleration) {
// Forward Euler integration
springPos.y += velocity;
velocity += acceleration;
}

function backwardEuler(acceleration) {
// Backward Euler integration
velocity += acceleration;
springPos.y += velocity;
}

p.draw = function()  {
  p.background(220);

  // Update damping and stiffness based on sliders
  damping = dampingSlider.value();
  springStiffness = stiffnessSlider.value();

  // Display damping and stiffness values near sliders
  p.fill(0);
  p.text("Damping: " + dampingSlider.value(), dampingSlider.x + dampingSlider.width + 10, dampingSlider.y + 15);
  p.text("Stiffness: " + stiffnessSlider.value(), stiffnessSlider.x + stiffnessSlider.width + 10, stiffnessSlider.y + 15);

  // Calculate spring force
  let displacement = springPos.y - p.height / 2;
  let springForce = -springStiffness * displacement;

  // Calculate damping force
  dampingForce = -damping * velocity;

  // Apply forces to the mass
  if (!isPaused) {
    acceleration = (springForce + dampingForce) / mass;
    springPos.y += velocity;
    velocity += acceleration;

  }

  // Calculate kinetic and potential energy
  kineticEnergy = 0.5 * mass * velocity ** 2;
  potentialEnergy = 0.5 * springStiffness * displacement ** 2;

  // Store energy in history
  let totalEnergy = calculateTotalEnergy();
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

  // Draw energy-time graph
  drawEnergyGraph();

  // Draw spring
  p.stroke(0);
  p.line(p.width / 2, 0, springPos.x, springPos.y);

  // Draw mass
  p.fill(255);
  p.ellipse(springPos.x, springPos.y, mass, mass);

  // Draw ground
  p.fill(100);
  p.rect(0, p.height - 10, p.width, 10);

  // Draw info
  p.fill(0);
  p.text("Full Energy: " + totalEnergy.toFixed(2), 10, 20);
  p.text("Spring Position: " + springPos.y.toFixed(2), 10, 40);
  p.text("Velocity: " + velocity.toFixed(2), 10, 60);
}

function calculateTotalEnergy() {
  // Calculate total energy
  let displacement = springPos.y - p.height / 2;
  kineticEnergy = 0.5 * mass * velocity ** 2;
  potentialEnergy = 0.5 * springStiffness * displacement ** 2;
  return kineticEnergy + potentialEnergy;
}

function drawEnergyGraph() {
  p.noFill();
  p.beginShape();
  p.stroke(255, 0, 0); // Red color for energy graph
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
  springPos.y = height / 2;
  velocity = 10.; 
  acceleration = 0;
  energyHistory = [initialTotalEnergy]; // Reset with initial total energy
  minEnergy = undefined;
  maxEnergy = undefined;
  isPaused = false;
}
};

new p5(forward_euler);