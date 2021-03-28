import styled from 'styled-components';
import { SPACING, borderRadiusM, borderWidthS } from 'src/styles/constants';

export const ModuleGridContainer = styled.div`
    display: grid;
    position: relative;
    width: fit-content;
    // grid-template-columns: repeat(4, 1fr);
    grid-template-columns: 130px 418px 226px 226px;
    gap: ${SPACING.ml};
    justify-items: center;
    align-items: center;
    margin: ${SPACING.m} auto;
    padding: ${SPACING.ml} ${SPACING.l};
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

export const DotCircle = styled.div`
    height: 13rem;
    width: 13rem;
    grid-row: span 2;
    border-radius: 49%;
    overflow: hidden;
    background-image: radial-gradient(${({ theme }) => theme.strong} 2px, transparent 2px);
    background-size: 0.75rem 0.75rem;
    background-position: center;
`;

export const Lines = styled.div`
    height: 4rem;
    width: calc(100% - 1rem);
    overflow: hidden;
    background-image: linear-gradient(90deg, ${({ theme }) => theme.strong} 2px, transparent 2px);
    background-size: 0.75rem 0.75rem;
    background-position: center;
`;
