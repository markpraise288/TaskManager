import { Link } from "react-router-dom";
import { AuthForm } from "../components/auth/AuthForm";
import { useAuth } from "../hooks/useAuth";
import { login } from "../services/authServices";
import { useTasks } from "../hooks/useTask";
import toast from "react-hot-toast";

export const Login = () => {
  const { setIsLoggedIn, formData } = useAuth();
  const { setTasks } = useTasks();
  const navigateTo = '/';
  const loginRequest = async () => {
    try {
      const res = await login(formData);
      setIsLoggedIn(true);
      toast.success("Loggen in successfully");
      setTimeout(()=>{
        setTasks();
      },500);
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="w-full flex items-center flex-col">
      <AuthForm title={"Login"} actionFunction={loginRequest} navigateTo={navigateTo} />
      <p className="text-blue-600 absolute bottom-0 left-15 underline">
        <Link to={"/signup"}>create account</Link>
      </p>
    </div>
  );
};
