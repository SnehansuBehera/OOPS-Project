import Header from "@/components/header";

export default function Home() {
  return (
    <div className="bg-white rounded-lg h-screen w-full overflow-hidden overflow-y-auto">
        <Header>
        <div className="mb-2 ">
          <h1 className="text-white text-3xl font-semibold">
            MediHome 
          </h1>
         
          </div>         
        </Header>
        <p className="text-blue-400 font-bold text-3xl ">
          This is the home page
        </p>
    </div>

  );
}
