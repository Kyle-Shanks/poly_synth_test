const MAX_GAIN = 10;
const MAX_FREQ = 11000;
const MAX_LOW_FREQ = 1000;
const MIN_HIGH_FREQ = 1000;

class EQ2 {
    constructor(AC) {
        this.AC = AC;

        // Low
        this.low = this.AC.createBiquadFilter();
        this.low.type = 'lowshelf';
        this.low.frequency.value = 320.0;
        this.low.gain.value = 0.0;
        // High
        this.high = this.AC.createBiquadFilter();
        this.high.type = 'highshelf';
        this.high.frequency.value = 3200.0;
        this.high.gain.value = 0.0;

        this.low.connect(this.high);
    }

    connect = (destination) => {
        if (Array.isArray(destination)) {
            destination.forEach((dest) => this.high.connect(dest));
        } else {
            this.high.connect(destination);
        }
    }

    // Getters
    getNode = () => this.low;
    getLowGain = () => this.low.gain.value;
    getHighGain = () => this.high.gain.value;
    getLowFreq = () => this.low.frequency.value;
    getHighFreq = () => this.high.frequency.value;

    // Setters
    setLowGain = (gain, time = 0) => {
        if (gain < -MAX_GAIN || gain > MAX_GAIN) return false;
        time
            ? this.low.gain.setTargetAtTime(gain, this.AC.currentTime, time)
            : this.low.gain.setValueAtTime(gain, this.AC.currentTime);
    }
    setHighGain = (gain, time = 0) => {
        if (gain < -MAX_GAIN || gain > MAX_GAIN) return false;
        time
            ? this.high.gain.setTargetAtTime(gain, this.AC.currentTime, time)
            : this.high.gain.setValueAtTime(gain, this.AC.currentTime);
    }
    setLowFreq = (freq) => {
        if (freq < 0 || freq > MAX_LOW_FREQ) return false;
        this.low.frequency.setValueAtTime(freq, this.AC.currentTime);
    }
    setHighFreq = (freq) => {
        if (freq < MIN_HIGH_FREQ || freq > MAX_FREQ) return false;
        this.high.frequency.setValueAtTime(freq, this.AC.currentTime);
    }
}

export default EQ2;
