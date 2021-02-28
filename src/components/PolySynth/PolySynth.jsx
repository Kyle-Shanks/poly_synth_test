import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import * as Nodes from 'src/nodes';
import MonoSynth from 'src/components/MonoSynth';
import Knob from 'src/components/Knob';
import Select from 'src/components/Select';
import presetData from 'src/util/presetData';
import { getNoteInfo, WAVEFORM, FILTER } from 'src/util/util';

const BASE_CLASS_NAME = 'PolySynth';

const AC = new AudioContext();
const polyphony = 8;
const synthArr = Array(polyphony).fill(0).map(_ => new MonoSynth(AC));
let synthPos = 0;
const incrementSynthPos = () => synthPos = (synthPos + 1) % synthArr.length;

const synthMix = new Nodes.Compressor(AC);
const masterGain = new Nodes.Gain(AC);

const analyserNode = AC.createAnalyser();
analyserNode.fftSize = 2048;

const PolySynth = ({ className, theme }) => {
    const scopeCtx = useRef();
    const spectrumCtx = useRef();

    // Synth State
    const [synthActive, setSynthActive] = useState(false);
    const [octaveMod, setOctaveMod] = useState(3);
    const [currentPreset, setCurrentPreset] = useState('- INIT -');

    // Preset State
    const [masterVolume, setMasterVolume] = useState(0.75);
    const [gainAttack, setGainAttack] = useState(0);
    const [gainDecay, setGainDecay] = useState(0);
    const [gainSustain, setGainSustain] = useState(1);
    const [gainRelease, setGainRelease] = useState(0);
    const [vcoType, setVcoType] = useState('sine');
    const [filterType, setFilterType] = useState('lowpass');
    const [filterFreq, setFilterFreq] = useState(6000);
    const [filterQ, setFilterQ] = useState(0);
    const [filterAttack, setFilterAttack] = useState(0);
    const [filterDecay, setFilterDecay] = useState(0);
    const [filterRelease, setFilterRelease] = useState(0);
    const [filterEnvAmount, setFilterEnvAmount] = useState(0);
    const [portamentoSpeed, setPortamentoSpeed] = useState(0);

    const octaveUp = () => { if (octaveMod < 6) setOctaveMod(octaveMod + 1) };
    const octaveDown = () => { if (octaveMod > 0) setOctaveMod(octaveMod - 1) };

    const activateSynth = () => {
        setSynthActive(true);
        syncNodesToState();
        AC.resume();
    };

    const initSynth = () => {
        masterGain.connect(AC.destination);

        synthMix.connect(analyserNode);
        synthMix.connect(masterGain.getNode());
        synthArr.forEach(synth => {
            synth.connect(synthMix.getNode());
            synth.init();
        });
        synthMix.setRatio(20);

        syncNodesToState();
    };

    // Sync node values to the current state
    const syncNodesToState = () => {
        masterGain.setGain(masterVolume);

        synthArr.forEach(synth => {
            synth.setWaveform(vcoType);
            synth.setFilterFreq(filterFreq);
            synth.setFilterType(filterType)
            synth.setFilterQ(filterQ);
        });
    }

    const getGainEnv = () => ({
        a: gainAttack,
        d: gainDecay,
        s: gainSustain,
        r: gainRelease,
    });
    const getFilterEnv = () => ({
        a: filterAttack,
        d: filterDecay,
        r: filterRelease,
        amount: filterEnvAmount,
    });

    // Functions to pass envelope data to the synth
    const synthNoteOn = (synth, note) => {
        const gainEnv = getGainEnv();
        const filterEnv = getFilterEnv();
        synth.noteOn(note, { gainEnv, filterEnv, portamentoSpeed });
    }
    const synthNoteOff = (synth) => {
        const gainEnv = getGainEnv();
        const filterEnv = getFilterEnv();
        synth.noteOff({ gainEnv, filterEnv });
    }

    // Function to delegate played notes to each of the synths
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

    // Init
    useEffect(() => {
        initSynth();
        setTimeout(syncNodesToState, 0);
        // startAnalyser();
    }, []);

    // Load Preset
    useEffect(() => {
        const preset = presetData[currentPreset];

        setMasterVolume(preset.masterVolume);
        setGainAttack(preset.gainAttack);
        setGainDecay(preset.gainDecay);
        setGainSustain(preset.gainSustain);
        setGainRelease(preset.gainRelease);
        setVcoType(preset.vcoType);
        setFilterType(preset.filterType);
        setFilterFreq(preset.filterFreq);
        setFilterQ(preset.filterQ);
        setFilterAttack(preset.filterAttack);
        setFilterDecay(preset.filterDecay);
        setFilterRelease(preset.filterRelease);
        setFilterEnvAmount(preset.filterEnvAmount);
        setPortamentoSpeed(preset.portamentoSpeed);

        setTimeout(syncNodesToState, 0);
    }, [currentPreset]);

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
                label="Cutoff"
                value={filterFreq}
                modifier={11000}
                isRounded
                onUpdate={(val) => {
                    setFilterFreq(val);
                    synthArr.forEach(synth => synth.setFilterFreq(val));
                }}
            />
            <Select
                label="Waveform"
                value={vcoType}
                onUpdate={(val) => {
                    setVcoType(val);
                    synthArr.forEach(synth => synth.setWaveform(val));
                }}
                options={WAVEFORM}
            />
            <Select
                label="Filter Type"
                value={filterType}
                onUpdate={(val) => {
                    setFilterType(val);
                    synthArr.forEach(synth => synth.setFilterType(val));
                }}
                options={FILTER}
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
