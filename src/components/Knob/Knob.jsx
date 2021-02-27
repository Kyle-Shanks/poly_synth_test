import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { clamp } from 'src/util/util';
import {
    ComponentContainer,
    Label,
    KnobContainer,
    KnobSvg,
    KnobDial,
    BackgroundMeter,
    ActiveMeter,
} from './Knob.styled';

const BASE_CLASS_NAME = 'Knob';

const maxRotation = 132;
const typeInfo = {
    A: {
        path: 'M20,76 A 40 40 0 1 1 80 76',
        dashLength: 184,
        offset: 132,
    },
    B: {
        path: 'M50.01,10 A 40 40 0 1 1 50 10',
        dashLength: 251.5,
        offset: 0,
    },
};

let currentY = 0;

const Knob = ({ isRounded, label, modifier, offset, onUpdate, type, value }) => {
    const getValueFromKnobRotation = (knobRotation) => {
        const val = (type === 'A')
            ? ((knobRotation + maxRotation) / (maxRotation * 2))
            : (knobRotation / maxRotation);

        const output = val * modifier + offset;

        return isRounded ? Math.round(output) : output;
    };
    const getKnobRotationFromValue = (value) => {
        return (type === 'A')
            ? (((value - offset) / modifier) * 2 * maxRotation) - maxRotation
            : ((value - offset) / modifier) * maxRotation;
    };

    const [rotation, setRotation] = useState(getKnobRotationFromValue(value));
    const rotationRef = useRef(rotation);

    const handleUpdate = (mouseY) => {
        const newRotation = clamp(rotationRef.current - (mouseY - currentY), -maxRotation, maxRotation);
        onUpdate(getValueFromKnobRotation(newRotation));
    };

    const handleMouseMove = (e) => {
        handleUpdate(e.clientY);
        currentY = e.clientY;
    }
    const handleMouseUp = (e) => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        currentY = 0;
    }
    const handleMouseDown = (e) => {
        currentY = e.clientY;
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }

    const getDashOffset = (rotation, type) => (
        typeInfo[type].dashLength - (184 / (maxRotation * 2)) * (rotation + typeInfo[type].offset)
    );

    useEffect(() => {
        const newRotation = getKnobRotationFromValue(value);

        setRotation(newRotation);
        rotationRef.current = newRotation;
    }, [value])

    return (
        <ComponentContainer className={`${BASE_CLASS_NAME}`}>
            <KnobContainer
                className={`${BASE_CLASS_NAME}__container`}
                onMouseDown={handleMouseDown}
            >
                <KnobSvg className={`${BASE_CLASS_NAME}__svg`} viewBox="0 0 100 100">
                    <BackgroundMeter d={"M20,76 A 40 40 0 1 1 80 76"} />
                    <ActiveMeter
                        d={typeInfo[type].path}
                        strokeDasharray={typeInfo[type].dashLength}
                        style={{ strokeDashoffset: getDashOffset(rotation, type) }}
                    />
                </KnobSvg>
                <KnobDial
                    className={`${BASE_CLASS_NAME}__dial`}
                    style={{ transform: `translate(-50%,-50%) rotate(${rotation}deg)` }}
                />
            </KnobContainer>
            <Label>
                <div className="label-text">{label}</div>
                <div className="value-text">
                    {Math.round(getValueFromKnobRotation(rotation) * 100) / 100}
                </div>
            </Label>
        </ComponentContainer>
    );
};

Knob.propTypes = {
    isRounded: PropTypes.bool,
    label: PropTypes.string.isRequired,
    // Defines the multiplier/max for the knob
    modifier: PropTypes.number,
    // Defines the offset/starting point of the knob
    offset: PropTypes.number,
    onUpdate: PropTypes.func,
    // Defines if it is a one way or two way knob
    type: PropTypes.oneOf(['A', 'B']),
    value: PropTypes.number,
};

Knob.defaultProps = {
    isRounded: false,
    modifier: 1,
    offset: 0,
    onUpdate: () => {},
    type: 'A',
    value: 0,
};

export default Knob;
