import { Layout } from "components/layout";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { HomePage, LoginPage, ProfilePage } from "scenes";
import { useSelector } from "react-redux";

function App() {
	const isAuth = Boolean(useSelector((state) => state.auth.token));

	return (
		<Layout>
			<div className="app">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<LoginPage />} />
						<Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
						<Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
					</Routes>
				</BrowserRouter>
			</div>
		</Layout>
	);
}

export default App;
