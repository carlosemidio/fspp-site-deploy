export const TOKEN_KEY = "@airbnb-Token";
export const isAuthenticated = () => {
  if (process.browser) {
    return localStorage.getItem(TOKEN_KEY) !== null;
  } else {
    return false;
  }
};
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};