import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl } from "@mui/material";
import { MdDarkMode, MdLightMode, MdNotificationsNone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FlexBetween } from "components/flexBetween";
import { setTheme } from "store/theme/theme.slice";
import { setLogout } from "store/auth/auth.slice";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { Layout } from "components/layout";
import { useState } from "react";
import {
	AiOutlineSearch,
	AiOutlineMessage,
	AiOutlineMenu,
	AiOutlineQuestionCircle,
	AiFillCloseCircle,
} from "react-icons/ai";

export const Navbar = () => {
	const theme = useSelector((state) => state.theme);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = useSelector((state) => state.auth.user);

	const fullName = `${user.firstName} ${user.lastName}`;

	const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
	const isNonMobileScreens = useMediaQuery({ minWidth: 1000 });

	return (
		<Layout>
			<FlexBetween padding="1rem 6%" className="navbar">
				<FlexBetween gap="1.75rem">
					<Typography
						fontWeight="bold"
						fontSize="clamp(1rem, 2rem, 2.25rem)"
						className="navbar__main_logo"
						onClick={() => navigate("/home")}
					>
						Social-Network
					</Typography>
					{isNonMobileScreens && (
						<FlexBetween borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem" className="navbar__main_search">
							<InputBase className="navbar__main_search_text" placeholder="Search..." />
							<IconButton>
								<AiOutlineSearch className="navbar__main_search_btn" />
							</IconButton>
						</FlexBetween>
					)}
				</FlexBetween>

				{/* DESKTOP NAV */}
				{isNonMobileScreens ? (
					<FlexBetween gap="2rem" className="navbar__nav">
						<IconButton onClick={() => dispatch(setTheme())}>
							{theme === "dark-theme" ? (
								<MdDarkMode className="navbar__nav_mode-btn" />
							) : (
								<MdLightMode className="navbar__nav_mode-btn" />
							)}
						</IconButton>
						<AiOutlineMessage className="navbar__nav_message" />
						<MdNotificationsNone className="navbar__nav_notifications" />
						<AiOutlineQuestionCircle className="navbar__nav_help" />
						<FormControl variant="standard" value={fullName}>
							<Select className="navbar__nav_dropdown" value={fullName} input={<InputBase />}>
								<MenuItem value={fullName}>
									<Typography>{fullName}</Typography>
								</MenuItem>
								<MenuItem
									onClick={() => {
										dispatch(setLogout());
										navigate("/");
									}}
								>
									Log Out
								</MenuItem>
							</Select>
						</FormControl>
					</FlexBetween>
				) : (
					<IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
						<AiOutlineMenu className="navbar__menuIcon" />
					</IconButton>
				)}

				{/* MOBILE NAV */}
				{!isNonMobileScreens && isMobileMenuToggled && (
					<Box className="navbar__mobile">
						{/* CLOSE ICON */}
						<Box className="navbar__mobile_close">
							<IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
								<AiFillCloseCircle className="navbar__mobile_close_icon" />
							</IconButton>
						</Box>

						{/* MENU ITEMS */}
						<FlexBetween className="navbar__mobile_menu">
							<IconButton className="navbar__mobile_menu_mode" onClick={() => dispatch(setTheme())}>
								{theme === "dark-theme" ? (
									<MdDarkMode className="navbar__mobile_menu_mode_dark" />
								) : (
									<MdLightMode className="navbar__mobile_menu_mode_light" />
								)}
							</IconButton>
							<AiOutlineMessage className="navbar__mobile_menu_message" />
							<MdNotificationsNone className="navbar__mobile_menu_notifications" />
							<AiOutlineQuestionCircle className="navbar__mobile_menu_help" />
							<FormControl variant="standard" value={fullName}>
								<Select className="navbar__mobile_menu_dropdown" value={fullName} input={<InputBase />}>
									<MenuItem value={fullName}>
										<Typography>{fullName}</Typography>
									</MenuItem>
									<MenuItem
										onClick={() => {
											dispatch(setLogout());
											navigate("/");
										}}
									>
										Log Out
									</MenuItem>
								</Select>
							</FormControl>
						</FlexBetween>
					</Box>
				)}
			</FlexBetween>
		</Layout>
	);
};
