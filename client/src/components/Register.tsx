import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Button, FormControl, FormLabel, InputLabel, Input } from '@material-ui/core'

function Login() {
	const [errorMessage, setErrorMessage] = useState("")
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function onChangeEmail(e: any) {
		setEmail(e.target.value)
	}

	function onChangePassword(e: any) {
		setPassword(e.target.value)
	}

	async function handleLogin(e: any) {
		e.preventDefault()
		const user = {
			email: email,
			password: password
		}

		const res = await fetch("http://localhost:5000/user/register", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(user)
		})
		const data = await res.json()
		localStorage.setItem("token", data.token)
		setErrorMessage(data.message)

		document.location.href = "http://localhost:3000/user/log"
	}

	return (
		<div className="Form">
			<FormControl>
				<InputLabel>e-mail: </InputLabel>
				<Input onChange={onChangeEmail} />
			</FormControl>
			<FormControl>
				<InputLabel>password: </InputLabel>
				<Input onChange={onChangePassword} />
			</FormControl>
			<Button variant="contained" className="Button" onClick={handleLogin}>Submit</Button>
			<Link to={"http://localhost:3000/user/log"} className="Form-button">
				<Button variant="contained" className="Button">Вход</Button>
			</Link>
		</div>
	);
}

export default Login;