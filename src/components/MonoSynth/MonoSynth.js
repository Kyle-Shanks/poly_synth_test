import { Oscillator, Gain, Filter } from 'src/nodes';
import { clamp, minTime } from 'src/util/util';

// Monophonic Synth Class
class MonoSynth {
    constructor(AC) {
        this.AC = AC;

        this.osc = new Oscillator(this.AC);
        this.gain = new Gain(this.AC); // ADSR Gain
        this.volume = new Gain(this.AC); // Volume
        this.filter = new Filter(this.AC);

        this.currentNote = null;
        this.timeoutIds = [];
    }

    init() {
        this.osc.connect(this.gain.getNode());
        this.gain.connect(this.filter.getNode());
        this.filter.connect(this.volume.getNode());

        this.volume.setGain(0.2);
        this.gain.setGain(0);
        this.osc.start();
    }

    connect = (destination) => {
        if (Array.isArray(destination)) {
            destination.forEach((dest) => this.volume.connect(dest));
        } else {
            this.volume.connect(destination);
        }
    }

    clearTimeouts() {
        this.timeoutIds.forEach((id) => clearTimeout(id));
    }

    // Getters
    getNode = () => this.osc.getNode();
    getWaveform = () => this.osc.getType();
    getFilterType = () => this.filter.getType();
    getFilterFreq = () => this.filter.getFreq();
    getFilterQ = () => this.filter.getQ();
    getFilterGain = () => this.filter.getGain();

    // Parameter setters
    setVolume = (val) => this.volume.setGain(clamp(val, 0, 1));
    setWaveform = (type) => this.osc.setType(type);
    setFilterType = (val) => this.filter.setType(val);
    setFilterFreq = (val) => this.filter.setFreq(val);
    setFilterQ = (val) => this.filter.setQ(val);
    setFilterGain = (val) => this.filter.setGain(val);

    // Note trigger methods
    noteOn = (noteInfo, synthProps) => {
        if (!noteInfo) return;

        this.clearTimeouts();
        const { freq, note } = noteInfo;
        const { gainEnv, filterEnv, portamentoSpeed } = synthProps;

        this.currentNote = note;
        this.osc.setFreq(freq, portamentoSpeed);

        // Gain Envelope ADS (R is in noteOff())
        if (gainEnv.a) {
            this.gain.setGain(0, 0); // Reset Volume
            const attackTime = Math.max(gainEnv.a, minTime);
            this.gain.setGain(1, attackTime); // Attack

            const timeoutId = setTimeout(() => {
                this.gain.setGain(gainEnv.s, Math.max(gainEnv.d, minTime)); // Decay
            }, (attackTime * 1000));
            this.timeoutIds.push(timeoutId);
        } else if (gainEnv.d) {
            this.gain.setGain(1, minTime); // Reset Volume

            const timeoutId = setTimeout(() => {
                this.gain.setGain(gainEnv.s, Math.max(gainEnv.d, minTime)); // Decay
            }, (minTime * 1000));
            this.timeoutIds.push(timeoutId);
        } else if (gainEnv.s) {
            this.gain.setGain(gainEnv.s, minTime); // Set Volume
        }

        // Filter Envelope ADS (R is in noteOff())
        if (filterEnv.amount) {
            if (filterEnv.a) {
                this.filter.setDetune(0, 0); // Reset Detune
                const attackTime = Math.max(filterEnv.a, minTime);
                this.filter.setDetune(filterEnv.amount, attackTime); // Attack

                const timeoutId = setTimeout(() => {
                    this.filter.setDetune(0, Math.max(filterEnv.d, minTime)); // Decay
                }, (attackTime * 1000));
                this.timeoutIds.push(timeoutId);
            } else if (filterEnv.d) {
                this.filter.setDetune(filterEnv.amount, 0); // Reset Detune
                this.filter.setDetune(0, Math.max(filterEnv.d, minTime)); // Decay
            }
        }
    }
    noteOff = ({ gainEnv, filterEnv }) => {
        this.clearTimeouts();
        this.currentNote = null;
        this.gain.setGain(0, Math.max(gainEnv.r, minTime)); // Release
        this.filter.setDetune(0, Math.max(filterEnv.r, minTime)); // Release
    }
    noteStop = () => {
        this.clearTimeouts();
        this.currentNote = null;
        this.gain.setGain(0, minTime);
        this.filter.setDetune(0, minTime);
    }
}

export default MonoSynth;
