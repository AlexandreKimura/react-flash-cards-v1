import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000,
});

export async function read(url) {
  const { data } = await axiosInstance.get(url);
  return data;
}

export async function exclude(url) {
  await axiosInstance.delete(url);
}

export async function create(url, obj) {
  const { data } = await axiosInstance.post(url, obj);
  return data;
}

export async function edit(url, obj) {
  const { data } = await axiosInstance.put(url, obj);
  return data;
}
