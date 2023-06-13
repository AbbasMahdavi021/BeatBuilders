import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, { useEffect, useState } from 'react';

import { Instrument, InstrumentProps } from '../Instruments';

interface KalimbaKeyProps {
  note: string;
  synth?: Tone.Synth;
  index: number;
}

export function KalimbaKey({ note, synth, index }: KalimbaKeyProps): JSX.Element {

  const totalKeys = 21;
  const middleKeyIndex = Math.floor(totalKeys / 2);
  const distanceFromMiddle = Math.abs(middleKeyIndex - index);
  const keyHeight = 19 - distanceFromMiddle * 0.75;

  return (
    <div
      style={{
        position: 'relative',
        width: '1.1rem',
        left: `${index * 1.5}rem`,
      }}
    >
      <div
        onMouseDown={() => synth?.triggerAttack(`${note}`)}
        onMouseUp={() => synth?.triggerRelease('+0.25')}
        className={classNames('ba pointer dim', {
          'bg-silver': true,
        })}
        style={{
          position: 'absolute',
          top: 0,
          bottom: `${index * 0.5}rem`,
          width: '100%',
          height: `${keyHeight}rem`,
          boxShadow: '4px 1px',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          top: 45,
          width: '25px', 
          height: '1.0rem', 
          backgroundColor: '#4d4d4d', 
          boxShadow: '0px 4px'
        }}
      ></div>
    </div>
  );
}

function Kalimba({ setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'D6', idx: 0 },
    { note: 'B5', idx: 1 },
    { note: 'G5', idx: 2 },
    { note: 'E5', idx: 3 },
    { note: 'C5', idx: 4 },
    { note: 'A4', idx: 5 },
    { note: 'F4', idx: 6 },
    { note: 'D4', idx: 7 },
    { note: 'B3', idx: 8 },
    { note: 'G3', idx: 9 },
    { note: 'F3', idx: 10 },
    { note: 'A3', idx: 11 },
    { note: 'C4', idx: 12 },
    { note: 'E4', idx: 13 },
    { note: 'G4', idx: 14 },
    { note: 'B4', idx: 15 },
    { note: 'D5', idx: 16 },
    { note: 'F5', idx: 17 },
    { note: 'A5', idx: 18 },
    { note: 'C6', idx: 19 },
    { note: 'E6', idx: 20 },
  ]);

  const [synth, setLocalSynth] = useState<Tone.Synth | undefined>();

  useEffect(() => {
    const kalimbaSynth = new Tone.Synth({
      oscillator: {
        type: "sine",
      },
      envelope: {
        attack: 0.03,
        decay: 1.3,
        sustain: 0.6,
        release: 2
      }
    }).toDestination();

    setLocalSynth(kalimbaSynth);
  }, [setSynth]);

  return (
    <div className="pv4"
    style={{
      position: 'absolute',
      width: '560px',
      height: '520px',
      backgroundColor: '#52300b'
    }}
    >
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 5).map(o =>
          keys.map(key => {
            const note = `${key.note}`;
            return (
              <KalimbaKey
                key={note}
                note={note}
                synth={synth}
                index={key.idx}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}

export const KalimbaInstrument = new Instrument('Kalimba', Kalimba);
