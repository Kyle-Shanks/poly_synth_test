import styled from 'styled-components';
import { SPACING, borderRadiusM, borderWidthS } from 'src/styles/constants';

export const ModuleGridContainer = styled.div`
    display: grid;
    position: relative;
    width: 64rem;
    grid-template-columns: repeat(3, 1fr);
    gap: ${SPACING.l};
    justify-items: center;
    // align-items: center;
    align-items: flex-start;
    margin: ${SPACING.m} auto;
    padding: ${SPACING.l};
    border: ${borderWidthS} solid ${({ theme }) => theme.strong};
    border-radius: ${borderRadiusM};
    background-color: ${({ theme }) => theme.background};

    &::before {
        z-index: -1;
        content: '';
        position: absolute;
        top: 3rem;
        left: 3rem;
        height: 100%;
        width: 100%;
        overflow: hidden;

        // Polkadot styles
        background-image: radial-gradient(${({ theme }) => theme.strong} 2px, transparent 2px);
        background-size: 0.75rem 0.75rem;
    }
`;

export const ModuleFlexContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: relative;
    width: 64rem;
    gap: ${SPACING.xl} ${SPACING.l};
    margin: ${SPACING.m} auto;
    padding: ${SPACING.l} ${SPACING.xl} ${SPACING.xl} ${SPACING.l};
    border: ${borderWidthS} solid ${({ theme }) => theme.strong};
    border-radius: ${borderRadiusM};
`;

export const DotCircle = styled.div`
    height: 12rem;
    width: 12rem;
    border-radius: 48%;
    overflow: hidden;
    background-image: radial-gradient(${({ theme }) => theme.strong} 2px, transparent 2px);
    background-size: 0.75rem 0.75rem;
`;

export const Lines = styled.div`
    height: 4rem;
    width: calc(100% - 1rem);
    overflow: hidden;
    background-image: linear-gradient(90deg, ${({ theme }) => theme.strong} 2px, transparent 2px);
    background-size: 0.75rem 0.75rem;
`;
