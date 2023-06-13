//Template From Piano.tsx

import React from 'react';
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import { Instrument, InstrumentProps } from '../Instruments';

// Drums implementation by Abbas M.

interface DrumsKeyProps {
  note: string;
  duration?: string;
  synth?: Tone.Synth;
  tom?: boolean;
  cymbal?: boolean;
  index: number;
}

export function DrumKey({
  note,
  synth,
  tom,
  cymbal,
  index,
}: DrumsKeyProps): JSX.Element {

  return (
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)}
      onMouseUp={() => synth?.triggerRelease('+0.25')}
      className={classNames('ba absolute dim', {
        'bg-white ye h3': tom,
        'black bg-metallic-gold h4': cymbal,
      })}
      style={{
        position: 'absolute',
        top: `${[0, 1, 2,3].includes(index) ? 7 : 0}rem`,
        left: `${index*2 * 3.25 + 4}rem`,
        width: tom ? '7rem' : '8rem',
        height: tom ? '7rem' : '8rem',
        borderRadius: '50%',
        border: tom ? '5px solid grey' : 'none' ,
        boxShadow: !tom ? '3px 3px 3px rgba(0, 0, 0, 0.3), inset 2px 2px 5px 2px black' : 'none',
        zIndex: index === 0 || index === 0.5 || index === 3.5 ? 2 : 1,
        cursor: 'crosshair',
      }}      
    ></div>
  );
  
  
}

function DrumType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  );
}

function Drum({ synth, setSynth }: InstrumentProps): JSX.Element {
  const toms = List([
    { note: 'e7', idx: 0 },
    { note: 'f7', idx: 0.5 },
    { note: 'B7', idx: 3.5 },
    { note: 'C1', idx: 1 },
    { note: 'G1', idx: 1.5 },
    { note: 'B1', idx: 2.5 },
    { note: 'E1', idx: 3 },
  ]);


  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    'sine',
    'sawtooth',
    'square',
    'triangle',
    'fmsine',
    'fmsawtooth',
    'fmtriangle',
    'amsine',
    'amsawtooth',
    'amtriangle',
  ]) as List<OscillatorType>;

  return (
    <div className="pv4" >
      <div className="relative dib h4 w-100 ml4" 
        style={{ marginBottom: '10rem'}}    
      >
        {toms.map(key => {
          const isTom = key.note.indexOf('1') !== -1;
          const isCymbal = key.note.indexOf('7') !== -1;
          const note = `${key.note}`;
          return (
            <DrumKey
              key={note} //react key
              note={note}
              synth={synth}
              tom={isTom}
              cymbal={isCymbal}
              index={key.idx}
            />
          );
        })
        }
      </div>
      <img src='https://a.1stdibscdn.com/magnus-olesen-8000-series-stool-for-sale-picture-3/f_38973/f_118846011535974486102/SDD_MO_Stool_TopView_master.jpg?width=768' placeholder='stool'
        style={{ 
          position: 'absolute',
          width: "110px",
          height: 'auto',
          left: 300,
          bottom: 120,
        }}
      />

      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <DrumType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>

    </div>
  );
}

export const DrumInstrument = new Instrument('Drum', Drum);