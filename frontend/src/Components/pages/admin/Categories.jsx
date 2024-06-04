import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getAllCategory, createCategory, deleteCategory } from '../../../api/category';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Categories() {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		getAllData();
	}, [])

	const getAllData = async () => {
		try {
			const response = await getAllCategory();
			setCategories(response.data);
		}
		catch (error) {
			console.log(error.response);
		}
	}

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();

			const data = new FormData(event.currentTarget);

			await createCategory({
				name: data.get('name')
			});

			await getAllData();

			toast.success("เพิ่มหมวดหมู่สินค้าสำเร็จ", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
		}
		catch (error) {
			toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
		}
	};

	return (
		<div>
			<div>
				<h1 style={{ textAlign: 'center' }}>หมวดหมู่สินค้า</h1>
				<Box
					component="form"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						width: '300px',
					}}
					onSubmit={handleSubmit}
				>
					<h2>ฟอร์มเพิ่มหมวดหมู่สินค้า</h2>
					<TextField
						label="ชื่อหมวดหมู่"
						variant="outlined"
						id="name"
						name="name"
						required
					/>
					<Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
						<Button type="submit" variant="contained" color="primary">
							เพิ่ม
						</Button>
					</Box>
				</Box>
			</div>

			<br />

			<div>
				<h2>ตารางเเสดงหมวดหมู่สินค้า</h2>
				<TableContainer component={Paper} sx={{ maxWidth: 650, marginTop: 4 }}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>รหัสหมวดหมู่</TableCell>
								<TableCell>ชื่อหมวดหมู่</TableCell>
								<TableCell>เเก้ไข</TableCell>
								<TableCell>ลบ</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{categories.map((category) => (
								<TableRow
									key={category._id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{category._id}
									</TableCell>
									<TableCell>{category.name}</TableCell>
									<TableCell>
										<Link to={`/admin/edit/category/${category._id}`}>
											<EditIcon color='warning' />
										</Link>
									</TableCell>
									<TableCell>
										<Link>
											<DeleteIcon color='error' onClick={async () => {
												await deleteCategory(category._id)
												await getAllData();
												toast.error("ลบหมวดหมู่สินค้าสำเร็จ", {
													position: "top-center",
													autoClose: 3000,
													hideProgressBar: false,
													closeOnClick: true,
													pauseOnHover: true,
													draggable: true,
													progress: undefined,
													theme: "colored",
												});
											}} />
										</Link>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
}

export default Categories;