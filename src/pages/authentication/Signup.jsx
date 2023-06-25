import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { baseUrl } from '../../redux/fetch/baseUrl';
import axios from 'axios';
import {  toast } from 'react-toastify';
import "react-toastify/ReactToastify.min.css";


const Signup = () => {


    const validationSchema = Yup.object({
        fullName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid Email').required('Invaild Email'),
        password: Yup.string().min(4, "Min 4 character").required('Required'),
        confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Passwords must match'),
        mobile: Yup.number().min(10, "equal or more than 10 digit").typeError('number only')
    })


    return (
        <>
            <div className='flex flex-col justify-center gap-1 py-4 px-2'>
                <Formik
                    initialValues={{
                        fullName: '',
                        email: '',
                        password: '',
                        confirm_password: '',
                        mobile: '',
                        dob: '',
                        gender: ''
                    }}
                    onSubmit={async (value) => {

                        try {

                              const res= await axios.post(`${baseUrl}/registration`, value, {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                            if(res.data !==null) toast.success("Registraion successful")
                           



                        } catch (error) {
                            if (error.response?.status === 409) {

                                toast.error("Email already Exist")
                                console.log("409")
                            }
                            console.log(error)
                        }

                    }}
                    validationSchema={validationSchema}
                >

                    <Form>
                        <div className='flex flex-col gap-5 py-5 items-center'>
                            <div>
                                <Field type="text" className="w-64 px-2" placeholder="Full Name" name="fullName" id='fullName' />
                                <div>
                                    <ErrorMessage name='fullName' />
                                </div>
                            </div>

                            <div>
                               <Field type="email" name="email" id="email" className="w-64 px-2" placeholder="Email" />
                                <div>
                                    <ErrorMessage name='email' />
                                </div>
                            </div>
                            <div>
                               <Field type="password" className="w-64 px-2" placeholder='Password' name='password' id='password' />
                                <div>
                                    <ErrorMessage name='password' />
                                </div>
                            </div>
                            <div>
                                <Field type="password" className="w-64 px-2" placeholder='Confirm Password' name='confirm_password' id='confirm_password' />
                                <div>
                                    <ErrorMessage name='confirm_password' />
                                </div>
                            </div>
                            <div>
                                <Field type="text" className="w-64 px-2" placeholder="Mobile" name="mobile" id='mobile' />
                                <div>
                                    <ErrorMessage name='mobile' />
                                </div>
                            </div>
                            <div>
                                 <Field type="date" className="w-64 px-2" placeholder="dob" name="dob" id='dob' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div>Gender</div>
                                <div className='flex gap-4'>
                                    <Field type="radio" className="" name="gender" value="Male" id="g_male" />Male
                                    <Field type="radio" className="" name="gender" value="Female" id="g_female" />Female
                                    <Field type="radio" className="" name="gender" value="Other" id="g_other" />Other
                                </div>

                            </div>
                            <div className='flex gap-5'>
                                <input type="reset" className='btn' value="Reset" />
                                <button type="submit" className='btn btn-primary '>Sign up</button>
                            </div>
                        </div>
                    </Form>

                </Formik>
            </div>




        </>
    )
}

export default Signup