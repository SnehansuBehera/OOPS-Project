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
import { MemberRole, GenderRole } from "@prisma/client";
const formSchema = z.object({
    name: z.string().min(1, { message: "Patient name required" }),
    age: z.number().int().positive({ message: "Age must be a positive integer" }),
    gender: z.nativeEnum(GenderRole),
    ImpMessage: z.string().min(1, { message: " Your Request Message  required" }),
    MemberImageUrl: z.string().min(1, { message: "Patient image required" }),
    doctorProofImageUrl: z.string(),
    role: z.nativeEnum(MemberRole),
})
export const CreatePatientModal = () => {
    const { isOpen, onClose, type } = useModal();
    const router = useRouter();
    const isModalOpen = isOpen && type === "createPatient"
    const form = useForm(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                name: "",
                age: 0,
                gender: GenderRole.MALE,
                ImpMessage: "",
                MemberImageUrl: "",
                role: MemberRole.PATIENT,
                doctorProofImageUrl: "",

            }
        }
    );
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            await axios.post("/api/member", values);
            form.reset();
            router.refresh();
            onClose();
        }
        catch (error) {
            console.log(error);
        }
    }
    const handleClose = () => {
        form.reset();
        onClose();
    }


    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center  font-bold">
                        Become A Patient
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Fill Your Form
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center">
                                <FormField
                                    control={form.control}
                                    name="MemberImageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="memberImage"
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
                                            Patient  name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50"
                                                focusVisibleRing-0
                                                text-black
                                                focusVisibleRingOffset-0
                                                placeholder="Enter your real name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Age
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                disabled={isLoading}
                                                className="bg-zinc-300/50"
                                                focusVisibleRing-0
                                                text-black
                                                focusVisibleRingOffset-0
                                                placeholder="Enter your age"
                                                {...field}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value);
                                                    field.onChange(value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Gender
                                        </FormLabel>
                                        <FormControl>
                                            <select {...field} disabled={isLoading} className="bg-zinc-300/50">
                                                <option value={GenderRole.MALE}>Male</option>
                                                <option value={GenderRole.FEMALE}>Female</option>
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ImpMessage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Your Message
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50"
                                                focusVisibleRing-0
                                                text-black
                                                focusVisibleRingOffset-0
                                                placeholder="State your problem"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter className="bg-gray-100 px-6 py-4">
                                <Button variant="primary" disabled={isLoading}>
                                    Create
                                </Button>
                            </DialogFooter>

                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}