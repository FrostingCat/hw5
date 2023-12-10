import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Card, Typography, Box, TextField, Button } from '@material-ui/core'
import { isWhiteSpaceLike } from 'typescript';

function Main() {
	const navigate = useNavigate();

	const goToChairsComp = () => {
		navigate('/chairs');
	};
	const gotToTablesComp = () => {
		navigate('/tables');
	};
	const gotToClosetsComp = () => {
		navigate('/closets');
	};

	return (
		<div className="App">
			<header className="App-header">
				<p>Furniture</p>
				<Button onClick={goToChairsComp} style={{ color: 'white' }}>Chairs </Button>
				<Button onClick={gotToTablesComp} style={{ color: 'white' }}>Tables </Button>
				<Button onClick={gotToClosetsComp} style={{ color: 'white' }}>Closets </Button>
				<Link to={"http://localhost:3000/user/log"} >
					<Button variant="contained" className="Button">Войти</Button>
				</Link>
			</header>
		</div>
	);
}

export default Main;