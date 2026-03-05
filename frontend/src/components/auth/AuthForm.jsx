import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AuthForm = ({ title, actionFunction }) => {
  const { formData, setFormData, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Email or password required");
      return;
    }

    try{

    actionFunction();
    setIsLoggedIn(true);
    navigate("/");

    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col gap-24 bg-gray-50 py-6 w-11/12 rounded-2xl mx-auto mt-10"
      >
        <h2 className="text-[1.5rem]">{title}</h2>
        <Input
          className={
            "bg-gray-50 border-gray-300 border-2 w-10/12 p-3 rounded text-[1.1rem]"
          }
          name="email"
          type={"email"}
          value={formData.email}
          autoComplete={"email"}
          placeholder={"Email"}
          onChange={(e) => handleChange(e)}
        />

        <Input
          className={
            "bg-gray-50 border-gray-300 border-2 w-10/12 p-3 rounded text-[1.1rem]"
          }
          name={"password"}
          type={"password"}
          value={formData.password}
          autoComplete={"current-password"}
          placeholder={"Password"}
          onChange={(e) => handleChange(e)}
        />

        <Button
          className={"bg-blue-600 px-4 py-2 text-white rounded-sm"}
          type="submit"
          variant={"primary"}
        >
          Submit
        </Button>
      </form>
    </>
  );
};
