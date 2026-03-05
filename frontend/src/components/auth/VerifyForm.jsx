import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { sendCode } from "../../services/authServices";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const VerifyForm = () => {
    const [ code, setCode ] = useState("");
    const { setIsLoggedIn, formData } = useAuth();
    const navigate = useNavigate();

    const sendCodeRequest = async()=> {
        try{

            const res = await sendCode(code, formData.email);

            alert(res);

            setIsLoggedIn(true);
            navigate('/');

        } catch (error) {
            console.log(error);
        }
    }
 return(
    <div className="flex justify-center items-center flex-col bg-gray-50 py-10 px-5 gap-10 w-10/12 rounded-xl m-auto">
            <h2 className="text-2xl">Verify Email</h2>
            <p>Code sent to your email.</p>
            <Input type={'text'} className={'border-2 border-gray-300 rounded p-0.5'} onChange={(e)=> setCode(e.target.value) }/>
            <Button onClick={sendCodeRequest} className={'text-gray-50 bg-blue-600 py-1 px-1.5 rounded'}>Send</Button>
    </div>
 )
}