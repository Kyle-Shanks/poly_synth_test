import { COLORS, SHADES } from 'src/styles/palette';

export const LIGHT = 'light';
export const DARK = 'dark';

const sharedColors = {
    success: COLORS.green,
    warning: COLORS.orange,
    error: COLORS.red,
    info: COLORS.blue,

    primary: COLORS.teal,
};

export const THEMES = {
    [LIGHT]: {
        ...sharedColors,
        background: SHADES.white,
        backgroundActive: SHADES.grey20,

        textPrimary: SHADES.grey70,
        textSecondary: SHADES.grey50,
        textDisabled: SHADES.grey40,
        textPlaceholder: SHADES.grey40,
        textDisabledPlaceholder: SHADES.grey30,
        textLink: COLORS.teal,

        filledInputBackground: SHADES.grey10,
        filledInputHoverBackground: SHADES.grey20,
        filledInputDisabledBackground: SHADES.grey5,

        border: SHADES.grey40,
        borderDisabled: SHADES.grey20,
        borderHover: SHADES.grey60,
        borderActive: COLORS.blue,

        icon: SHADES.grey50,
        iconHover: SHADES.grey70,
        iconActive: SHADES.grey70,

        buttonPrimaryBackground: COLORS.teal,

        displayBorder: SHADES.grey30,
        displayBackground: SHADES.white,
        displayBackgroundActive: SHADES.grey20,
    },
    [DARK]: {
        ...sharedColors,
        background: SHADES.grey90,
        // background: SHADES.grey80,
        backgroundActive: SHADES.grey60,

        textPrimary: SHADES.grey10,
        textSecondary: SHADES.grey40,
        textDisabled: SHADES.grey50,
        textPlaceholder: SHADES.grey50,
        textDisabledPlaceholder: SHADES.grey60,
        textLink: COLORS.teal,

        filledInputBackground: SHADES.grey70,
        filledInputHoverBackground: SHADES.grey60,
        filledInputDisabledBackground: SHADES.grey80,

        border: SHADES.grey50,
        borderDisabled: SHADES.grey60,
        borderHover: SHADES.grey30,
        borderActive: COLORS.blue,

        icon: SHADES.grey40,
        iconHover: SHADES.grey20,
        iconActive: SHADES.grey20,

        buttonPrimaryBackground: COLORS.teal,

        displayBorder: SHADES.grey50,
        displayBackground: SHADES.grey70,
        displayBackgroundActive: SHADES.grey60,
    },
};
