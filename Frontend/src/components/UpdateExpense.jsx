import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Edit2, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const UpdateExpense = ({ expense }) => {
  const [formData, setFormData] = useState({
    description: expense.description || "",
    amount: expense.amount || "",
    category: expense.category || "",
    status: expense.status || "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFormData({
      description: expense.description || "",
      amount: expense.amount || "",
      category: expense.category || "",
      status: expense.status || "",
    });
  }, [expense]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const changeCategoryHandler = (value) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:5000/api/v3/expense/update/${expense._id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.msg);
        // Dispatch a custom event to notify about the updated expense
        window.dispatchEvent(new CustomEvent("expenseUpdated", { detail: res.data.expense }));
        setOpen(false);
      } else {
        toast.error(res.data.message || "Failed to update expense");
      }
    } catch (error) {
      console.error("Error updating expense:", error);
      toast.error(error.response?.data?.msg || "Failed to update expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" className="rounded-full border border-green-600 text-green-600 hover:border-transparent" variant="outline" onClick={() => setOpen(true)}>
          <Edit2/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Expense</DialogTitle>
          <DialogDescription>Update your expense details.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Input
                id="description"
                placeholder="description"
                className="col-span-3"
                name="description"
                value={formData.description}
                onChange={changeEventHandler}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">Amount</Label>
              <Input 
                id="amount" 
                placeholder="amount in ₹"
                className="col-span-3"
                name="amount" 
                value={formData.amount}
                onChange={changeEventHandler}
              />
            </div>
            <Select onValueChange={changeCategoryHandler}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className="mr-2 h-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button type="submit">Update</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateExpense;