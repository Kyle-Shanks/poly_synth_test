class Compressor {
    constructor(AC) {
        this.AC = AC;
        this.node = this.AC.createDynamicsCompressor();
        this.node.attack.value = 0.005;
        this.node.release.value = 0.05;
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
    getThreshold = () => this.node.threshold.value;
    getRatio = () => this.node.ratio.value;

    // Setters
    setKnee = (val) => {
        this.node.knee.setValueAtTime(val, this.AC.currentTime);
    }
    setThreshold = (val) => {
        this.node.threshold.setValueAtTime(val, this.AC.currentTime);
    }
    setRatio = (val) => {
        this.node.ratio.setValueAtTime(val, this.AC.currentTime);
    }
    setAttack = (val) => {
        this.node.attack.setValueAtTime(val, this.AC.currentTime);
    }
    setRelease = (val) => {
        this.node.release.setValueAtTime(val, this.AC.currentTime);
    }
}

export default Compressor;
