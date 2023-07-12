import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
	ChatBubbleOutlineOutlined,
	FavoriteBorderOutlined,
	FavoriteOutlined,
	ShareOutlined,
} from "@mui/icons-material";

import { Friend, WidgetWrapper, FlexBetween, Layout } from "components";
import { setPost } from "store/auth/auth.slice";

export const PostWidget = ({
	postId,
	postUserId,
	name,
	description,
	location,
	picturePath,
	userPicturePath,
	likes,
	comments,
}) => {
	const [isComments, setIsComments] = useState(false);
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const loggedInUserId = useSelector((state) => state.auth.user._id);
	const isLiked = Boolean(likes[loggedInUserId]);
	const likeCount = Object.keys(likes).length;

	const patchLike = async () => {
		const response = await fetch(`http://localhost:4000/api/posts/${postId}/like`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userId: loggedInUserId }),
		});

		const updatedPost = await response.json();
		dispatch(setPost({ post: updatedPost }));
	};

	return (
		<Layout>
			<WidgetWrapper m="2rem 0">
				<Friend friendId={postUserId} name={name} subtitle={location} userPicturePath={userPicturePath} />
				<Typography className="post__description" sx={{ mt: "1rem" }}>
					{description}
				</Typography>
				{picturePath && (
					<img
						width="100%"
						height="auto"
						alt="post"
						style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
						src={`http://localhost:4000/assets/${picturePath}`}
					/>
				)}
				<FlexBetween mt="0.25rem">
					<FlexBetween gap="1rem">
						<FlexBetween gap="0.3rem">
							<IconButton onClick={patchLike}>
								{isLiked ? <FavoriteOutlined className="post__favorite_icon" /> : <FavoriteBorderOutlined />}
							</IconButton>
							<Typography className="post__favorite">{likeCount}</Typography>
						</FlexBetween>

						<FlexBetween gap="0.3rem">
							<IconButton onClick={() => setIsComments(!isComments)}>
								<ChatBubbleOutlineOutlined className="post__comments_icon" />
							</IconButton>
							<Typography className="post__comments">{comments.length}</Typography>
						</FlexBetween>
					</FlexBetween>

					<IconButton>
						<ShareOutlined />
					</IconButton>
				</FlexBetween>
				{isComments && (
					<Box mt="0.5rem">
						{comments.map((comment, i) => (
							<Box key={`${name}-${i}`}>
								<Divider />
								<Typography className="post__comments" sx={{ m: "0.5rem 0", pl: "1rem" }}>
									{comment}
								</Typography>
							</Box>
						))}
						<Divider />
					</Box>
				)}
			</WidgetWrapper>
		</Layout>
	);
};
