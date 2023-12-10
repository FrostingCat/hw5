import React, { useEffect, useState } from 'react';
import ClosetItem from './furnitureItem'
import { getClosets } from '../API/APIclosets'
import { Link, useLocation } from "react-router-dom";
import { Button, Typography } from '@material-ui/core'
import { Search } from "./Search"
import { motion, AnimatePresence } from "framer-motion";
import { getAllByDisplayValue } from '@testing-library/react';

function Closets() {
	const [closets, setClosets] = useState<furnitureSchema[]>([])
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		fetchTables()
	}, [])

	const fetchTables = (): void => {
		getClosets()
			.then(({ data: { data } }: furnitureSchema[] | any) => {
				setClosets(data)
			})
			.catch((err: Error) => console.log(err))
	}
	return (
		<motion.div className='App'>
			<div className='Add-Form'>
				<Typography variant="h4" style={{ marginTop: 20 }}>Closets</Typography>
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
								furniture={closet}
							/>
							<Link to={`http://localhost:3000/closets/${closet._id}`} state={{ furniture: closet }} >
								<Button>View</Button>
							</Link>
						</div>
					))}
			</AnimatePresence>
		</motion.div>
	);
}

export default Closets;