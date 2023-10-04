import React, { useState } from 'react';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {TbSocial} from 'react-icons/tb';
import {BsShare} from 'react-icons/bs';
import { ImConnection } from 'react-icons/im';
import {AiOutlineInteraction} from 'react-icons/ai'
import { TextInput,Loading,CustomButton } from '../Components'
import { Link } from 'react-router-dom'
import { BgImg } from '../assets'
const Register = () => {
    const {register,handleSubmit,formState:{errors},} = useForm({mode:"onChange"})
    const [errMsg,setErrMsg] = useState("");
    const [isSubmitting,setIsSubmitting]  = useState(false);
    const dispatch = useDispatch()
    const onSubmit = async(data)=>{

    }
  return (
    <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>
        <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 
        flex bg-primary rounded-xl overflow-hidden shadow-xl'>
            {/* LEFT */}
            <div className='h-full w-full lg:w-1/2 p-10 2xl:px-20 flex flex-col
            justify-center'>
                <div className='w-full flex gap-2 items-center mb-6 '>
                    <div className='p-2 bg-[#065ad8] rounded text-white'>
                        <TbSocial/>
                    </div>
                    <span className='text-2xl text-[#065ad8] font-semibold' >CircleChat</span>
                </div>
                <p className='text-ascent-1 text-base font-semibold'>Createyour account</p>

                <form  className='py-8 flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                    name="email" placeholder ="email@exapmle.com"
                    label="Email Address"
                    type="email"
                    register={
                        register("email",{
                            required:"Email Address is required",
                        })}
                    styles="w-full rounded-full p-6 "
                    labelStyles="ml-2"
                    error={errors.mail?errors.email.message:""}
                    />
                    <TextInput
                    name="password" placeholder ="Password"
                    label="Password"
                    type="password"
                    register={
                        register("password",{
                            required:"Password is required",
                        })}
                    styles="w-full rounded-full p-6 "
                    labelStyles="ml-2"
                    error={errors.password?errors.password.message:""}
                    />

                    <Link to='/reset-passowrd' className='text-sm text-right text-blue font-semibold'>Forgot Password?</Link>
                   {
                     errMsg?.message && (
                        <span className={`text-sm ${
                            errMsg?.status==="failed"? "text-[#f64949fe]":"text-[#2ba150fe]"} mt-0.5`}>
                            {errMsg?.message}
                        </span>
                )
               } 
               {
                isSubmitting ? <Loading/>:<CustomButton type="submit"
                containerStyles={`inline-flex justify-center rounded-md
                bg-blue px-8 py-3  text-sm font-medium text-white outline-none`}
                title="Login"/>
               }
               </form>
               <p className='text-ascent-2 text-sm text-center'>
                Don't have an account?
                <Link
                to='/register'
                className='text-[#065ad8] font-semibold ml-2 curson-pointer'>Create Account</Link>
               </p>
            </div>
            {/*RIGHT  */}
            <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center
            bg-blue'>
                <div className='relative w-full flex items-center justify-center'>
                    <img
                    src={BgImg}
                    aria-hidden
                    alt='BG Image'
                    className='w-48 2xl:w-64 h-48 2xl:j-64 rounded-full
                     object-cover'
                     />

                    <div className='absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full'>
                        <BsShare size={14}/>
                        <span className='text-xs font-medium'>Connect</span>
                    </div>
                    <div className='absolute flex items-center gap-1 bg-white right-4 top-6 py-2 px-5 rounded-full'>
                        <ImConnection/>
                        <span className='text-xs font-medium'>Connect</span>
                    </div>
                    <div className='absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full'>
                        <AiOutlineInteraction/>
                        <span className='text-xs font-medium'>Interact</span>
                    </div>

                </div>  

            </div>
        </div>

    </div>
  )
}

export default Register;