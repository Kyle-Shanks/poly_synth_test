import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    ComponentContainer,
    Label,
    InputContainer,
    Input,
    Dropdown,
    DropdownSvg,
} from './Select.styled';

const Select = ({ className, value, label, onUpdate, options }) => {
    const BASE_CLASS_NAME = 'Select';

    // Dropdown State
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const openDropdown = () => setDropdownOpen(true);
    const closeDropdown = () => setDropdownOpen(false);
    const toggleDropdown = () => dropdownOpen ? closeDropdown() : openDropdown();

    // Handle closing the dropdown when clicking outside of the component
    const containerRef = useRef();
    const handleClick = e => {
        if (document.contains(e.target) && !containerRef.current.contains(e.target)) {
            closeDropdown();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return (
        <ComponentContainer className={`${BASE_CLASS_NAME} ${className}`.trim()} ref={containerRef}>
            <InputContainer className={`${BASE_CLASS_NAME}__InputContainer`}>
                <Input
                    className={`${BASE_CLASS_NAME}__Input`}
                    onClick={toggleDropdown}
                    isDropdownOpen={dropdownOpen}
                >
                    <svg viewBox="0 0 50 50">
                        <path d={options[value]} />
                    </svg>
                </Input>
                <Dropdown className={`${BASE_CLASS_NAME}__Dropdown`} isOpen={dropdownOpen}>
                    {Object.keys(options).map(option => (
                        <DropdownSvg
                            viewBox="0 0 50 50"
                            onClick={() => { onUpdate(option); closeDropdown(); }}
                            selected={option === value}
                            key={`${label}_svg_${option}`}
                        >
                            <rect height="40" width="40" x="5" y="5" fill="none" rx="4" />
                            <path d={options[option]} />
                        </DropdownSvg>
                    ))}
                </Dropdown>
            </InputContainer>
            <Label className={`${BASE_CLASS_NAME}__Label`}>
                <div className="label-text">{label}</div>
                <div className="value-text">{value}</div>
            </Label>
        </ComponentContainer>
    );
};

Select.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string.isRequired,
    onUpdate: PropTypes.func,
    // Should be a map of values pointing to svg paths
    options: PropTypes.object.isRequired,
};

Select.defaultProps = {
    className: '',
    value: '',
    onUpdate: () => {},
};

export default Select;