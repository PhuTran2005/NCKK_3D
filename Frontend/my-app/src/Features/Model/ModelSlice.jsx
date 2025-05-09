import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currModel: {
    _id: "6800ca54fc51db9c8bb86201",
    name: "Hộp CPU",
    linkFile:
      "https://firebasestorage.googleapis.com/v0/b/chay-tam-an.appspot.com/o/CPU_usdz.glb?alt=media&token=81fbe14c-d0bf-4c9b-a896-80804b80d244",
    thumbnail:
      "https://tse2.mm.bing.net/th?id=OIP.uOuHLI0974DCEMUEaXTa6QHaH6&pid=Api&P=0&h=180",
    description: "AA",
    delete: false,
    hotspots: [],
  },
};

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    changeModel: (state, action) => {
      console.log(action);
      const item = action.payload;
      state.currModel = item;
    },
  },
});
export const { changeModel } = modelSlice.actions;
export default modelSlice.reducer;
