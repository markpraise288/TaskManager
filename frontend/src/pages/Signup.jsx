import { AuthForm } from "../components/auth/AuthForm";
import { signup } from "../services/authServices";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Signup = () => {
  const { formData, setAccessToken } = useAuth();
  const navigate = useNavigate();

  const signupRequest = async () => {
    try {
      const res = await signup(formData);

      const accessToken = res;

      setAccessToken(accessToken);
      navigate('/verify');
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="w-full flex items-center flex-col">
      <AuthForm title={"Signup"} actionFunction={signupRequest} />
    </div>
  );
};
