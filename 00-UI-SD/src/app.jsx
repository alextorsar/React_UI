import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Login } from "./Login/Login"
import { Register } from "./Register/Register"
import { Logged } from "./Home/Logged"
import {Model} from "./Model/Model"
import ReactDOM from 'react-dom/client'
import "./index.css"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login></Login>}></Route>
                <Route path="/login/*" element={<Login></Login>}></Route>
                <Route path="/register/*" element={<Register></Register>}></Route>
                <Route path="/logged/" element={<Logged></Logged>}></Route>
                <Route path="/model/:modelId" element={<Model></Model>}></Route>

            </Routes>
        </Router>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <App></App>
)