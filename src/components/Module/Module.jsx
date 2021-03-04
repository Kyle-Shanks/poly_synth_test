import React from 'react';
import PropTypes from 'prop-types';
import { ComponentContainer, GridContainer, Bolt, Label } from './Module.styled';

const BASE_CLASS_NAME = 'Module';

const Module = ({ className, children, columns, gap, label, rows }) => (
    <ComponentContainer className={`${BASE_CLASS_NAME} ${className}`.trim()}>
        <Bolt />
        <Bolt />
        <Bolt />
        <Bolt />
        <Label className={`${BASE_CLASS_NAME}__Label`}>{label}</Label>
        <GridContainer
            className={`${BASE_CLASS_NAME}__GridContainer`}
            columns={columns}
            rows={rows}
            gap={gap}
        >
            {children}
        </GridContainer>
    </ComponentContainer>
);

Module.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    label: PropTypes.string.isRequired,
    // Grid props
    columns: PropTypes.number,
    rows: PropTypes.number,
    gap: PropTypes.string,
};

Module.defaultProps = {
    className: '',
    children: null,
    columns: 1,
    rows: 1,
    gap: '0rem',
};

export default Module;
