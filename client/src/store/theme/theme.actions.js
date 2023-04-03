export const themeActions = {
	setTheme: (state) => {
		return state === "dark-theme" ? "light-theme" : "dark-theme";
	},
};
