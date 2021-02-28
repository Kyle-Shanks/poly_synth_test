import styled from 'styled-components';
import { relaInline } from 'src/styles/util';
import { SPACING, borderWidthS, borderRadiusM } from 'src/styles/constants';

export const ComponentContainer = styled.div`
    ${relaInline}
    padding: ${SPACING.m};
    border: ${borderWidthS} solid ${({theme}) => theme.strong};
    border-radius: ${borderRadiusM};
`;

export const GridContainer = styled.div`
    display: grid;
    position: relative;
    grid-template-rows: ${({ rows }) => `repeat(${rows}, 1fr)`};
    grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};
    gap: ${({ gap }) => gap };
`;

export const Label = styled.h4`
    position: absolute;
    top: 0;
    left: ${SPACING.ml};
    transform: translateY(-50%);
    padding: 0 ${SPACING.s} ${SPACING.xs};
    background-color: ${({theme}) => theme.background};
`;

export const Bolt = styled.div`
    position: absolute;
    height: 0.375rem;
    width: 0.375rem;
    border: ${borderWidthS} solid ${({ theme }) => theme.strong};
    border-radius: 100%;

    &:nth-child(1) {
        top: ${SPACING.s};
        left: ${SPACING.s};
    }
    &:nth-child(2) {
        top: ${SPACING.s};
        right: ${SPACING.s};
    }
    &:nth-child(3) {
        bottom: ${SPACING.s};
        left: ${SPACING.s};
    }
    &:nth-child(4) {
        bottom: ${SPACING.s};
        right: ${SPACING.s};
    }
`;
