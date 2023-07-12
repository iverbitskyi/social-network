import { Box, Button, Typography, TextField } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiEdit } from "react-icons/fi";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import { Layout, FlexBetween } from "components";
import { setLogin } from "store/auth/auth.slice";

const registerSchema = yup.object().shape({
	email: yup.string().email("invalid email").required("required"),
	occupation: yup.string().required("required"),
	firstName: yup.string().required("required"),
	lastName: yup.string().required("required"),
	password: yup.string().required("required"),
	location: yup.string().required("required"),
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
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	location: "",
	occupation: "",
	picture: "",
};

export const FormComponent = () => {
	const isNonMobile = useMediaQuery({ minWidth: 600 });

	const [pageType, setPageType] = useState("login");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isRegister = pageType === "register";
	const isLogin = pageType === "login";

	const register = async (values, onSubmitProps) => {
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
				initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
				validationSchema={isLogin ? loginSchema : registerSchema}
				onSubmit={handleFormSubmit}
				enableReinitialize={true}
				className="formik"
			>
				{({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm }) => (
					<form onSubmit={handleSubmit}>
						<Box sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }} className="form">
							{isRegister && (
								<>
									<TextField
										error={Boolean(touched.firstName) && Boolean(errors.firstName)}
										helperText={touched.firstName && errors.firstName}
										sx={{ gridColumn: "span 2" }}
										value={values.firstName}
										onChange={handleChange}
										onBlur={handleBlur}
										label="First Name"
										name="firstName"
									/>

									<TextField
										error={Boolean(touched.lastName) && Boolean(errors.lastName)}
										helperText={touched.lastName && errors.lastName}
										sx={{ gridColumn: "span 2" }}
										onChange={handleChange}
										value={values.lastName}
										onBlur={handleBlur}
										label="Last Name"
										name="lastName"
									/>
									<TextField
										error={Boolean(touched.location) && Boolean(errors.location)}
										helperText={touched.location && errors.location}
										sx={{ gridColumn: "span 4" }}
										value={values.location}
										onChange={handleChange}
										onBlur={handleBlur}
										label="Location"
										name="location"
									/>
									<TextField
										error={Boolean(touched.occupation) && Boolean(errors.occupation)}
										helperText={touched.occupation && errors.occupation}
										sx={{ gridColumn: "span 4" }}
										value={values.occupation}
										onChange={handleChange}
										onBlur={handleBlur}
										label="Occupation"
										name="occupation"
									/>
									<Box className="form__picture">
										<Dropzone
											onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
											acceptedFiles=".jpg,.jpeg,.png"
											multiple={false}
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

							<TextField
								error={Boolean(touched.email) && Boolean(errors.email)}
								helperText={touched.email && errors.email}
								sx={{ gridColumn: "span 4" }}
								onChange={handleChange}
								value={values.email}
								onBlur={handleBlur}
								label="Email"
								name="email"
							/>
							<TextField
								error={Boolean(touched.password) && Boolean(errors.password)}
								helperText={touched.password && errors.password}
								sx={{ gridColumn: "span 4" }}
								value={values.password}
								onChange={handleChange}
								onBlur={handleBlur}
								label="Password"
								type="password"
								name="password"
							/>
						</Box>

						{/* BUTTONS */}
						<Box>
							<Button className="form__btn" fullWidth type="submit" sx={{ m: "2rem 0", p: "1rem" }}>
								{isLogin ? "LOGIN" : "REGISTER"}
							</Button>
							<Typography
								className="form__change"
								onClick={() => {
									setPageType(isLogin ? "register" : "login");
									resetForm();
								}}
							>
								{isLogin ? "Don't have an account? Sign Up here." : "Already have an account? Login here."}
							</Typography>
						</Box>
					</form>
				)}
			</Formik>
		</Layout>
	);
};
