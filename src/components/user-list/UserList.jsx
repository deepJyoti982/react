import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserList = ({ setSelectedUser }) => {

    const [users, setUsers] = useState([]);
    const [deleteCount, setDeleteCount] = useState(0);

    useEffect(() => {
        (async () => {
            const response = await axios.get('http://localhost:4000/v1/user/get-all-user');
            if (response) {
                setUsers(response.data.allUser)
            }
        })();
    }, [deleteCount])

    function onClickEdit(user) {
        setSelectedUser({
            fname: user.fname,
            lname: user.lname,
            email: user.email
        })
    }

    async function onClickDelete(id) {
        if (window.confirm('Are you sure you want to delete the user?')) {
            const response = await axios.delete(`http://localhost:4000/v1/user/delete-user/${id}`)
            if (response) {
                toast.success(response.data.msg, { position: 'top-right' })
                setDeleteCount(d => d + 1);
            }
        }
    }

    return (
        <div className='user-list'>
            <Link to={'/add'}>Add User</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>SL No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.fname} {user.lname}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => onClickDelete(user._id)}>Delete</button>
                                <Link to={`/edit/${user._id}`} onClick={() => onClickEdit(user)}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserList