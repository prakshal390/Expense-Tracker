import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import PropTypes from "prop-types";
import { Checkbox } from "./ui/checkbox";
import { Trash } from "lucide-react";
import UpdateExpense from "./UpdateExpense";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ExpenseTable = ({ expenses }) => {
  const [expenseList, setExpenseList] = useState(expenses);
  const [checkedItems, setCheckedItem] = useState({});

  // Update local state when props change
  useEffect(() => {
    setExpenseList(expenses);
  }, [expenses]);

  const totalAmount = expenseList.reduce((acc, expense) => {
    if (!checkedItems[expense._id]) {
      return acc + expense.amount;
    }
    return acc;
  }, 0);

  const handledCheckboxChange = async (expenseId) => {
    const newStatus = !checkedItems[expenseId];
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v3/expense/done/${expenseId}`,
        { done: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.msg);
        setCheckedItem((prevData) => ({ ...prevData, [expenseId]: newStatus }));
        setExpenseList(
          expenseList.map((expense) =>
            expense._id === expenseId
              ? { ...expense, done: newStatus }
              : expense
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeExpenseHandler = async (expenseId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v3/expense/remove/${expenseId}`
      );
      if (res.data.success) {
        toast.success(res.data.msg);
        setExpenseList((prevExpenses) =>
          prevExpenses.filter((expense) => expense._id !== expenseId)
        );
      } else {
        toast.error("Failed to delete expense");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting expense");
    }
  };

  // Split the caption text into individual words
  const captionText = "😊A list of your recent expenses😊";
  const words = captionText.split(" ");

  return (
    <Table>
      {/* Animated Table Caption */}
      <TableCaption className="font-bold text-xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity, // Repeat the animation continuously
            repeatType: "loop", // Loop after each cycle
            ease: "easeInOut",
          }}
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: index * 1, // Delay each word's animation to create sequence
              }}
            >
              {word}{" "}
            </motion.span>
          ))}
        </motion.div>
      </TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Mark As Done</TableHead>
          <TableHead className="w-[150px]">Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Day , Date and Time</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenseList.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell className="font-medium">
              <Checkbox
                checked={expense.done}
                onCheckedChange={() => handledCheckboxChange(expense._id)}
              />
            </TableCell>
            <p>
              <TableCell className={`${expense.done ? "line-through" : ""}`}>
                {expense.category}
              </TableCell>
            </p>
            <TableCell className={`${expense.done ? "line-through" : ""}`}>
              {expense.description}
            </TableCell>
            <TableCell className={`${expense.done ? "line-through" : ""}`}>
              {expense.amount}
            </TableCell>
            <p className={`${expense.done ? "line-through" : ""}`}>
              {new Date(expense.createdAt).toLocaleDateString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </p>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => removeExpenseHandler(expense._id)}
                  size="icon"
                  className="rounded-full border text-red-600 border-red-600 hover:border-transparent"
                >
                  <Trash />
                </button>
                <UpdateExpense expense={expense} />
              </div>
            </TableCell>
            <TableCell>{expense.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right font-bold text-xl">
            ₹{totalAmount}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ExpenseTable;
