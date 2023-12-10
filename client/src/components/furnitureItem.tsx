import React, { useEffect, useState } from 'react';
import { Card, Typography, CardActionArea } from '@material-ui/core'
import { motion } from "framer-motion";
import './furnitureItem.css'

type Props = furnitureProps

const Item: React.FC<Props> = ({ furniture }) => {
	return (
		<motion.div>
		<Card className="testimonial" key={furniture._id}>
			<img src={furniture.image} />
			<Typography className="people">
				size: {furniture.size}<br></br>
				material: {furniture.material}<br></br>
				color: {furniture.color.name}<br></br>
				quantity: {furniture.quantity}<br></br>
				description: {furniture.description}<br></br>
			</Typography>
		</Card>
		</motion.div>
	)
}

export default Item