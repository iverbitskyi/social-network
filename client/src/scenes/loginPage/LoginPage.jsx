import { Layout } from "components/layout";
import { FormComponent } from "components/form";
import { Box, Typography } from "@mui/material";
import { useMediaQuery } from "react-responsive";

export const LoginPage = () => {
	const isNonMobileScreens = useMediaQuery({ minWidth: 1000 });
	return (
		<Layout>
			<Box>
				<Box className="loginPage__name">
					<Typography className="loginPage__name_text" fontSize="32px" fontWeight="bold">
						Sociopedia
					</Typography>
				</Box>

				<Box className="loginPage__description" width={isNonMobileScreens ? "50%" : "93%"}>
					<Typography fontWeight="500" sx={{ mb: "1.5rem" }} variant="h6">
						Welcome to Socipedia, the Social Media for Sociopaths!
					</Typography>
					<FormComponent />
				</Box>
			</Box>
		</Layout>
	);
};
