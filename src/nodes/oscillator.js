const MAX_FREQ = 44100;

class Oscillator {
    constructor(AC) {
        this.AC = AC;
        this.WAVEFORMS = ['sine', 'triangle', 'square', 'sawtooth'];
        this.node = this.AC.createOscillator();
    }

    connect = (destination) => {
        if (Array.isArray(destination)) {
            destination.forEach((dest) => this.node.connect(dest));
        } else {
            this.node.connect(destination);
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
}

export default Oscillator;
