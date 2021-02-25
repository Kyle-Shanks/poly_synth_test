import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Nodes from 'src/nodes';
import MonoSynth from 'src/components/MonoSynth';
import { getNoteInfo } from 'src/util/util';

const BASE_CLASS_NAME = 'PolySynth';

const AC = new AudioContext();
const polyphony = 8;
const synthArr = Array(polyphony).fill(0).map(_ => new MonoSynth(AC));
const synthMix = new Nodes.Compressor(AC);
const masterVolume = new Nodes.Gain(AC);

let synthPos = 0;
const incrementSynthPos = () => synthPos = (synthPos + 1) % synthArr.length;

const gainEnv = {
    a: 0.001,
    d: 0.001,
    s: 1,
    r: 0.001,
};

const filterEnv = {
    a: 0.001,
    d: 0.001,
    r: 0.001,
    amount: 0,
}

const portamento = 0;

const PolySynth = ({ className }) => {
    const [synthActive, setSynthActive] = useState(false);
    const [octaveMod, setOctaveMod] = useState(3);

    const octaveUp = () => { if (octaveMod < 6) setOctaveMod(octaveMod + 1) };
    const octaveDown = () => { if (octaveMod > 0) setOctaveMod(octaveMod - 1) };

    const activateSynth = () => {
        setSynthActive(true);
        synthArr.forEach(synth => synth.init());
        AC.resume();
    };

    const initSynth = () => {
        masterVolume.connect(AC.destination);
        synthMix.connect(masterVolume.getNode());
        synthArr.forEach(synth => synth.connect(synthMix.getNode()));

        synthMix.setRatio(20);
    };

    const synthNoteOn = (synth, note) => synth.noteOn(note, { gainEnv, filterEnv, portamento });
    const synthNoteOff = (synth) => synth.noteOff({ gainEnv, filterEnv });

    const noteOn = (note) => {
        if (!synthArr[synthPos].currentNote) {
            synthNoteOn(synthArr[synthPos], note);
        } else {
            const initialPos = synthPos;
            incrementSynthPos();

            while (synthPos !== initialPos) {
                if (!synthArr[synthPos].currentNote) break;
                incrementSynthPos();
            }
            synthNoteOn(synthArr[synthPos], note);
        }

        incrementSynthPos();
    };
    const noteOff = (note) => {
        const targetSynth = synthArr.find(synth => synth.currentNote === note.note);
        if (targetSynth) synthNoteOff(targetSynth);
    };

    // Keyboard listeners
    const keydownFunction = e => {
        if (e.repeat) return;
        if (!synthActive) activateSynth();

        // Additional commands
        switch (e.key) {
            case 'z': return octaveDown();
            case 'x': return octaveUp();
            // case 'm': return (analyserActive) ? stopAnalyser() : startAnalyser();
        };

        // Play note from keyCode
        const note = getNoteInfo(e.key, octaveMod);
        if (note) noteOn(note);
    }
    const keyupFunction = e => {
        const note = getNoteInfo(e.key, octaveMod);
        if (note) noteOff(note);
    }
    const engageKeyboard = () => {
        window.addEventListener('keydown', keydownFunction);
        window.addEventListener('keyup', keyupFunction);
    }
    const disengageKeyboard = () => {
        window.removeEventListener('keydown', keydownFunction);
        window.removeEventListener('keyup', keyupFunction);
    }

    useEffect(initSynth, []);

    // Needed to avoid stale hook state
    useEffect(() => {
        engageKeyboard();
        return disengageKeyboard;
    });

    return (
        <div className={`${BASE_CLASS_NAME} ${className}`.trim()}>
            Hello, World!
        </div>
    );
};

PolySynth.propTypes = {
    className: PropTypes.string,
};

PolySynth.defaultProps = {
    className: '',
};

export default PolySynth;