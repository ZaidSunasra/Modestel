import { fetchDailyReport } from "@/queries/reportQueries";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import { getDailyIncomeBySources } from "@/queries/incomeQueries";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { useState } from "react";
import { useDeleteReport } from "@/mutations/reportMutation";

const ReportTable = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [id, setId] = useState<string>("");
    const { data: reportData, isPending: reportPending, isError: reportIsError } = fetchDailyReport();
    const { data: incomeData, isPending: incomePending, isError: incomeIsError } = getDailyIncomeBySources();
    const mutation = useDeleteReport();

    const handleDelete = (id: string) => {
        mutation.mutate(id);
        setIsOpen(false);
    }

    if (incomePending || reportPending) {
        return <h1> Loading </h1>
    }

    if (reportIsError || incomeIsError) {
        return <div>Error while fetching Result</div>
    }

    return <div className="max-h-[50vh] h-[50vh] overflow-y-auto mb-4">
        <Table className="border-border border-2">
            <TableHeader>
                <TableRow>
                    <TableHead> Room </TableHead>
                    <TableHead> Bill No. </TableHead>
                    <TableHead> Tariff </TableHead>
                    <TableHead> CGST </TableHead>
                    <TableHead> SGST </TableHead>
                    <TableHead> Food </TableHead>
                    <TableHead> Laundry </TableHead>
                    <TableHead> Extra </TableHead>
                    <TableHead> Total </TableHead>
                    <TableHead> Payment Mode </TableHead>
                    <TableHead> Booking Mode </TableHead>
                    <TableHead> Action </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {reportData.reports.map((data: any) => (
                    <TableRow key={data.id}>
                        <TableCell>{data.room_no}</TableCell>
                        <TableCell>{data.bill_no}</TableCell>
                        <TableCell>{data.tariff}</TableCell>
                        <TableCell>{data.c_gst}</TableCell>
                        <TableCell>{data.s_gst}</TableCell>
                        <TableCell>{data.food}</TableCell>
                        <TableCell>{data.laundry}</TableCell>
                        <TableCell>{data.extra}</TableCell>
                        <TableCell>{data.total}</TableCell>
                        <TableCell className="capitalize">{data.payment_mode}</TableCell>
                        <TableCell className="capitalize">{data.booking_mode}</TableCell>
                        <TableCell className="flex gap-5">
                            <Button className="bg-secondary text-green-500 h-10 w-10 p-0">
                                <Pencil />
                            </Button>
                            <Button  
                            className="bg-secondary text-red-500 h-10 w-10 p-0"
                            onClick={() => {
                                setIsOpen(true);
                                setId(data.id);
                            }}
                            >
                                <Trash2 />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                {incomeData.response.map((data: any) => (
                    <TableRow key="total">
                        <TableCell colSpan={2} className="text-center">Total</TableCell>
                        <TableCell>{data.total_tariff}</TableCell>
                        <TableCell>{data.total_cgst}</TableCell>
                        <TableCell>{data.total_sgst}</TableCell>
                        <TableCell>{data.total_food}</TableCell>
                        <TableCell>{data.total_laundry}</TableCell>
                        <TableCell>{data.extra}</TableCell>
                        <TableCell>{data.grand_total}</TableCell>
                        <TableCell colSpan={3}></TableCell>
                    </TableRow>
                ))}
            </TableFooter>
        </Table>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Report</DialogTitle>
            <DialogDescription className="text-red-500">
              Are you sure? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="submit"
              className="px-3 flex gap-1 items-center"
              variant="destructive"
              onClick={() => {
                handleDelete(id)
              }}
            >
              <span> Delete</span>
              <Trash2 />
            </Button>
          </DialogFooter>
        </DialogContent>
        </Dialog>
    </div>
}

export default ReportTable;