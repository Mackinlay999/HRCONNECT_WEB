import { createSlice } from "@reduxjs/toolkit";
const ReduxFilterSlice = createSlice({
  name: "ReduxSlice",
  initialState: {
    FilterOptions: {
      JobType: [],
      JobCategory: [],
      JobLevel: [],
      SalaryRange: [],
    },
    SearchOptions: {
      Location: "",
      searchText: "",
    },
  },
  reducers: {
    handleSetFilterData(state, action) {
      state.FilterOptions[`${action.payload.name}`].push(action.payload.value);
    },

    handleRemoveFilterData(state, action) {
      state.FilterOptions[`${action.payload.name}`].splice(
        state.FilterOptions[`${action.payload.name}`].indexOf(
          action.payload.value
        ),
        1
      );
    },
    handleSearchData(state, action) {
      state.SearchOptions.searchText = action.payload.searchText;
      state.SearchOptions.Location = action.payload.Location;
    },
  },
});
export const { handleSetFilterData, handleRemoveFilterData, handleSearchData } =
  ReduxFilterSlice.actions;
export default ReduxFilterSlice.reducer;
