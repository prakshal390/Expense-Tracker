import Logo from "./shared/Logo";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "./ui/avatarImage";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Apply the theme to the document body
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v3/user/logout");
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Logout failed");
    }
  };

  return (
    <div className="border-b border-gray-300 dark:border-gray-700">
      <div className="flex items-center justify-between max-w-8xl mx-auto h-20 px-4">
        <Logo />

        {/* Slowly Changing Color and Animation */}
        <motion.h1
          className="text-3xl font-bold dark:text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 1, 0], // Fade in and out
            scale: [0.8, 1, 0.8], // Scale animation
            color: ["#FF6347", "#4CAF50", "#00BFFF"], // Slow color change
          }}
          transition={{
            duration: 6, // Slower transition
            repeat: Infinity, // Infinite repeat
            repeatType: "loop", // Loop the animation
            ease: "easeInOut", // Smooth transition
          }}
        >
          Expense Tracker
        </motion.h1>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
            ) : (
              <Sun className="h-5 w-5 text-gray-800 dark:text-gray-200" />
            )}
          </button>

          {user ? (
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent>
                <button onClick={logoutHandler}>Logout</button>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login">
                <button className="text-sm font-medium hover:underline dark:text-white">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="text-sm font-medium hover:underline dark:text-white">
                  Signup
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
