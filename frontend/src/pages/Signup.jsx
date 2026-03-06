import { AuthForm } from "../components/auth/AuthForm";
import { signup } from "../services/authServices";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export const Signup = () => {
  const { formData, setAccessToken } = useAuth();
  const navigateTo = '/';

  const signupRequest = async () => {
    try {
      const res = await signup(formData);

      const accessToken = res;

      setAccessToken(accessToken);
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="w-full flex items-center flex-col">
      <AuthForm title={"Signup"} actionFunction={signupRequest} navigateTo={navigateTo}/>
    </div>
  );
};
