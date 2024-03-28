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
    HasConvulsion:z.boolean(),
    breathinoneminute:z.boolean(),
    chestindrawing:z.boolean(),
    nasalflaring:z.boolean(),
    grunting:z.boolean(),
    bulgingfontanelle:z.boolean(),
    pusdraining:z.boolean(),
    lookumbilicus:z.boolean(),
    skinpustules:z.boolean(),
    axillarytemperature:z.boolean(),
    movementinfant:z.boolean(),
    Arethepalmsandsolesyellow:z.boolean(),
})
export const CreateBacteriaModal=()=>{
   const {isOpen,onClose,type}=useModal();
    const router=useRouter();
    const isModalOpen=isOpen&&type==="createSymptom"
    const form=useForm(
        {
            resolver:zodResolver(formSchema),
            defaultValues:{
                HasConvulsion:false,
                breathinoneminute:false,
                chestindrawing:false,
                nasalflaring: false,
                grunting:false,
                bulgingfontanelle:false,
                pusdraining:false,
                lookumbilicus:false,
                skinpustules:false,
                axillarytemperature:false,
                movementinfant:false,
                Arethepalmsandsolesyellow:false


        }
    }
   )
   const isLoading=form.formState.isSubmitting;
   const onSubmit=async(values:z.infer<typeof formSchema>)=>{
    try{
        
        await axios.post("/api/bacteria",values);
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
         
}