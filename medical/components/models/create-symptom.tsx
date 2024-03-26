import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form";
import {Input}from "@/components/ui/input";
import {Button}from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { FileUpload } from "@/components/file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
const formSchema=z.object({
    name:z.string().min(1,{message:"Symptom name required"}),
    imageUrl:z.string().min(1,{message:"Symptom image required"}),
    diseases: z.string(),
    remedies: z.string(), 
})
export const CreateSymptomModal=()=>{
   const {isOpen,onClose,type}=useModal();
    const router=useRouter();
    const isModalOpen=isOpen&&type==="createSymptom"
    const form=useForm(
        {
            resolver:zodResolver(formSchema),
            defaultValues:{
                name:"",
                imageUrl:"",
                diseases: "",
                remedies: "", 
        }
    }
   );
   const isLoading=form.formState.isSubmitting;
   const onSubmit=async(values:z.infer<typeof formSchema>)=>{
    try{
        
        await axios.post("/api/symptoms",values);
        form.reset();
        router.refresh();
        onClose();
    }
    catch(error){
        console.log(error);
    }
}
const handleClose=()=>{
    form.reset();
    onClose();
}
            
  
    return(
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center  font-bold">
                        Add A Symptom
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Give your symptom  a name
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
                        render={({ field })=>(
                            <FormItem>
                                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                    Symptom name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        className="bg-zinc-300/50"
                                        focusVisibleRing-0 
                                        text-black 
                                        focusVisibleRingOffset-0
                                        placeholder="Enter Symptom name"
                                        {...field}
                                        />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                           )}                        
                        />
                        <FormField
                                control={form.control}
                                name="diseases"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Diseases</FormLabel>
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
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Remedies</FormLabel>
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