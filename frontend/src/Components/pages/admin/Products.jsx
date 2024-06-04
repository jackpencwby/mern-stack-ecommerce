import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getAllCategory } from '../../../api/category';
import { getAllProduct, createProduct, deleteProduct } from '../../../api/product';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Products() {
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);
	const [preview, setPreview] = useState(null);
	const formRef = useRef(null);

	useEffect(() => {
		getAllCategoryToForm();
		getAllData();
	}, [])

	const getAllCategoryToForm = async () => {
		try {
			const response = await getAllCategory();
			setCategories(response.data);
		}
		catch (error) {
			console.log(error.message);
		}
	}

	const getAllData = async () => {
		try {
			const response = await getAllProduct();
			setProducts(response.data);
		}
		catch (error) {
			console.log(error.response);
		}
	}

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(file);
		} else {
			setPreview(null);
		}
	};

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();

			const data = new FormData(event.currentTarget);

			await createProduct(data);
			
			await getAllData();

			formRef.current.reset(); 
			setPreview(null); 

			toast.success("เพิ่มรายการสินค้าสำเร็จ", {
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
				<h1 style={{ textAlign: 'center' }}>รายการสินค้า</h1>
				<Box
					component="form"
					encType="multipart/form-data"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						width: '300px'
					}}
					onSubmit={handleSubmit}
					ref={formRef}
				>
					<h2>ฟอร์มเพิ่มรายการสินค้า</h2>
					<TextField
						label="ชื่อสินค้า"
						variant="outlined"
						id="name"
						name="name"
						required
					/>
					<TextField
						label="ราคา"
						variant="outlined"
						id="price"
						name="price"
						required
					/>
					<FormControl fullWidth>
						<InputLabel>หมวดหมู่</InputLabel>
						<Select
							label="Options"
							id="category"
							name="category"
						>
							{categories.map(category => <MenuItem value={category.name}>{category.name}</MenuItem>)}
						</Select>
					</FormControl>
					<TextField
						label="จำนวนสินค้า"
						variant="outlined"
						id="quantity"
						name="quantity"
						required
					/>
					<Box
						sx={{
							border: '1px solid grey',
							padding: 2,
							borderRadius: 1,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Typography variant="subtitle1" gutterBottom>
							รูปภาพสินค้า
						</Typography>
						<TextField
							type="file"
							id="image"
							name="image"
							variant="outlined"
							margin="normal"
							onChange={handleFileChange}
						/>
						{preview && (
							<Box mt={2}>
								<img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '250px' }} />
							</Box>
						)}
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
						<Button type="submit" variant="contained" color="primary">
							เพิ่ม
						</Button>
					</Box>
				</Box>
			</div>

			<br />

			<div>
				<h2>ตารางเเสดงรายการสินค้า</h2>
				<TableContainer component={Paper} sx={{ maxWidth: 1280, marginTop: 4 }}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>รหัสสินค้า</TableCell>
								<TableCell>ชื่อสินค้า</TableCell>
								<TableCell>ราคา</TableCell>
								<TableCell>หมวดหมู่</TableCell>
								<TableCell>รูปภาพสินค้า</TableCell>
								<TableCell>จำนวนสินค้า</TableCell>
								<TableCell>ขายเเล้ว</TableCell>
								<TableCell>เเก้ไข</TableCell>
								<TableCell>ลบ</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products.map((product) => (
								<TableRow
									key={product._id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{product._id}
									</TableCell>
									<TableCell>{product.name}</TableCell>
									<TableCell>{product.price}</TableCell>
									<TableCell>{product.category.name}</TableCell>
									<TableCell>{product.image}</TableCell>
									<TableCell>{product.quantity}</TableCell>
									<TableCell>{product.sold}</TableCell>
									<TableCell>
										<Link to={`/admin/edit/product/${product._id}`}>
											<EditIcon color='warning' />
										</Link>
									</TableCell>
									<TableCell>
										<Link>
											<DeleteIcon color='error' onClick={async () => {
												await deleteProduct(product._id)
												await getAllData();
												toast.error("ลบรายการสินค้าสำเร็จ", {
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

export default Products;