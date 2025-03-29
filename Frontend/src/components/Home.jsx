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
// import {setMarkAsDone} from "@/redux/expenseSlice";
import ExpenseTable from "./ExpenseTable";
import useGetExpenses from "@/hooks/useGetExpense";


const Home = () => {
  useGetExpenses();

  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.items);

  const changeCategoryHandler = (value) => {
    dispatch(setCategory(value));
  };
  // const changeDoneHandler = (value) => {
  //   dispatch(setMarkAsDone(value));
  // };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-6">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl" >Expense:-</h1>
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
                <SelectItem value="all">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* <Select onValueChange={changeDoneHandler}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Mark As" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="undone">Undone</SelectItem>
                <SelectItem value="Both">Both</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}
        </div>
        <ExpenseTable expenses={expenses} />
      </div>
    </div>
  );
};

export default Home;
