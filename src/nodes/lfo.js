import Gain from './gain';
import Oscillator from './oscillator';

const MAX_RATE = 100;
const MAX_DEPTH = 1000;

class LFO {
    constructor(AC) {
        this.AC = AC;

        this.depth = new Gain(this.AC);
        this.osc = new Oscillator(this.AC);
        this.osc.setType('sine');

        this.osc.connect(this.depth.getNode());
    }

    connect = (destination) => {
        if (Array.isArray(destination)) {
            destination.forEach((dest) => this.depth.connect(dest));
        } else {
            this.depth.connect(destination);
        }
    }
    start = () => this.osc.start();

    getNode = () => this.osc.getNode();
    getDepthNode = () => this.depth.getNode();
    getRate = () => this.osc.getFreq();
    getDepth = () => this.depth.getGain();

    // Setters
    setRate = val => {
        if (val < 0 || val > MAX_RATE) return false;
        this.osc.setFreq(val);
    }
    setDepth = val => {
        if (val < 0 || val > MAX_DEPTH) return false;
        this.depth.setGain(val);
    }
    setType = type => this.osc.setType(type);
}

export default LFO;
