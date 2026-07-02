import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomePage from "../pages/HomePage"
import ThinkingBlockPage from "../pages/ThinkingBlockPage"
import SpaceBlockPage from "../pages/SpaceBlockPage"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/thinking-blocks/:id"
          element={<ThinkingBlockPage />}
        />

        <Route
          path="/space-blocks/:id"
          element={<SpaceBlockPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}