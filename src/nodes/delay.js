import Gain from './gain';
import Filter from './filter';

const MAX_DELAY_TIME = 1;

class Delay {
    constructor(AC) {
        this.AC = AC;
        this.dryGain = new Gain(this.AC);
        this.wetGain = new Gain(this.AC);

        this.delay = this.AC.createDelay();
        this.feedbackGain = new Gain(this.AC);
        this.tone = new Filter(this.AC);

        this.delay.connect(this.feedbackGain.getNode());
        this.feedbackGain.connect(this.tone.getNode());
        this.feedbackGain.connect(this.delay);
        this.tone.connect(this.wetGain.getNode());

        this.amount = 0;

        this.setAmount(0);
        this.setFeedback(0);
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
    getNode = () => [this.dryGain.getNode(), this.delay];
    getAmount = () => this.amount;
    getDelayTime = () => this.delay.delayTime.value;
    getTone = () => this.tone.getFreq();
    getFeedback = () => this.feedbackGain.getGain();

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
    setFeedback = (val) => this.feedbackGain.setGain(val);
    setTone = (val) => this.tone.setFreq(val);
    setDelayTime = (val) => {
        if (val < 0 || val > MAX_DELAY_TIME) return false;
        this.delay.delayTime.setValueAtTime(val, this.AC.currentTime);
    }
}

export default Delay;
