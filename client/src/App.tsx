import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route }
	from "react-router-dom";
import Tables from "./components/Tables";
import Chairs from "./components/Chairs";
import Closets from "./components/Closets";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminPage from "./adminComponents/AdminPage";
import ViewFurniture from "./components/ViewFurniture";
import AdminChairs from "./adminComponents/AdminChairs"
import AdminTables from "./adminComponents/AdminTables"
import AdminClosets from "./adminComponents/AdminClosets"
import AdminViewFurniture from "./adminComponents/AdminViewFurniture"

function App() {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/tables" element={<Tables />} />
					<Route path="/tables/:id" element={<ViewFurniture />} />

					<Route path="/chairs" element={<Chairs />} />
					<Route path="/chairs/:id" element={<ViewFurniture />} />

					<Route path="/closets" element={<Closets />} />
					<Route path="/closets/:id" element={<ViewFurniture />} />

					<Route path="/" element={<Main />} />
					<Route path="/user/log" element={<Login />} />
					<Route path="/user/reg" element={<Register />} />

					<Route path="/admin" element={<AdminPage />} />
					<Route path="/admin/chairs" element={<AdminChairs />} />
					<Route path="/admin/tables" element={<AdminTables />} />
					<Route path="/admin/closets" element={<AdminClosets />} />

					<Route path="/admin/chairs/:id" element={<AdminViewFurniture />} />
					<Route path="/admin/tables/:id" element={<AdminViewFurniture />} />
					<Route path="/admin/closets/:id" element={<AdminViewFurniture />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
