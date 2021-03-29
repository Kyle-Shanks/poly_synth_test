import styled from 'styled-components';
import { SPACING, borderRadiusS, borderRadiusM, borderWidthS } from 'src/styles/constants';
import Module from 'src/components/Module';

const Text = styled.p`
    margin-bottom: ${SPACING.s};
`;
export const PrimaryText = styled(Text)`
    color: ${({ theme }) => theme.strong};
`;
export const PopText = styled(Text)`
    color: ${({ theme }) => theme.pop};
`;
export const Tag = styled.h4`
    position: absolute;
    right: ${SPACING.ml};
    bottom: ${SPACING.ml};
    color: ${({ theme }) => theme.pop};
`;

export const ModuleGridContainer = styled.div`
    display: grid;
    position: relative;
    width: fit-content;
    grid-template-columns: 130px 418px 226px 226px 130px;
    gap: ${SPACING.m};
    justify-items: center;
    align-items: center;
    margin: ${SPACING.ml} auto;
    padding: ${SPACING.ml};
    border: ${borderWidthS} solid ${({ theme }) => theme.strong};
    border-radius: ${borderRadiusM};
    background-color: ${({ theme }) => theme.background};

    &::before {
        z-index: -1;
        content: '';
        position: absolute;
        top: 3.25rem;
        left: 3.4rem;
        height: 100%;
        width: 100%;
        overflow: hidden;

        // Polkadot styles
        background-image: radial-gradient(${({ theme }) => theme.strong} 2px, transparent 2px);
        background-size: 0.75rem 0.75rem;
        background-position: top;
    }
`;

export const InfoModule = styled(Module)`
    grid-row: span 2;
`;

export const InfoSelect = styled.select`
    display: block;
    width: 100%;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.strong};
    border: ${borderWidthS} solid ${({ theme }) => theme.strong};
    border-radius: ${borderRadiusS};
`;

export const InfoContainer = styled.div`
    margin-bottom: ${SPACING.m};
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
    height: 3rem;
    width: 100%;
    grid-column: span 4;
    overflow: hidden;
    background-image: linear-gradient(90deg, ${({ theme }) => theme.strong} 2px, transparent 2px);
    background-size: 0.75rem 0.75rem;
    background-position: center;
`;
