import Gain from './gain';
import Filter from './filter';

const MAX_DELAY_TIME = 1;

class PingPongDelay {
    constructor(AC) {
        this.AC = AC;
        this.dryGain = new Gain(this.AC);
        this.wetGain = new Gain(this.AC);

        this.leftDelay = this.AC.createDelay();
        this.preDelay = this.AC.createDelay();
        this.rightDelay = this.AC.createDelay();
        this.leftFeedbackGain = new Gain(this.AC);
        this.rightFeedbackGain = new Gain(this.AC);
        this.channelMerger = this.AC.createChannelMerger(2);
        this.tone = new Filter(this.AC);

        this.preDelay.connect(this.rightDelay);

        this.leftDelay.connect(this.channelMerger, 0, 0);
        this.rightDelay.connect(this.channelMerger, 0, 1);

        this.leftDelay.connect(this.leftFeedbackGain.getNode());
        this.leftFeedbackGain.connect(this.rightDelay);

        this.rightDelay.connect(this.rightFeedbackGain.getNode());
        this.rightFeedbackGain.connect(this.leftDelay);

        this.channelMerger.connect(this.tone.getNode());
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
    getNode = () => [this.dryGain.getNode(), this.leftDelay, this.preDelay];
    getAmount = () => this.amount;
    getDelayTime = () => this.leftDelay.delayTime.value;
    getTone = () => this.tone.getFreq();
    getFeedback = () => this.leftFeedbackGain.getGain();

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
    setFeedback = (val) => {
        this.leftFeedbackGain.setGain(val);
        this.rightFeedbackGain.setGain(val);
    }
    setTone = (val) => this.tone.setFreq(val);
    setDelayTime = (val) => {
        if (val < 0 || val > MAX_DELAY_TIME) return false;
        this.leftDelay.delayTime.setValueAtTime(val, this.AC.currentTime);
        this.preDelay.delayTime.setValueAtTime(val, this.AC.currentTime);
        this.rightDelay.delayTime.setValueAtTime(val, this.AC.currentTime);
    }
}

export default PingPongDelay;
