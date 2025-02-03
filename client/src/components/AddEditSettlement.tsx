import { AddSettlementInput } from "@/lib/types"
import { Label } from "./ui/label"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import ErrorMessage from "./ErrorMessage"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format, parse } from "date-fns"

export const AddSettlement = ({ onSubmit }: { onSubmit: (data: AddSettlementInput) => void }) => {

    const { handleSubmit, formState: { errors }, register, control } = useForm<AddSettlementInput>();
    const submitHandler: SubmitHandler<AddSettlementInput> = (data: AddSettlementInput) => {
        onSubmit(data);
    }

    return <>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex gap-6 flex-col">
                <div className="grid gap-2">
                    <Label>Hotel </Label>
                    <Input {...register("hotel", {
                        required: { value: true, message: "Name cannot be empty" },
                        max: { value: 999999, message: "Amount should be less than 999999" }
                    })}
                        type="number" />
                    {errors.hotel && <ErrorMessage message={errors.hotel.message} />}
                </div>
                <div className="grid gap-2">
                    <Label>Bank</Label>
                    <Input {...register("bank", {
                        required: { value: true, message: "Name cannot be empty" },
                        max: { value: 999999, message: "Amount should be less than 999999" }
                    })}
                        type="number" />
                    {errors.bank && <ErrorMessage message={errors.bank.message} />}
                </div>
                <div className="grid gap-2">
                    <Label>Select Date</Label>
                    <Controller
                        name="date"
                        control={control}
                        rules={{ required: "Date is required" }}
                        render={({ field }) => (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value ? field.value : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={
                                            field.value
                                                ? parse(field.value, "dd/MM/yyyy", new Date())
                                                : undefined
                                        }
                                        onSelect={(date: any) => {
                                            const formattedDate = format(date, "dd/MM/yyyy");
                                            field.onChange(formattedDate);
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                    />
                    {errors.date && <ErrorMessage message={errors.date.message} />}
                </div>

                <Button className="w-full">
                    Add Settlement
                </Button>
            </div>
        </form>
    </>
}
