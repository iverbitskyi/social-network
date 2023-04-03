import { createSlice } from "@reduxjs/toolkit";
import { authActions } from "./auth.actions";

const initialState = {
	user: null,
	token: null,
	posts: [],
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: authActions,
});

export const { setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;

export default authSlice.reducer;
