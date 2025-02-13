import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import { ItemsProvider } from './contexts/itemsContext'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ItemsProvider>
              <HomePage />
            </ItemsProvider>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App
