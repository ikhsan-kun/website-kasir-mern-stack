const config = {
  BASE_URL: process.env.BASE_URL || "http://localhost:3000",
};

const savetoken = (token) => {
  localStorage.setItem("token", token);
};

const gettoken = () => {
  return localStorage.getItem("token");
};

const removetoken = () => {
  localStorage.removeItem("token");
};
