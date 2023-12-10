import React, { useEffect, useState } from 'react';
import { Card, Typography, Button } from '@material-ui/core'
import '../components/furnitureItem.css'

type Props = furnitureProps & {
	deleteFurniture: (_id: string) => void
  }

const Item: React.FC<Props> = ({ furniture, deleteFurniture }) => {
	return (
		<Card className="card-admin">
			<Typography className="people">
				id: {furniture._id}<br></br>
				size: {furniture.size}<br></br>
				material: {furniture.material}<br></br>
				color: {furniture.color.name}<br></br>
				HEX: {furniture.color.HEX}<br></br>
				quantity: {furniture.quantity}<br></br>
				description: {furniture.description}<br></br>
			</Typography>
			<Button
				onClick={() => deleteFurniture(furniture._id)}
			>
				Delete
			</Button>
		</Card>
	)
}

export default Item