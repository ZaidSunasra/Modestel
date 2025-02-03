import { AddSettlement } from "@/components/AddEditSettlement";
import SideBar from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddSettlementInput } from "@/lib/types";
import { useAddSettlement, useDeleteSettlement } from "@/mutations/settlementMutation";
import { getMonthlyTotalAdvance } from "@/queries/advanceQueries";
import { getMonthlyTotalExpense } from "@/queries/expenseQueries";
import { getMonthlyTotalCash, getMonthlyTotalIncome } from "@/queries/incomeQueries";
import { getMonthlySettlement } from "@/queries/settlementQueries";
import { cumulativeCollection } from "@/utils/calculateTotal";
import { formatMonthlyCollection } from "@/utils/dataFormatter";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const MonthlyCollection = () => {

    const [actionType, setActiontype] = useState<'post' | 'delete' | null>(null);
    const [data, setData] = useState<any>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { data: incomeData, isPending: incomePending } = getMonthlyTotalIncome();
    const { data: cashData, isPending: cashPending } = getMonthlyTotalCash();
    const { data: advanceData, isPending: advancePending } = getMonthlyTotalAdvance();
    const { data: expenseData, isPending: expensePending } = getMonthlyTotalExpense();
    const { data: settlementData, isPending: settlementPending } = getMonthlySettlement();

    const postMutation = useAddSettlement();
    const deleteMutation = useDeleteSettlement();

    if (incomePending || cashPending || advancePending || expensePending || settlementPending) return <div>Loading...</div>

    const formattedData = formatMonthlyCollection(incomeData, cashData, advanceData, expenseData, settlementData);
    const cumulativeData = cumulativeCollection(formattedData);

    const handleAddSettlement = (data: AddSettlementInput) => {
        postMutation.mutate(data);
        setIsOpen(false);
        setActiontype(null);
    }

    const handleDeleteSettlement = (date: string) => {
        date = date.replace("/", "-").replace("/", "-");
        deleteMutation.mutate(date);
        setIsOpen(false);
        setActiontype(null);
        setData(null);
    }

    return <div className="h-screen w-screen font-mono flex bg-background">
        <SideBar />
        <SidebarTrigger />
        <div className="w-full p-4">
            <div className="max-h-[95vh] overflow-auto">
                <div className="flex justify-end mb-4">
                    <Button
                        onClick={() => {
                            setIsOpen(true);
                            setActiontype("post");
                        }}
                    >Add Settlement</Button>
                </div>
                <Table className="border-border border-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead rowSpan={2}>DATE</TableHead>
                            <TableHead rowSpan={2}>COLLECTION</TableHead>
                            <TableHead rowSpan={2}>BANK</TableHead>
                            <TableHead rowSpan={2}>ADVANCE</TableHead>
                            <TableHead rowSpan={2}>EXPENSE</TableHead>
                            <TableHead rowSpan={2} className="border-r-2 border-border">CASH</TableHead>
                            <TableHead colSpan={3} className="text-center border-b-2 border-border">SETTLEMENT</TableHead>
                        </TableRow>
                        <TableRow>
                            <TableHead className="border-r-2 border-border text-center">HOTEL</TableHead>
                            <TableHead className="border-r-2 border-borde text-center">BANK</TableHead>
                            <TableHead className="text-center">ACTION</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cumulativeData.map((data: any) => (
                            <TableRow key={data.date}>
                                <TableCell>{data.date}</TableCell>
                                <TableCell>{data.collection}</TableCell>
                                <TableCell>{data.bank}</TableCell>
                                <TableCell>{data.advance}</TableCell>
                                <TableCell>{data.expense}</TableCell>
                                <TableCell className="border-r-2 border-border">{data.total}</TableCell>
                                <TableCell className="border-r-2 border-border">{data.hotel_settlement}</TableCell>
                                <TableCell className="border-r-2 border-border">{data.bank_settlement}</TableCell>
                                <TableCell className="flex gap-5 justify-center">
                                    <Button
                                        className="bg-secondary text-red-500 h-10 w-10 p-0"
                                        onClick={() => {
                                            setIsOpen(true);
                                            setActiontype("delete");
                                            setData(data.date)
                                        }}
                                    >
                                        <Trash2 />
                                    </Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    {actionType == 'post' ? (
                        <>
                            <DialogHeader>
                                <DialogTitle> Add Settlement </DialogTitle>
                                <DialogDescription>Enter the details to record a new settlement.</DialogDescription>
                            </ DialogHeader>
                            <AddSettlement onSubmit={handleAddSettlement} />
                        </>

                    ) : actionType == 'delete' ? (
                        <>
                            <DialogHeader>
                                <DialogTitle> Delete Settlement </DialogTitle>
                                <DialogDescription>Are you sure you want to delete this settlement entry? This action cannot be undone.</DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="sm:justify-start">
                                <Button
                                    type="submit"
                                    className="px-3 flex gap-1 items-center"
                                    variant="destructive"
                                    onClick={() => {
                                        handleDeleteSettlement(data)
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
}

export default MonthlyCollection;