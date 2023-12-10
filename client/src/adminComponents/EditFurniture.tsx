import React, { useState, useLayoutEffect } from 'react'
import { useNavigate, Navigate } from "react-router-dom";
import { Button, FormControl, InputLabel, Input } from '@material-ui/core'

type Props = furnitureProps & {
	editFurniture: (e: React.FormEvent, _id: string, formData: furnitureSchema) => void
}

const EditFurniture: React.FC<Props> = ({ furniture, editFurniture }) => {
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate()

	const [formData, setFormData] = useState<furnitureSchema>({
		_id: furniture._id,
		size: furniture.size,
		material: furniture.material,
		color: {
			name: furniture.color.name,
			HEX: furniture.color.HEX,
		},
		quantity: furniture.quantity,
		description: furniture.description,
		image: furniture.image,
	});

	function handleForm(e: any) {
		const key = e.currentTarget.id;

		if (key.includes('.')) {
			const keys = key.split('.'); // ['color', 'name']

			setFormData({
				...formData,
				color: {
					...formData?.color,
					[keys[1]]: e.currentTarget.value
				}
			});

			return;
		}

		setFormData({
			...formData,
			[e.currentTarget.id]: e.currentTarget.value,
		})
	}

	useLayoutEffect(() => {
		fetch("http://localhost:5000/user/isAuth", {
			headers: {
				"x-access-token": localStorage.getItem("token") as string
			}
		})
			.then(res => res.json())
			.then(data => data.isLoggedIn ? null : navigate("/user/log"))
			.catch(err => setErrorMessage(err))
	}, [navigate])

	return (
		<div>
			<div className='Add-Form'>
				<FormControl>
					<InputLabel htmlFor='size'>Size</InputLabel>
					<Input onChange={handleForm} type='text' id='size' />
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='material'>Material</InputLabel>
					<Input onChange={handleForm} type='text' id='material' />
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='colorName'>ColorName</InputLabel>
					<Input onChange={handleForm} type='text' id='color.name' />
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='colorHEX'>ColorHEX</InputLabel>
					<Input onChange={handleForm} type='text' id='color.HEX' />
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='quantity'>Quantity</InputLabel>
					<Input onChange={handleForm} type='text' id='quantity' />
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='description'>Description</InputLabel>
					<Input onChange={handleForm} type='text' id='description' />
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='image'>Image</InputLabel>
					<Input onChange={handleForm} type='text' id='image' />
				</FormControl>
			</div>
			{errorMessage === "" ? null : <Navigate to="/user/log" />}
			<Button disabled={formData === undefined ? true : false} onClick={(e) =>
				editFurniture(e, furniture._id, formData)}>
				Edit
			</Button>
		</div>
	)
}

export default EditFurniture