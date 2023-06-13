import * as Tone from 'tone'
import classNames from 'classnames'
import { List, Range } from 'immutable'
import React from 'react'
import { Instrument, InstrumentProps } from '../Instruments'



interface GuitarStringProps {
  note: string
  fret: number
  synth?: Tone.Synth
  octave: number
  index: number
}

// GuitarString component represents a single string on the guitar
function GuitarString({
  note,
  synth,
  fret,
  index,
  onClick,
  selected,
}: GuitarStringProps & {
  onClick?: () => void
  selected?: boolean
}): JSX.Element {
  return (
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)}
      onMouseUp={() => synth?.triggerRelease('+0.3')}
      onClick={onClick}
      className={classNames('ba pointer absolute dim', {
        'bg-white black h4': true,
        'bg-blue': selected,
      })}
      style={{
        backgroundColor: index > 3 ? 'grey' : '#cd7f32',
        top: `${index * 2 + 1}rem`,
        left: `${fret * 5.5}rem`,
        zIndex: 2,
        width: '6rem',
        height: '.75rem',
        border: 0,
      }}
    ></div>
  )
}

// FretDot component represents the dots on the fretboard
function FretDot({
  fret,
  doubleDot = false,
}: {
  fret: number
  doubleDot?: boolean
}): JSX.Element {
  return (
    <>
      <div
        className="absolute bg-white br-100"
        style={{
          width: '1rem',
          height: '1rem',
          top: doubleDot ? '1.85rem' : '5.85rem',
          left: `${fret * 5.5 + 2.25}rem`,
          zIndex: 1,
        }}
      ></div>
      {doubleDot && (
        <div
          className="absolute bg-white br-100"
          style={{
            width: '1rem',
            height: '1rem',
            top: '9.85rem',
            left: `${fret * 5.5 + 2.25}rem`,
            zIndex: 1,
          }}
        ></div>
      )}
    </>
  )
}

// fretNotes function calculates the note for a given string and fret
function fretNotes(openNote: string, fret: number) {
  const notes = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ]
  const openNoteIndex = notes.indexOf(openNote.slice(0, -1))
  const openOctave = Number(openNote.slice(-1))
  const noteIndex = (openNoteIndex + fret) % 12
  const octaveAdjustment = openOctave + Math.floor((openNoteIndex + fret) / 12)
  return notes[noteIndex] + octaveAdjustment
}

// Guitar component represents the main guitar interface
function Guitar({ synth, setSynth }: InstrumentProps): JSX.Element {
  const [selectedFrets, setSelectedFrets] = React.useState(new Map())
  const [chordMode, setChordMode] = React.useState(false)
  const [playedChord, setPlayedChord] = React.useState(false)

  const strings = List([
    { note: 'E2', idx: 0 },
    { note: 'A2', idx: 1 },
    { note: 'D3', idx: 2 },
    { note: 'G3', idx: 3 },
    { note: 'B3', idx: 4 },
    { note: 'E4', idx: 5 },
  ])

  // plays the selected notes when the chord mode is enabled
  function playChord() {
    if (synth) {
      const notesArray = Array.from(selectedFrets.values())
      const attackDelay = 0.05
      const releaseDuration = .25

      // Schedule the attack and release of each note in the chord
      notesArray.forEach((note, index) => {
        Tone.Transport.scheduleOnce((time) => {
          synth.triggerAttackRelease(note, releaseDuration, time)
          if (index === notesArray.length - 1) {
            setPlayedChord(true)
          }
        }, `+${index * attackDelay}`)
      })

      // Start the transport
      Tone.Transport.start()
    }
  }

  return (
    <div className="pv4">
      <button
        className="f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib dark-grey"
        onClick={() => setChordMode(!chordMode)}
        style={{
          marginLeft: '2rem',
          font: 'bold 18px Arial',
          backgroundColor: chordMode ? 'orange' : '#99FF66',
        }}
      >
        {chordMode ? 'Disable Chord Mode' : 'Enable Chord Mode'}
      </button>
      <button
        className="f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib dark-grey ml2"
        onClick={playChord}
        style={{
          marginLeft: '2rem',
          font: 'bold 18px Arial',
          backgroundColor: chordMode ? '#99FF66' : 'white',
        }}
      >
        Play Chord
      </button>

      <div className="relative dib h-100 w-100 ml4">
        <div
          className="absolute bg-dark-gray"
          style={{
            top: '0',
            left: 0,
            width: '66.5rem',
            height: '12.5rem',
            zIndex: 0,
          }}
        ></div>
        <div
          className="absolute bg-white"
          style={{
            top: '0rem',
            left: 0,
            width: '.9rem',
            height: '12.5rem',
            zIndex: 2,
            border: '0.01rem solid black',
          }}
        ></div>
        {Range(0, 6).map((idx) => (
          <div
            className="absolute bg-gray"
            style={{
              top: `${idx * 2 + 1}rem`,
              left: 0,
              width: '66.5rem',
              height: '0.5rem',
              zIndex: 0,
            }}
          ></div>
        ))}
        {[2, 4, 6, 8].map((fret) => (
          <FretDot key={`dot-${fret}`} fret={fret} />
        ))}
        <FretDot key="dot-12" fret={11} doubleDot />

        {strings.map((string, idx) =>
          Range(0, 12).map((fret) => {
            const note = fretNotes(string.note, fret)
            const key = `${string.idx}-${fret}`
            const selected = selectedFrets.get(key)
            const onClick = chordMode
              ? () => {
                  setSelectedFrets((prev) => {
                    const newSelectedFrets = new Map(prev)
                    if (selected) {
                      newSelectedFrets.delete(key)
                    } else {
                      newSelectedFrets.set(key, note)
                    }
                    return newSelectedFrets
                  })
                  setPlayedChord(false)
                }
              : undefined

            return (
              <GuitarString
                key={key}
                note={note}
                synth={synth}
                fret={fret}
                octave={0}
                index={string.idx}
                selected={selected && !playedChord}
                onClick={onClick}
              />
            )
          }),
        )}

        {Range(0, 13).map((fret) => (
          <div
            className="absolute"
            style={{
              backgroundColor: '#aaa',
              top: '0rem',
              left: `${fret * 5.5}rem`,
              width: '0.6rem',
              height: '12.5rem',
              zIndex: 0,
              border: '.1rem solid black',
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export const GuitarInstrument = new Instrument('Guitar', Guitar)
