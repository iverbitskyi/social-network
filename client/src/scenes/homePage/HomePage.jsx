import { Navbar } from "scenes/navbar";
import { Layout } from "components/layout";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Box } from "@mui/material";
import { UserWidget, MyPostWidget, PostsWidget, AdvertWidget, FriendListWidget } from "scenes/widgets";

export const HomePage = () => {
	const { _id, picturePath } = useSelector((state) => state.auth.user);

	const isNonMobileScreens = useMediaQuery({ minWidth: 1000 });

	return (
		<Layout>
			<Navbar />
			<Box
				width="100%"
				padding="2rem 6%"
				display={isNonMobileScreens ? "flex" : "block"}
				gap="0.5rem"
				justifyContent="space-between"
			>
				<Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
					<UserWidget userId={_id} picturePath={picturePath} />
				</Box>
				<Box flexBasis={isNonMobileScreens ? "42%" : undefined} mt={isNonMobileScreens ? undefined : "2rem"}>
					<MyPostWidget picturePath={picturePath} />
					<PostsWidget userId={_id} />
				</Box>
				{isNonMobileScreens && (
					<Box flexBasis="26%">
						<AdvertWidget />
						<Box m="2rem 0" />
						<FriendListWidget userId={_id} />
					</Box>
				)}
			</Box>
		</Layout>
	);
};
