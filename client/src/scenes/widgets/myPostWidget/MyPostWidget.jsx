import { Box, Divider, Typography, InputBase, Button, IconButton, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { useState } from "react";
import {
	AttachFileOutlined,
	MoreHorizOutlined,
	DeleteOutlined,
	GifBoxOutlined,
	ImageOutlined,
	EditOutlined,
	MicOutlined,
} from "@mui/icons-material";

import { UserImage, FlexBetween, WidgetWrapper, Layout } from "components";
import { setPosts } from "./../../../store/auth/auth.slice";

export const MyPostWidget = ({ picturePath }) => {
	const { _id } = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const [isImage, setIsImage] = useState(false);
	const [image, setImage] = useState(null);
	const [post, setPost] = useState("");
	const dispatch = useDispatch();

	const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

	const handlePost = async () => {
		const formData = new FormData();
		formData.append("userId", _id);
		formData.append("description", post);
		if (image) {
			formData.append("picture", image);
			formData.append("picturePath", image.name);
		}

		const response = await fetch(`http://localhost:4000/api/posts/create`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token}` },
			body: formData,
		});

		const posts = await response.json();
		dispatch(setPosts({ posts }));
		setImage(null);
		setPost("");
	};

	return (
		<Layout>
			<WidgetWrapper>
				<FlexBetween gap="1.5rem">
					<UserImage image={picturePath} />
					<InputBase
						className="myPostWidget__input"
						placeholder="What's on your mind..."
						onChange={(e) => setPost(e.target.value)}
						value={post}
						sx={{
							width: "100%",
							borderRadius: "2rem",
							padding: "1rem 2rem",
						}}
					/>
				</FlexBetween>
				{isImage && (
					<Box className="myPostWidget__dropzone_solid" border={`1px solid`} borderRadius="5px" mt="1rem" p="1rem">
						<Dropzone
							acceptedFiles=".jpg,.jpeg,.png"
							multiple={false}
							onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
						>
							{({ getRootProps, getInputProps }) => (
								<FlexBetween>
									<Box
										className="myPostWidget__dropzone_dashed"
										{...getRootProps()}
										border={`2px dashed`}
										p="1rem"
										width="100%"
										sx={{ "&:hover": { cursor: "pointer" } }}
									>
										<input {...getInputProps()} />
										{!image ? (
											<p className="myPostWidget__dropzone_text">Add Image Here</p>
										) : (
											<FlexBetween>
												<Typography>{image.name}</Typography>
												<EditOutlined />
											</FlexBetween>
										)}
									</Box>
									{image && (
										<IconButton onClick={() => setImage(null)} sx={{ width: "15%" }}>
											<DeleteOutlined />
										</IconButton>
									)}
								</FlexBetween>
							)}
						</Dropzone>
					</Box>
				)}

				<Divider sx={{ margin: "1.25rem 0" }} />

				<FlexBetween>
					<FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
						<ImageOutlined className="myPostWidget__imageOutlined" />
						<Typography className="myPostWidget__imageOutlined_title" sx={{ "&:hover": { cursor: "pointer" } }}>
							Image
						</Typography>
					</FlexBetween>

					{isNonMobileScreens ? (
						<>
							<FlexBetween gap="0.25rem">
								<GifBoxOutlined className="myPostWidget__gifBoxOutlined" />
								<Typography className="myPostWidget__gifBoxOutlined_title">Clip</Typography>
							</FlexBetween>

							<FlexBetween gap="0.25rem">
								<AttachFileOutlined className="myPostWidget__attachFileOutlined" />
								<Typography className="myPostWidget__attachFileOutlined_title">Attachment</Typography>
							</FlexBetween>

							<FlexBetween gap="0.25rem">
								<MicOutlined className="myPostWidget__micOutlined" />
								<Typography className="myPostWidget__micOutlined_title">Audio</Typography>
							</FlexBetween>
						</>
					) : (
						<FlexBetween gap="0.25rem">
							<MoreHorizOutlined className="myPostWidget__moreHorizOutlined" />
						</FlexBetween>
					)}

					<Button
						className="myPostWidget__postBtn"
						disabled={!post}
						onClick={handlePost}
						sx={{
							borderRadius: "3rem",
						}}
					>
						POST
					</Button>
				</FlexBetween>
			</WidgetWrapper>
		</Layout>
	);
};
