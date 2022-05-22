import axios from "axios";
import DefaultConfigs from "../configs/Default.json";

const axIn = axios.create({
  baseURL: DefaultConfigs.baseUrl,
  timeout: 0,
});

export const postItem = (type: string, link: string): Promise<any> => {
  return axIn({
    method: "post",
    url: "postItem",
    data: {
      type,
      link,
    },
  });
};

export const getItems = (): Promise<any> => {
  return axIn({
    method: "get",
    url: "getItems",
  });
};

export const deleteItem = (type: string): Promise<any> => {
  return axIn({
    method: "delete",
    url: "deleteItem",
    data: {
      type,
    },
  });
};

export const updateItem = (
  type: string,
  link: string,
  prevType: string
): Promise<any> => {
  return axIn({
    method: "put",
    url: "updateItem",
    data: {
      type,
      link,
      prevType,
    },
  });
};
