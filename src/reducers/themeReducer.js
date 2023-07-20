const SET_THEME = 'SET_THEME';

const initialState = {
  theme: 'light',
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export default themeReducer;