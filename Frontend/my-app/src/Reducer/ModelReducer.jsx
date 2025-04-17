const init = {
  name: "Ram",
  path: "https://firebasestorage.googleapis.com/v0/b/chay-tam-an.appspot.com/o/Gram.glb?alt=media&token=f5e8c572-c34d-48f2-8158-4211587cb625",
  hotspots: [],
};
export const ModelReducer = (state = init, action) => {
  switch (action.action) {
    case "CHANGE": {
      return action.data;
    }
  }
  return state;
};
