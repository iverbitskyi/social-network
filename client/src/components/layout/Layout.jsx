import { useSelector } from "react-redux";
import "./Layout.scss";

export const Layout = (props) => {
	const theme = useSelector((state) => state.theme);

	return <div className={`${theme} container`}>{props.children}</div>;
};
