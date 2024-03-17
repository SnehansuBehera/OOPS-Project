import { createUploadthing, type FileRouter } from "uploadthing/next";
 import { auth } from "@clerk/nextjs";
const f = createUploadthing();
const handleAuth=()=>{
    const {userId}=auth();
    if(!userId)throw new Error("Unauthorized");
    return{userId:userId}
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  symptomImage:f({image:{maxFileCount:1 }}).middleware(()=>handleAuth()).onUploadComplete(()=>{}),
  messageFile:f(["image","pdf","video"]).middleware(()=>handleAuth()).onUploadComplete(()=>{})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;