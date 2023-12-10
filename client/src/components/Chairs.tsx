import React, { useEffect, useState } from 'react';
import ChairItem from './furnitureItem'
import { getChairs } from '../API/APIchairs'
import { Link, useLocation } from "react-router-dom";
import { Button, Typography } from '@material-ui/core'
import { Search } from "./Search"
import { motion, AnimatePresence } from "framer-motion";

function Chairs() {
	const [chairs, setChairs] = useState<furnitureSchema[]>([])
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		fetchTables()
	}, [])

	const fetchTables = (): void => {
		getChairs()
			.then(({ data: { data } }: furnitureSchema[] | any) => {
				setChairs(data)
			})
			.catch((err: Error) => console.log(err))
	}
	return (
		<motion.div className='App'>
			<div className='Add-Form'>
				<Typography variant="h4" style={{ marginTop: 20 }}>Chairs</Typography>
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
								furniture={chair}
							/>
							<Link to={`http://localhost:3000/chairs/${chair._id}`} state={{ furniture: chair }} >
								<Button>View</Button>
							</Link>
						</div>
					))}
			</AnimatePresence>
		</motion.div>
	);
}

export default Chairs;