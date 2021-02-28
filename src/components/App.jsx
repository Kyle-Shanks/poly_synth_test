import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import PolySynth from 'src/components/PolySynth';
import { GlobalStyles } from 'src/styles/globalStyles';
import {
    THEMES,
    DARK,
    LIGHT,
    BLUE,
    MONO_DARK,
    MONO_LIGHT,
    MONO_BLUE,
} from 'src/styles/themes';

const App = (props) => {
    const [theme, setTheme] = useState(BLUE);

    return (
        <ThemeProvider theme={THEMES[theme]}>
            <GlobalStyles />
            <PolySynth theme={THEMES[theme]} />
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value={DARK}>{DARK}</option>
                <option value={LIGHT}>{LIGHT}</option>
                <option value={BLUE}>{BLUE}</option>
                <option value={MONO_DARK}>{MONO_DARK}</option>
                <option value={MONO_LIGHT}>{MONO_LIGHT}</option>
                <option value={MONO_BLUE}>{MONO_BLUE}</option>
            </select>
        </ThemeProvider>
    );
};

export default App;
