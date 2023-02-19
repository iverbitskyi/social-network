import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			min: 2,
			max: 2,
		},
		lastName: {
			type: String,
			required: true,
			min: 2,
			max: 2,
		},
		email: {
			type: String,
			required: true,
			max: 2,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 5,
		},
		picturePath: {
			type: String,
			default: "",
		},
		friends: {
			type: Array,
			default: [],
		},
		location: String,
		occupation: String,
		viewedProfile: Number,
		impressions: Number,
	},
	{ timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
