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
    name: z.string().min(1, { message: "Patient name required" }),
    age: z.number().int().positive({ message: "Age must be a positive integer" }),
    sex: z.string(),
})
 const Patient = () => {
    const router = useRouter();
    const form = useForm(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                name: "",
                age: 0,
                sex:"",

            }
        }
    );
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            await axios.post("/api/patient", values);
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
                 Add A Patient
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
                                Patient  name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isLoading}
                                    className="bg-zinc-300/50 text-black "
                                    placeholder="Enter Patient's name"
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
                            <FormLabel className="uppercase text-l font-bold text-zinc-500 dark:text-secondary/70">
                                Age
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    disabled={isLoading}
                                    className="bg-zinc-300/50 text-black"
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
                    name="sex"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="uppercase pr-4 text-l font-bold text-zinc-500 dark:text-secondary/70">
                                Sex
                            </FormLabel>
                            <FormControl>
                                <select {...field} disabled={isLoading} className="bg-zinc-300/50 text-black" onChange={(e) => field.onChange(e.target.value)}>
                                    <option value={"MALE"}>Male</option>
                                    <option value={"FEMALE"}>Female</option>
                                </select>
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
 export default Patient