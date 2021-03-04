import { COLORS, SHADES } from 'src/styles/palette';

// TODO: Organize these better later
// TODO: Maybe add a way to dynamically set the theme?

// - Four color themes -
// Light
export const LIGHT = 'light';
export const BRAUN = 'braun';
export const DESERT = 'desert';
export const MIST = 'mist';
export const DEMICHROME = 'demichrome';
export const METALLIC = 'metallic';
export const GAMEBOY = 'gameboy';
export const MINTY = 'minty';
export const USA = 'usa';
// Dark
export const DARK = 'dark';
export const BLUE = 'blue';
export const RASPBERRY = 'raspberry';
export const COZY = 'cozy';
export const TERMINAL = 'terminal';

// - Three color themes -
// Light
export const MONO_LIGHT = 'monoLight';
export const MONO_BRAUN = 'monoBraun';
export const MONO_TINY = 'monoTiny';
export const MONO_JARI = 'monoJari';
// Dark
export const MONO_DARK = 'monoDark';
export const MONO_BLUE = 'monoBlue';
export const MONO_TERMINAL = 'monoTerminal';
export const MONO_TINY_INV = 'monoTinyInv';

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
    [RASPBERRY]: {
        background: '#383e4d',
        lite: '#797f82',
        mid: '#797f82',
        strong: '#edfefe',
        pop: '#fa6e90',
    },
    [COZY]: {
        background: '#2c2b32',
        lite: '#4e4942',
        mid: '#4e4942',
        // mid: '#7b776c',
        strong: '#e7e6e6',
        pop: '#cd705f',
    },
    [TERMINAL]: {
        background: '#2a2f32',
        lite: '#474f54',
        mid: '#474f54',
        strong: '#bfddb2',
        pop: '#acb766',
    },
    [DESERT]: {
        background: '#fff6d3',
        lite: '#f9a875',
        mid: '#f9a875',
        strong: '#7c3f58',
        pop: '#eb6b6f',
    },
    [MIST]: {
        background: '#c4f0c2',
        lite: '#5ab9a8',
        mid: '#5ab9a8',
        strong: '#2d1b00',
        pop: '#1e606e',
    },
    [DEMICHROME]: {
        background: '#e9efec',
        lite: '#a0a08b',
        mid: '#a0a08b',
        strong: '#211e20',
        pop: '#555568',
    },
    [METALLIC]: {
        background: '#c5dbd4',
        lite: '#778e98',
        mid: '#778e98',
        strong: '#221e31',
        pop: '#41485d',
    },
    [GAMEBOY]: {
        background: '#e1ff5b',
        lite: '#8dcc30',
        mid: '#8dcc30',
        strong: '#006636',
        pop: '#579938',
    },
    [MINTY]: {
        background: '#bffce6',
        lite: '#65dcb4',
        mid: '#65dcb4',
        strong: '#4d2b25',
        pop: '#734941',
    },
    [USA]: {
        background: '#fce4a8',
        lite: '#71969f',
        mid: '#71969f',
        strong: '#01334e',
        pop: '#d71a21',
    },


    [MONO_LIGHT]: {
        background: SHADES.white,
        lite: SHADES.white,
        mid: SHADES.grey30,
        strong: SHADES.grey70,
        pop: SHADES.grey70,
    },
    [MONO_BRAUN]: {
        background: '#fffbdb',
        lite: '#fffbdb',
        mid: '#ccc9b6',
        strong: '#3e3d3f',
        pop: '#3e3d3f',
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
    [MONO_TERMINAL]: {
        background: '#2a2f32',
        lite: '#2a2f32',
        mid: '#474f54',
        strong: '#bfddb2',
        pop: '#bfddb2',
    },
    [MONO_JARI]: {
        background: '#f1b78b',
        lite: '#f1b78b',
        mid: '#95421e',
        strong: '#521c14',
        pop: '#521c14',
    },
    [MONO_TINY]: {
        background: '#d3e4d3',
        lite: '#d3e4d3',
        mid: '#7c8477',
        strong: '#181d1a',
        pop: '#181d1a',
    },
    [MONO_TINY_INV]: {
        background: '#181d1a',
        lite: '#181d1a',
        mid: '#7c8477',
        strong: '#d3e4d3',
        pop: '#d3e4d3',
    },
};
