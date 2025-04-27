import Navbar from "./Navbar";
import CreateExpense from "./CreateExpense";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "@/redux/expenseSlice";
import ExpenseTable from "./ExpenseTable";
import useGetExpenses from "@/hooks/useGetExpense";
import { useEffect } from "react";

const Home = () => {
  useGetExpenses();

  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.items);

  const changeCategoryHandler = (value) => {
    dispatch(setCategory(value));
  };

  useEffect(() => {
    const handleExpenseAdded = (event) => {
      // Append the new expense to the Redux state
      dispatch({ type: "expenses/addExpense", payload: event.detail });
    };

    const handleExpenseUpdated = (event) => {
      // Update the existing expense in the Redux state
      dispatch({ type: "expenses/updateExpense", payload: event.detail });
    };

    window.addEventListener("expenseAdded", handleExpenseAdded);
    window.addEventListener("expenseUpdated", handleExpenseUpdated);

    return () => {
      window.removeEventListener("expenseAdded", handleExpenseAdded);
      window.removeEventListener("expenseUpdated", handleExpenseUpdated);
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-6">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl">Expense:-</h1>
          <CreateExpense />
        </div>
        <div className="flex items-center gap-2 my-5">
          <h1 className="font-medium text-lg">Filter By:-</h1>
          <Select onValueChange={changeCategoryHandler}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
                <SelectItem value="Rent">Rent</SelectItem>
                <SelectItem value="others">Others</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <ExpenseTable expenses={expenses} />
      </div>
    </div>
  );
};

export default Home;
