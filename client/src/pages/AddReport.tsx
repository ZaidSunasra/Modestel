import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddReportInputs } from "@/lib/types";
import { useAddReport } from "@/mutations/reportMutation";
import { formatAddReportData } from "@/utils/dataFormatter";
import { ArrowLeft } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";

const AddReport = () => {

    const navigate = useNavigate();
    const { handleSubmit, formState: { errors }, register, control } = useForm<AddReportInputs>();
    const addReportMutation = useAddReport();

    const onSubmit = (data: AddReportInputs) => {
        const formattedData = formatAddReportData(data);
        addReportMutation.mutate(formattedData);
    }

    return <div className="h-screen w-screen flex flex-col justify-center items-center font-mono bg-background">
        <div className="p-4 flex justify-start w-full top-0 absolute">
            <Button
                onClick={() => {
                    navigate("/dailyReport");
                }}
            >
                <ArrowLeft />
                Back
            </Button>
        </div>
        <div>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>Add Report</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex gap-6 mb-6">
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label>Room No.</Label>
                                    <Input {...register("room_no", {
                                        required: { value: true, message: "Room No. cannot be empty" }
                                    })} />
                                    {errors.room_no && <ErrorMessage message={errors.room_no.message} />}
                                </div>
                                <div className="grid gap-2">
                                    <Label>Bill No.</Label>
                                    <Input {...register("bill_no", {
                                        required: { value: true, message: "Bill No. cannot be empty" }
                                    })} />
                                    {errors.bill_no && <ErrorMessage message={errors.bill_no.message} />}
                                </div>
                                <div className="grid gap-2">
                                    <Label>Tariff</Label>
                                    <Input {...register("tariff", {
                                        required: { value: true, message: "Tariff cannot be empty" },
                                        max: { value: 999999, message: "Tariff should be less than 999999" }
                                    })}
                                        type="number"
                                        min={0}
                                    />
                                    {errors.tariff && <ErrorMessage message={errors.tariff.message} />}
                                </div>
                                <div className="grid gap-2">
                                    <Label>Food</Label>
                                    <Input {...register("food", {
                                        required: { value: true, message: "Food cannot be empty" },
                                        max: { value: 999999, message: "Food should be less than 999999" }
                                    })}
                                        type="number"
                                        min={0}
                                    />
                                    {errors.food && <ErrorMessage message={errors.food.message} />}
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label>Laundry</Label>
                                    <Input {...register("laundry", {
                                        required: { value: true, message: "Laundry cannot be empty" },
                                        max: { value: 999999, message: "Laundry should be less than 999999" }
                                    })}
                                        type="number"
                                        min={0}
                                    />
                                    {errors.laundry && <ErrorMessage message={errors.laundry.message} />}
                                </div>
                                <div className="grid gap-2">
                                    <Label>Extra</Label>
                                    <Input {...register("extra", {
                                        required: { value: true, message: "Extra cannot be empty" },
                                        max: { value: 999999, message: "Extra should be less than 999999" }
                                    })}
                                        type="number"
                                        min={0}
                                    />
                                    {errors.extra && <ErrorMessage message={errors.extra.message} />}
                                </div>
                                <div className="grid gap-2">
                                    <Label>Payment Mode</Label>
                                    <Controller
                                        name="payment_mode"
                                        control={control}
                                        rules={{ required: "Booking mode is required" }}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-[200px]">
                                                    <SelectValue placeholder="Select payment mode" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Payment Mode</SelectLabel>
                                                        <SelectItem value="cash">Cash</SelectItem>
                                                        <SelectItem value="card swipe">Card Swipe</SelectItem>
                                                        <SelectItem value="bank transfer">Bank Transfer</SelectItem>
                                                        <SelectItem value="ota pay">OTA Pay</SelectItem>
                                                        <SelectItem value="wallet">Wallet</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {errors.payment_mode && <ErrorMessage message={errors.payment_mode.message} />}
                                </div>
                                <div className="grid gap-2">
                                    <Label>Booking Mode</Label>
                                    <Controller
                                        name="booking_mode"
                                        control={control}
                                        rules={{ required: "Booking mode is required" }}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-[200px]">
                                                    <SelectValue placeholder="Select booking mode" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Booking Mode</SelectLabel>
                                                        <SelectItem value="walking">Walking</SelectItem>
                                                        <SelectItem value="ota">OTA</SelectItem>
                                                        <SelectItem value="company">Company</SelectItem>
                                                        <SelectItem value="banquet">Banquet</SelectItem>
                                                        <SelectItem value="wastage">Wastage</SelectItem>
                                                        <SelectItem value="extra">Extra</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {errors.booking_mode && <ErrorMessage message={errors.booking_mode.message} />}
                                </div>
                            </div>
                        </div>
                        <Button className="w-full">
                            Add Report
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
}

export default AddReport;