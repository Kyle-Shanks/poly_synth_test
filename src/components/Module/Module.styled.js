import styled from 'styled-components';
import { relaInline, absCenter } from 'src/styles/util';
import { SPACING, borderWidthS, borderRadiusM } from 'src/styles/constants';

export const ComponentContainer = styled.div`
    ${relaInline}
    height: 100%;
    width: 100%;
    padding: ${SPACING.m};
    border: ${borderWidthS} solid ${({ theme }) => theme.strong};
    border-radius: ${borderRadiusM};
    background-color: ${({ theme }) => theme.background};
`;

export const Label = styled.h4`
    ${absCenter}
    top: 0;
    width: fit-content;
    color: ${({ theme }) => theme.pop};
    padding: 0 ${SPACING.s} ${SPACING.xs};
    background-color: ${({theme}) => theme.background};
    letter-spacing: 0.5px;
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
