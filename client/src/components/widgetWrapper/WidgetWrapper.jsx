import React from "react";
import { Layout } from "components";

export const WidgetWrapper = ({ children }) => (
	<Layout>
		<div className="widgetWrapper">{children}</div>
	</Layout>
);
