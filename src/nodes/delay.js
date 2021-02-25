import Gain from './gain';
import Filter from './filter';

class Delay {
    constructor(AC) {
        this.AC = AC;
        this.dryGain = new Gain(this.AC);
        this.wetGain = new Gain(this.AC);

        this.delay = this.AC.createDelay();
        this.tone = new Filter(this.AC);
        this.feedbackGain = new Gain(this.AC);

        this.tone.connect(this.delay);
        this.delay.connect(this.feedbackGain.getNode());
        this.feedbackGain.connect(this.wetGain.getNode());
        this.feedbackGain.connect(this.delay);

        this.amount = 0;
        this.maxDelayTime = 1;

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
    getNode = () => [this.dryGain.getNode(), this.tone.getNode()];
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
        if (val < 0 || val > this.maxDelayTime) return false;
        this.delay.delayTime.setValueAtTime(val, this.AC.currentTime);
    }
}

export default Delay;
