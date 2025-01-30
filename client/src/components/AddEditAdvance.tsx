import { AddAdvanceInput, EditAdvanceInput } from "@/lib/types"
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect } from "react";

export const AddAdvance = ({ onSubmit }: { onSubmit: (data: AddAdvanceInput) => void }) => {

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<AddAdvanceInput>();
    const submitHandler: SubmitHandler<AddAdvanceInput> = (data: AddAdvanceInput) => {
        onSubmit(data);
    };

    return <>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label>Name</Label>
                    <Input
                        {...register("name", {
                            required: { value: true, message: "Name cannot be empty." }
                        })}
                        placeholder="Enter name"
                    />
                    <p> {errors.name && <ErrorMessage message={errors.name.message} />}</p>
                </div>
                <div className="grid gap-2">
                    <Label>Amount</Label>
                    <Input
                        {...register("amount", {
                            required: { value: true, message: "Amount cannot be empty." },
                            max: {value: 999999, message: "Amount should be less than 999999."}
                        })}
                        placeholder="Enter amount"
                    />
                    <p> {errors.amount && <ErrorMessage message={errors.amount.message} />}</p>
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    Add Advance
                </Button>
            </div>
        </form>
    </>
}

export const EditAdvance = ({ value, onSubmit }: { onSubmit: (data: EditAdvanceInput, id: string) => void, value: any }) => {

    const { handleSubmit, register, formState: { errors, isSubmitting }, reset} = useForm<EditAdvanceInput>();
    const submitHandler: SubmitHandler<EditAdvanceInput> = (data: EditAdvanceInput) => {
        onSubmit(data, value.id);
    };

    useEffect(() => {
        reset({
            name: value.staff_name,
            amount: value.amount
        })
    }, [value, reset])

    return <>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label>Name</Label>
                    <Input
                        {...register("name", {
                            required: { value: true, message: "Name cannot be empty." }
                        })}
                        placeholder="Enter name"
                    />
                    <p> {errors.name && <ErrorMessage message={errors.name.message} />}</p>
                </div>
                <div className="grid gap-2">
                    <Label>Amount</Label>
                    <Input
                        {...register("amount", {
                            required: { value: true, message: "Amount cannot be empty." },
                            max: {value: 999999, message: "Amount should be less than 999999."}
                        })}
                        placeholder="Enter amount"
                    />
                    <p> {errors.amount && <ErrorMessage message={errors.amount.message} />}</p>
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    Edit Advance
                </Button>
            </div>
        </form>
    </>
}