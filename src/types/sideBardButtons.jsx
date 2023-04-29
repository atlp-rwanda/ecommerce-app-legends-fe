export const setActiveButton = (buttonName) => ({
  type: 'activeButton/setActiveButton', // change the action type here
  payload: buttonName,
});

export const logout = () => ({
  type: 'LOGOUT',
});
