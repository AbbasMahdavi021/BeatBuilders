// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { GuitarInstrument } from './instruments/jgraves4';
import { CircularWaveformBarsVisualizer } from './visualizers/jgraves4';
import { WaveformVisualizer } from './visualizers/Waveform';
import { KalimbaInstrument } from './instruments/AidanStivers';
import { DrumInstrument } from './instruments/Drums-AbbasMahdavi021';
import { Rodriguez1132Instrument } from './instruments/Rodriguez1132';
import { Rodriguez1132Visualizer } from './visualizers/Rodriguez1132';
import { CircleVisualizer } from './visualizers/AidanStivers';
import { SpaceVisualizer } from './visualizers/Space-AbbasMahdavi021';



/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, KalimbaInstrument, DrumInstrument, Rodriguez1132Instrument, GuitarInstrument]);       // similar to Instrument[]

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, CircleVisualizer, SpaceVisualizer, Rodriguez1132Visualizer, CircularWaveformBarsVisualizer]);    // similar to Visualizer[]


/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
});