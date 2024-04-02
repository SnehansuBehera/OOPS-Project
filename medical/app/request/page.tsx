"use client"
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {  useRouter } from "next/navigation";
import { FileUpload } from "@/components/file-upload";
const formSchema=z.object({
    proofImageUrl:z.string(),
})
 const RequestPage =() => {
    const router = useRouter();
    const form = useForm(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                proofImageUrl: "",
            }
        }
    );
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { proofImageUrl } = values;
            await axios.patch("/api/profile", { role: "REQUEST", proofImageUrl });
            form.reset();
            router.refresh();
        }
        catch (error) {
            console.log(error);
        }
    }

    return(
        
        <div className=" pt-40 flex flex-col  ml-70   pl-80 ">
            <div className="pb-20 text-4xl font-bold  text-emerald-500">
                Make A Request To Admin
            </div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8  px-6">
            <div className="flex items-center justify-center">
                            <FormField
                                control={form.control}
                                name="proofImageUrl"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel className="uppercase text-l font-bold text-zinc-500 dark:text-secondary/70">
                                             Proof Image
                                        </FormLabel>
                                        <FormControl>
                                            <FileUpload
                                                endpoint="memberImage"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}>
                                </FormField>
                        </div>
                    <Button variant="primary" disabled={isLoading}>
                        Request
                    </Button>
                </div>
            </form>
        </Form>
    </div>
    )
}
 export default RequestPage