import { COLORS, SHADES } from 'src/styles/palette';

export const LIGHT = 'light';
export const DARK = 'dark';
export const MONO_LIGHT = 'monoLight';
export const MONO_DARK = 'monoDark';

export const THEMES = {
    [LIGHT]: {
        background: SHADES.white,
        lite: SHADES.grey20,
        strong: SHADES.grey70,
        pop: COLORS.red,
    },
    [DARK]: {
        background: SHADES.grey80,
        lite: SHADES.grey70,
        strong: SHADES.grey20,
        pop: COLORS.teal,
    },
    [MONO_LIGHT]: {
        background: SHADES.white,
        lite: SHADES.white,
        strong: SHADES.grey70,
        pop: COLORS.grey70,
    },
    [MONO_DARK]: {
        background: SHADES.grey80,
        lite: SHADES.grey80,
        strong: SHADES.grey20,
        pop: COLORS.grey20,
    },
};
