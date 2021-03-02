import { COLORS, SHADES } from 'src/styles/palette';

export const BRAUN = 'braun';
export const LIGHT = 'light';
export const DARK = 'dark';
export const BLUE = 'blue';
export const MONO_LIGHT = 'monoLight';
export const MONO_DARK = 'monoDark'
export const MONO_BLUE = 'monoBlue';

export const THEMES = {
    [BRAUN]: {
        background: '#fffbdb',
        lite: '#ccc9b6',
        mid: '#ccc9b6',
        strong: '#3e3d3f',
        pop: '#e3151a',
    },
    [LIGHT]: {
        background: SHADES.white,
        lite: SHADES.grey20,
        mid: SHADES.grey30,
        strong: SHADES.grey70,
        pop: COLORS.orange,
    },
    [DARK]: {
        background: SHADES.grey80,
        lite: SHADES.grey70,
        mid: SHADES.grey70,
        strong: SHADES.grey20,
        pop: COLORS.teal,
    },
    [BLUE]: {
        background: '#1c2b35',
        lite: '#2f555a',
        mid: '#2f555a',
        strong: '#6fc3c3',
        pop: '#fac863',
    },
    [MONO_LIGHT]: {
        background: SHADES.white,
        lite: SHADES.white,
        mid: SHADES.grey30,
        strong: SHADES.grey70,
        pop: SHADES.grey70,
    },
    [MONO_DARK]: {
        background: SHADES.grey80,
        lite: SHADES.grey80,
        mid: SHADES.grey70,
        strong: SHADES.grey20,
        pop: SHADES.grey20,
    },
    [MONO_BLUE]: {
        background: '#1c2b35',
        lite: '#1c2b35',
        mid: '#2f555a',
        strong: '#6fc3c3',
        pop: '#6fc3c3',
    },
};
