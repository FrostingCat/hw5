import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},

	password: {
		type: String,
		required: true,
	}
})

export const UserModel = mongoose.model('users', UserSchema);