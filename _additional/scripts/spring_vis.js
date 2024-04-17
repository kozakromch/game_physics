class SpringSinusoidal {
    constructor(numPoints, amplitude, frequency) {
        this.numPoints = numPoints;
        this.amplitude = amplitude;
        this.frequency = frequency;
    }

    draw(startX, startY, endX, endY) {
        // Calculate the length of the spring
        let length = dist(startX, startY, endX, endY);

        // Calculate the angle between the start and end points
        let angle = atan2(endY - startY, endX - startX);

        // Draw the spring as a sinusoidal line
        beginShape();
        for (let i = 0; i <= this.numPoints; i++) {
            // Calculate the interpolation factor along the spring
            let t = i / this.numPoints;

            // Calculate the x-coordinate of the current point on the spring
            let x = startX + cos(angle) * (length * t);

            // Calculate the y-coordinate of the current point on the spring
            let y = startY + sin(angle) * (length * t) + this.amplitude * sin(this.frequency * TWO_PI * t);

            // Draw the current point
            vertex(x, y);
        }
        endShape();
    }
}
