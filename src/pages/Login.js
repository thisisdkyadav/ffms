import React from 'react'
import '../css/login.css'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase'

const Login = () => {

  // firebase login with google
  const signInWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider)
  }

  return (
    <>
      <div className='login'>
        <button className="login-button" onClick={signInWithGoogle}>
          Login with Google
        </button>
      </div>

    </>
  )
}

export default Login