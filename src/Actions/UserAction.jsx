import axios from "axios";

export const userLogin = (state) => {
  const { email, password } = state;
  const obj = JSON.parse(localStorage.getItem(email + ""));
  if (obj && obj.password === password) {
    localStorage.setItem("user", email);
    return true;
  } else {
    alert("Invalid username/password");
  }
  return false;
};

export const userRegistration = (state) => {
  const { name, email, password } = state;
  if (localStorage.getItem(email + "")) {
    alert("This account is already created please Login");
    return false;
  }
  localStorage.setItem(email + "", JSON.stringify({ name, email, password }) );
  return true;
};

export const getService = (url, payload = []) => {
  url += "?api-key=uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7";
  for (const item in payload) {
    url += "&" + item + "=" + payload[item];
  }
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};
