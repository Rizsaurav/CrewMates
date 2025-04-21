import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import Home from "./app/Home"
import Create from "./app/Create"
import Gallery from "./app/Gallery"
import CrewmateDetail from "./app/CrewmateDetail"
import EditCrewmate from "./app/EditCrewmate"
import NotFound from "./app/NotFound"
import "./index.css"
import './styles.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="crewmate/:id" element={<CrewmateDetail />} />
          <Route path="edit/:id" element={<EditCrewmate />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
