import styled from 'styled-components';
import {
    relaBlock,
    relaInline,
    absFill,
    vertCenter,
} from 'src/styles/util';

export const ComponentContainer = styled.div`
    ${relaInline}
    width: 5rem;
    padding: 0.25rem 0;
    margin: 0 0.5rem;
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
    margin: 0.5rem auto;
    padding-bottom: 1px;
    text-align: center;
    font-size: 13px;
    color: ${({ theme }) => theme.strong};

    & > .value-text {
        ${absFill}
        opacity: 0;
    }
`;

export const InputContainer = styled.div`
    ${relaBlock}
    width: 3.25rem;
    margin: 0 auto;
    padding-top: 0.5rem;
`;

export const Input = styled.div`
    ${relaBlock}
    border-radius: 0.5rem;
    overflow: hidden;
    border: 0.125rem solid ${({ theme, isDropdownOpen }) => isDropdownOpen ? theme.strong : theme.mid};

    &:hover {
        border: 0.125rem solid ${({ theme }) => theme.strong};
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
    width: 100px;
    padding: 0.125rem;
    left: calc(100% + 0.25rem);
    background-color: ${({ theme }) => theme.background};
    box-shadow: 0 2px 20px 1px rgba(0,0,0,0.4);
    border-radius: 0.333rem;
    overflow: auto;

    // Toggle Styles
    ${props => props.isOpen
        ? `opacity: 1; pointer-events: all; transform: translate(0, -50%);`
        : `opacity: 0; pointer-events: none; transform: translate(-1rem, -50%);`
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
    stroke: ${({ theme, selected }) => selected ? theme.pop : theme.mid};

    &:hover {
        stroke: ${({ theme }) => theme.pop};
    }
`;
