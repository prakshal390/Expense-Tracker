import { Link } from "react-router-dom"
import expenseLogo from "@/assets/expense.png"

const logo = () => {
  return (
    <Link to="/">
      <img src={expenseLogo} alt="Expense Tracker Logo" className="w-20 h-auto" />
    </Link>
  )
}

export default logo