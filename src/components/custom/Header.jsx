import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigation } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


function Header() {

  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  // const navigation = useNavigation();

    useEffect(()=>{
        console.log(user)
    },[])

  const login = useGoogleLogin({
      onSuccess: async (codeResp) => {
        console.log("✅ Login Successful, Token Received:", codeResp);
        GetUserProfile(codeResp);
      },
      onError: (error) => console.error("❌ Login Failed:", error),
      flow: "implicit", // Use implicit flow to ensure popup works
      ux_mode: "popup", // Ensure it opens in a popup
    });
  
  const GetUserProfile = async (tokenInfo) => {
      if (!tokenInfo?.access_token) {
        console.error("🚨 No access token found!");
        return;
      }
  
      try {
        const response = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenInfo.access_token}`,
              Accept: "application/json",
            },
          }
        );
  
        console.log("✅ User Info Response:", response.data);
  
        // Store user data before closing the dialog
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDialog(false);
  
        window.location.reload();
      } catch (error) {
        console.error(
          "❌ Error fetching user profile:",
          error.response ? error.response.data : error.message
        );
      }
    };

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src="/mainLogo.svg" className="h-12 w-auto" alt="Logo" /> 
      <div>
        {user?
          <div className='flex items-center gap-3'>
            <a href="/my-trips">
            <Button variant="outline" className="rounded-full"> My Trips </Button>
            </a>
            <a href="/create-trip">
            <Button variant="outline" className="rounded-full"> + Create Trip </Button>
            </a>
           
            <Popover>
                <PopoverTrigger> <img src={user?.picture} className='h-[35px] w-[35px] rounded-full'/></PopoverTrigger>
                <PopoverContent>
                  <h2 className="cursor-pointer" onClick={()=>{
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}>
                    logout</h2>
                  </PopoverContent>
            </Popover>

          </div>
          :
        <button onClick={()=>setOpenDialog(true)}>Sign In</button>
        }
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-white p-6 rounded-lg">
            <DialogHeader>
              {/* Required DialogTitle for Accessibility */}
              <DialogTitle className="text-lg font-semibold text-center">
                Sign In
              </DialogTitle>

              <div className="flex flex-col items-center">
                <img src="/logo.svg" alt="Logo" className="w-32 h-12 mb-4" />
                <h2 className="text-xl font-bold text-center">
                  Sign In With Google
                </h2>
                <p className="mt-2 text-sm text-gray-500 text-center">
                  Sign in to the app with Google authentication securely.
                </p>
                <button
                  onClick={login}
                  className="w-full mt-5 flex justify-center gap-4 items-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
                >
                  <FcGoogle className="h-7 w-7" /> Sign In
                </button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
    </div>
  )
}

export default Header