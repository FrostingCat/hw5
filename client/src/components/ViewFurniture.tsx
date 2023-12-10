import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Card, Typography, Button } from '@material-ui/core'

function ViewFurniture() {
	const data = useLocation();
	const goTo = data.pathname.split('/')[1];
	const furniture = data.state.furniture
	return (
		<Card className="page-testimonial" key={furniture._id}>
			<img src={furniture.image} />
			<Typography className="people">
				size: {furniture.size}<br></br>
				material: {furniture.material}<br></br>
				color: {furniture.color.name}<br></br>
				quantity: {furniture.quantity}<br></br>
				description: {furniture.description}<br></br>
			</Typography>
			<Link to={`http://localhost:3000/${goTo}`} >
				<Button>Go Back</Button>
			</Link>
		</Card>
	);
};

export default ViewFurniture;
