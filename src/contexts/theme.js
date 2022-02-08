import { createContext, useReducer } from 'react';

import { useLocalStorage } from 'hooks';

const ThemeContext = createContext({ theme: 'dark' });
const ThemeDispatchContext = createContext();

const actions = {
  SET_THEME: 'theme/set'
};

function themeReducer(state, action) {
  switch (action.type) {
    case actions.SET_THEME: {
      return { theme: action.payload };
    }
    default: {
      return state;
    }
  }
}

// eslint-disable-next-line react/prop-types
const ThemeProvider = ({ children }) => {
  const [localStorageTheme] = useLocalStorage('theme', 'dark');
  const [state, dispatch] = useReducer(themeReducer, {
    theme: localStorageTheme || 'dark'
  });
  return (
    <ThemeContext.Provider value={state}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export { actions, ThemeContext, ThemeDispatchContext };
