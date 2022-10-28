import { DocumentIcon } from "@heroicons/react/24/outline";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import MainLayout from "../../layouts";
const Dashboard: NextPage = () => {
  const [transaction, setTransaction] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [balance, setbalance] = useState<any>(null);

  useEffect(() => {
    const Trans = async () => {
      const session = await supabase.auth.getSession();
      console.log(session);

      const { data } = await axios.post("/api/trans", {
        token: session.data.session?.access_token,
      });
      setTransaction(data.transactions);
      setbalance(data.metadata.earned);
      console.log(data.metadata);
    };
    Trans();
  }, []);

  useEffect(() => {
    const WalletAddress = async () => {
      const session = await supabase.auth.getSession();
      const { data } = await axios.post("/api/user", {
        token: session.data.session?.access_token,
      });
      setUser(data.metadata);
    };
    WalletAddress();
  }, []);
  // useEffect(() => {
  //   const FetchBalance = async () => {
  //     if (user != null) {
  //       const connection = new Connection(clusterApiUrl("devnet"));
  //       const balances =
  //         (await connection.getBalance(new PublicKey(user?.wallet_address))) /
  //         LAMPORTS_PER_SOL;
  //       console.log(balances.toString().slice(0, 4));
  //       setbalance(balances.toString().slice(0, 4));
  //     }
  //   };
  //   FetchBalance();
  // }, [user?.wallet_address]);
  // console.log(transaction);

  return (
    <>
      <MainLayout>
        <div className="flex justify-center">
          <div className="h-[13rem] w-[45rem] m-8 p-10  bg-pink-50 rounded-lg shadow-md ">
            <div>
              <p className="my-2 text-base">Total Balance</p>
              <h1 className="text-4xl font-bold">
                {balance === null ? "loading..." : balance + " USDC"}
              </h1>
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
        <div className="h-[23rem] mx-8 px-10  overflow-scroll  bg-gray-50 rounded-xl shadow border ">
          <h1 className="text-3xl font-bold p-6">Payments</h1>
          {transaction.length != 0 ? (
            <>
              <div className="flex flex-col justify-center w-full items-center">
                <div className="mt-4 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                              >
                                Order Id
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                              >
                                Amount ($)
                              </th>

                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                              >
                                Signature
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {transaction.map((trans) => (
                              <tr key={trans.session_id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  {trans.session_id.slice(0, 4) +
                                    "..." +
                                    trans.session_id.slice(-4)}
                                </td>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  {trans.status}
                                </td>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  {trans.amount}
                                </td>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  {trans.signature === null
                                    ? "-----"
                                    : trans.signature}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h1 className="text-center mt-20">Loading...</h1>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default Dashboard;
