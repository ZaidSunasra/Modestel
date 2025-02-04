import { fetchDailyAdvance, getDailyAdvanceTotal } from "@/queries/advanceQueries";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { useState } from "react";
import { useAddAdvance, useDeleteAdvance, useEditAdvance } from "@/mutations/advanceMutation";
import { AddAdvance, EditAdvance } from "./AddEditAdvance";
import { AddAdvanceInput, EditAdvanceInput } from "@/lib/types";
import { formatAddAdvanceData } from "@/utils/dataFormatter";
import Loading from "./Loading";

const AdvanceList = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [actionType, setActionType] = useState<'post' | 'delete' | 'edit' | null>(null);
    const [data, setData] = useState<any>(null);

    const { data: fetchData, isPending: fetchPending } = fetchDailyAdvance();
    const { data: totalAdvance, isPending: totalPending } = getDailyAdvanceTotal();

    const postMutation = useAddAdvance();
    const editMutation = useEditAdvance();
    const deleteMutation = useDeleteAdvance();

    const handleAddAdvance = (data: AddAdvanceInput) => {
        const formattedData = formatAddAdvanceData(data);
        postMutation.mutate(formattedData);
        setIsOpen(false);
        setActionType(null);
    }

    const handleEditAdvance = (data: EditAdvanceInput, id: string) => {
        editMutation.mutate({ data, id });
        setIsOpen(false);
        setActionType(null);
        setData(null);
    }

    const handleDeleteAdvance = (id: string) => {
        deleteMutation.mutate(id);
        setIsOpen(false);
        setActionType(null);
        setData(null);
    }

    if (fetchPending || totalPending) return <Loading sideBar={false} button={true} height={"50vh"} width={"100%"} />

    return <>
        <div className="mb-4 flex justify-end">
            <Button
                onClick={() => {
                    setActionType('post');
                    setIsOpen(true);
                }}
            >
                Add Advance
            </Button>
        </div>
        <div className="overflow-y-auto max-h-[50vh]">
            <Table className="border-border border-2">
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fetchData.advances.map((advance: any) => (
                        <TableRow key={advance.id} className="text-primary">
                            <TableCell className="uppercase">{advance.staff_name}</TableCell>
                            <TableCell>{advance.amount}</TableCell>
                            <TableCell className="flex gap-5">
                                <Button
                                    className="bg-secondary text-green-500 h-10 w-10 p-0"
                                    onClick={() => {
                                        setIsOpen(true);
                                        setActionType("edit");
                                        setData(advance);
                                    }}
                                >
                                    <Pencil />
                                </Button>
                                <Button
                                    className="bg-secondary text-red-500 h-10 w-10 p-0"
                                    onClick={() => {
                                        setIsOpen(true);
                                        setActionType("delete");
                                        setData(advance.id)
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
                        <TableCell>Total</TableCell>
                        <TableCell colSpan={2}>{totalAdvance.response[0].daily_total}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    {actionType == 'post' ? (
                        <>
                            <DialogHeader>
                                <DialogTitle> Add Advance </DialogTitle>
                                <DialogDescription>Enter the details to record an advance payment issued to an employee.</DialogDescription>
                            </ DialogHeader>
                            <AddAdvance onSubmit={handleAddAdvance} />
                        </>

                    ) : actionType == 'edit' ? (
                        <>
                            <DialogHeader>
                                <DialogTitle> Edit Advance   </DialogTitle>
                                <DialogDescription>Update the details of the advance given to the employee.</DialogDescription>
                            </DialogHeader>
                            <EditAdvance value={data} onSubmit={handleEditAdvance} />
                        </>
                    ) : actionType == 'delete' ? (
                        <>
                            <DialogHeader>
                                <DialogTitle> Delete Advance </DialogTitle>
                                <DialogDescription>Are you sure you want to delete this advance entry? This action cannot be undone.</DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="sm:justify-start">
                                <Button
                                    type="submit"
                                    className="px-3 flex gap-1 items-center"
                                    variant="destructive"
                                    onClick={() => {
                                        handleDeleteAdvance(data);
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

export default AdvanceList;