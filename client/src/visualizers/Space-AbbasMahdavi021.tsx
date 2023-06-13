//Template From WaveForm
//Reference from "https://p5js.org/libraries/"

// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const SpaceVisualizer = new Visualizer(
  'Space',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    // Set up the sun
    const sunSize = dim * 0.3;
    const sunSpeed = 0.001;
    const sunColor = p5.color(255, 255, 0);
    const planetX = width / 2;
    const planetY = height / 2;

    // Set up planets
    const numPlanets = 8;
    const planetSizes = [
      dim * 0.06,
      dim * 0.1,
      dim * 0.11,
      dim * 0.08,
      dim * 0.11,
      dim * 0.11,
      dim * 0.12,
      dim * 0.13
    ];

    const planetColors = [
      [139, 69, 19],     // Mercury (Brown)
      [255, 153, 51],    // Venus (Orange)
      [0, 102, 204],     // Earth (Blue)
      [255, 165, 0],     // Mars (Reddish-Orange)
      [102, 178, 255],   // Uranus (Light Blue)
      [0, 153, 153],     // Neptune (Dark Blue-Green)
      [255, 255, 153],   // Saturn (Pale Yellow)
      [220, 220, 220],   // Jupiter (Gray)

    ];

    const rockWaveformMultiplier = 200;
    const wavePeriod = 100;

    // Draw the sun
    p5.push();
    p5.translate(planetX, planetY);
    p5.rotate(p5.frameCount * sunSpeed);
    p5.fill(sunColor);
    p5.noStroke();

    //https://p5js.org/libraries/shapes
    p5.beginShape();
    for (let angle = 0; angle < p5.TWO_PI; angle += 0.1) {
      const radius = sunSize / 2 + p5.random(-5, 5);
      const x = radius * p5.cos(angle);
      const y = radius * p5.sin(angle);
      p5.vertex(x, y);
    }
    p5.endShape(p5.CLOSE);

    p5.pop();

    // Draw the planets around the sun
    const waveform = analyzer.getValue();
    p5.push();
    p5.translate(planetX, planetY);
    p5.rotate(p5.frameCount * sunSpeed);
    for (let i = 0; i < numPlanets; i++) {
      const amplitude = waveform[i % waveform.length] as number;
      const angle = p5.map(i, 0, numPlanets - 1, 0, p5.TWO_PI);
      const radius = sunSize + Math.sin(p5.frameCount * sunSpeed + angle) * amplitude * rockWaveformMultiplier;
      const x = radius * p5.cos(angle);
      const y = radius * p5.sin(angle);
      p5.push();
      p5.translate(x, y);
      p5.rotate(p5.frameCount * sunSpeed);
      const rockColor = planetColors[i % planetColors.length];
      p5.fill(rockColor[0], rockColor[1], rockColor[2]);
      p5.ellipse(0, 0, planetSizes[i % planetSizes.length] * 2, planetSizes[i % planetSizes.length] * 2);
      p5.pop();
    }
    p5.pop();

  }
);

