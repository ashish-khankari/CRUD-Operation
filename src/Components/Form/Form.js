import React, { useState } from 'react'
import styles from './Form.module.css'
import { useDispatch } from 'react-redux'
import { addUser } from '../../store/userSlice'
import FormNavbar from '../Navbar.js/FormNavbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Form() {

    // useState for input fields
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    // for setting error
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [phoneError, setPhoneError] = useState('')

    // regex for validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const nameRegex = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/

    // toast Notification for success message
    const showToastMessage = () => {
        toast.success('User Succeesfully Added !', {
            position: toast.POSITION.TOP_CENTER
        });
    };


    // dispatch hook
    const dispatch = useDispatch()

    // function to addData
    function addDatatoReducer(e) {
        e.preventDefault()
        const data = {
            name, email, phone
        }

        const nameValidation = nameRegex.test(name)
        const emailValidation = emailRegex.test(email)

        // Validation checks
        if (!nameValidation) {
            setNameError("Enter Full Name")
        }else{
            setNameError("")
        }
        if (!emailValidation) {
            setEmailError("Emter Correct Email")
        }else{
            setEmailError("")
        }
        if (phone.length !== 10) {
            setPhoneError("Mobile should be 10 digits")
        }else{
            setPhoneError("")
        }

        if (nameValidation && emailValidation && phone.length === 10) {
            dispatch(addUser(data))
            showToastMessage()
            setEmail("")
            setName("")
            setPhone("")
        }
    }

    return (
        <div className={styles.container}>
            <FormNavbar/>
            <div className={styles.innerContainer}>
                <h1>User Form</h1>
                {/* form for user */}
                <form>
                    <div className={styles.formInput}>
                        <input
                            placeholder="Enter Your Name"
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                            value={name}
                        />
                        <p className={styles.error}>{nameError}</p>
                        <input
                            placeholder="Enter Your Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            value={email}
                        />
                        <p className={styles.error}>{emailError}</p>
                        <input
                            placeholder="Enter Your Phone"
                            onChange={(e) => setPhone(e.target.value)}
                            className={styles.input}
                            value={phone}
                        />
                        <p className={styles.error}>{phoneError}</p>
                        <div>
                            <button 
                            className={styles.btn} 
                            onClick={addDatatoReducer}  
                            
                            >Add User
                            </button>
                        </div>
                        <ToastContainer/>
                    </div>
                </form>
            </div>

        </div>
    )
}
