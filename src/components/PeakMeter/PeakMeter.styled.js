import styled from 'styled-components';
import { SPACING, defaultTransition } from 'src/styles/constants';
import { relaBlock, absFill } from 'src/styles/util';

export const ComponentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${SPACING.xs};
`;

export const ChannelMeter = styled.div`
    ${relaBlock}
    height: 0.4rem;
    background-image: ${({ theme }) => (
        `linear-gradient(to left, ${theme.pop} 15%, ${theme.strong} 45%, ${theme.strong} 100%)`
    )};
`;

export const MeterLines = styled.div`
    ${absFill}
    background-image: linear-gradient(90deg, ${({ theme }) => theme.background} 2px, transparent 2px);
    background-size: 0.25rem 0.25rem;
`;

export const MeterMask = styled.div`
    position: absolute;
    height: 100%;
    right: 0;
    background-color: ${({ theme }) => theme.background};
    transition: ${defaultTransition}, width 0.1s;
`;
