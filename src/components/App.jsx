import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import PolySynth from 'src/components/PolySynth';
import { GlobalStyles } from 'src/styles/globalStyles';
import { THEMES, BLUE } from 'src/styles/themes';

const App = (props) => {
    const [theme, setTheme] = useState(BLUE);

    return (
        <ThemeProvider theme={THEMES[theme]}>
            <GlobalStyles />
            <PolySynth theme={THEMES[theme]} />
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                {Object.keys(THEMES).map(theme => (
                    <option key={`themes_${theme}`} value={theme}>{theme}</option>
                ))}
            </select>
        </ThemeProvider>
    );
};

export default App;
