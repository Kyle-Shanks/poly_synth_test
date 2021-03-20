import Gain from './gain';
import Filter from './filter';
import Oscillator from './oscillator';
import LFO from './lfo';

const MAX_DELAY_TIME = 1;
const MAX_LFO_RATE = 5;
const MAX_LFO_DEPTH = 5;

class Flanger {
    constructor(AC) {
        this.AC = AC;
        this.dryGain = new Gain(this.AC);
        this.wetGain = new Gain(this.AC);

        this.inputGain = new Gain(this.AC);
        this.delay = this.AC.createDelay();
        this.feedback = new Gain(this.AC);
        this.lfo = new LFO(this.AC);

        this.inputGain.connect(this.delay);
        this.inputGain.connect(this.wetGain.getNode());

        this.delay.connect(this.feedback.getNode());
        this.delay.connect(this.wetGain.getNode());

        this.feedback.connect(this.inputGain.getNode());

        this.lfo.connect(this.delay.delayTime);
        this.lfo.start();
    }

    connect = destination => {
        if (Array.isArray(destination)) {
            destination.forEach((dest) => {
                this.dryGain.connect(dest);
                this.wetGain.connect(dest);
            });
        } else {
            this.dryGain.connect(destination);
            this.wetGain.connect(destination);
        }
    }

    // Getters
    getNode = () => [this.dryGain.getNode(), this.inputGain.getNode()];
    getAmount = () => this.amount;
    getDelay = () => this.delay.delayTime.value;
    getDepth = () => this.lfo.getDepth();
    getFeedback = () => this.feedback.getGain();
    getRate = () => this.lfo.getRate();

    // Setters
    setAmount = (val) => {
        this.amount = val;
        if (val < 0.5) {
            this.dryGain.setGain(1);
            this.wetGain.setGain(val * 2);
        } else {
            this.dryGain.setGain(1 - ((val - 0.5) * 2));
            this.wetGain.setGain(1);
        }
    }
    setFeedback = (val) => this.feedback.setGain(val);
    setRate = (val) => this.lfo.setRate(val);
    setDepth = (val) => this.lfo.setDepth(val);
    setDelay = (val) => {
        if (val < 0 || val > MAX_DELAY_TIME) return false;
        this.delay.delayTime.setValueAtTime(val, this.AC.currentTime);
    }
}

export default Flanger;
