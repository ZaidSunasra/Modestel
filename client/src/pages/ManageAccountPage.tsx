import AddUser from "@/components/AddUserPage";
import SideBar from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddUserInput } from "@/lib/types";
import { AddUserAccount, DeleteUserAccount } from "@/mutations/authMutation";
import { fetchAllAccounts } from "@/queries/authQueries";
import { Trash2, User } from "lucide-react";
import { useState } from "react";

const ManageAccount = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [actionType, setActionType] = useState<"post" | "delete" | null>(null);
    const [id, setId] = useState<string>("");

    const { data, isPending } = fetchAllAccounts();

    const deleteMutation = DeleteUserAccount();
    const postMutation = AddUserAccount();

    const handleDeleteUser = (id: string) => {
        deleteMutation.mutate(id);
        setId("");
        setActionType(null);
        setIsOpen(false);
    }

    const handleAddUser = (data: AddUserInput) => {
        postMutation.mutate(data);
        setActionType(null);
        setIsOpen(false);
    }

    if (isPending) return <div>Loadingg..</div>

    console.log(data);

    return <div className="h-screen w-screen font-mono flex bg-background">
        <SideBar />
        <SidebarTrigger />
        <div className="w-full p-4">
            <div className="flex justify-end mb-4">
                <Button
                    onClick={() => {
                        setIsOpen(true);
                        setActionType("post");
                    }}
                >
                    <User />
                    Add Account
                </Button>
            </div>
            <div className="max-h-[80vh] overflow-auto">
                <Table className="border-border border-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead>USERNAME</TableHead>
                            <TableHead>ROLE</TableHead>
                            <TableHead>ACTION</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.response.map((data: any) => (
                            <TableRow key={data.id}>
                                <TableCell>{data.username}</TableCell>
                                <TableCell className="uppercase">{data.role}</TableCell>
                                <TableCell className="flex gap-5">
                                    <Button
                                        className="bg-secondary text-red-500 h-10 w-10 p-0"
                                        onClick={() => {
                                            setActionType("delete");
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
                </Table>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    {actionType == 'post' ? (
                        <>
                            <DialogHeader>
                                <DialogTitle> Add User </DialogTitle>
                                <DialogDescription>Enter the details to add a new user.</DialogDescription>
                            </ DialogHeader>
                            <AddUser onSubmit={handleAddUser}/>
                        </>
                    ) : actionType == 'delete' ? (
                        <>
                            <DialogHeader>
                                <DialogTitle> Delete User </DialogTitle>
                                <DialogDescription>Are you sure you want to delete this expense entry? This action cannot be undone.</DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="sm:justify-start">
                                <Button
                                    type="submit"
                                    className="px-3 flex gap-1 items-center"
                                    variant="destructive"
                                    onClick={() => {
                                        handleDeleteUser(id)
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

export default ManageAccount;