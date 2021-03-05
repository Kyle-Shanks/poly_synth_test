import { COLORS, SHADES } from 'src/styles/palette';

// TODO: Organize these better later
// TODO: Maybe add a way to dynamically set the theme?

// - Four color themes -
// Light
export const LIGHT = 'light';
export const BRAUN = 'braun';
export const DESERT = 'desert';
export const DEMICHROME = 'demichrome';
export const METALLIC = 'metallic';
export const GAMEBOY = 'gameboy';
export const MINTY = 'minty';
export const USA = 'usa';
export const GIN = 'gin';
// Dark
export const DARK = 'dark';
export const BLUE = 'blue';
export const RASPBERRY = 'raspberry';
export const COZY = 'cozy';
export const TERMINAL = 'terminal';
export const ALIEN = 'alien';
export const LASER = 'laser';
export const ELECHEAD = 'elecHead';
export const M8 = 'm8';
export const RONIN = 'ronin';

// - Three color themes -
// Light
export const MONO_LIGHT = 'monoLight';
export const MONO_BRAUN = 'monoBraun';
export const MONO_TINY = 'monoTiny';
export const MONO_JARI = 'monoJari';
// Dark
export const MONO_DARK = 'monoDark';
export const MONO_BLUE = 'monoBlue';
export const MONO_GREEN = 'monoGreen';
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
    [DESERT]: {
        background: '#fff6d3',
        lite: '#f9a875',
        mid: '#f9a875',
        strong: '#7c3f58',
        pop: '#eb6b6f',
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
    [TERMINAL]: {
        background: '#081820',
        lite: '#346856',
        mid: '#346856',
        strong: '#e0f8d0',
        pop: '#88c070',
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
    [ALIEN]: {
        background: '#2d293d',
        lite: '#5c5b77',
        mid: '#5c5b77',
        strong: '#e8ffee',
        pop: '#78db97',
    },
    [LASER]: {
        background: '#271d2c',
        lite: '#7b6960',
        mid: '#7b6960',
        strong: '#fff8ed',
        pop: '#e01f3f',
    },
    [ELECHEAD]: {
        background: '#08242b',
        lite: '#1d7c95',
        mid: '#1d7c95',
        strong: '#ffffff',
        pop: '#fda000',
    },
    [M8]: {
        background: '#000d1a',
        lite: '#49617c',
        mid: '#49617c',
        strong: '#e2ebf1',
        pop: '#ffe100',
    },
    [RONIN]: {
        background: '#29272b',
        lite: '#66606c',
        mid: '#66606c',
        strong: '#ffffff',
        pop: '#e47465',
    },
    [GIN]: {
        background: '#edeae9',
        lite: '#bab0b0',
        mid: '#bab0b0',
        strong: '#4f5b66',
        pop: '#01abce',
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
    [MONO_GREEN]: {
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
