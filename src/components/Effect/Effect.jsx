import React from 'react';
import PropTypes from 'prop-types';
import { ComponentContainer, GridContainer, Bolt, Label } from './Effect.styled';

const BASE_CLASS_NAME = 'Effect';

const Effect = ({ className, children, columns, gap, label, rows }) => {

    return (
        <ComponentContainer className={`${BASE_CLASS_NAME} ${className}`.trim()}>
            <Bolt />
            <Bolt />
            <Bolt />
            <Bolt />
            <Label>{label}</Label>
            <GridContainer columns={columns} rows={rows} gap={gap}>
                {children}
            </GridContainer>
        </ComponentContainer>
    );
};

Effect.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    label: PropTypes.string.isRequired,
    // Grid props
    columns: PropTypes.number,
    rows: PropTypes.number,
    gap: PropTypes.string,
};

Effect.defaultProps = {
    className: '',
    children: null,
    columns: 1,
    rows: 1,
    gap: '0rem',
};

export default Effect;
