import { Get } from "../Utils/Request";

export const getAssignment = async () => {
  const data = await Get("assignment");
  return data;
};
