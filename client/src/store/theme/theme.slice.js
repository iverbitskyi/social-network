import { createSlice } from "@reduxjs/toolkit";
import { themeActions } from "./theme.actions";

export const themeSlice = createSlice({
	name: "theme",
	initialState: "light-theme",
	reducers: themeActions,
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
