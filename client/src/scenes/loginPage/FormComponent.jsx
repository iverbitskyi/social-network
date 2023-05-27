import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "store/auth/auth.slice";
import Dropzone from "react-dropzone";
import { useMediaQuery } from "react-responsive";
import { FiEdit } from "react-icons/fi";
import { Layout, FlexBetween } from "components";
import { Box, Button, Typography } from "@mui/material";

const registerSchema = yup.object().shape({
	firstName: yup.string().required("required"),
	lastName: yup.string().required("required"),
	email: yup.string().email("invalid email").required("required"),
	password: yup.string().required("required"),
	location: yup.string().required("required"),
	occupation: yup.string().required("required"),
	picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
	email: yup.string().email("invalid email").required("required"),
	password: yup.string().required("required"),
});

const initialValuesRegister = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	location: "",
	occupation: "",
	picture: "",
};

const initialValuesLogin = {
	email: "",
	password: "",
};

export const FormComponent = () => {
	const [pageType, setPageType] = useState("login");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isNonMobile = useMediaQuery({ minWidth: 600 });
	const isLogin = pageType === "login";
	const isRegister = pageType === "register";

	const register = async (values, onSubmitProps) => {
		// this allows us to send form info with image
		const formData = new FormData();
		for (let value in values) {
			formData.append(value, values[value]);
		}
		formData.append("picturePath", values.picture.name);

		const savedUserResponse = await fetch("http://localhost:4000/api/auth/register", {
			method: "POST",
			body: formData,
		});
		const savedUser = await savedUserResponse.json();
		onSubmitProps.resetForm();

		if (savedUser) {
			setPageType("login");
		}
	};

	const login = async (values, onSubmitProps) => {
		const loggedInResponse = await fetch("http://localhost:4000/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(values),
		});

		const loggedIn = await loggedInResponse.json();
		onSubmitProps.resetForm();

		if (loggedInResponse.ok) {
			dispatch(
				setLogin({
					user: loggedIn.user,
					token: loggedIn.token,
				})
			);
			navigate("/home");
		} else {
			alert(loggedIn.msg);
		}
	};

	const handleFormSubmit = async (values, onSubmitProps) => {
		if (isLogin) await login(values, onSubmitProps);
		if (isRegister) await register(values, onSubmitProps);
	};

	return (
		<Layout>
			<Formik
				className="formik"
				onSubmit={handleFormSubmit}
				initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
				validationSchema={isLogin ? loginSchema : registerSchema}
			>
				{({
					values,
					errors,
					touched,
					handleBlur,
					handleChange,
					handleSubmit,
					setFieldValue,
					resetForm,
				}) => (
					<form onSubmit={handleSubmit}>
						<div className="form" style={{ gridColumn: isNonMobile ? undefined : "span 4" }}>
							{isRegister && (
								<>
									<div className="form__input_group">
										<input
											type="text"
											name="firstName"
											id="firstName"
											value={values.firstName}
											onChange={handleChange}
											onBlur={handleBlur}
											required
											className={
												errors.firstName && touched.firstName
													? "form__input form__input_error"
													: "form__input"
											}
										/>
										<label
											htmlFor="firstName"
											className={
												errors.firstName && touched.firstName
													? "form__label form__lable_error"
													: "form__label"
											}
										>
											First Name
										</label>

										{errors.firstName && touched.firstName && (
											<span className="form__error">{errors.firstName}</span>
										)}
									</div>

									<div className="form__input_group">
										<input
											type="text"
											name="lastName"
											id="lastName"
											value={values.lastName}
											onChange={handleChange}
											onBlur={handleBlur}
											required
											className={
												errors.lastName && touched.lastName
													? "form__input form__input_error"
													: "form__input"
											}
										/>
										<label
											htmlFor="lastName"
											className={
												errors.lastName && touched.lastName
													? "form__label form__lable_error"
													: "form__label"
											}
										>
											Last Name
										</label>

										{errors.lastName && touched.lastName && (
											<span className="form__error">{errors.lastName}</span>
										)}
									</div>

									<div className="form__input_group">
										<input
											type="text"
											name="location"
											id="location"
											value={values.location}
											onChange={handleChange}
											onBlur={handleBlur}
											required
											className={
												errors.location && touched.location
													? "form__input form__input_error"
													: "form__input"
											}
										/>
										<label
											htmlFor="location"
											className={
												errors.location && touched.location
													? "form__label form__lable_error"
													: "form__label"
											}
										>
											Location
										</label>

										{errors.location && touched.location && (
											<span className="form__error">{errors.location}</span>
										)}
									</div>

									<div className="form__input_group">
										<input
											type="text"
											name="occupation"
											id="occupation"
											value={values.occupation}
											onChange={handleChange}
											onBlur={handleBlur}
											required
											className={
												errors.occupation && touched.occupation
													? "form__input form__input_error"
													: "form__input"
											}
										/>
										<label
											htmlFor="occupation"
											className={
												errors.occupation && touched.occupation
													? "form__label form__lable_error"
													: "form__label"
											}
										>
											Occupation
										</label>

										{errors.occupation && touched.occupation && (
											<span className="form__error">{errors.occupation}</span>
										)}
									</div>

									<Box className="form__picture">
										<Dropzone
											acceptedFiles=".jpg,.jpeg,.png"
											multiple={false}
											onDrop={(acceptedFiles) =>
												setFieldValue("picture", acceptedFiles[0])
											}
										>
											{({ getRootProps, getInputProps }) => (
												<Box className="form__picture_dropzone" {...getRootProps()}>
													<input {...getInputProps()} />
													{!values.picture ? (
														<p>Add Picture Here</p>
													) : (
														<FlexBetween>
															<Typography>{values.picture.name}</Typography>
															<FiEdit />
														</FlexBetween>
													)}
												</Box>
											)}
										</Dropzone>
									</Box>
								</>
							)}

							<div className="form__input_group">
								<input
									type="text"
									name="email"
									id="email"
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									required
									className={
										errors.email && touched.email
											? "form__input form__input_error"
											: "form__input"
									}
								/>
								<label
									htmlFor="email"
									className={
										errors.email && touched.email
											? "form__label form__lable_error"
											: "form__label"
									}
								>
									Email
								</label>

								{errors.email && touched.email && (
									<span className="form__error">{errors.email}</span>
								)}
							</div>

							<div className="form__input_group">
								<input
									type="password"
									name="password"
									id="password"
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
									required
									className={
										errors.password && touched.password
											? "form__input form__input_error"
											: "form__input"
									}
								/>
								<label
									htmlFor="password"
									className={
										errors.password && touched.password
											? "form__label form__lable_error"
											: "form__label"
									}
								>
									Password
								</label>

								{errors.password && touched.password && (
									<span className="form__error">{errors.password}</span>
								)}
							</div>
						</div>

						{/* BUTTONS */}
						<Box>
							<Button
								className="form__btn"
								fullWidth
								type="submit"
								sx={{ m: "2rem 0", p: "1rem" }}
							>
								{isLogin ? "LOGIN" : "REGISTER"}
							</Button>
							<Typography
								className="form__change"
								onClick={() => {
									setPageType(isLogin ? "register" : "login");
									resetForm();
								}}
							>
								{isLogin
									? "Don't have an account? Sign Up here."
									: "Already have an account? Login here."}
							</Typography>
						</Box>
					</form>
				)}
			</Formik>
		</Layout>
	);
};
