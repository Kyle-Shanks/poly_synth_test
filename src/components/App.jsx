import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'src/styles/globalStyles';
import { THEMES, LIGHT, DARK } from 'src/styles/themes';
import PolySynth from 'src/components/PolySynth';

const App = (props) => {
    const [theme, setTheme] = useState(DARK);
    const toggleTheme = () => (theme === LIGHT ? setTheme(DARK) : setTheme(LIGHT));

    return (
        <ThemeProvider theme={THEMES[theme]}>
            <GlobalStyles />
            <PolySynth />
        </ThemeProvider>
    );
};

export default App;
