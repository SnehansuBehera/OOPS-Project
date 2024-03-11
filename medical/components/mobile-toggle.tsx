import { Menu } from "lucide-react"
import { Sheet,SheetContent,SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import MobileSidebar from "./MobileSidebar"

export const MobileToggle=()=>{
    return(
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0 ">
                <div className="w-[48px]">
                    <MobileSidebar>
                        <div>

                        </div>
                    </MobileSidebar>
                </div>

            </SheetContent>
        </Sheet>
    )
}