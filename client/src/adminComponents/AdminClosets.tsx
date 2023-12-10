import React, { useEffect, useState, useLayoutEffect } from 'react';
import ClosetItem from './AdminFurnitureItem'
import { getClosets, addCloset, deleteCloset, editCloset } from '../API/APIclosets'
import AddFurniture from './AddFurniture'
import EditFurniture from './EditFurniture'
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from '@material-ui/core'
import Modal from "./modal";
import { Search } from "../components/Search"
import { motion, AnimatePresence } from "framer-motion";

function AdminClosets() {
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate()
	const [closets, setClosets] = useState<furnitureSchema[]>([])
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
		getClosets()
			.then(({ data: { data } }: furnitureSchema[] | any) => {
				setClosets(data)
			})
			.catch((err: Error) => console.log(err))
	}

	const handleSaveCloset = (e: React.FormEvent, formData: furnitureSchema): void => {
		e.preventDefault()
		if (checkFormData(formData)) {
			addCloset(formData)
				.then(({ status, data }) => {
					if (status !== 200) {
						throw new Error("Error! Closet not saved")
					}
					console.log(data.furniture, { data })
					setClosets(data.furniture)
				})
				.catch(err => console.log(err))
		}
		console.log("error")
	}

	const handleEditCloset = (e: React.FormEvent, _id: string, formData: furnitureSchema): void => {
		e.preventDefault()
		editCloset(_id, formData)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Closet not edited")
				}
				console.log(data.furniture, { data })
				setClosets(data.furniture)
			})
			.catch(err => console.log(err))
	}


	const handleDeleteCloset = (_id: string): void => {
		deleteCloset(_id)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Closet not deleted")
				}
				setClosets(data.furniture)
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
			<Typography variant="h4" style={{ marginTop: 20 }}>Closets</Typography>
			<Link to={`http://localhost:3000/`} >
				<Button>Go Back</Button>
			</Link>
			<AddFurniture saveFurniture={handleSaveCloset} />
			<Search
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setInputValue(e.target.value);
				}}
			/>
			<AnimatePresence>
				{closets
					?.filter((el) =>
						el.description
							.toLowerCase()
							.includes(inputValue.toLowerCase()),
					)
					?.map((closet: furnitureSchema) => (
						<div>
							<ClosetItem
								key={closet._id}
								deleteFurniture={handleDeleteCloset}
								furniture={closet}
							/>
							<Link to={`http://localhost:3000/admin/closets/${closet._id}`} state={{ furniture: closet }} >
								<Button>View</Button>
							</Link>
							<Button className="button" type="button" onClick={handleModalOpen}>
								Edit
							</Button>
							<div>
								{isModalActive && (
									<Modal title="Editing" onClose={handleModalClose}>
										<EditFurniture editFurniture={handleEditCloset} furniture={closet} />
									</Modal>
								)}
							</div>
						</div>
					))}
			</AnimatePresence>
		</motion.div>
	);
}

export default AdminClosets;