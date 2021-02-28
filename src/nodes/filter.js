class Filter {
    constructor(AC) {
        this.AC = AC;
        this.TYPES = ['lowpass', 'highpass', 'bandpass', 'notch', 'peaking', 'lowshelf', 'highshelf'];
        this.maxFreq = 11000;
        this.maxQ = 100;

        this.node = this.AC.createBiquadFilter();

        this.node.type = 'lowpass';
        this.node.frequency.setValueAtTime(this.maxFreq, this.AC.currentTime);
    }

    connect = (destination) => {
        if (Array.isArray(destination)) {
            destination.forEach((dest) => this.node.connect(dest));
        } else {
            this.node.connect(destination);
        }
    }

    // Getters
    getNode = () => this.node;
    getType = () => this.node.type;
    getFreq = () => this.node.frequency.value;
    getQ = () => this.node.Q.value;
    getGain = () => this.node.gain.value;
    getDetune = () => this.node.detune.value;

    // Setters
    setType = (type) => {
        if (!this.TYPES.includes(type)) return false;
        this.node.type = type;
    }
    setFreq = (freq, time = 0) => {
        if (freq < 0 || freq > this.maxFreq) return false;
        time
            ? this.node.frequency.setTargetAtTime(freq, this.AC.currentTime, time)
            : this.node.frequency.setValueAtTime(freq, this.AC.currentTime);
    }
    setQ = q => {
        if (q < 0 || q > this.maxQ) return false;
        this.node.Q.setValueAtTime(q, this.AC.currentTime);
    }
    setGain = val => {
        this.node.gain.setValueAtTime(val, this.AC.currentTime);
    }
    setDetune = (val, time = 0) => {
        time
            ? this.node.detune.setTargetAtTime(val, this.AC.currentTime, time)
            : this.node.detune.setValueAtTime(val, this.AC.currentTime);
    }
}

export default Filter;
