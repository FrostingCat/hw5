import React, { useEffect, useState, useLayoutEffect } from 'react';
import TableItem from './AdminFurnitureItem'
import AddFurniture from './AddFurniture'
import EditFurniture from './EditFurniture'
import { getTables, addTable, deleteTable, editTable } from '../API/APItables'
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from '@material-ui/core'
import Modal from "./modal";
import { Search } from "../components/Search"
import { motion, AnimatePresence } from "framer-motion";

function AdminTables() {
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate()
	const [tables, setTables] = useState<furnitureSchema[]>([])
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
		getTables()
			.then(({ data: { data } }: furnitureSchema[] | any) => {
				setTables(data)
			})
			.catch((err: Error) => console.log(err))
	}

	const handleSaveTable = (e: React.FormEvent, formData: furnitureSchema): void => {
		e.preventDefault()
		if (checkFormData(formData)) {
			addTable(formData)
				.then(({ status, data }) => {
					if (status !== 200) {
						throw new Error("Error! Table not saved")
					}
					console.log(data.furniture, { data })
					setTables(data.furniture)
				})
				.catch(err => console.log(err))
		}
		console.log("error")
	}

	const handleEditTable = (e: React.FormEvent, _id: string, formData: furnitureSchema): void => {
		e.preventDefault()
		editTable(_id, formData)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Table not edited")
				}
				console.log(data.furniture, { data })
				setTables(data.furniture)
			})
			.catch(err => console.log(err))
	}

	const handleDeleteTable = (_id: string): void => {
		deleteTable(_id)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Table not deleted")
				}
				setTables(data.furniture)
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
			<Typography variant="h4" style={{ marginTop: 20 }}>Tables</Typography>
			<Link to={`http://localhost:3000/`} >
				<Button>Go Back</Button>
			</Link>
			<AddFurniture saveFurniture={handleSaveTable} />
			<Search
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setInputValue(e.target.value);
				}}
			/>
			<AnimatePresence>
				{tables
					?.filter((el) =>
						el.description
							.toLowerCase()
							.includes(inputValue.toLowerCase()),
					)
					?.map((table: furnitureSchema) => (
						<div>
							<TableItem
								key={table._id}
								deleteFurniture={handleDeleteTable}
								furniture={table}
							/>
							<Link to={`http://localhost:3000/admin/tables/${table._id}`} state={{ furniture: table }} >
								<Button>View</Button>
							</Link>
							<Button className="button" type="button" onClick={handleModalOpen}>
								Edit
							</Button>
							<div>
								{isModalActive && (
									<Modal title="Editing" onClose={handleModalClose}>
										<EditFurniture editFurniture={handleEditTable} furniture={table} />
									</Modal>
								)}
							</div>
						</div>
					))}
			</AnimatePresence>
		</motion.div>
	)
}

export default AdminTables