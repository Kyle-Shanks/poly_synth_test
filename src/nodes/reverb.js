import Gain from './gain';
import { rev1, rev2, rev3, rev4, rev5, rev6 } from './reverbBase64Strings';

const base64ToArrayBuffer = base64 => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes.buffer;
}

const reverbTypeToBufferMap = {
    'reverb1': rev1,
    'reverb2': rev2,
    'reverb3': rev3,
    'reverb4': rev4,
    'reverb5': rev5,
    'reverb6': rev6,
};

class Reverb {
    constructor(AC) {
        this.AC = AC;
        this.type = 'reverb1';
        this.node = this.AC.createConvolver();
        this.dryGain = new Gain(this.AC);
        this.wetGain = new Gain(this.AC);
        this.node.connect(this.wetGain.getNode());

        this.setType('reverb1');
        this.setAmount(0);
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
    getNode = () => [this.dryGain.getNode(), this.node];
    getType = () => this.type;
    getAmount = () => this.wetGain.getGain();

    // Setters
    setAmount = val => {
        this.amount = val;
        if (val < 0.5) {
            this.dryGain.setGain(1);
            this.wetGain.setGain(val * 2);
        } else {
            this.dryGain.setGain(1 - ((val - 0.5) * 2));
            this.wetGain.setGain(1);
        }
    }
    setType = val => {
        if (!reverbTypeToBufferMap.hasOwnProperty(val)) return false;
        this.type = val;
        const rev = reverbTypeToBufferMap[val];
        this.AC.decodeAudioData(base64ToArrayBuffer(rev),
            buffer => this.node.buffer = buffer,
            e => alert('Error when decoding audio data' + e.err)
        );
    };
}

export default Reverb;
