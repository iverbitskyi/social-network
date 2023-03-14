import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "store/auth/auth.slice";
import Dropzone from "react-dropzone";
import { useMediaQuery } from "react-responsive";
import { FiEdit } from "react-icons/fi";
import { Layout } from "components/layout";
import { Box, Button, TextField, Typography } from "@mui/material";
import { FlexBetween } from "components/flexBetween";

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
						<Box
							className="form"
							sx={{
								"& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
							}}
						>
							{isRegister && (
								<>
									<TextField
										className="form__firstName"
										label="First Name"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.firstName}
										name="firstName"
										error={Boolean(touched.firstName) && Boolean(errors.firstName)}
										helperText={touched.firstName && errors.firstName}
									/>
									<TextField
										className="form__lastName"
										label="Last Name"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.lastName}
										name="lastName"
										error={Boolean(touched.lastName) && Boolean(errors.lastName)}
										helperText={touched.lastName && errors.lastName}
									/>
									<TextField
										className="form__location"
										label="Location"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.location}
										name="location"
										error={Boolean(touched.location) && Boolean(errors.location)}
										helperText={touched.location && errors.location}
									/>
									<TextField
										className="form__occupation"
										label="Occupation"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.occupation}
										name="occupation"
										error={Boolean(touched.occupation) && Boolean(errors.occupation)}
										helperText={touched.occupation && errors.occupation}
									/>
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

							<TextField
								className="form__email"
								label="Email"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.email}
								name="email"
								error={Boolean(touched.email) && Boolean(errors.email)}
								helperText={touched.email && errors.email}
							/>
							<TextField
								className="form__password"
								label="Password"
								type="password"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.password}
								name="password"
								error={Boolean(touched.password) && Boolean(errors.password)}
								helperText={touched.password && errors.password}
							/>
						</Box>

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
