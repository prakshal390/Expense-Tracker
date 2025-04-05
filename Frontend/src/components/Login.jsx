import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Logo from "./shared/Logo";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner"; // Replace incorrect Toaster usage
import { setAuthUser } from "@/redux/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch(); //first

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v3/user/login",
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(res);

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user)); //second
        // Testing with a hardcoded string to ensure the message appears

        toast.success(res.data.msg);

        setTimeout(() => {
          navigate("/");
        }, 1500); // Redirect to home page after 1.5 seconds
      }
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.msg;
      toast.error(message);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form onSubmit={submitHandler} className="w-96 p-8 shadow-lg">
        <div className="w-full flex justify-center mb-2">
          {" "}
          <Logo />{" "}
        </div>
        <h1 className="w-full flex justify-center mb-5 font-bold ">
          Expense Tracker
        </h1>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
        </div>

        <Button className="w-full my-5">Login</Button>
        <p className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link to="/Signup" className="text-blue-600">
            Signup
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
