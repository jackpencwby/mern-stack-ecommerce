import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotFound404 from "./Components/pages/NotFound404"
import Login from "./Components/pages/auth/Login"
import Register from "./Components/pages/auth/Register"
import AdminRoute from "./Components/routes/AdminRoute"
import HomePageAdmin from "./Components/pages/admin/Home"
import UserRoute from "./Components/routes/UserRoute"
import HomePageUser from "./Components/pages/user/Home"

function App() {

	return (
		<>
			<BrowserRouter>
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
