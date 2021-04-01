class Source {
    constructor(AC) {
        this.AC = AC;
        this.source = this.AC.createConstantSource();

        // this.bufferSource = this.AC.createBufferSource();
        // const buffer = this.AC.createBuffer(1, 1, this.AC.sampleRate);
        // const data = buffer.getChannelData(0);
        // data[0] = 1;
        // this.bufferSource.buffer = buffer;
        // this.bufferSource.loop = true;
    }

    connect = (destination) => {
        if (Array.isArray(destination)) {
            destination.forEach((dest) => this.source.connect(dest));
        } else {
            this.source.connect(destination);
        }
    }

    start = () => {
        this.source.start(0);
    }

    // Getters
    getNode = () => this.source;
}

export default Source;
