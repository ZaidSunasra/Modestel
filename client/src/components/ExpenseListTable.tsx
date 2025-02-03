import { fetchDailyExpense, getDailyExpenseTotal } from "@/queries/expenseQueries";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { useAddExpense, useDeleteExpense, useEditExpense } from "@/mutations/expenseMutation";
import { AddExpenseInput, EditExpenseInput } from "@/lib/types";
import { formatAddAdvanceData } from "@/utils/dataFormatter";
import { AddExpense, EditExpense } from "./AddEditExpense";

const ExpenseList = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [actionType, setActionType] = useState<'post' | 'edit' | 'delete' | null>(null);
    const [data, setData] = useState<any>(null);

    const { data: fetchData, isPending: fetchPending } = fetchDailyExpense();
    const { data: totalData, isPending: totalPending } = getDailyExpenseTotal();

    const postMutation = useAddExpense();
    const editMutation = useEditExpense();
    const deleteMutation = useDeleteExpense();

    const handleAddExpense = (data: AddExpenseInput) => {
        const formattedData = formatAddAdvanceData(data);
        postMutation.mutate(formattedData);
        setIsOpen(false);
        setActionType(null);
    }

    const handleEditExpense = (data: EditExpenseInput, id: string) => {
        editMutation.mutate({data, id});
        setIsOpen(false);
        setActionType(null);
        setData(null);
    }

    const handleDeleteExpense = (id:string) => {
        deleteMutation.mutate(id);
        setIsOpen(false);
        setActionType(null);
        setData(null);
    }

    if (fetchPending || totalPending) return <>Loading..</>

    return <>
        <div className="mb-2 flex justify-end">
            <Button
                onClick={() => {
                    setIsOpen(true);
                    setActionType("post");
                }}
            >
                Add Expense
            </Button>
        </div>
        <div className="overflow-y-auto max-h-[52vh]">
            <Table className="border-border border-2">
                <TableHeader>
                    <TableRow>
                        <TableHead>Voucher</TableHead>
                        <TableHead>Expenses</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fetchData.expenses.map((expense: any) => (
                        <TableRow key={expense.id} className="text-primary">
                            <TableCell className="uppercase">{expense.voucher}</TableCell>
                            <TableCell className="uppercase">{expense.expense_name}</TableCell>
                            <TableCell>{expense.amount}</TableCell>
                            <TableCell className="flex gap-5">
                                <Button
                                    className="bg-secondary text-green-500 h-10 w-10 p-0"
                                    onClick={() => {
                                        setIsOpen(true);
                                        setActionType("edit");
                                        setData(expense);
                                    }}
                                >
                                    <Pencil />
                                </Button>
                                <Button
                                    className="bg-secondary text-red-500 h-10 w-10 p-0"
                                    onClick={() => {
                                        setIsOpen(true);
                                        setActionType("delete");
                                        setData(expense.id);
                                    }}
                                >
                                    <Trash2 />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow className="text-primary font-bold">
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell colSpan={2}>{totalData.response[0].daily_total}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    {actionType == 'post' ? (
                        <>
                            <DialogHeader>
                                <DialogTitle> Add Expense </DialogTitle>
                                <DialogDescription>Enter the details to record a new expense.</DialogDescription>
                            </ DialogHeader>
                            <AddExpense  onSubmit={handleAddExpense}/>
                        </>

                    ) : actionType == 'edit' ? (
                        <>
                            <DialogHeader>
                                <DialogTitle> Edit Expense   </DialogTitle>
                                <DialogDescription>Update the details of the recorded expense.</DialogDescription>
                            </DialogHeader>
                            <EditExpense onSubmit={handleEditExpense} value={data} />
                        </>
                    ) : actionType == 'delete' ? (
                        <>
                            <DialogHeader>
                                <DialogTitle> Delete Expense </DialogTitle>
                                <DialogDescription>Are you sure you want to delete this expense entry? This action cannot be undone.</DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="sm:justify-start">
                                <Button
                                    type="submit"
                                    className="px-3 flex gap-1 items-center"
                                    variant="destructive"
                                   onClick={() => {
                                    handleDeleteExpense(data);
                                   }}
                                >
                                    <span> Delete </span>
                                    <Trash2 />
                                </Button>
                            </DialogFooter>
                        </>
                    ) : (
                        <></>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    </>
}

export default ExpenseList;