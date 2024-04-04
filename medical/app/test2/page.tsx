"use client"
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/file-upload";
const formSchema = z.object({
    name: z.string().min(1, { message: "Patient name required" }),
    age: z.number().int().positive({ message: "Age must be a positive integer" }),
    height: z.number().int().positive({ message: "Height must be a positive integer" }),
    weight: z.number().int().positive({ message: "Weight must be a positive integer" }),
    imageUrl: z.string(),
    bloodgroup: z.string(),
    sex: z.string(),
})
const Patient = () => {
    const router = useRouter();
    const passToSymptoms = () => {
        router.push('search2')
    }
    const form = useForm(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                name: "",
                age: 0,
                height: 0,
                weight: 0,
                imageUrl: "",
                bloodgroup: "A+",
                sex: "MALE",

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

    return (

        <div className=" pt-40 flex flex-col  ml-70   pl-80 ">
            <div className="pb-20 text-4xl font-bold  text-emerald-500">
                Add A Patient
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-8  px-6">
                        <div className="flex items-center justify-center">
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-l font-bold text-zinc-500 dark:text-secondary/70">
                                            Patient Image
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
                                            placeholder="Enter patient's age"
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
                            name="height"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-l font-bold text-zinc-500 dark:text-secondary/70">
                                        Height in centimeters
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={isLoading}
                                            className="bg-zinc-300/50 text-black"
                                            placeholder="Enter patient's height"
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
                            name="weight"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-l font-bold text-zinc-500 dark:text-secondary/70">
                                        Weight in kilograms
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={isLoading}
                                            className="bg-zinc-300/50 text-black"
                                            placeholder="Enter patient's weight"
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
                        <FormField
                            control={form.control}
                            name="bloodgroup"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase pr-4 text-l font-bold text-zinc-500 dark:text-secondary/70">
                                        Blood Group
                                    </FormLabel>
                                    <FormControl>
                                        <select {...field} disabled={isLoading} className="bg-zinc-300/50 text-black" onChange={(e) => field.onChange(e.target.value)}>
                                            <option value={"A+"}>A+</option>
                                            <option value={"A-"}>A-</option>
                                            <option value={"B+"}>B+</option>
                                            <option value={"B-"}>B-</option>
                                            <option value={"AB+"}>AB+</option>
                                            <option value={"AB-"}>AB-</option>
                                            <option value={"O+"}>O+</option>
                                            <option value={"O-"}>O-</option>
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button onClick={passToSymptoms} variant="primary" disabled={isLoading}>
                            Create
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
export default Patient