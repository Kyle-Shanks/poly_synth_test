import React from 'react';
import PropTypes from 'prop-types';
import { ComponentContainer } from './KnobGrid.styled';

const BASE_CLASS_NAME = 'KnobGrid';

const KnobGrid = ({ className, children, columns, rows, gap }) => {

    return (
        <ComponentContainer
            className={`${BASE_CLASS_NAME} ${className}`.trim()}
            columns={columns}
            rows={rows}
            gap={gap}
        >
            {children}
        </ComponentContainer>
    );
};

KnobGrid.propTypes = {
    className: PropTypes.string,
    columns: PropTypes.number,
    rows: PropTypes.number,
    gap: PropTypes.string,
};

KnobGrid.defaultProps = {
    className: '',
    columns: 1,
    rows: 1,
    gap: '0rem',
};

export default KnobGrid;
