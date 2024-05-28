import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotFound404 from "./Components/NotFound404"
import Login from "./Components/auth/Login"
import Register from "./Components/auth/Register"

function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="*" element={<NotFound404 />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
