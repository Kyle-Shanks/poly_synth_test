import React, { useState, useLayoutEffect, useRef } from 'react';
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

const Knob = ({ disabled, isRounded, label, modifier, offset, onUpdate, type, value }) => {
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
    const valueRef = useRef(value);

    const handleUpdate = (mouseY) => {
        const newRotation = clamp(rotationRef.current - (mouseY - currentY), -maxRotation, maxRotation);
        const newValue = getValueFromKnobRotation(newRotation);

        rotationRef.current = newRotation;
        setRotation(newRotation);

        if (newValue !== valueRef.current) {
            valueRef.current = newValue;
            onUpdate(newValue);
        }
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

    useLayoutEffect(() => {
        if (value !== valueRef.current) {
            const newRotation = getKnobRotationFromValue(value);

            setRotation(newRotation);
            rotationRef.current = newRotation;
            valueRef.current = value;
        }
    }, [value])

    return (
        <ComponentContainer className={`${BASE_CLASS_NAME}`} disabled={disabled}>
            <KnobContainer
                className={`${BASE_CLASS_NAME}__container`}
                onMouseDown={handleMouseDown}
                disabled={disabled}
            >
                <KnobSvg className={`${BASE_CLASS_NAME}__svg`} viewBox="0 0 100 100">
                    <BackgroundMeter d="M20,76 A 40 40 0 1 1 80 76" />
                    <ActiveMeter
                        d={typeInfo[type].path}
                        strokeDasharray={typeInfo[type].dashLength}
                        style={{ strokeDashoffset: getDashOffset(rotation, type) }}
                        disabled={disabled}
                    />
                </KnobSvg>
                <KnobDial
                    className={`${BASE_CLASS_NAME}__dial`}
                    style={{ transform: `translate(-50%,-50%) rotate(${rotation}deg)` }}
                    disabled={disabled}
                />
            </KnobContainer>
            <Label disabled={disabled}>
                <div className="label-text">{label}</div>
                <div className="value-text">
                    {Math.round(getValueFromKnobRotation(rotation) * 100) / 100}
                </div>
            </Label>
        </ComponentContainer>
    );
};

Knob.propTypes = {
    disabled: PropTypes.bool,
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
    disabled: false,
    isRounded: false,
    modifier: 1,
    offset: 0,
    onUpdate: () => {},
    type: 'A',
    value: 0,
};

export default Knob;
