import React, { useEffect, useState, useLayoutEffect } from 'react';
import ChairItem from './AdminFurnitureItem'
import AddFurniture from './AddFurniture'
import EditFurniture from './EditFurniture'
import { getChairs, addChair, deleteChair, editChair } from '../API/APIchairs'
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from '@material-ui/core'
import Modal from "./modal";
import { Search } from "../components/Search"
import { motion, AnimatePresence } from "framer-motion";

function AdminChairs() {
	const navigate = useNavigate()
	const [errorMessage, setErrorMessage] = useState("")
	const [chairs, setChairs] = useState<furnitureSchema[]>([])
	const [isModalActive, setModalActive] = useState(false);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		fetchTables()
	}, [])

	const checkFormData = (formData: furnitureSchema): boolean => {
		if (!formData.size || !formData.material || !formData.color.name || !formData.color.HEX
			|| !formData.quantity || !formData.description || !formData.image) {
			alert("Fill in all the fields");
			return false
		}
		return true
	}

	const fetchTables = (): void => {
		getChairs()
			.then(({ data: { data } }: furnitureSchema[] | any) => {
				setChairs(data)
			})
			.catch((err: Error) => console.log(err))
	}

	const handleSaveChair = (e: React.FormEvent, formData: furnitureSchema): void => {
		e.preventDefault()
		if (checkFormData(formData)) {
			addChair(formData)
				.then(({ status, data }) => {
					if (status !== 200) {
						alert("Error! Chair not saved")
					}
					console.log(data.furniture, { data })
					setChairs(data.furniture)
				})
				.catch(err => console.log(err))
		}
		console.log("error")
	}

	const handleEditChair = (e: React.FormEvent, _id: string, formData: furnitureSchema): void => {
		e.preventDefault()
		editChair(_id, formData)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Chair not edited")
				}
				console.log(data.furniture, { data })
				setChairs(data.furniture)
			})
			.catch(err => console.log(err))
	}

	const handleDeleteChair = (_id: string): void => {
		deleteChair(_id)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Chair not deleted")
				}
				setChairs(data.furniture)
			})
			.catch(err => console.log(err))
	}

	const handleModalOpen = () => {
		setModalActive(true);
	};
	const handleModalClose = () => {
		setModalActive(false);
	};

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
		<motion.div className='App'>
			<div className="buttons">
				<Link to={`http://localhost:3000/admin/chairs`} >
					<Button>Chairs</Button>
				</Link>
				<Link to={`http://localhost:3000/admin/tables`} >
					<Button>Tables</Button>
				</Link>
				<Link to={`http://localhost:3000/admin/closets`} >
					<Button>Closets</Button>
				</Link>
			</div>
			<Typography variant="h4" style={{ marginTop: 20 }}>Chairs</Typography>
			<Link to={`http://localhost:3000/`} >
				<Button>Go Back</Button>
			</Link>
			<AddFurniture saveFurniture={handleSaveChair} />
			<Search
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setInputValue(e.target.value);
				}}
			/>
			<AnimatePresence>
				{chairs
					?.filter((el) =>
						el.description
							.toLowerCase()
							.includes(inputValue.toLowerCase()),
					)
					?.map((chair: furnitureSchema) => (
						<div>
							<ChairItem
								key={chair._id}
								deleteFurniture={handleDeleteChair}
								furniture={chair}
							/>
							<Link to={`http://localhost:3000/admin/chairs/${chair._id}`} state={{ furniture: chair }} >
								<Button>View</Button>
							</Link>
							<Button className="button" type="button" onClick={handleModalOpen}>
								Edit
							</Button>
							<div>
								{isModalActive && (
									<Modal title="Editing" onClose={handleModalClose}>
										<EditFurniture editFurniture={handleEditChair} furniture={chair} />
									</Modal>
								)}
							</div>
						</div>
					))}
			</AnimatePresence>
		</motion.div>
	);
}

export default AdminChairs;