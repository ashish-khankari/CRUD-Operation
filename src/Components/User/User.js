import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, editUser } from '../../store/userSlice';
import './User.css';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import UserNavbar from '../UserNavbar.js/UserNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function User() {

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedUserData, setEditedUserData] = useState('');
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [phoneError, setPhoneError] = useState('')

    const gotData = useSelector((state) => state.userData.userInformation);
    const dispatch = useDispatch();

    const showToastUpdate = () => {
        toast.success('User Succeesfully Updated !', {
            position: toast.POSITION.TOP_CENTER
        });
    }

    const showToastDelete = () => {
        toast.success('User Succeesfully Deleted !', {
            position: toast.POSITION.TOP_CENTER
        });
    }

    function deleteUserData(item) {

        dispatch(deleteUser(item));
        showToastDelete()
    }

    function openEditModal(item) {
        setEditedUserData(item);
        setEditModalOpen(true);
    }

    function closeEditModal() {
        setEditModalOpen(false);
    }


    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const nameRegex = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/
    const phoneRegex = /^\d{10}$/;

    const nameValidation = nameRegex.test(editedUserData.name)
    const emailValidation = emailRegex.test(editedUserData.email)
    const phoneValidation = phoneRegex.test(editedUserData.phone)

    function handleEditUser() {
        if (!nameValidation) {
            setNameError("Enter Full Name")
        } else {
            setNameError("")
        }
        if (!emailValidation) {
            setEmailError("Enter Correct Email")
        } else {
            setEmailError("")
        }
        if (!phoneValidation) {
            setPhoneError("Mobile should be 10 digits")
        } else {
            setPhoneError("")
        }
        if (nameValidation && emailValidation && phoneValidation) {
            dispatch(editUser(editedUserData));
            showToastUpdate()
            closeEditModal();
        }
    }

    const cellStyle = {
        fontSize: '18px',
    };

    return (
        <div>
            <UserNavbar />

            <TableContainer component={Paper} className='table'>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={cellStyle}>ID</TableCell>
                            <TableCell style={cellStyle} align="center">NAME</TableCell>
                            <TableCell style={cellStyle} align="center">EMAIL</TableCell>
                            <TableCell style={cellStyle} align="center">PHONE</TableCell>
                            <TableCell style={cellStyle} align="center">ACTIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gotData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell style={cellStyle} >{item.id}</TableCell>
                                <TableCell align="center" style={cellStyle}>{item.name}</TableCell>
                                <TableCell align="center" style={cellStyle}>{item.email}</TableCell>
                                <TableCell align="center" style={cellStyle}>{item.phone}</TableCell>
                                <TableCell align="center" style={cellStyle}>
                                    <button className="deleteButton" onClick={() => deleteUserData(item)}>Delete</button>
                                    <button className="editButton" onClick={() => openEditModal(item)}>
                                        Edit
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal isOpen={editModalOpen} toggle={closeEditModal}>
                <ModalHeader toggle={closeEditModal}>Edit User</ModalHeader>
                <ModalBody>
                    {editedUserData && (
                        <form>
                            <div className="inputBar">
                                <label>ID:</label>
                                <input type="text"
                                    value={editedUserData.id}
                                    className="input"
                                    disabled />
                            </div>

                            <div className="inputBar">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    value={editedUserData.name}
                                    className="input"
                                    onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })}
                                />
                                <p className="error">{nameError}</p>
                            </div>

                            <div className="inputBar">
                                <label>Email:</label>
                                <input
                                    type="text"
                                    value={editedUserData.email}
                                    onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })}
                                    className="input"
                                />
                                <p className="error">{emailError}</p>
                            </div>

                            <div className="inputBar">
                                <label>Phone:</label>
                                <input
                                    type="text"
                                    value={editedUserData.phone}
                                    onChange={(e) => setEditedUserData({ ...editedUserData, phone: e.target.value })}
                                    className="input"
                                />
                                <p className="error">{phoneError}</p>
                            </div>
                            <button className="saveBtn" type="button" onClick={handleEditUser}>
                                Save
                            </button>
                            <button className="cancelBtn" type="button" onClick={closeEditModal}>
                                Cancel
                            </button>
                        </form>
                    )}
                </ModalBody>
            </Modal>
            <ToastContainer />
        </div>
    );
}
