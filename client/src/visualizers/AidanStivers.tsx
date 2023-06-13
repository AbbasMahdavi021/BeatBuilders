// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const CircleVisualizer = new Visualizer(
  'Circle',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.003);
    p5.stroke(255, 255, 255, 255);
    p5.noFill();

    const values = analyzer.getValue();

    p5.translate(width/2.25, height/4)

    for (let i = 0; i < values.length; i++) {
      const angle = p5.map(i, 0, values.length, 0, 2 * p5.PI);
      const amplitude = values[i] as number;
      const r = p5.map(amplitude, 3, 0, 10, dim / 6);

      const x = r * p5.cos(angle);
      const y = r * p5.sin(angle);

      p5.line(0, 0, x, y);
    }
  },
);



