import axios from "./axiosCustom";

const createUserApi = (fullName, email, password, phone) => {
  const URL = "/api/v1/users";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
    role: {
      id: 1,
    },
  };
  return axios.post(URL, data);
};
const updateUserApi = (id, fullName, phone) => {
  const URL = "/api/v1/users";

  const data = {
    id: id,
    fullName: fullName,
    phone: phone,
  };
  return axios.put(URL, data);
};

const fetchAllUserApi = () => {
  const URL = "/api/v1/users";
  return axios.get(URL);
};

const deleteUserByIdApi = (id) => {
  const URL = `/api/v1/users/${id}`;

  return axios.delete(URL);
};

const fetchAllProduct = (page, pageSize) => {
  const URL = `/api/v1/products?page=${page}&size=${pageSize}`;
  return axios.get(URL);
};

const deleteProductById = (id) => {
  const URL = `http://localhost:8080/api/v1/products/${id}`;

  return axios.delete(URL);
};

const registerUserApi = (fullName, email, password, phone) => {
  const URL = "/api/v1/auth/register";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
    role: {
      id: 1,
    },
  };
  return axios.post(URL, data);
};
const loginUserApi = (username, password) => {
  const URL = "/api/v1/auth/login";
  const data = {
    username: username,
    password: password,
  };
  return axios.post(URL, data);
};
const getAccountApi = () => {
  const URL = "/api/v1/auth/me";

  return axios.get(URL);
};

const logoutApi = () => {
  const URL = "/api/v1/auth/logout";

  return axios.get(URL);
};

const createProductAPi = (
  name,
  price,
  quantity,
  img,
  category,
  description,
) => {
  const URL = "/api/v1/products";
  const data = {
    name: name,
    price: price,
    quantity: quantity,
    img: img,
    category: {
      name: category,
    },
    description: description,
  };
  return axios.post(URL, data);
};
const uploadFileApi = (file) => {
  const URL = "/api/v1/upload";

  const formData = new FormData();
  formData.append("file", file);

  return axios.post(URL, formData);
};
export {
  createUserApi,
  updateUserApi,
  fetchAllUserApi,
  deleteUserByIdApi,
  fetchAllProduct,
  registerUserApi,
  loginUserApi,
  getAccountApi,
  logoutApi,
  deleteProductById,
  createProductAPi,
  uploadFileApi,
};
