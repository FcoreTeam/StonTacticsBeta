import { createSlice } from '@reduxjs/toolkit';

const matchPartsSlice = createSlice({
  name: 'matchParts',
  initialState: {
    firstPart: [],
    secondPart: [],
    thirdPart: [],
    fourthPart: [],
    fifthPart: [],
    sixthPart: [],
    seventhPart: [],
    eighthPart: [],
  },
  reducers: {
    setMatchPart: (state, action) => {
      state[action.payload.partName] = action.payload.partElements
    },
  },
});

export const { setMatchPart } = matchPartsSlice.actions;
export default matchPartsSlice.reducer;