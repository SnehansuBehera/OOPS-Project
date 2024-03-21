import getSymptomsByTitle from "@/actions/getSymptomsByTitle";
import { SymptomContent } from "@/components/Search/components/symptom-content";
import SearchInput from "@/components/Search/components/symptom-input";
interface SearchProps{
    searchParams:{
        title:string;
    }
};
export const revalidate=0;

const Search = async ({searchParams}:SearchProps) => {
    const symptoms=await getSymptomsByTitle(searchParams.title);
    return ( 
    <div className="bg-neutral-900 rounded-lg h-screen w-full overflow-hidden overflow-y-auto">
        <div>
            <div className="mb-2 flex flex-col gap-y-6">
                <h1 className="text-white text-3xl font-semibold">
                    Search
                    </h1>
                    <SearchInput/>
                </div> 
            </div>
            <SymptomContent symptoms={symptoms}/>
           </div>  
           );
            }
 
export default Search;