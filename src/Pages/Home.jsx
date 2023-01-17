import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
	Button,
	CircularProgress,
	Container,
	Grid,
	Link,
	TextField,
	Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [shortURL, setShortURL] = useState("");
	const { register, handleSubmit } = useForm();
	const onSubmit = async (data) => {
		setLoading(true);
		const response = await getShortLink(data.longURL);
		setShortURL(response.shortURL);
		setLoading(false);
	};

	const getShortLink = async (longURL) => {
		const data = { longURL: longURL };
		const response = await axios
			.post("https://api-shortener-service.vercel.app/api/url/shorten", data)
			.then((response) => response.data)
			.catch((error) => error);
		return response;
	};

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Container fixed>
				{loading ? (
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
				) : (
					<>
						<Typography
							variant="h3"
							component="div"
							textAlign="center"
							sx={{ mt: 2, flexGrow: 1 }}
						>
							Short Link
						</Typography>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Grid
								container
								direction="row"
								justifyContent="space-evenly"
								alignItems="center"
							>
								<Grid item xs>
									<TextField
										{...register("longURL", { required: true })}
										id="long-link"
										label="Long Link"
										variant="standard"
										fullWidth
									/>
								</Grid>
								<Grid item xs="auto">
									<Button type="submit" variant="contained" disabled={loading}>
										Submit
									</Button>
								</Grid>
							</Grid>
						</form>
						<Link href={shortURL} underline="always">
							{shortURL}
						</Link>
					</>
				)}
			</Container>
		</Suspense>
	);
};

export default Home;
