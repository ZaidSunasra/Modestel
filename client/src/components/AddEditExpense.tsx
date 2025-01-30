import { AddExpenseInput, EditExpenseInput } from "@/lib/types"
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect } from "react";

export const AddExpense = ({ onSubmit }: { onSubmit: (data: AddExpenseInput) => void }) => {

    const { handleSubmit, formState: { errors }, register, control } = useForm<AddExpenseInput>();
    const submitHandler: SubmitHandler<AddExpenseInput> = (data: AddExpenseInput) => {
        onSubmit(data);
    }

    return <>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex gap-6 flex-col">
                <div className="grid gap-2">
                    <Label>Payment Mode</Label>
                    <Controller
                        name="voucher"
                        control={control}
                        rules={{ required: "Voucher is required" }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Select voucher" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Voucher</SelectLabel>
                                        <SelectItem value="hotel">Hotel</SelectItem>
                                        <SelectItem value="room service">Room Service</SelectItem>
                                        <SelectItem value="kitchen">Kitchen</SelectItem>
                                        <SelectItem value="auto expense">Auto Expense</SelectItem>
                                        <SelectItem value="cash discount">Cash Discount</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.voucher && <ErrorMessage message={errors.voucher.message} />}
                </div>
                <div className="grid gap-2">
                    <Label>Expense Name</Label>
                    <Input {...register("name", {
                        required: { value: true, message: "Name cannot be empty" }
                    })} />
                    {errors.name && <ErrorMessage message={errors.name.message} />}
                </div>
                <div className="grid gap-2">
                    <Label>Amount</Label>
                    <Input {...register("amount", {
                        required: { value: true, message: "Amount cannot be empty" },
                        max: { value: 999999, message: "Amount should be less than 999999" }
                    })}
                        type="number"
                        min={0}
                    />
                    {errors.amount && <ErrorMessage message={errors.amount.message} />}
                </div>
                <Button className="w-full">
                    Add Expense
                </Button>
            </div>
        </form>
    </>
}

export const EditExpense = ({ onSubmit, value }: { onSubmit: (data: EditExpenseInput, id: string) => void, value: any }) => {

    const { handleSubmit, formState: { errors }, register, control, reset} = useForm<EditExpenseInput>();
    const submitHandler: SubmitHandler<EditExpenseInput> = (data: EditExpenseInput) => {
        onSubmit(data, value.id);
    }

    useEffect(() => {
        reset({
            voucher: value.voucher,
            name: value.expense_name,
            amount: value.amount
        })
    }, [value, reset])

    return <>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex gap-6 flex-col">
                <div className="grid gap-2">
                    <Label>Payment Mode</Label>
                    <Controller
                        name="voucher"
                        control={control}
                        rules={{ required: "Voucher is required" }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Select voucher" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Voucher</SelectLabel>
                                        <SelectItem value="hotel">Hotel</SelectItem>
                                        <SelectItem value="room service">Room Service</SelectItem>
                                        <SelectItem value="kitchen">Kitchen</SelectItem>
                                        <SelectItem value="auto expense">Auto Expense</SelectItem>
                                        <SelectItem value="cash discount">Cash Discount</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.voucher && <ErrorMessage message={errors.voucher.message} />}
                </div>
                <div className="grid gap-2">
                    <Label>Expense Name</Label>
                    <Input {...register("name", {
                        required: { value: true, message: "Name cannot be empty" }
                    })} />
                    {errors.name && <ErrorMessage message={errors.name.message} />}
                </div>
                <div className="grid gap-2">
                    <Label>Amount</Label>
                    <Input {...register("amount", {
                        required: { value: true, message: "Amount cannot be empty" },
                        max: { value: 999999, message: "Amount should be less than 999999" }
                    })}
                        type="number"
                        min={0}
                    />
                    {errors.amount && <ErrorMessage message={errors.amount.message} />}
                </div>
                <Button className="w-full">
                    Edit Expense
                </Button>
            </div>
        </form>
    </>
}