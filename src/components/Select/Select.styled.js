import styled from 'styled-components';
import { SPACING, borderWidthM, borderRadiusM } from 'src/styles/constants';
import {
    relaBlock,
    relaInline,
    absFill,
    vertCenter,
} from 'src/styles/util';

export const ComponentContainer = styled.div`
    ${relaInline}
    width: 5rem;
    padding: ${SPACING.xs} 0 0;
    margin: 0 ${SPACING.s};
    vertical-align: text-top;

    &:hover ${Label}, &:active ${Label} {
        & .label-text {
            opacity: 0;
        }
        & .value-text {
            opacity: 1;
        }
    }
`;

export const Label = styled.h4`
    ${relaBlock}
    margin: ${SPACING.s} auto;
    text-align: center;
    font-size: 13px;
    & > * {
        color: ${({ theme }) => theme.strong};
    }

    & > .value-text {
        ${absFill}
        opacity: 0;
    }
`;

export const InputContainer = styled.div`
    ${relaBlock}
    width: 3.25rem;
    margin: 0 auto;
    padding-top: ${SPACING.s};
`;

export const Input = styled.div`
    ${relaBlock}
    border-radius: ${SPACING.s};
    overflow: hidden;
    border: ${borderWidthM} solid ${({ theme, isDropdownOpen }) => isDropdownOpen ? theme.strong : theme.mid};
    background-color: ${({ theme, isDropdownOpen }) => isDropdownOpen ? theme.mid : 'transparent'};

    &:hover {
        border: ${borderWidthM} solid ${({ theme }) => theme.strong};
    }

    & > svg {
        ${relaBlock}
        height: 3rem;
        width: 3rem;
        fill: none;
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: ${({ theme }) => theme.pop};

        & path {
            transition: 0s;
        }
    }
`;

export const Dropdown = styled.div`
    ${vertCenter}
    z-index: 100;
    width: 104px;
    padding: ${SPACING.xs};
    left: calc(100% + ${SPACING.s});
    background-color: ${({ theme }) => theme.background};
    box-shadow: 0 2px 20px 1px rgba(0,0,0,0.4);
    border-radius: ${borderRadiusM};
    overflow: auto;

    // Toggle Styles
    ${props => props.isOpen
        ? `opacity: 1; pointer-events: all; transform: translate(0, -50%);`
        : `opacity: 0; pointer-events: none; transform: translate(-${SPACING.m}, -50%);`
    }
`;

export const DropdownSvg = styled.svg`
    ${relaInline}
    height: 3rem;
    width: 3rem;
    fill: none;
    stroke-width: 2.25;
    stroke-linecap: round;
    transition: 0s;
    stroke-linejoin: round;
    stroke: ${({ theme, selected }) => selected ? theme.strong : theme.mid};

    &:hover {
        stroke: ${({ theme }) => theme.strong};
    }
`;
