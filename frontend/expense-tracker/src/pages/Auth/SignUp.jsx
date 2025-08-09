import React, { useState, useContext } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/Inputs/Input'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContext'
import uploadImage from '../../utils/uploadImage'


const SignUp = () => {
  const [profilePic, setProfilePic] = useState('null')
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  //Handle SignUp Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName){
      setError("Please enter your full name.");
      return;
    }
    if (!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }
    if (!password){
      setError("Please enter your password.");
      return;
    }

    setError("");

    //SignUp API Call
    try{

      //Upload Profile Photo
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }


      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      const {token, user} = response.data;

      if(token){
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    }catch (error){
      if (error.response && error.response.data){
        setError(error.response.data.message);
      }else{
        setError("An error occurred. Please try again later.");
      }
    }
  }
    
    
  

  return (
    <AuthLayout>
     <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
      <h3 className='text-xl font-semibold text-black'>Create Account</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'> Please enter your account details to sign up</p>

      <form onSubmit={handleSignUp}>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label="Full Name"
            placeholder="Enter your full name"
            type="text"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />
          <div className='col-span-2'>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Your password"
            type="password"
          />
          </div>
        </div>

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        
        <button type="submit" className="btn-primary">Sign Up</button>
        
        <p className='text-[13px] text-slate-800 mt-3'>
          Already have an account? {""}
          <Link className='font-medium text-primary underline' to='/login'>
            Login
          </Link>
        </p>

      </form>
     </div>
      </AuthLayout>
  )
}

export default SignUp