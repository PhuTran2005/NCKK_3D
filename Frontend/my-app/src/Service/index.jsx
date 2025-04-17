import { Get } from "../Utils/Request";

export const getModelList = async () => {
  const data = await Get("");
  return data;
};
