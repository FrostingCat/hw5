import React, { useEffect, useState } from 'react';
import TableItem from './furnitureItem'
import { getTables } from '../API/APItables'
import { Link, useLocation } from "react-router-dom";
import { Button, Typography } from '@material-ui/core'
import { Search } from "./Search"
import { motion, AnimatePresence } from "framer-motion";

function Tables() {
	const [tables, setTables] = useState<furnitureSchema[]>([])
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		fetchTables()
	}, [])

	const fetchTables = (): void => {
		getTables()
			.then(({ data: { data } }: furnitureSchema[] | any) => {
				setTables(data)
			})
			.catch((err: Error) => console.log(err))
	}

	return (
		<motion.div className='App'>
			<div className='Add-Form'>
				<Typography variant="h4" style={{ marginTop: 20 }}>Tables</Typography>
				<Link to={`http://localhost:3000/`} >
					<Button>Go Back</Button>
				</Link>
				<Search
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setInputValue(e.target.value);
					}}
				/>
			</div>
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
								furniture={table}
							/>
							<Link to={`http://localhost:3000/tables/${table._id}`} state={{ furniture: table }} >
								<Button>View</Button>
							</Link>
						</div>
					))}
			</AnimatePresence>
		</motion.div>
	)
}

export default Tables