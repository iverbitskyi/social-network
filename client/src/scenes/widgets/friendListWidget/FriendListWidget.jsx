import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

import { Friend, Layout, WidgetWrapper } from "components";
import { setFriends } from "store/auth/auth.slice";

export const FriendListWidget = ({ userId }) => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const friends = useSelector((state) => state.auth.user.friends);

	useEffect(() => {
		const getFriends = async () => {
			const response = await fetch(`http://localhost:4000/users/${userId}/friends`, {
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await response.json();
			dispatch(setFriends({ friends: data }));
		};

		getFriends();
	}, [dispatch, token, userId]);

	return (
		<Layout>
			<WidgetWrapper>
				<Typography className="friendList__title" variant="h5" fontWeight="500" sx={{ mb: "1.5rem" }}>
					Friend List
				</Typography>
				<Box display="flex" flexDirection="column" gap="1.5rem">
					{friends.map((friend) => (
						<Friend
							key={friend._id}
							friendId={friend._id}
							name={`${friend.firstName} ${friend.lastName}`}
							subtitle={friend.occupation}
							userPicturePath={friend.picturePath}
						/>
					))}
				</Box>
			</WidgetWrapper>
		</Layout>
	);
};
