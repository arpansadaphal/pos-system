// export const decodeToken = (token: string) => {
//   const payload = token.split(".")[1];
//   return JSON.parse(atob(payload));
// };

export const decodeToken = (token: string) => {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
};