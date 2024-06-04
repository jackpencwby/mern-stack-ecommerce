import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { updateCategory } from '../../../api/category';
import { toast } from 'react-toastify';

function FormEditCategory() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            const data = new FormData(event.currentTarget);

            await updateCategory(id, {
                name: data.get('name')
            });

            toast.success("เเก้ไขข้อมูลหมวดหมู่สินค้าสำเร็จ", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            navigate("/admin/table/categories");
        }
        catch (error) {
            console.log(error.response);
        }
    };
    return (
        <div>
            <h2>ฟอร์มเเก้ไขหมวดหมู่สินค้า ( {id} )</h2>
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
                <TextField
                    label="ชื่อหมวดหมู่"
                    variant="outlined"
                    id="name"
                    name="name"
                    required
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button type="submit" variant="contained" color="primary">
                        เเก้ไข
                    </Button>
                </Box>
            </Box>
        </div>
    )
}

export default FormEditCategory;