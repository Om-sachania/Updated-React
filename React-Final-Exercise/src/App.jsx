import './App.css'
import ItemDescription from './compponents/ItemDescription'
import TodoList from './compponents/TodoList'

import { BrowserRouter, Routes , Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TodoList/>}/>
          <Route path='itemDescription' element={<ItemDescription/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
