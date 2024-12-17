import React from "react";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { authentication } from "../Firebase";
import { ImExit } from "react-icons/im";

export const SignOut = () => {
    const navigate = useNavigate()

    const HandleSignOut = async () => {
        await signOut(authentication)
        navigate('/SignIn')
    }

    return <button onClick={HandleSignOut} className="exit"> <ImExit /> Exit</button>
}
