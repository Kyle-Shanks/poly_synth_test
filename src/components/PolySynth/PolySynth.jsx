import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import * as Nodes from 'src/nodes';
import MonoSynth from 'src/components/MonoSynth';
import Knob from 'src/components/Knob';
import { getNoteInfo } from 'src/util/util';

const BASE_CLASS_NAME = 'PolySynth';

const AC = new AudioContext();
const polyphony = 8;
const synthArr = Array(polyphony).fill(0).map(_ => new MonoSynth(AC));
const synthMix = new Nodes.Compressor(AC);
const masterVolume = new Nodes.Gain(AC);

const analyserNode = AC.createAnalyser();
analyserNode.fftSize = 2048;

let synthPos = 0;
const incrementSynthPos = () => synthPos = (synthPos + 1) % synthArr.length;

// const gainEnv = {
//     a: 0.001,
//     d: 0.001,
//     s: 1,
//     r: 0.001,
// };
const gainEnv = {
    a: 0.01,
    d: 0.01,
    s: 1,
    r: 0.01,
};

const filterEnv = {
    a: 0.001,
    d: 0.001,
    r: 0.001,
    amount: 0,
}

const portamento = 0;

const PolySynth = ({ className, theme }) => {
    const scopeCtx = useRef();
    const spectrumCtx = useRef();
    const [synthActive, setSynthActive] = useState(false);
    const [octaveMod, setOctaveMod] = useState(3);

    const [knobValue, setKnobValue] = useState(0.2);
    const [knobBValue, setKnobBValue] = useState(0.2);

    const octaveUp = () => { if (octaveMod < 6) setOctaveMod(octaveMod + 1) };
    const octaveDown = () => { if (octaveMod > 0) setOctaveMod(octaveMod - 1) };

    const activateSynth = () => {
        setSynthActive(true);
        synthArr.forEach(synth => synth.init());
        AC.resume();
    };

    const initSynth = () => {
        masterVolume.connect(AC.destination);

        synthMix.connect(analyserNode);
        synthMix.connect(masterVolume.getNode());
        synthArr.forEach(synth => synth.connect(synthMix.getNode()));

        synthMix.setRatio(20);
    };

    const synthNoteOn = (synth, note) => synth.noteOn(note, { gainEnv, filterEnv, portamento });
    const synthNoteOff = (synth) => synth.noteOff({ gainEnv, filterEnv });

    // Function to delegate notes to each of the synths
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
        const targetSynths = synthArr.filter(synth => synth.currentNote === note.note);
        targetSynths.forEach(synth => synthNoteOff(synth));
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

    // Analyser Functions
    const startAnalyser = () => {
        const scope = scopeCtx.current.getContext('2d');
        const spec = spectrumCtx.current.getContext('2d');

        scope.canvas.width = scope.canvas.clientWidth;
        spec.canvas.width = spec.canvas.clientWidth;

        const draw = () => {
            drawSpectrum(analyserNode, spec);
            drawScope(analyserNode, scope);
            requestAnimationFrame(draw);
        }
        draw();
    }
    const drawSpectrum = (analyser, ctx) => {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const freqData = new Uint8Array(analyser.frequencyBinCount);
        const scaling = height / 260;

        analyser.getByteFrequencyData(freqData);

        ctx.fillStyle = theme.background;
        ctx.fillRect(0, 0, width, height);

        ctx.lineWidth = 1;
        ctx.strokeStyle = theme.strong;
        ctx.beginPath();

        for (let x = 0; x < width; x++) {
            ctx.lineTo(x, height - freqData[x] * scaling);
        }

        ctx.stroke();
    }
    const drawScope = (analyser, ctx) => {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const timeData = new Uint8Array(analyser.frequencyBinCount);
        const scaling = height / 256;
        let risingEdge = 0;
        const edgeThreshold = 0.5;

        analyser.getByteTimeDomainData(timeData);

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, width, height);

        ctx.lineWidth = 1;
        ctx.strokeStyle = theme.strong;
        ctx.beginPath();

        // No buffer overrun protection
        while (timeData[risingEdge++] - 128 > 0 && risingEdge <= width);
        if (risingEdge >= width) risingEdge = 0;

        while (timeData[risingEdge++] - 128 < edgeThreshold && risingEdge <= width);
        if (risingEdge >= width) risingEdge = 0;

        for (let x = risingEdge; x < timeData.length && x - risingEdge < width; x++) {
            ctx.lineTo(x - risingEdge, height * 1 - timeData[x] * scaling);
        }

        ctx.stroke();
    }

    useEffect(() => {
        initSynth();
        // startAnalyser();
    }, []);

    // Needed to avoid stale hook state
    useEffect(() => {
        engageKeyboard();
        return disengageKeyboard;
    });

    return (
        <div className={`${BASE_CLASS_NAME} ${className}`.trim()}>
            Hello, World!
            <canvas ref={scopeCtx} id="scope" />
            <canvas ref={spectrumCtx} id="spectrum" />

            <br/>

            <Knob
                label="Test knob"
                value={knobValue}
                onUpdate={(val) => setKnobValue(val)}
            />
            <Knob
                label="Test knob B"
                type="B"
                value={knobBValue}
                onUpdate={(val) => setKnobBValue(val)}
            />
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