import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotFound404 from "./Components/pages/NotFound404"
import Login from "./Components/pages/auth/Login"
import Register from "./Components/pages/auth/Register"
import AdminRoute from "./Components/routes/AdminRoute"
import HomePageAdmin from "./Components/pages/admin/Home"
import UserRoute from "./Components/routes/UserRoute"
import HomePageUser from "./Components/pages/user/Home"
import Categories from "./Components/pages/admin/Categories"
import Products from "./Components/pages/admin/Products"
import ManageAdmins from "./Components/pages/admin/ManageAdmins"
import ManageUsers from "./Components/pages/admin/ManageUsers"
import FormEditCategory from "./Components/pages/admin/FormEditCategory"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

	return (
		<>
			<BrowserRouter>

				<ToastContainer />

				<Routes>
					<Route path="*" element={<NotFound404 />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					<Route path="/admin/home" element={
						<AdminRoute>
							<HomePageAdmin />
						</AdminRoute>
					}
					/>

					<Route path="/admin/table/categories" element={
						<AdminRoute>
							<Categories />
						</AdminRoute>
					}
					/>

					<Route path="/admin/edit/category/:id" element={
						<AdminRoute>
							<FormEditCategory />
						</AdminRoute>
					}
					/>

					<Route path="/admin/table/products" element={
						<AdminRoute>
							<Products />
						</AdminRoute>
					}
					/>

					<Route path="/admin/manage/admin" element={
						<AdminRoute>
							<ManageAdmins />
						</AdminRoute>
					}
					/>

					<Route path="/admin/manage/user" element={
						<AdminRoute>
							<ManageUsers />
						</AdminRoute>
					}
					/>

					<Route path="/user/home" element={
						<UserRoute>
							<HomePageUser />
						</UserRoute>
					}
					/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
