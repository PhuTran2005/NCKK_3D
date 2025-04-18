import { Get } from "../Utils/Request";

export const getModelList = async () => {
  const data = await Get("model");
  return data;
};
