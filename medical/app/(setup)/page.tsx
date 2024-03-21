import Header from "@/components/header";
import { initialProfile } from "@/lib/initial-profile";
import HomePage from "@/components/Home";

const Home = async () => {
  const profile = await initialProfile();
  return (
    <div className="bg-white rounded-lg  w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="">
          <h1 className="text-[#34D399] font-serif text-3xl font-bold">
            MediHome
          </h1>

        </div>
      </Header>
      <HomePage />
    </div>

  );
}
export default Home;