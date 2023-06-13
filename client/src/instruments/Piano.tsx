// Importing required libraries and components
import * as Tone from 'tone'; // Import Tone.js library for audio synthesis
import classNames from 'classnames'; // Import classNames for conditional class names
import { List, Range } from 'immutable'; // Import List and Range from Immutable.js library
import React from 'react'; // Import React for creating components

// Importing local components
import { Instrument, InstrumentProps } from '../Instruments';

// PianoKeyProps interface defines the properties for a single piano key
interface PianoKeyProps {
  note: string; // The musical note (e.g., C, Db, D, Eb, etc.)
  duration?: string; // Optional duration of the note
  synth?: Tone.Synth; // Optional Tone.js Synth object for generating sound
  minor?: boolean; // Whether the key is a minor key (true) or major key (false)
  octave: number; // The octave of the piano key
  index: number; // Index that, combined with octave, determines the piano key's position
}

// PianoKey component renders a single piano key (major or minor) and handles mouse events for triggering sound synthesis
export function PianoKey({
  note,
  synth,
  minor,
  index,
}: PianoKeyProps): JSX.Element {
  return (
    <div
      // Trigger the sound synthesis when the mouse button is pressed on the key
      onMouseDown={() => synth?.triggerAttack(`${note}`)}
      // Release the sound synthesis when the mouse button is released
      onMouseUp={() => synth?.triggerRelease('+0.25')}
      // Apply CSS classes conditionally based on whether the key is a minor key or not
      className={classNames('ba pointer absolute dim', {
        'bg-black black h3': minor,
        'black bg-white h4': !minor,
      })}
      // Apply CSS styles for positioning and appearance of the key
      style={{
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.25rem' : 0,
      }}
    ></div>
  );
}

// PianoKeyWithoutJSX is an alternative implementation of PianoKey without using JSX syntax, provided for pedagogical purposes
// function PianoKeyWithoutJSX({
//   note,
//   synth,
//   minor,
//   index,
// }: PianoKeyProps): JSX.Element {
//   return React.createElement(
//     'div',
//     {
//       onMouseDown: () => synth?.triggerAttack(`${note}`),
//       onMouseUp: () => synth?.triggerRelease('+0.25'),
//       className: classNames('ba pointer absolute dim', {
//         'bg-black black h3': minor,
//         'black bg-white h4': !minor,
//       }),
//       style: {
//         top: 0,
//         left: `${index * 2}rem`,
//         zIndex: minor ? 1 : 0,
//         width: minor ? '1.5rem' : '2rem',
//         marginLeft: minor ? '0.25rem' : 0,
//       },
//     },
//     [],
//   );
// }

// PianoType component renders a button for selecting a specific oscillator type for the piano sound
function PianoType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick} // Handle click events to change the oscillator type
      // Apply CSS classes conditionally based on whether the oscillator type is active or not
      className={classNames('dim pointer ph2 pv1 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
        })}
        >
        {title} {/* Display the oscillator type title on the button */}
        </div>
        );
        }
        
        // Piano component is the main component that renders the piano instrument with multiple octaves and a list of oscillator types to choose from
        function Piano({ synth, setSynth }: InstrumentProps): JSX.Element {
        // Define the piano keys and their properties
        const keys = List([
        { note: 'C', idx: 0 },
        { note: 'Db', idx: 0.5 },
        { note: 'D', idx: 1 },
        { note: 'Eb', idx: 1.5 },
        { note: 'E', idx: 2 },
        { note: 'F', idx: 3 },
        { note: 'Gb', idx: 3.5 },
        { note: 'G', idx: 4 },
        { note: 'Ab', idx: 4.5 },
        { note: 'A', idx: 5 },
        { note: 'Bb', idx: 5.5 },
        { note: 'B', idx: 6 },
        ]);
        
        // Function to set the oscillator type for the synth
        const setOscillator = (newType: Tone.ToneOscillatorType) => {
        setSynth(oldSynth => {
        oldSynth.disconnect(); // Disconnect the old synth
          // Create a new synth with the selected oscillator type and connect it to the destination (output)
  return new Tone.Synth({
    oscillator: { type: newType } as Tone.OmniOscillatorOptions,
  }).toDestination();
});
};

// Define the list of available oscillator types
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

// Render the piano component with keys and oscillator type selection
 return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 7).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            return (
              <PianoKey
                key={note} //react key
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave}
                index={(octave - 2) * 7 + key.idx}
              />
            );
          }),
        )}
      </div>
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <PianoType
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

export const PianoInstrument = new Instrument('Piano', Piano);