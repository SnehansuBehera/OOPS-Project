import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { FileUpload } from "@/components/file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
    id:z.string(),
    name: z.string().min(1, { message: "Symptom name required" }),
    imageUrl: z.string().min(1, { message: "Symptom image required" }),
    diseases: z.string(),
    remedies: z.string(),
});

export const EditSymptomModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();
    const isModalOpen = isOpen && type === "editSymptom";
    const { symptom } = data;
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id:"",
            imageUrl: "",
            name:  "",
            diseases:"",
            remedies:"",
        }
    });

    const [symptomNames, setSymptomNames] = useState<string[]>([]);
    const [symptomData, setSymptomData] = useState<any[]>([]);
    const isLoading = form.formState.isSubmitting;

    useEffect(() => {
        // Fetch symptom names when component mounts
        fetchSymptomData();
    }, []);

    useEffect(() => {
        if (symptom) {
            form.setValue("name", symptom.name);
            form.setValue("imageUrl", symptom.imageUrl);
            const remedyNames = symptom.remedies ? symptom.remedies.map((remedy: any) => remedy.name) : [];
            const diseaseNames = symptom.diseases ? symptom.diseases.map((disease: any) => disease.name) : [];
            const remediesString = remedyNames.join(", ");
            const diseasesString = diseaseNames.join(", ");
            form.setValue("remedies", remediesString);
            form.setValue("diseases", diseasesString);
        }
    }, [symptom, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.patch(`/api/symptoms/${values?.id}`, values);            
            const updatedSymptom = response.data; // Assuming the response contains the updated symptom data
            form.reset(); // Reset the form first to clear any existing values
            // Set the form values with the updated symptom data
            form.setValue("id", updatedSymptom.id);
            form.setValue("name", updatedSymptom.name);
            form.setValue("imageUrl", updatedSymptom.imageUrl);
            const remedyNames = updatedSymptom.remedies ? updatedSymptom.remedies.map((remedy: any) => remedy.name) : [];
            const diseaseNames = updatedSymptom.diseases ? updatedSymptom.diseases.map((disease: any) => disease.name) : [];
            const remediesString = remedyNames.join(", ");
            const diseasesString = diseaseNames.join(", ");
            form.setValue("remedies", remediesString);
            form.setValue("diseases", diseasesString);
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
            setSymptomData(symptomData);
            const names = symptomData.map((symptom: any) => symptom.name);
            setSymptomNames(names);
        } catch (error) {
            console.log("Error fetching symptom names:", error);
        }
    };

    const handleSymptomNameChange = (selectedName: string) => {
        const selectedSymptom = symptomData.find((symptom: any) => symptom.name === selectedName);
        if (selectedSymptom) {
            form.setValue("id",selectedSymptom.id);
            form.setValue("imageUrl", selectedSymptom.imageUrl || "");
            const diseases = selectedSymptom.diseases || [];
            const remedies = selectedSymptom.remedies || [];
            form.setValue("diseases", diseases.map((disease: any) => disease.name).join(", "));
            form.setValue("remedies", remedies.map((remedy: any) => remedy.name).join(", "));
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Edit Symptom
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Edit the details of the symptom
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                        <div className="flex items-center justify-center">
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({field})=>(
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload
                                                endpoint="symptomImage"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}>
                                </FormField>
                        </div>
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
                            <FormField
                                control={form.control}
                                name="diseases"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Diseases
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50"
                                                focusVisibleRing-0
                                                text-black
                                                focusVisibleRingOffset-0
                                                placeholder="Enter diseases separated by commas"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="remedies"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Remedies
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50"
                                                focusVisibleRing-0
                                                text-black
                                                focusVisibleRingOffset-0
                                                placeholder="Enter remedies separated by commas"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter className="bg-gray-100 px-6 py-4">
                                <Button variant="primary" disabled={isLoading}>
                                    Update
                                </Button>
                            </DialogFooter>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
