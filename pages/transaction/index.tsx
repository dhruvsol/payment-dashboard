import axios from "axios";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import MainLayout from "../../layouts";

const Transaction: NextPage = () => {
  const people = [
    {
      name: "Lindsay Walton",
      title: "Front-end Developer",
      email: "lindsay.walton@example.com",
      role: "Member",
    },
    {
      name: "Lindsay Walton",
      title: "Front-end Developer",
      email: "lindsay.walton@example.com",
      role: "Member",
    },
    {
      name: "Lindsay Walton",
      title: "Front-end Developer",
      email: "lindsay.walton@example.com",
      role: "Member",
    },
    {
      name: "Lindsay Walton",
      title: "Front-end Developer",
      email: "lindsay.walton@example.com",
      role: "Member",
    },
  ];
  const [transaction, setTransaction] = useState<any[]>([]);

  useEffect(() => {
    const Trans = async () => {
      const session = await supabase.auth.getSession();
      const { data } = await axios.post("/api/trans", {
        token: session.data.session?.access_token,
      });
      setTransaction(data.transactions);
    };
    Trans();
  }, []);
  return (
    <>
      <MainLayout>
        <div className="flex flex-col justify-center w-full items-center">
          <div className="mt-8 flex flex-col w-[85%]">
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
                          Time
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                        >
                          Signature
                        </th>
                        <th
                          scope="col"
                          className="relative py-3 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">Details</span>
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
                            ------
                          </td>

                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {trans.signature === null
                              ? "-----"
                              : trans.signature}
                          </td>

                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a
                              href="#"
                              className="text-violet-600 hover:text-violet-900"
                            >
                              view
                            </a>
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
      </MainLayout>
    </>
  );
};

export default Transaction;
