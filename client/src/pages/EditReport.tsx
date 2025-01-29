import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EditReportInputs } from "@/lib/types";
import { useEditReport } from "@/mutations/reportMutation";
import { fetchReportById } from "@/queries/reportQueries";
import { Label } from "@radix-ui/react-label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { formatEditReportData } from "@/utils/dataFormatter";

const EditReport = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: getData, isPending: getPending, isError: getError } = fetchReportById(id!);
    const { handleSubmit, formState: { errors }, register, control, reset } = useForm<EditReportInputs>();
    const editReportMutation = useEditReport();

    useEffect(() => {
        if (getData) {
            reset({
                room_no: getData.report[0].room_no || "",
                bill_no: getData.report[0].bill_no || "",
                tariff: getData.report[0].tariff || 0,
                food: getData.report[0].food || 0,
                laundry: getData.report[0].laundry || 0,
                extra: getData.report[0].extra || 0,
                payment_mode: getData.report[0].payment_mode || "",
                booking_mode: getData.report[0].booking_mode || "",
            });
        }
    }, [getData, reset]);
    
    const onSubmit = (data: EditReportInputs) => {
        const formattedData = formatEditReportData(data);
        editReportMutation.mutate({data: formattedData, id});
    }

    if (getPending) {
        return <div>Loading...</div>
    }

    if (getError) {
        return <div>Error...</div>
    }
   
    return <div className="h-screen w-screen flex flex-col justify-center items-center font-mono bg-background">
        <div className="p-4 flex justify-start w-full">
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
                    <CardTitle>Edit Report</CardTitle>
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
                            Save Changes
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
}

export default EditReport;