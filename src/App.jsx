import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserList from './components/user-list/UserList';
import AddUser from './components/add-user/AddUser';
import UpdateUser from './components/update-user/UpdateUser';
import { useState } from 'react';

function App() {

  const [selectedUser, setSelectedUser] = useState({ fname: '', lname: '', email: '' })

  const route = createBrowserRouter([
    {
      path: '/',
      element: <UserList setSelectedUser={setSelectedUser} />
    },
    {
      path: '/add',
      element: <AddUser />
    },
    {
      path: '/edit/:id',
      element: <UpdateUser selectedUser={selectedUser} />
    }
  ])

  return (
    <RouterProvider router={route} />
  )
}

export default App
