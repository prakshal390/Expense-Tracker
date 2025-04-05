import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Logo from "./shared/Logo";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner"; // Replace incorrect Toaster usage

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v3/user/register",
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(res);

      if (res.data.success) {
        // Testing with a hardcoded string to ensure the message appears
        toast.success(res.data.msg);

        setTimeout(() => {
          navigate("/login");
        }, 1500); // Redirect to home page after 1.5 seconds
      }
    } catch (error) {
      console.log(error);
      // Check and show error message if account already exists
      const message =
        error.response?.data?.msg ||
        "Account already exists with the same email";
      toast.error(message);
    }
  };

  return (
    // Main css for a signup form
    <div className="flex items-center justify-center w-screen h-screen">
      {/* This is a Signup Form */}
      <form onSubmit={submitHandler} className="w-96 p-8 shadow-lg">
        {/* Logo of expense tracker app */}
        {/* Use logo div inside the form */}
        <div className="w-full flex justify-center mb-2">
          {" "}
          <Logo />{" "}
        </div>

        <h1 className="w-full flex justify-center mb-4 font-bold ">
          Expense Tracker
        </h1>

        <div>
          <Label>Fullname</Label>
          <Input
            type="text"
            name="fullname"
            value={input.fullname}
            onChange={handleChange}
          />
        </div>

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

        <Button className="w-full my-5">Signup</Button>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            {" "}
            Login{" "}
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Signup;
