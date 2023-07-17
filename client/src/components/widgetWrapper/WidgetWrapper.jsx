import { Layout } from "components";
import { Box } from "@mui/material";
import React from "react";

export const WidgetWrapper = ({ children }) => (
	<Layout>
		<Box className="widgetWrapper" padding="1.5rem 1.5rem 0.75rem 1.5rem" borderRadius="0.75rem">
			{children}
		</Box>
	</Layout>
);
