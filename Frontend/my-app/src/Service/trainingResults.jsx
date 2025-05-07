import { Get, Post } from "../Utils/Request";

export const getTrainingResult = async () => {
  const data = await Get("trainingResults");
  return data;
};

export const postTrainingResult = async (options) => {
  const data = await Post("trainingResults/create", options);
  return data;
};
