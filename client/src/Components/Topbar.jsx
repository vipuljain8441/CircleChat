import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { TbSocial } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import TextInput from './TextInput';
import {IoMdNotificationsOutline} from 'react-icons/io'
import CustomButton from './CustomButton';
import { BsMoon, BsSunFill } from 'react-icons/bs';
import { SetTheme } from '../redux/theme';
import { Logout } from '../redux/userSlice';
import { fetchPosts } from '../utils';

const Topbar = () => {
    const {theme} = useSelector((state)=>state.theme);
    const {user} = useSelector((state)=>state.user);
    const {register,handleSubmit,formState:{errors},} = useForm({mode:"onChange"})
    const [isSubmitting,setIsSubmitting]  = useState(false);
    const dispatch = useDispatch();
    const handleSearch =async(data) =>{
      await fetchPosts(user?.token,dispatch,"",data);
    }
    const handleTheme = ()=>{
        const themeValue = theme ==='light'?'dark':'light';
        dispatch(SetTheme(themeValue))
    }

  
  return (
    <div className='topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary'>

        <Link className='flex gap-2 items-center' to='/'>
          <div className='p-1 bg-[#065ad8] rounded text-white'>
            <TbSocial/>
          </div>
          <span className='text-xl md:text-2xl text-[#065ad8] font-semibold' >CircleChat</span>    
        </Link>

        <form onSubmit={handleSubmit(handleSearch)} className='hidden md:flex items-center justify-center'>
          <TextInput
          placeholder="Search..."
          register = {register("search")}
          styles="w-[18rem] lg:w-[38rem] rounded-l-full px-6"

          />
       <CustomButton type="submit"
                containerStyles='bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full'
                title="Search"/>
        </form>

        {/* Icons  */}
        <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
            <button onClick={handleTheme}>{theme?<BsMoon/> :<BsSunFill/>}</button>
            <div className="hidden lg:flex">
            <IoMdNotificationsOutline/>
            </div>
            <CustomButton
                onClick={()=>dispatch(Logout())}
                containerStyles=' text-ascent-1 text-sm px-4 md:px-6 py-1 md:py-2  border border-[#666] rounded-full'
                title="Log out"/>
        </div>
     
    </div>
  )
}

export default Topbar