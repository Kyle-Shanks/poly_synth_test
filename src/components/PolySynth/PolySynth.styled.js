import styled from 'styled-components';
import { SPACING, borderRadiusM, borderWidthS } from 'src/styles/constants';

export const ModuleGridContainer = styled.div`
    display: grid;
    position: relative;
    width: 64rem;
    grid-template-columns: repeat(3, 1fr);
    gap: ${SPACING.xl} ${SPACING.l};
    justify-items: center;
    align-items: center;
    margin: ${SPACING.m} auto;
    padding: ${SPACING.l} ${SPACING.xl} ${SPACING.xl} ${SPACING.l};
    border: ${borderWidthS} solid ${({ theme }) => theme.strong};
    border-radius: ${borderRadiusM};
`;
