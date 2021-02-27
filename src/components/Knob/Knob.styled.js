import styled from 'styled-components';

export const ComponentContainer = styled.div`
    display: inline-block;
    position: relative;
    margin: 0 0.5rem 0.5rem;
    vertical-align: top;
    text-align: left;

    &:hover ${Label}, &:active ${Label} {
        & .label-text {
            opacity: 0;
        }
        & .value-text {
            opacity: 1;
        }
    }
`;

export const Label = styled.h2`
    display: block;
    position: relative;
    max-width: 5rem;
    margin: -0.5rem auto 0.5rem;
    text-align: center;
    font-size: 13px;
    color: ${({ theme }) => theme.strong};

    & > div {
        transition: 0.2s ease;
    }

    & > .value-text {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        opacity: 0;
    }
`;

export const KnobContainer = styled.div`
    display: inline-block;
    position: relative;
    height: 5rem;
    width: 5rem;
`;

export const KnobSvg = styled.svg`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 5rem;
    width: 5rem;
    transition: 0s;
    & path {
        fill: none;
        stroke-linecap: round;
        stroke-width: 3;
        will-change: stroke-dashoffset;
        transition: 0.3s cubic-bezier(0, 0, 0.24, 1);
    }
`;

export const KnobDial = styled.div`
    position: absolute;
    height: 3rem;
    width: 3rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: 0.125rem solid ${({ theme }) => theme.strong};
    border-radius: 100%;
    text-align: center;
    transition: 0s;

    &::after {
        content: "";
        position: absolute;
        height: 0.75rem;
        width: 0.125rem;
        background-color: ${({ theme }) => theme.strong};
    }
`;

export const BackgroundMeter = styled.path`
    stroke: ${({ theme }) => theme.lite};
`;

export const ActiveMeter = styled.path`
    stroke: ${({ theme }) => theme.strong};
`;
