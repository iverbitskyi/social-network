import { FriendListWidget, MyPostWidget, PostsWidget, UserWidget } from "scenes/widgets";
import { Box, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "scenes/navbar";

export const ProfilePage = () => {
	const [user, setUser] = useState(null);
	const { userId } = useParams();
	const token = useSelector((state) => state.auth.token);
	const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

	useEffect(() => {
		const getUser = async () => {
			const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await response.json();
			setUser(data);
		};

		getUser();
	}, [userId, token]);

	if (!user) return null;

	return (
		<Box>
			<Navbar />
			<Box
				width="100%"
				padding="2rem 6%"
				display={isNonMobileScreens ? "flex" : "block"}
				gap="2rem"
				justifyContent="center"
			>
				<Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
					<UserWidget userId={userId} picturePath={user.picturePath} />
					<Box m="2rem 0" />
					<FriendListWidget userId={userId} />
				</Box>
				<Box flexBasis={isNonMobileScreens ? "42%" : undefined} mt={isNonMobileScreens ? undefined : "2rem"}>
					<MyPostWidget picturePath={user.picturePath} />
					<Box m="2rem 0" />
					<PostsWidget userId={userId} isProfile />
				</Box>
			</Box>
		</Box>
	);
};
