import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { setPosts } from "store/auth/auth.slice";
import { PostWidget } from "./PostWidget";
import { Layout } from "components";

export const PostsWidget = ({ userId, isProfile = false }) => {
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.auth.posts);
	const token = useSelector((state) => state.auth.token);

	useEffect(() => {
		const getPosts = async () => {
			const response = await fetch("http://localhost:4000/api/posts", {
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await response.json();
			dispatch(setPosts({ posts: data }));
		};

		const getUserPosts = async () => {
			const response = await fetch(`http://localhost:4000/api/posts/${userId}/posts`, {
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await response.json();
			dispatch(setPosts({ posts: data }));
		};

		if (isProfile) {
			getUserPosts();
		} else {
			getPosts();
		}
	}, [dispatch, token, userId, isProfile]);

	return (
		<Layout>
			<>
				{posts?.map(
					({
						_id,
						userId,
						firstName,
						lastName,
						description,
						location,
						picturePath,
						userPicturePath,
						likes,
						comments,
					}) => (
						<PostWidget
							key={_id}
							postId={_id}
							postUserId={userId}
							name={`${firstName} ${lastName}`}
							description={description}
							location={location}
							picturePath={picturePath}
							userPicturePath={userPicturePath}
							likes={likes}
							comments={comments}
						/>
					)
				)}
			</>
		</Layout>
	);
};
