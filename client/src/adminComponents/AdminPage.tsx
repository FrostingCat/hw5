import React from "react";
import { Button } from '@material-ui/core'
import { Link } from "react-router-dom";

function AdminPage() {
	return (
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
	);
}

export default AdminPage;