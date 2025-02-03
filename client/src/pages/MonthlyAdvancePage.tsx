import { EditAdvance } from "@/components/AddEditAdvance";
import SideBar from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EditAdvanceInput } from "@/lib/types";
import { useDeleteAdvance, useEditAdvance } from "@/mutations/advanceMutation";
import { getMonthlyAdvance } from "@/queries/advanceQueries";
import { formatMonthlyExpenseData } from "@/utils/dataFormatter";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";


const MonthlyAdvance = () => {

    const [actionType, setActionType] = useState<'delete' | 'edit' | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [advanceData, setAdvanceData] = useState<any>(null);
    const { data, isPending } = getMonthlyAdvance();
    const editMutation = useEditAdvance();
    const deleteMutation = useDeleteAdvance();

    const handleEditAdvance = (data: EditAdvanceInput, id: string) => {
        editMutation.mutate({ data, id });
        setIsOpen(false);
        setActionType(null);
        setAdvanceData(null);
    }

    const handleDeleteAdvance = (id: string) => {
        deleteMutation.mutate(id);
        setIsOpen(false);
        setActionType(null);
        setAdvanceData(null);
    }

    if (isPending) return <div>Loading...</div>

    const formattedData = formatMonthlyExpenseData(data);

    return <div className="h-screen w-screen font-mono flex bg-background">
        <SideBar />
        <SidebarTrigger />
        <div className="w-full p-4">
            <div className=" max-h-[95vh] overflow-auto">
                <Table className="border-border border-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead>DATE</TableHead>
                            <TableHead>NAME</TableHead>
                            <TableHead>AMOUNT</TableHead>
                            <TableHead>ACTION</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {formattedData.map((data: any) => (
                            <TableRow key={data.id} className="text-primary">
                                <TableCell>{data.date}</TableCell>
                                <TableCell className="uppercase">{data.staff_name}</TableCell>
                                <TableCell>{data.amount}</TableCell>
                                <TableCell className="flex gap-5">
                                    <Button
                                        className="bg-secondary text-green-500 h-10 w-10 p-0"
                                        onClick={() => {
                                            setActionType("edit");
                                            setIsOpen(true);
                                            setAdvanceData(data);
                                        }}
                                    >
                                        <Pencil />
                                    </Button>
                                    <Button
                                        className="bg-secondary text-red-500 h-10 w-10 p-0"
                                        onClick={() => {
                                            setActionType("delete");
                                            setIsOpen(true);
                                            setAdvanceData(data.id)
                                        }}
                                    >
                                        <Trash2 />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="sm:max-w-md">
                        {actionType == 'edit' ? (
                            <>
                                <DialogHeader>
                                    <DialogTitle> Edit Advance   </DialogTitle>
                                    <DialogDescription>Update the details of the advance given to the employee.</DialogDescription>
                                </DialogHeader>
                                <EditAdvance value={advanceData} onSubmit={handleEditAdvance} />
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
                                            handleDeleteAdvance(advanceData);
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
        </div>
    </div>
}

export default MonthlyAdvance; 