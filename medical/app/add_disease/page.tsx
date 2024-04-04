"use client"
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
const formSchema=z.object({
    name: z.string().min(1, { message: "Disease name required" }),
    symptoms: z.string(),
    remedies: z.string(),
})
 const AddDisease = () => {
    const router = useRouter();
    const form = useForm(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                name: "",
                symptoms:"",
                remedies:"",

            }
        }
    );
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            await axios.post("/api/disease", values);
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
                 Add A Disease
            </div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8  px-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="uppercase text-l font-bold text-zinc-500 dark:text-secondary/70">
                                Disease  name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isLoading}
                                    className="bg-zinc-300/50 text-black "
                                    placeholder="Enter Disease name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                                control={form.control}
                                name="symptoms"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Symptoms</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50"
                                                placeholder="Enter symptoms separated by commas"
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
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Remedies</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50"
                                                placeholder="Enter remedies separated by commas"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                    <Button variant="primary" disabled={isLoading}>
                        Create
                    </Button>
                </div>
            </form>
        </Form>
    </div>
    )
}
 export default AddDisease