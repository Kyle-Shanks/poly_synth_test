import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import PolySynth from 'src/components/PolySynth';
import { GlobalStyles } from 'src/styles/globalStyles';
import { THEMES, DARK } from 'src/styles/themes';

const App = (props) => {
    const [theme, setTheme] = useState(DARK);

    return (
        <ThemeProvider theme={THEMES[theme]}>
            <GlobalStyles />
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                {Object.keys(THEMES).map(theme => (
                    <option key={`themes_${theme}`} value={theme}>{theme}</option>
                ))}
            </select>
            <PolySynth theme={THEMES[theme]} />
        </ThemeProvider>
    );
};

export default App;
