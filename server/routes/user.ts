import AuthService from '../services/auth';
import verifyJWT from '../middlewares/isAuth';
import { UserModel } from '../models/user';
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

export default (app) => {

	app.get("/isAuth", verifyJWT, (req, res) => {
		return res.json({ isLoggedIn: true, email: req.user.email })
	})

	app.post("/login", (req, res) => {
		const userLoggingIn = req.body;
		UserModel.findOne({ email: userLoggingIn.email })
			.then(dbUser => {
				if (!dbUser) {
					return res.json({ message: "Invalid email or Password" })
				}
				bcrypt.compare(userLoggingIn.password, dbUser.password)
					.then(isCorrect => {
						if (isCorrect) {
							const payload = {
								id: dbUser._id,
								email: dbUser.email,
							}
							jwt.sign(
								payload,
								process.env.PASSPORTSECRET,
								{ expiresIn: 8640 },
								(err, token) => {
									return res.json({ message: "Success", token: "Bearer " + token })
								}
							)
						} else {
							return res.json({ message: "Invalid email or Password" })
						}
					})

			})
	})

	app.post("/register", async (req, res) => {
		const user = req.body;

		const takenUsername = await UserModel.findOne({ email: user.email })
		
		if (takenUsername) {
			return res.json({ message: "Email has already been taken" })
		} else {
			user.password = await bcrypt.hash(req.body.password, 10)

			console.log(user)

			const dbUser = new UserModel({
				email: user.email,
				password: user.password,
			})

			dbUser.save()
			return res.json({ message: "Success" })
		}
	})


};