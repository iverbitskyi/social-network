import {
	ManageAccountsOutlined,
	EditOutlined,
	LocationOnOutlined,
	WorkOutlineOutlined,
	Twitter,
	LinkedIn,
} from "@mui/icons-material";
import { Box, Typography, Divider } from "@mui/material";
import { UserImage, FlexBetween, WidgetWrapper, Layout } from "components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserWidget = ({ userId, picturePath }) => {
	const [user, setUser] = useState(null);

	const navigate = useNavigate();

	const token = useSelector((state) => state.auth.token);

	const getUser = async () => {
		const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		setUser(data);
	};

	useEffect(() => {
		getUser();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (!user) {
		return null;
	}

	const { firstName, lastName, location, occupation, viewedProfile, impressions, friends } = user;

	return (
		<Layout>
			<WidgetWrapper>
				{/* FIRST ROW */}
				<FlexBetween
					className="userWidget"
					gap="0.5rem"
					pb="1.1rem"
					onClick={() => navigate(`/profile/${userId}`)}
				>
					<FlexBetween gap="1rem">
						<UserImage image={picturePath} />
						<Box>
							<Typography
								className="userWidget__name"
								variant="h4"
								fontWeight="500"
								sx={{
									"&:hover": {
										cursor: "pointer",
									},
								}}
							>
								{firstName} {lastName}
							</Typography>
							<Typography className="userWidget__friends">
								{friends.length} friends
							</Typography>
						</Box>
					</FlexBetween>
					<ManageAccountsOutlined className="userWidget__manageIcon" />
				</FlexBetween>

				<Divider />

				{/* SECOND ROW */}
				<Box p="1rem 0">
					<Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
						<LocationOnOutlined fontSize="large" className="userWidget__location_icon" />
						<Typography className="userWidget__location">{location}</Typography>
					</Box>

					<Box display="flex" alignItems="center" gap="1rem">
						<WorkOutlineOutlined className="userWidget__occupation_icon" fontSize="large" />
						<Typography className="userWidget__occupation">{occupation}</Typography>
					</Box>
				</Box>

				<Divider />

				{/* THIRD ROW */}
				<Box p="1rem 0">
					<FlexBetween mb="0.5rem">
						<Typography className="userWidget__viewed_title">
							Who's viewed your profile
						</Typography>
						<Typography className="userWidget__viewed" fontWeight="500">
							{viewedProfile}
						</Typography>
					</FlexBetween>
					<FlexBetween>
						<Typography className="userWidget__impressions_title">
							Impressions of your post
						</Typography>
						<Typography className="userWidget__impressions" fontWeight="500">
							{impressions}
						</Typography>
					</FlexBetween>
				</Box>

				<Divider />

				{/* FOURTH ROW */}
				<Box p="1rem 0">
					<Typography
						fontSize="1rem"
						className="userWidget__social"
						fontWeight="500"
						mb="1rem"
					>
						Social Profiles
					</Typography>

					<FlexBetween gap="1rem" mb="0.5rem">
						<FlexBetween gap="1rem">
							<Twitter className="userWidget__twitterIcon" fontSize="large" />

							<Box>
								<Typography className="userWidget__twitter" fontWeight="500">
									Twitter
								</Typography>
								<Typography className="userWidget__twitter_text">Social Network</Typography>
							</Box>
						</FlexBetween>
						<EditOutlined className="userWidget__editIcon" />
					</FlexBetween>

					<FlexBetween gap="1rem">
						<FlexBetween gap="1rem">
							<LinkedIn className="userWidget__linkedinIcon" fontSize="large" />
							<Box>
								<Typography className="userWidget__linkedin" fontWeight="500">
									Linkedin
								</Typography>
								<Typography className="userWidget__linkedin_text">
									Network Platform
								</Typography>
							</Box>
						</FlexBetween>
						<EditOutlined className="userWidget__editIcon" />
					</FlexBetween>
				</Box>
			</WidgetWrapper>
		</Layout>
	);
};
