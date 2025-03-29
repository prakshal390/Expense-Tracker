import Logo from "./shared/Logo";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "./ui/avatarImage";
import axios from "axios";
import { toast } from "sonner"; // Changed from react-toastify to sonner
import { useSelector } from "react-redux";

const Navbar = () => {
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();

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
    <div className="border-b border-gray-300">
      <div className="flex items-center justify-between max-w-8xl mx-auto h-23">
        <Logo />

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
              <button>Login</button>  
            </Link>
            <Link to="/signup">  
              <button>Signup</button>  
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
