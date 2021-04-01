import Gain from './gain';
import Oscillator from './oscillator';

class SignalGenerator {
    constructor(AC) {
        this.AC = AC;
        this.osc = new Oscillator(this.AC);
        this.gain = new Gain(this.AC);

        this.waveshaper = this.AC.createWaveShaper();
        this.waveshaper.curve = new Float32Array(44100).fill(1);
        this.waveshaper.oversample = 'none';

        this.osc.connect(this.waveshaper);
        this.waveshaper.connect(this.gain.getNode());
    }

    connect = (destination) => {
        if (Array.isArray(destination)) {
            destination.forEach((dest) => this.gain.connect(dest));
        } else {
            this.gain.connect(destination);
        }
    }

    start = () => this.osc.start();

    // Getters
    getNode = () => this.osc;
    getGain = () => this.gain.getGain();

    // Setters
    setGain = (val, time) => this.gain.setGain(val, time);
}

export default SignalGenerator;
