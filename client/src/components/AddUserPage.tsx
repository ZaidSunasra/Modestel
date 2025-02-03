import { AddUserInput } from "@/lib/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import ErrorMessage from "./ErrorMessage";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";

const AddUser = ({ onSubmit }: { onSubmit: (data: AddUserInput) => void }) => {
    
    const { handleSubmit, formState: { errors }, register, control } = useForm<AddUserInput>();
    const submitHandler: SubmitHandler<AddUserInput> = (data: AddUserInput) => {
        onSubmit(data);
    }

    return <>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex gap-6 flex-col">
                <div className="grid gap-2">
                    <Label>Username</Label>
                    <Input {...register("username", {
                        required: { value: true, message: "Username cannot be empty" }
                    })} />
                    {errors.username && <ErrorMessage message={errors.username.message} />}
                </div>
                <div className="grid gap-2">
                    <Label>password</Label>
                    <Input {...register("password", {
                        required: { value: true, message: "Amount cannot be empty" },
                    })}
                        type="password"
                    />
                    {errors.password && <ErrorMessage message={errors.password.message} />}
                </div>
                <div className="grid gap-2">
                    <Label>User Type</Label>
                    <Controller
                        name="role"
                        control={control}
                        rules={{ required: "Role is required" }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Voucher</SelectLabel>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="receptionist">Receptionist</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.role && <ErrorMessage message={errors.role.message} />}
                </div>


                <Button className="w-full">
                    Add User
                </Button>
            </div>
        </form>
    </>
}

export default AddUser;