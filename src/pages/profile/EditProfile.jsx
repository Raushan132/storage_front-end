import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../layout/layout'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { fetchUsers } from '../../redux/fetch/fetch_user/userActions'
import * as Yup from 'yup'
import { editProfile } from '../../util/Util'
import { reRender } from '../../redux/render/renderAction'
import {  ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.min.css";

const EditProfile = () => {

    const { user } = useSelector(state => state.userReducer)
    const {render} = useSelector(state=> state.isRender)
    const dispatch = useDispatch()

    const themeStore = localStorage.getItem("theme");
    const [theme, setTheme] = useState("dark")

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Required'),
        mobile: Yup.number().min(10, "equal or more than 10 digit").typeError('number only'),
        
    })


    useEffect(() => {

        switch (themeStore) {
            case 'light':
            case 'cupcake':
            case 'wireframe':
            case 'aqua': setTheme("light"); break;
            case 'dark':
            case 'forest':
            case 'night':
              
             default: setTheme("dark");
           }

        dispatch(fetchUsers());
    }, [render])

    return (
        <>
            <Layout>

                <div className='mt-8'>
                    <Formik
                        initialValues={{

                            fullName: user.fullName,
                            mobile: user.mobile === null ? '' : user.mobile,
                            dob: user.mobile === null ? '' : user.dob,
                            gender: user.gender === null ? "" : user.gender,
                            state: user.state === null ? "" : user.state,
                            city: user.city === null ? "" : user.city,
                            pincode: user.pincode === null ? "" : user.pincode,
                            country: user.country === null ? "India" : user.country,

                        }}
                        
                        validationSchema={validationSchema}
                        onSubmit={value => {
                            let obj={}
                            
                            for(let keys of Object.keys(value)){
                                if(value[keys]!=='' && value[keys]!==user[keys]){
                                    console.log(keys,value[keys],user[keys])

                                    obj[keys]=value[keys]
                                }
                            }
                             
                            if(Object.keys(obj).length>0){
                                editProfile(user.userId,obj).then(()=>{
                                    toast.success("Updated...") 
                                    dispatch(reRender())
                                });

                            }
                        }}

                    >

                        <Form>
                            <div className='flex flex-col gap-4 w-96 mx-16 my-16'>

                                <div className='flex gap-4 justify-between'>
                                    <label>Name</label>
                                    <Field type="text" className='w-48 px-2' name="fullName" id="fullName" placeholder='' />
                                    <ErrorMessage name="fullName"  />
                                </div>
                                <div className='flex gap-4 justify-between'>
                                    <label>Mob</label>
                                    <Field type="text" className='w-48 px-2' name="mobile" placeholder='' />
                                    <ErrorMessage name="mobile"  />
                                </div>
                                <div className='flex gap-4 justify-between'>
                                    <label>DOB</label>
                                    <Field type="date" className='w-48 px-2' name="dob" placeholder='' />
                                    <ErrorMessage name="date"  />
                                </div>
                                <div className='flex gap-4 justify-between'>
                                    <label>Gender</label>
                                    <div className='flex gap-2 w-48'>
                                        <Field type="radio" className='' name="gender" value="Male" placeholder='' />Male
                                        <Field type="radio" className='' name="gender" value="Female" placeholder='' />Female
                                        <Field type="radio" className='' name="gender" value="Other" placeholder='' />Other
                                    </div>
                                </div>
                                <div className='flex gap-4 justify-between'>
                                    <label>State</label>
                                    <Field type="text" className='w-48 px-2' name="state" placeholder='' />
                                    <ErrorMessage name="state"  />
                                </div>
                                <div className='flex gap-4 justify-between'>
                                    <label>City</label>
                                    <Field type="text" className='w-48 px-2' name="city" placeholder='' />
                                </div>
                                <div className='flex gap-4 justify-between'>
                                    <label>Pincode</label>
                                    <Field type="text" className='w-48 px-2' name="pincode" placeholder='' />
                                </div>
                                <div className='flex gap-4 justify-between'>
                                    <label>Country</label>
                                    <Field type="text" className='w-48 px-2 ' name="country" placeholder='' />
                                </div>
                            </div>
                            <div className='flex  gap-4 w-96 mx-16 justify-end'>
                                <Link to="/user/profile" className='btn'>Cancel</Link>
                                <button type="submit" className='btn btn-primary' >Save</button>
                            </div>
                        </Form>

                    </Formik>
                </div>
                
      <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme={theme}
          />
            </Layout>
        </>
    )
}

export default EditProfile