import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, { useEffect } from 'react';
import './Rodriguez1132.css';
import { Instrument, InstrumentProps } from '../Instruments';

interface XylophoneBarProps {
  note: string;
  duration?: string;
  synth?: Tone.Synth;
  octave: number;
  index: number;
  totalBars: number;
}

export function XylophoneBar({
  note,
  synth,
  index,
  totalBars,
}: XylophoneBarProps): JSX.Element {
  return (
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)}
      onMouseUp={() => synth?.triggerRelease('+0.25')}
      className={classNames('xylophone-bar', {
        'xylophone-bar--white': note.includes('C') || note.includes('F'),
        'xylophone-bar--black': !note.includes('C') && !note.includes('F'),
      })}
      style={{
        top: '5rem',
        left: `${index * 3.5}rem`,
        zIndex: 1,
      }}
    >
      <div className="xylophone-bar__body"></div>
      <div className="xylophone-bar__beater"></div>
    </div>
  );
}

function Xylophone({ synth, setSynth }: InstrumentProps): JSX.Element {
  useEffect(() => {
    setSynth(oldSynth => {
      oldSynth?.dispose();
      return new Tone.Synth({
        oscillator: {
          type: 'sine'
        },
        envelope: {
          attack: 0.01,
          decay: 0.2,
          sustain: 0.1,
          release: 0.3
        }
      }).toDestination();
    });
  }, [setSynth]);

  const keys = List([
    { note: 'C', idx: 0 },
    { note: 'C#', idx: 1 },
    { note: 'D', idx: 2 },
    { note: 'D#', idx: 3 },
    { note: 'E', idx: 4 },
    { note: 'F', idx: 5 },
    { note: 'F#', idx: 6 },
    { note: 'G', idx: 7 },
    { note: 'G#', idx: 8 },
    { note: 'A', idx: 9 },
    { note: 'A#', idx: 10 },
    { note: 'B', idx: 11 },
  ]);

  const totalBars = keys.size * 1;

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 xylophone-container">
        {Range(4, 5).map((octave) =>
          keys.map((key) => {
            const note = `${key.note}${octave}`;
            return (
              <XylophoneBar
                key={note}
                note={note}
                synth={synth}
                octave={octave}
                index={key.idx}
                totalBars={totalBars}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}

export const Rodriguez1132Instrument = new Instrument('Xylophone', Xylophone);
