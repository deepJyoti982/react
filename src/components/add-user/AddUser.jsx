import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const AddUser = () => {

    const inputValue = {
        fname: '',
        lname: '',
        email: '',
        password: ''
    }

    const [user, setUser] = useState(inputValue);
    const navigate = useNavigate();

    function onInputChange(e) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    async function onSubmit(e) {
        e.preventDefault();
        const response = await axios.post('http://localhost:4000/v1/user/create-user', user);
        if (response) {
            toast.success(response.data.msg, { position: 'top-right' });
            navigate('/');
        }
    }

    return (
        <div className='add-user'>
            <Link to={'/'}>Back</Link>
            <h3>Add New User</h3>
            <form>
                <div>
                    <label htmlFor="fname">First Name:</label>
                    <input type="text" name="fname" placeholder='Enter first name..' onChange={onInputChange} />
                </div>
                <div>
                    <label htmlFor="lname">Last Name:</label>
                    <input type="text" name="lname" placeholder='Enter last name..' onChange={onInputChange} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" placeholder='Enter email..' onChange={onInputChange} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="text" name="password" placeholder='Enter password..' onChange={onInputChange} />
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

                    Add User
                </button>
            </form>
        </div>
    )
}

export default AddUser