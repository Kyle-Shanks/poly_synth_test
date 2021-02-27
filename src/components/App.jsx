import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import PolySynth from 'src/components/PolySynth';
import { GlobalStyles } from 'src/styles/globalStyles';
import {
    THEMES,
    DARK,
    LIGHT,
    MONO_DARK,
    MONO_LIGHT,
} from 'src/styles/themes';

const App = (props) => {
    const [theme, setTheme] = useState(DARK);

    return (
        <ThemeProvider theme={THEMES[theme]}>
            <GlobalStyles />
            <PolySynth theme={THEMES[theme]} />
        </ThemeProvider>
    );
};

export default App;
