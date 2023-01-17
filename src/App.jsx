import { Suspense } from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import {
	AppBar,
	CircularProgress,
	Container,
	Toolbar,
	Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import Home from "./Pages/Home";
import List from "./Pages/List";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const App = () => {
	return (
		<Suspense
			fallback={
				<div>
					<CircularProgress
						size={24}
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							marginTop: "-12px",
							marginLeft: "-12px",
						}}
					/>
				</div>
			}
		>
			<ThemeProvider theme={darkTheme}>
				<BrowserRouter>
					<AppBar position="static">
						<Container maxWidth="xl">
							<Toolbar>
								<Typography
									variant="h6"
									component="div"
									textAlign="center"
									sx={{ flexGrow: 1 }}
								>
									<Link to="/">Home</Link>
								</Typography>
								<Typography
									variant="h6"
									component="div"
									textAlign="center"
									sx={{ flexGrow: 1 }}
								>
									<Link to="/list">List</Link>
								</Typography>
							</Toolbar>
						</Container>
					</AppBar>

					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/list" element={<List />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</Suspense>
	);
};

export default App;
