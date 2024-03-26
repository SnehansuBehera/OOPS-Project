import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
    id: z.string(),
    name: z.string().min(1, { message: "Symptom name required" }),
});

export const DeleteSymptomModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();
    const isModalOpen = isOpen && type === "deleteSymptom";
    const { symptom } = data;
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: "",
            name: "",
        }
    });

    const [symptomNames, setSymptomNames] = useState<string[]>([]);
    const [symptomData, setSymptomData] = useState<any[]>([]); // Add symptomData state
    const isLoading = form.formState.isSubmitting;

    useEffect(() => {
        // Fetch symptom data when component mounts
        fetchSymptomData();
    }, []);

 const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        await axios.delete(`/api/symptoms/${values?.id}`);
        form.reset();
        router.refresh();
        onClose();
    } catch (error) {
        console.log(error);
    }
};
    const handleClose = () => {
        form.reset();
        onClose();
    };

    const fetchSymptomData = async () => {
        try {
            const response = await axios.get("/api/symptoms");
            const symptomData = response.data;
            setSymptomData(symptomData); // Set the fetched symptom data in state
            const names = symptomData.map((symptom: any) => symptom.name);
            setSymptomNames(names);
        } catch (error) {
            console.log("Error fetching symptom data:", error);
        }
    };

    const handleSymptomNameChange = (selectedName: string) => {
        const selectedSymptom = symptomData.find((symptom: any) => symptom.name === selectedName);
        if (selectedSymptom) {
            const selectedSymptomId = selectedSymptom.id;
            form.setValue("id", selectedSymptomId);
            form.setValue("name", selectedSymptom.name);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Symptom
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Select the symptom to delete
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Symptom name
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                disabled={isLoading}
                                                onValueChange={(value) => {
                                                    form.setValue("name", value);
                                                    handleSymptomNameChange(value);
                                                }}
                                                value={form.getValues("name")}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Symptom Name" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {symptomNames.map((name, index) => (
                                                        <SelectItem key={index} value={name}>{name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter className="bg-gray-100 px-6 py-4">
                                <Button variant="destructive" disabled={isLoading}>
                                    Delete
                                </Button>
                            </DialogFooter>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
