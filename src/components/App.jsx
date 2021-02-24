import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'src/styles/globalStyles';
import { THEMES, LIGHT, DARK } from 'src/styles/themes';

const BASE_CLASS_NAME = 'App';

const App = (props) => {
    const [theme, setTheme] = useState(DARK);
    const toggleTheme = () => (theme === LIGHT ? setTheme(DARK) : setTheme(LIGHT));

    return (
        <ThemeProvider theme={THEMES[theme]}>
            <GlobalStyles />

            <div className={BASE_CLASS_NAME}>
                Hello, World!
            </div>
        </ThemeProvider>
    );
};

export default App;
