import Gain from './gain';

const MAX_FREQ = 44100;

class Oscillator {
    constructor(AC) {
        this.AC = AC;
        this.WAVEFORMS = ['sine', 'triangle', 'square', 'sawtooth'];

        this.node = this.AC.createOscillator();
        this.gain = new Gain(this.AC);

        this.node.connect(this.gain.getNode());
    }

    connect = (destination) => {
        if (Array.isArray(destination)) {
            destination.forEach((dest) => this.gain.connect(dest));
        } else {
            this.gain.connect(destination);
        }
    }
    start = () => this.node.start();

    // Getters
    getNode = () => this.node;
    getType = () => this.node.type;
    getFreq = () => this.node.frequency.value;

    // Setters
    setType = (type) => {
        if (!this.WAVEFORMS.includes(type)) return false;
        this.node.type = type;
    }
    setFreq = (freq, time = 0) => {
        if (freq < 0 || freq > MAX_FREQ) return false;
        time
            ? this.node.frequency.setTargetAtTime(freq, this.AC.currentTime, time)
            : this.node.frequency.setValueAtTime(freq, this.AC.currentTime);

    }
    setGain = (val) => this.gain.setGain(val);
}

export default Oscillator;
