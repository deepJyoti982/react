import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom'

const UpdateUser = ({ selectedUser }) => {

    const [user, setUser] = useState(selectedUser)
    const { id } = useParams();
    const navigate = useNavigate();


    function onInputChange(e) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    async function onSubmit(e) {
        e.preventDefault();

        const response = await axios.put(`http://localhost:4000/v1/user/update-user/${id}`, user)
        console.log(response)
        if (response) {
            toast.success(response.data.msg, { position: 'top-right' })
            navigate('/')
        }
    }

    return (
        <div className='edit-user'>
            <Link to={'/'}>Back</Link>
            <h3>Update User</h3>
            <form>
                <div>
                    <label htmlFor="fname">First Name:</label>
                    <input type="text" name="fname" value={user.fname} placeholder='Enter first name..' onChange={onInputChange} />
                </div>
                <div>
                    <label htmlFor="lname">Last Name:</label>
                    <input type="text" name="lname" value={user.lname} placeholder='Enter last name..' onChange={onInputChange} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" value={user.email} placeholder='Enter email..' onChange={onInputChange} />
                </div>

                <button
                    style={{
                        backgroundColor: "green",
                        color: "white",
                        padding: "5px 10px",
                        marginTop: "10px",
                        textAlign: 'center',
                        alignContent: 'center'
                    }}
                    type='submit'
                    onClick={onSubmit}
                >

                    Edit User
                </button>
            </form>
        </div>
    )
}

export default UpdateUser