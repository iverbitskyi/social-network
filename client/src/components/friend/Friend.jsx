import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { UserImage, FlexBetween, Layout } from "components";
import { setFriends } from "store/auth/auth.slice";

export const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { _id } = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const friends = useSelector((state) => state.auth.user.friends);

	const isFriend = friends.find((friend) => friend._id === friendId);

	const patchFriend = async () => {
		const response = await fetch(`http://localhost:4000/api/users/${_id}/${friendId}`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		dispatch(setFriends({ friends: data }));
	};

	return (
		<Layout>
			<FlexBetween>
				<FlexBetween gap="1rem">
					<UserImage image={userPicturePath} size="55px" />
					<Box
						onClick={() => {
							navigate(`/profile/${friendId}`);
							navigate(0);
						}}
					>
						<Typography
							className="friend__name"
							variant="h5"
							fontWeight="500"
							sx={{
								"&:hover": {
									cursor: "pointer",
								},
							}}
						>
							{name}
						</Typography>
						<Typography className="friend__subtitle" fontSize="0.75rem">
							{subtitle}
						</Typography>
					</Box>
				</FlexBetween>
				<IconButton className="friend__btn" onClick={() => patchFriend()} sx={{ p: "0.6rem" }}>
					{isFriend ? (
						<PersonRemoveOutlined className="friend__btn_remove" />
					) : (
						<PersonAddOutlined className="friend__btn_add" />
					)}
				</IconButton>
			</FlexBetween>
		</Layout>
	);
};
