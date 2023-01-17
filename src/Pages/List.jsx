import { Suspense, useEffect, useState } from "react";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";

const columns = [
	{
		field: "URLCode",
		headerName: "URL Code",
	},
	{
		field: "longURL",
		headerName: "Long URL",
		width: 300,
	},
	{
		field: "shortURL",
		headerName: "Short URL",
		width: 300,
	},
	{
		field: "date",
		headerName: "Created At",
		width: 300,
		sortable: true,
		valueGetter: (params) =>
			`${moment(params.row.date).format("YYYY-MM-DD HH:mm:ss") || ""}`,
	},
];

const List = () => {
	const [loading, setLoading] = useState(true);
	const [rows, setRows] = useState([]);

	useEffect(() => {
		getAllLink();
	}, []);

	const getAllLink = async () => {
		const response = await axios
			.get("https://api-shortener-service.vercel.app/")
			.then((response) => {
				setRows(response.data);
				setLoading(false);
			})
			.catch((error) => error);
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
					<Box sx={{ mt: 3, height: 400, width: "100%" }}>
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={5}
							rowsPerPageOptions={[5]}
							disableSelectionOnClick
							initialState={{
								sorting: {
									sortModel: [{ field: "date", sort: "desc" }],
								},
							}}
						/>
					</Box>
				)}
			</Container>
		</Suspense>
	);
};

export default List;
