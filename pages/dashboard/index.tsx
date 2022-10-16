import { DocumentIcon } from "@heroicons/react/24/outline";
import MainLayout from "../../layouts";
const Dashboard = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="h-[13rem] w-[45rem] m-8 p-10  bg-pink-50 rounded-lg shadow-md ">
          <div>
            <p className="my-2 text-base">Total Balance</p>
            <h1 className="text-4xl font-bold">$1200</h1>
          </div>
          <button className="w-52 h-12 bg-violet-500 rounded mt-5 text-white font-bold">
            Withdraw
          </button>
        </div>
        <div className="h-[13rem] w-[25rem] m-8 p-10 bg-[#FEF0E8] rounded-lg ">
          <DocumentIcon className="h-10 mb-4" />
          <div className="cursor-pointer">
            <h1 className="text-xl  font-bold">Need help ?</h1>
            <p className="text-base text-gray-700">
              Simple documentation for everything you might need
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-x-10 m-8">
        <div className="h-[23rem] w-1/2  p-6  bg-gray-50 rounded-xl shadow border ">
          <h1 className="text-3xl font-bold">Payments</h1>
        </div>
        <div className="h-[23rem] w-1/2  p-6  bg-gray-50 rounded-xl shadow border ">
          <h1 className="text-3xl font-bold">Withdraw</h1>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
