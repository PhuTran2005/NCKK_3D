const s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345678910";
export const generateToken = () => {
  let result = "";
  for (let i = 0; i < 20; ++i) {
    result += s[Math.floor(Math.random() * (s.length - 1))];
  }
  return result;
};
