import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { getAllCategory } from '../../../api/category';
import { updateProduct } from '../../../api/product';
import { toast } from 'react-toastify';

function FormEditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
		getAllCategoryToForm();
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

            const data = new FormData(event.currentTarget);;

            await updateProduct(id, data);

            toast.success("เเก้ไขข้อมูลสินค้าสำเร็จ", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            navigate("/admin/table/products");
        }
        catch (error) {
            console.log(error.response);
        }
    };
    return (
        <div>
            <h2>ฟอร์มเเก้ไขข้อมูลสินค้า ( {id} )</h2>
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
            >
                <TextField
                    label="ชื่อสินค้า"
                    variant="outlined"
                    id="name"
                    name="name"
                />
                <TextField
                    label="ราคา"
                    variant="outlined"
                    id="price"
                    name="price"
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
                        เเก้ไข
                    </Button>
                </Box>
            </Box>
        </div>
    )
}

export default FormEditProduct;