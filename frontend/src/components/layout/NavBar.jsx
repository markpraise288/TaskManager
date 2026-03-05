import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { logout } from "../../services/authServices";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  
  const logoutRequest = async () => {
    try{

      const message = await logout();

    } catch (err) {
      console.log(err);
    } finally {
      setIsLoggedIn(false);
      navigate('/login');
    } 
  } 

  return (
    <>
      <div className="flex justify-between items-center bg-gray-50 px-10 py-4 border-b-2 border-gray-300">
        <h2 className="text-2xl">Task Manager</h2>
        {isLoggedIn ? (
          <Button onClick={() => logoutRequest()}>Logout</Button>
        ) : (
          <Link to={"/login"} className="font-bold">Login</Link>
        )}
      </div>
    </>
  );
};
