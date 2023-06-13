import P5 from 'p5';
import * as Tone from 'tone';
import { Visualizer } from '../Visualizers';



export const Rodriguez1132Visualizer = new Visualizer(
  'Mirrored Waveform',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2; // divide height by 2 to make room for both visualizers

    p5.background(0, 0, 0, 255);
    p5.noFill();

    const values = analyzer.getValue();
    p5.colorMode(p5.HSB, 255); 

    // First visualizer
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const x = p5.map(i, 0, values.length - 1, 0, width);
      const y = height / 2;
      const h = amplitude * height; 

      p5.stroke(i, 255, 255, 255 - Math.abs(amplitude) * 255);
      p5.strokeWeight(p5.map(i, 0, values.length, 1, 5));
      p5.line(x, y - h / 2 + p5.sin(p5.frameCount / 10) * 10, x, y + h / 2 + p5.sin(p5.frameCount / 10) * 10); 
    }

    // Second visualizer
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const x = p5.map(i, 0, values.length - 1, 0, width);
      const y = 3 * height / 2;  // offset y coordinate to draw on the lower half of the canvas
      const h = amplitude * height; 

      p5.stroke(i, 255, 255, 255 - Math.abs(amplitude) * 255);
      p5.strokeWeight(p5.map(i, 0, values.length, 1, 5));
      p5.line(x, y - h / 2 + p5.sin(p5.frameCount / 10) * 10, x, y + h / 2 + p5.sin(p5.frameCount / 10) * 10); 
    }
  },
);