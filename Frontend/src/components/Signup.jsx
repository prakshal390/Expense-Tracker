import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Logo from "./shared/Logo";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion"; // ✅ Import motion

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

      if (res.data.success) {
        toast.success(res.data.msg);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      const message =
        error.response?.data?.msg ||
        "Account already exists with the same email";
      toast.error(message);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="flex w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] bg-white shadow-2xl rounded-xl overflow-hidden">
        
        {/* Image Section with Text */}
        <div className="relative hidden md:flex w-1/2">
          <img
            src="https://wallpapercave.com/wp/wp10297646.png"
            alt="Signup Wallpaper"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {/* ✅ Animated "Welcome Back" text */}
            <motion.h1
              className="text-black text-3xl font-bold bg-opacity-70 px-4 py-2 rounded"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
            >
             <h2 className="text-black text-3xl font-bold bg-opacity-70 px-4 py-2 rounded">
              Hello, Welcome 
              <br/>
              <center>to</center> 
              Expense Tracker
            </h2>
            </motion.h1>
          </div>
          </div>
          {/* <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-black text-3xl font-bold bg-opacity-70 px-4 py-2 rounded">
              Hello, Welcome 
              <br/>
              <center>to</center> 
              Expense Tracker
            </h2>
          </div>
        </div> */}

        {/* Form Section */}
        <form onSubmit={submitHandler} className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="w-full flex justify-center mb-2">
            <Logo />
          </div>

          <h1 className="text-xl font-bold text-center mb-4">Expense Tracker</h1>

          <div className="mb-3">
            <Label>Fullname</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              required
            />
          </div>

          <Button className="w-full my-4">Signup</Button>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
