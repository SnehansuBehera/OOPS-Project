import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />

    <p className="text-3xl text-teal-400 font-bold ">
      Welcome to MediHome
    </p>
    

    </div>

  );
}
