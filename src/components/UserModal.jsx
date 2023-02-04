import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { setFormState, setModalState } from '../redux/modals/modalsSlice';
import * as yup from "yup";
import { fetchUsers, setLoginState, setNewUser, usersSelector } from '../redux/users/usersSlice';
import { toast, ToastContainer } from 'react-toastify';
import { nanoid } from '@reduxjs/toolkit';


function UserModal() {

    const dispatch = useDispatch();

    const formState = useSelector((state) => state.modals.formState);

    const modalState = useSelector((state) => state.modals.modalState);

    const status = useSelector((state) => state.users.status);

    const usersList = useSelector(usersSelector.selectAll);

    const formikLogin = useFormik({
        initialValues: {
            loginUsername: "",
            loginPassword: ""
        },
        validationSchema: yup.object({
            loginUsername: yup
                .string()
                .required("Kullanıcı adı boş bırakılamaz...")
                .min(5, "Kullanıcı adı çok kısa!")
                .max(15, "Kullanıcı adı çok uzun!"),
            loginPassword: yup
                .string()
                .required("Parola kısmı boş bırakılamaz...")
                .min(5, "Parola çok kısa!")
                .max(15, "Parola çok uzun!")
        }),
        onSubmit: (values) => {

            const loginUser = usersList.filter((user) => (
                user.username === values.loginUsername && user.password === values.loginPassword
            ))

            if (loginUser.length === 1) {
                toast.success('Giriş başarılı...', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    dispatch(setLoginState(true));
                    localStorage.setItem("username", JSON.stringify(loginUser[0].username));
                    localStorage.setItem("admin", JSON.stringify(loginUser[0].admin));
                    localStorage.setItem("userID", JSON.stringify(loginUser[0].id));
                    toggle();
                }, 2500)
            }
            else {
                toast.error("Lütfen bilgilerinizi kontrol edin.", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
                formikLogin.resetForm();
            }


        }
    })


    const formikRegister = useFormik({
        initialValues: {
            id: nanoid(),
            username: "",
            password: "",
            passwordCheck: "",
            email: "",
            emailCheck: ""
        },
        validationSchema: yup.object({
            username: yup.string().required("Kullanıcı adı boş bırakılamaz...").min(5, "Kullanıcı adı çok kısa!").max(15, "Kullanıcı adı çok uzun!"),
            password: yup.string().required("Parola boş bırakılamaz...").min(5, "Parola çok kısa!").max(15, "Parola çok uzun!"),
            passwordCheck: yup.string().oneOf([yup.ref("password"), null], "Parolalar eşleşmiyor!"),
            email: yup.string().required("Email boş bırakılamaz...").email("Lütfen geçerli bir e-mail giriniz..."),
            emailCheck: yup.string().oneOf([yup.ref("email"), null], "E-mail adresleri eşleşmiyor!")
        }),
        onSubmit: (values) => {
            dispatch(setNewUser(values));
            toast.success('Kayıt başarılı, giriş yapılıyor...', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                localStorage.setItem("username", JSON.stringify(values.username));
                localStorage.setItem("userID", JSON.stringify(values.id));
                dispatch(setLoginState(true));
                toggle();
            }, 2500)
        }
    })

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUsers());
        }
    }, [dispatch, status])


    const toggle = () => {
        dispatch(setModalState(false));
        formikLogin.resetForm();
        formikRegister.resetForm();
    }






    return (
        <Modal className='custom-modal' toggle={toggle} centered={true} fade={true} isOpen={modalState} >
            <ModalHeader className='modal-header' >
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    className="custom-toast"
                />
                <img className='modal-logo' src={require("../images/website-logo.png")} /> </ModalHeader>
            <ModalBody className='modal-body'>
                {formState === "register" ?
                    <form className='modal-form col-10' onSubmit={formikRegister.handleSubmit}>
                        {formikRegister.errors.username && formikRegister.touched.username && <div className='form-error'>{formikRegister.errors.username}</div>}
                        <input
                            name='username'
                            type="text"
                            value={formikRegister.values.username}
                            onBlur={formikRegister.handleBlur}
                            onChange={formikRegister.handleChange}
                            placeholder='Kullanıcı Adı *'
                            className="col-10 modal-input" />
                        {formikRegister.errors.email && formikRegister.touched.email && <div className='form-error'>{formikRegister.errors.email}</div>}
                        <input
                            name="email"
                            type="text"
                            value={formikRegister.values.email}
                            onBlur={formikRegister.handleBlur}
                            onChange={formikRegister.handleChange}
                            placeholder='E-Posta *'
                            className="col-10 modal-input" />
                        {formikRegister.errors.emailCheck && formikRegister.touched.emailCheck && <div className='form-error'>{formikRegister.errors.emailCheck}</div>}
                        <input
                            name="emailCheck"
                            type="text"
                            value={formikRegister.values.emailCheck}
                            onBlur={formikRegister.handleBlur}
                            onChange={formikRegister.handleChange}
                            placeholder='E-Posta Tekrar *'
                            className="col-10 modal-input" />
                        {formikRegister.errors.password && formikRegister.touched.password && <div className='form-error'>{formikRegister.errors.password}</div>}
                        <input
                            name='password'
                            type="password"
                            value={formikRegister.values.password}
                            onBlur={formikRegister.handleBlur}
                            onChange={formikRegister.handleChange}
                            placeholder='Parola *'
                            className="col-10 modal-input" />
                        {formikRegister.errors.passwordCheck && formikRegister.touched.passwordCheck && <div className='form-error'>{formikRegister.errors.passwordCheck}</div>}
                        <input type="password"
                            name='passwordCheck'
                            value={formikRegister.values.passwordCheck}
                            onBlur={formikRegister.handleBlur}
                            onChange={formikRegister.handleChange}
                            placeholder='Parola Tekrar*'
                            className="col-10 modal-input" />
                        <button type='submit' className='col-10 modal-btn'><i className="fa-solid fa-plus me-2"></i> Kaydol</button>
                    </form>
                    :
                    <form className='modal-form col-10' onSubmit={formikLogin.handleSubmit}>
                        {formikLogin.errors.loginUsername && formikLogin.touched.loginUsername && <div className='form-error'>{formikLogin.errors.loginUsername}</div>}
                        <input
                            name='loginUsername'
                            type="text"
                            onBlur={formikLogin.handleBlur}
                            onChange={formikLogin.handleChange}
                            value={formikLogin.values.loginUsername}
                            placeholder='Kullanıcı Adı *'
                            className="col-10 modal-input" />
                        {formikLogin.errors.loginPassword && formikLogin.touched.loginPassword && <div className='form-error'>{formikLogin.errors.loginPassword}</div>}
                        <input
                            name='loginPassword'
                            type="password"
                            onBlur={formikLogin.handleBlur}
                            onChange={formikLogin.handleChange}
                            value={formikLogin.values.loginPassword}
                            placeholder='Parola *'
                            className="col-10 modal-input" />
                        <button type='submit' className='col-10 modal-btn'><i className="fa-solid fa-right-to-bracket me-2"></i> Giriş Yap</button>
                    </form>
                }
            </ModalBody>
            <ModalFooter className='modal-footer'>
                {formState === "register" ?
                    <small onClick={() => dispatch(setFormState("login"))}>Zaten üye misiniz? <span style={{ cursor: "pointer", color: "azure" }}>Giriş Yap</span></small>
                    :
                    <small onClick={() => dispatch(setFormState("register"))}>Henüz üye değil misiniz? <span style={{ cursor: "pointer", color: "azure" }}>Kayıt Ol</span></small>
                }
            </ModalFooter>
        </Modal>
    )
}


export default UserModal;