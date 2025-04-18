import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currModel: {
    _id: "6800ca54fc51db9c8bb86201",
    name: "Floppy_disk",
    linkFile:
      "https://ucarecdn.com/1c1982d1-6ac5-4c75-912b-2ee9d1e4ad2e/floppy_disk.glb",
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
