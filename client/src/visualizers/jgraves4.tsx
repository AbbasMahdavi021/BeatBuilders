import P5 from 'p5';
import * as Tone from 'tone';
import { Visualizer } from '../Visualizers';

export const CircularWaveformBarsVisualizer = new Visualizer(
  'Circular Waveform Bars',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);
    const radius = dim / 4;

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.005);
    p5.stroke(255, 255, 255, 255);

    const centerX = width / 2;
    const centerY = height / 2;

    const values = analyzer.getValue();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const angle = p5.map(i, 0, values.length, 0, p5.TWO_PI);

      // Calculate the starting point (x1, y1) of the bar
      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;

      // Calculate the length of the bar
      const barLength = amplitude * height;

      // Calculate the ending point (x2, y2) of the bar
      const x2 = centerX + Math.cos(angle) * (radius + barLength);
      const y2 = centerY + Math.sin(angle) * (radius + barLength);

      // Draw the bar as a line
      p5.line(x1, y1, x2, y2);
    }
  },
);
