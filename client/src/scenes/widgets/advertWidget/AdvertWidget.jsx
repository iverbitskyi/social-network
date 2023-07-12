import { FlexBetween, Layout, WidgetWrapper } from "components";
import { Typography } from "@mui/material";

export const AdvertWidget = () => {
	return (
		<Layout>
			<WidgetWrapper>
				<FlexBetween>
					<Typography className="ad__sponsored" variant="h5" fontWeight="500">
						Sponsored
					</Typography>
					<Typography className="ad__create">Create Ad</Typography>
				</FlexBetween>
				<img
					width="100%"
					height="auto"
					alt="advert"
					src="http://localhost:4000/assets/info4.jpeg"
					style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
				/>
				<FlexBetween>
					<Typography className="ad__title">MikaCosmetics</Typography>
					<Typography className="ad__link">mikacosmetics.com</Typography>
				</FlexBetween>
				<Typography className="ad__text" m="0.5rem 0">
					Your pathway to stunning and immaculate beauty and made sure your skin is exfoliating skin and shining
					like light.
				</Typography>
			</WidgetWrapper>
		</Layout>
	);
};
