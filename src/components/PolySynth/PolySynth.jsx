import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import * as Nodes from 'src/nodes';
import MonoSynth from 'src/components/MonoSynth';
import Module from 'src/components/Module';
import Knob from 'src/components/Knob';
import Select from 'src/components/Select';
import presetData from 'src/util/presetData';
import { getNoteInfo, WAVEFORM, FILTER, REVERB } from 'src/util/util';
import { ModuleGridContainer, DotCircle, Lines } from './PolySynth.styled';

const BASE_CLASS_NAME = 'PolySynth';

const AC = new AudioContext();
const polyphony = 8;
const synthArr = Array(polyphony).fill(0).map(_ => new MonoSynth(AC));
let synthPos = 0;

const synthMix = new Nodes.Compressor(AC);

// Master Effects
const masterGain = new Nodes.Gain(AC);
const masterFilter = new Nodes.Filter(AC);
const masterDistortion = new Nodes.Distortion(AC);
const masterFlanger = new Nodes.Flanger(AC);
const masterDelay = new Nodes.Delay(AC);
const masterPingPong = new Nodes.PingPongDelay(AC);
const masterReverb = new Nodes.Reverb(AC);
const vibratoLFO = new Nodes.LFO(AC);
const masterBitCrush = new Nodes.BitCrusher(AC);
const masterLimiter = new Nodes.Compressor(AC);
const masterEQ2 = new Nodes.EQ2(AC);

const analyserNode = AC.createAnalyser();
analyserNode.fftSize = 2048;

const getNodes = () => ({
    synths: synthArr,
    masterGain,
    masterFilter,
    masterDistortion,
    masterFlanger,
    masterDelay,
    masterPingPong,
    masterReverb,
    vibratoLFO,
    masterBitCrush,
    masterLimiter,
    masterEQ2,
    polyphony,
});

window.getNodes = getNodes;

const PolySynth = ({ className, theme }) => {
    const scopeCtx = useRef();
    const spectrumCtx = useRef();

    // Synth State
    const [synthActive, setSynthActive] = useState(false);
    const [octaveMod, setOctaveMod] = useState(4);
    const [currentPreset, setCurrentPreset] = useState('- INIT -');

    // Preset State
    const [polyphony, setPolyphony] = useState(synthArr.length);
    const [portamentoSpeed, setPortamentoSpeed] = useState(0);
    const [masterVolume, setMasterVolume] = useState(0.75);
    const [masterFilterType, setMasterFilterType] = useState('lowpass');
    const [masterFilterFreq, setMasterFilterFreq] = useState(11000);
    const [masterFilterQ, setMasterFilterQ] = useState(0);
    const [masterFilterGain, setMasterFilterGain] = useState(0);
    const [vcoType, setVcoType] = useState('sine');
    const [gainAttack, setGainAttack] = useState(0);
    const [gainDecay, setGainDecay] = useState(0);
    const [gainSustain, setGainSustain] = useState(0.7);
    const [gainRelease, setGainRelease] = useState(0);
    const [filterType, setFilterType] = useState('lowpass');
    const [filterFreq, setFilterFreq] = useState(6000);
    const [filterQ, setFilterQ] = useState(0);
    const [filterGain, setFilterGain] = useState(0);
    const [filterAttack, setFilterAttack] = useState(0);
    const [filterDecay, setFilterDecay] = useState(0);
    const [filterRelease, setFilterRelease] = useState(0);
    const [filterEnvAmount, setFilterEnvAmount] = useState(0);
    const [distortionAmount, setDistortionAmount] = useState(0);
    const [distortionDist, setDistortionDist] = useState(0);
    const [reverbType, setReverbType] = useState('reverb1');
    const [reverbAmount, setReverbAmount] = useState(0);
    const [flangerAmount, setFlangerAmount] = useState(0);
    const [flangerDepth, setFlangerDepth] = useState(0);
    const [flangerRate, setFlangerRate] = useState(0);
    const [flangerFeedback, setFlangerFeedback] = useState(0);
    const [flangerDelay, setFlangerDelay] = useState(0);
    const [delayTime, setDelayTime] = useState(0);
    const [delayFeedback, setDelayFeedback] = useState(0);
    const [delayTone, setDelayTone] = useState(4400);
    const [delayAmount, setDelayAmount] = useState(0);
    const [pingPongDelayTime, setPingPongDelayTime] = useState(0);
    const [pingPongFeedback, setPingPongFeedback] = useState(0);
    const [pingPongTone, setPingPongTone] = useState(4400);
    const [pingPongAmount, setPingPongAmount] = useState(0);
    const [vibratoDepth, setVibratoDepth] = useState(0);
    const [vibratoRate, setVibratoRate] = useState(0);
    const [bitCrushDepth, setBitCrushDepth] = useState(8);
    const [bitCrushAmount, setBitCrushAmount] = useState(0);
    const [eqLowGain, setEqLowGain] = useState(0);
    const [eqHighGain, setEqHighGain] = useState(0);
    const [eqLowFreq, setEqLowFreq] = useState(320);
    const [eqHighFreq, setEqHighFreq] = useState(3200);

    const octaveUp = () => { if (octaveMod < 7) setOctaveMod(octaveMod + 1) };
    const octaveDown = () => { if (octaveMod > 1) setOctaveMod(octaveMod - 1) };

    const resetSynthPos = () => synthPos = 0;
    const incrementSynthPos = () => synthPos = (synthPos + 1) % polyphony;

    const activateSynth = () => {
        setSynthActive(true);
        AC.resume();
    };

    const initSynth = () => {
        synthArr.forEach(synth => {
            synth.connect(synthMix.getNode());
            vibratoLFO.connect(synth.getNode().detune);
            synth.init();
        });

        vibratoLFO.start();

        // Compressing all synths together to avoid clipping/distortion
        synthMix.connect(masterDistortion.getNode());
        // Limiter-type settings
        synthMix.setThreshold(-6);
        synthMix.setKnee(0);
        synthMix.setRatio(20);

        masterDistortion.connect(masterFlanger.getNode());
        masterFlanger.connect(masterDelay.getNode());
        masterDelay.connect(masterPingPong.getNode());
        masterPingPong.connect(masterBitCrush.getNode());
        masterBitCrush.connect(masterReverb.getNode());
        masterReverb.connect(masterEQ2.getNode());
        masterEQ2.connect(masterFilter.getNode());

        masterFilter.connect(analyserNode);
        masterFilter.connect(masterLimiter.getNode());

        masterLimiter.connect(masterGain.getNode());
        masterLimiter.setThreshold(-6);
        masterLimiter.setKnee(0);
        masterLimiter.setRatio(20);

        masterGain.connect(AC.destination);
    };

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
        synth.noteOn(
            note,
            {
                gainEnv,
                filterEnv,
                portamentoSpeed: polyphony === 1 ? portamentoSpeed : 0
            },
        );
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
    useLayoutEffect(() => {
        initSynth();
        // startAnalyser();
    }, []);

    // Load Preset
    useLayoutEffect(() => {
        const preset = presetData[currentPreset];

        setPolyphony(preset.polyphony);
        setMasterVolume(preset.masterVolume);
        setPortamentoSpeed(preset.portamentoSpeed);
        setMasterFilterType(preset.masterFilterType);
        setMasterFilterFreq(preset.masterFilterFreq);
        setMasterFilterQ(preset.masterFilterQ);
        setMasterFilterGain(preset.masterFilterGain);
        setGainAttack(preset.gainAttack);
        setGainDecay(preset.gainDecay);
        setGainSustain(preset.gainSustain);
        setGainRelease(preset.gainRelease);
        setVcoType(preset.vcoType);
        setFilterType(preset.filterType);
        setFilterFreq(preset.filterFreq);
        setFilterQ(preset.filterQ);
        setFilterGain(preset.filterGain);
        setFilterAttack(preset.filterAttack);
        setFilterDecay(preset.filterDecay);
        setFilterRelease(preset.filterRelease);
        setFilterEnvAmount(preset.filterEnvAmount);
        setDistortionAmount(preset.distortionAmount);
        setDistortionDist(preset.distortionDist);
        setFlangerAmount(preset.flangerAmount);
        setFlangerDepth(preset.flangerDepth);
        setFlangerRate(preset.flangerRate);
        setFlangerDelay(preset.flangerDelay);
        setFlangerFeedback(preset.flangerFeedback);
        setDelayAmount(preset.delayAmount);
        setDelayFeedback(preset.delayFeedback);
        setDelayTime(preset.delayTime);
        setDelayTone(preset.delayTone);
        setPingPongAmount(preset.pingPongAmount);
        setPingPongDelayTime(preset.pingPongDelayTime);
        setPingPongTone(preset.pingPongTone);
        setPingPongFeedback(preset.pingPongFeedback);
        setReverbType(preset.reverbType);
        setReverbAmount(preset.reverbAmount);
        setVibratoDepth(preset.vibratoDepth);
        setVibratoRate(preset.vibratoRate);
        setBitCrushAmount(preset.bitCrushAmount);
        setBitCrushDepth(preset.bitCrushDepth);
        setEqLowGain(preset.eqLowGain);
        setEqHighGain(preset.eqHighGain);
        setEqLowFreq(preset.eqLowFreq);
        setEqHighFreq(preset.eqHighFreq);

        resetSynthPos();
    }, [currentPreset]);

    // Sync node values to the current state on change
    useLayoutEffect(() => {
        if (masterGain.getGain() !== masterVolume) masterGain.setGain(masterVolume);

        if (masterFilter.getType() !== masterFilterType) masterFilter.setType(masterFilterType);
        if (masterFilter.getFreq() !== masterFilterFreq) masterFilter.setFreq(masterFilterFreq);
        if (masterFilter.getQ() !== masterFilterQ) masterFilter.setQ(masterFilterQ);
        if (masterFilter.getGain() !== masterFilterGain) masterFilter.setGain(masterFilterGain);

        const synth1 = synthArr[0];
        if (synth1.getWaveform() !== vcoType) synthArr.forEach((synth) => synth.setWaveform(vcoType));
        if (synth1.getFilterType() !== filterType) synthArr.forEach((synth) => synth.setFilterType(filterType));
        if (synth1.getFilterFreq() !== filterFreq) synthArr.forEach((synth) => synth.setFilterFreq(filterFreq));
        if (synth1.getFilterQ() !== filterQ) synthArr.forEach((synth) => synth.setFilterQ(filterQ));
        if (synth1.getFilterGain() !== filterGain) synthArr.forEach((synth) => synth.setFilterGain(filterGain));

        if (masterDistortion.getAmount() !== distortionAmount) masterDistortion.setAmount(distortionAmount);
        if (masterDistortion.getDistortion() !== distortionDist) masterDistortion.setDistortion(distortionDist);

        if (masterFlanger.getAmount() !== flangerAmount) masterFlanger.setAmount(flangerAmount);
        if (masterFlanger.getDepth() !== flangerDepth) masterFlanger.setDepth(flangerDepth);
        if (masterFlanger.getRate() !== flangerRate) masterFlanger.setRate(flangerRate);
        if (masterFlanger.getFeedback() !== flangerFeedback) masterFlanger.setFeedback(flangerFeedback);
        if (masterFlanger.getDelay() !== flangerDelay) masterFlanger.setDelay(flangerDelay);

        if (masterDelay.getTone() !== delayTone) masterDelay.setTone(delayTone);
        if (masterDelay.getAmount() !== delayAmount) masterDelay.setAmount(delayAmount);
        if (masterDelay.getDelayTime() !== delayTime) masterDelay.setDelayTime(delayTime);
        if (masterDelay.getFeedback() !== delayFeedback) masterDelay.setFeedback(delayFeedback);

        if (masterPingPong.getDelayTime() !== pingPongDelayTime) masterPingPong.setDelayTime(pingPongDelayTime);
        if (masterPingPong.getFeedback() !== pingPongFeedback) masterPingPong.setFeedback(pingPongFeedback);
        if (masterPingPong.getTone() !== pingPongTone) masterPingPong.setTone(pingPongTone);
        if (masterPingPong.getAmount() !== pingPongAmount) masterPingPong.setAmount(pingPongAmount);

        if (masterReverb.getAmount() !== reverbAmount) masterReverb.setAmount(reverbAmount);
        if (masterReverb.getType() !== reverbType) masterReverb.setType(reverbType);

        if (masterBitCrush.getBitDepth() !== bitCrushDepth) masterBitCrush.setBitDepth(bitCrushDepth);
        if (masterBitCrush.getAmount() !== bitCrushAmount) masterBitCrush.setAmount(bitCrushAmount);

        if (vibratoLFO.getRate() !== vibratoRate) vibratoLFO.setRate(vibratoRate);
        if (vibratoLFO.getDepth() !== vibratoDepth) vibratoLFO.setDepth(vibratoDepth);

        if (masterEQ2.getLowGain() !== eqLowGain) masterEQ2.setLowGain(eqLowGain);
        if (masterEQ2.getHighGain() !== eqHighGain) masterEQ2.setHighGain(eqHighGain);
        if (masterEQ2.getLowFreq() !== eqLowFreq) masterEQ2.setLowFreq(eqLowFreq);
        if (masterEQ2.getHighFreq() !== eqHighFreq) masterEQ2.setHighFreq(eqHighFreq);
    }, [
        masterVolume, masterFilterType, masterFilterFreq, masterFilterQ, masterFilterGain, vcoType,
        filterType, filterFreq, filterQ, filterGain, distortionAmount, distortionDist, reverbType,
        reverbAmount, delayTime, delayFeedback, delayTone, delayAmount, vibratoDepth, vibratoRate,
        bitCrushDepth, bitCrushAmount, eqLowGain, eqHighGain, eqLowFreq, eqHighFreq,
        pingPongAmount, pingPongFeedback, pingPongDelayTime, pingPongTone,
        flangerAmount, flangerDelay, flangerDepth, flangerFeedback, flangerRate,
    ]);

    // Needed to avoid stale hook state
    useEffect(() => {
        engageKeyboard();
        return disengageKeyboard;
    });

    return (
        <div className={`${BASE_CLASS_NAME} ${className}`.trim()}>
            <select value={currentPreset} onChange={(e) => setCurrentPreset(e.target.value)}>
                {Object.keys(presetData).map((preset) => (
                    <option key={`Preset_${preset}`} value={preset}>{preset}</option>
                ))}
            </select>

            <p>Octave: {octaveMod}</p>

            <ModuleGridContainer>

                <Module label="VCO" columns={1} rows={1}>
                    <Select
                        label="Waveform"
                        options={WAVEFORM}
                        value={vcoType}
                        onUpdate={(val) => setVcoType(val)}
                    />
                </Module>

                <Module label="Gain Envelope" columns={4} rows={1}>
                    <Knob
                        label="Attack"
                        value={gainAttack}
                        modifier={3}
                        onUpdate={(val) => setGainAttack(val)}
                    />
                    <Knob
                        label="Decay"
                        value={gainDecay}
                        modifier={3}
                        onUpdate={(val) => setGainDecay(val)}
                    />
                    <Knob
                        label="Sustain"
                        modifier={0.7}
                        value={gainSustain}
                        onUpdate={(val) => setGainSustain(val)}
                    />
                    <Knob
                        label="Release"
                        value={gainRelease}
                        modifier={3}
                        onUpdate={(val) => setGainRelease(val)}
                    />
                </Module>

                <Module label="Vibrato" columns={2} rows={1}>
                    <Knob
                        label="Depth"
                        value={vibratoDepth}
                        modifier={200}
                        onUpdate={(val) => setVibratoDepth(val)}
                    />
                    <Knob
                        label="Rate"
                        value={vibratoRate}
                        modifier={50}
                        onUpdate={(val) => setVibratoRate(val)}
                    />
                </Module>

                <Module label="Distortion" columns={2} rows={1}>
                    <Knob
                        label="Distortion"
                        value={distortionDist}
                        modifier={30}
                        onUpdate={(val) => setDistortionDist(val)}
                    />
                    <Knob
                        label="Dry/Wet"
                        value={distortionAmount}
                        onUpdate={(val) => setDistortionAmount(val)}
                    />
                </Module>

                <Module label="Delay" columns={4} rows={1}>
                    <Knob
                        label="Time"
                        value={delayTime}
                        onUpdate={(val) => setDelayTime(val)}
                    />
                    <Knob
                        label="Feedback"
                        value={delayFeedback}
                        onUpdate={(val) => setDelayFeedback(val)}
                    />
                    <Knob
                        label="Tone"
                        value={delayTone}
                        modifier={11000}
                        resetValue={4400}
                        isRounded
                        onUpdate={(val) => setDelayTone(val)}
                    />
                    <Knob
                        label="Dry/Wet"
                        value={delayAmount}
                        onUpdate={(val) => setDelayAmount(val)}
                    />
                </Module>

                <Module label="Reverb" columns={2} rows={1}>
                    <Select
                        label="Type"
                        options={REVERB}
                        value={reverbType}
                        onUpdate={(val) => setReverbType(val)}
                    />
                    <Knob
                        label="Dry/Wet"
                        value={reverbAmount}
                        onUpdate={(val) => setReverbAmount(val)}
                    />
                </Module>

                <Module label="Bit Crush" columns={2} rows={1}>
                    <Knob
                        label="Bit Depth"
                        value={bitCrushDepth}
                        modifier={14}
                        resetValue={8}
                        offset={2}
                        isRounded
                        onUpdate={(val) => setBitCrushDepth(val)}
                    />
                    <Knob
                        label="Dry/Wet"
                        value={bitCrushAmount}
                        onUpdate={(val) => setBitCrushAmount(val)}
                    />
                </Module>

                <Module label="Filter" columns={4} rows={2}>
                    <Select
                        label="Type"
                        options={FILTER}
                        value={filterType}
                        onUpdate={(val) => setFilterType(val)}
                    />
                    <Knob
                        label="Cutoff"
                        value={filterFreq}
                        modifier={11000}
                        resetValue={6000}
                        isRounded
                        onUpdate={(val) => setFilterFreq(val)}
                    />
                    <Knob
                        label="Q"
                        value={filterQ}
                        modifier={20}
                        onUpdate={(val) => setFilterQ(val)}
                    />
                    <Knob
                        label="Gain"
                        type="B"
                        value={filterGain}
                        modifier={40}
                        onUpdate={(val) => setFilterGain(val)}
                    />
                    <Knob
                        label="Attack"
                        value={filterAttack}
                        modifier={3}
                        onUpdate={(val) => setFilterAttack(val)}
                    />
                    <Knob
                        label="Decay"
                        value={filterDecay}
                        modifier={3}
                        onUpdate={(val) => setFilterDecay(val)}
                    />
                    <Knob
                        label="Release"
                        value={filterRelease}
                        modifier={3}
                        onUpdate={(val) => setFilterRelease(val)}
                    />
                    <Knob
                        label="Amount"
                        type="B"
                        modifier={11000}
                        isRounded
                        value={filterEnvAmount}
                        onUpdate={(val) => setFilterEnvAmount(val)}
                    />
                </Module>

                <Module label="EQ2" columns={2} rows={1}>
                    <Knob
                        label="Low Gain"
                        type="B"
                        modifier={24}
                        value={eqLowGain}
                        onUpdate={(val) => setEqLowGain(val)}
                    />
                    <Knob
                        label="High Gain"
                        type="B"
                        modifier={24}
                        value={eqHighGain}
                        onUpdate={(val) => setEqHighGain(val)}
                    />
                    <Knob
                        label="Low Freq"
                        modifier={640}
                        resetValue={320}
                        isRounded
                        value={eqLowFreq}
                        onUpdate={(val) => setEqLowFreq(val)}
                    />
                    <Knob
                        label="High Freq"
                        modifier={8600}
                        resetValue={3200}
                        offset={2400}
                        isRounded
                        value={eqHighFreq}
                        onUpdate={(val) => setEqHighFreq(val)}
                    />
                </Module>

                <Module label="Ping Pong Delay" columns={2} rows={2}>
                    <Knob
                        label="Time"
                        value={pingPongDelayTime}
                        onUpdate={(val) => setPingPongDelayTime(val)}
                    />
                    <Knob
                        label="Feedback"
                        value={pingPongFeedback}
                        onUpdate={(val) => setPingPongFeedback(val)}
                    />
                    <Knob
                        label="Tone"
                        value={pingPongTone}
                        modifier={11000}
                        resetValue={4400}
                        isRounded
                        onUpdate={(val) => setPingPongTone(val)}
                    />
                    <Knob
                        label="Dry/Wet"
                        value={pingPongAmount}
                        onUpdate={(val) => setPingPongAmount(val)}
                    />
                </Module>

                <Module label="Master Filter" columns={4} rows={1}>
                    <Select
                        label="Type"
                        options={FILTER}
                        value={masterFilterType}
                        onUpdate={(val) => setMasterFilterType(val)}
                    />
                    <Knob
                        label="Cutoff"
                        value={masterFilterFreq}
                        modifier={11000}
                        resetValue={11000}
                        isRounded
                        onUpdate={(val) => setMasterFilterFreq(val)}
                    />
                    <Knob
                        label="Q"
                        value={masterFilterQ}
                        modifier={20}
                        onUpdate={(val) => setMasterFilterQ(val)}
                    />
                    <Knob
                        label="Gain"
                        type="B"
                        value={masterFilterGain}
                        modifier={40}
                        onUpdate={(val) => setMasterFilterGain(val)}
                    />
                </Module>

                <Module label="Master" columns={2} rows={2}>
                    <Knob
                        label="Volume"
                        value={masterVolume}
                        onUpdate={(val) => setMasterVolume(val)}
                    />
                    <Knob
                        label="Polyphony"
                        value={polyphony}
                        modifier={7}
                        offset={1}
                        resetValue={8}
                        isRounded
                        onUpdate={(val) => {
                            setPolyphony(val);
                            resetSynthPos();
                        }}
                    />
                    <Knob
                        label="Portamento"
                        value={portamentoSpeed}
                        modifier={0.5}
                        onUpdate={(val) => setPortamentoSpeed(val)}
                        disabled={polyphony !== 1}
                    />
                </Module>

                <div />
                <Module label="Flanger" columns={4} rows={2}>
                    <Knob
                        label="Delay"
                        value={flangerDelay}
                        modifier={0.015}
                        offset={0.005}
                        resetValue={0.01}
                        onUpdate={(val) => setFlangerDelay(val)}
                    />
                    <Knob
                        label="Depth"
                        value={flangerDepth}
                        modifier={0.005}
                        onUpdate={(val) => setFlangerDepth(val)}
                    />
                    <Knob
                        label="Rate"
                        value={flangerRate}
                        modifier={2}
                        onUpdate={(val) => setFlangerRate(val)}
                    />
                    <Knob
                        label="Feedback"
                        value={flangerFeedback}
                        onUpdate={(val) => setFlangerFeedback(val)}
                    />
                    <Knob
                        label="Dry/Wet"
                        value={flangerAmount}
                        onUpdate={(val) => setFlangerAmount(val)}
                    />
                </Module>
                <div />

                <Lines />
                <Lines />
                <DotCircle />

            </ModuleGridContainer>

            <canvas ref={scopeCtx} id="scope" />
            <canvas ref={spectrumCtx} id="spectrum" />
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
