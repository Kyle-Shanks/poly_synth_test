import React, { useState, useEffect } from 'react';
import { ComponentContainer, ChannelMeter, MeterLines, MeterMask } from './PeakMeter.styled';

const BASE_CLASS_NAME = 'PeakMeter';

const getBaseLog = (x, y) => Math.log(y) / Math.log(x);
const getDb = (val) => getBaseLog(10, val) * 20;
const getMaskSize = (val) => Math.min(Math.floor(getDb(val) * 100 / -42), 100);

const PeakMeter = ({ audioCtx, sourceNode }) => {
    const meterNode = audioCtx.createScriptProcessor(2048, 2, 2);
    const [maskSizeL, setMaskSizeL] = useState(100);
    const [maskSizeR, setMaskSizeR] = useState(100);

    const updateMeter = ({ inputBuffer }) => {
        const lChannelData = inputBuffer.getChannelData(0);
        const rChannelData = inputBuffer.getChannelData(1);
        let lChannelMax = 0.0;
        let rChannelMax = 0.0;

        for (let sample = 0; sample < inputBuffer.length; sample++) {
            const lPoint = Math.abs(lChannelData[sample]);
            const rPoint = Math.abs(rChannelData[sample]);

            if (lPoint > lChannelMax) lChannelMax = lPoint;
            if (rPoint > rChannelMax) rChannelMax = rPoint;
        }

        setMaskSizeL(getMaskSize(lChannelMax));
        setMaskSizeR(getMaskSize(rChannelMax));
    }

    useEffect(() => {
        sourceNode.connect(meterNode);
        meterNode.connect(audioCtx.destination);
        meterNode.onaudioprocess = updateMeter;
    }, []);

    return (
        <ComponentContainer className={BASE_CLASS_NAME}>
            <ChannelMeter>
                <MeterLines />
                <MeterMask style={{ width: `${maskSizeL}%` }} />
            </ChannelMeter>
            <ChannelMeter>
                <MeterLines />
                <MeterMask style={{ width: `${maskSizeR}%` }} />
            </ChannelMeter>
        </ComponentContainer>
    );
};

export default PeakMeter;
