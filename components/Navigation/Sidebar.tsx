import {
  BookOpenIcon,
  HomeIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { classNames } from "../../utils/index";
const navigation = [
  { name: "Payments", icon: HomeIcon, href: "/dashboard" },
  { name: "Transaction", icon: BookOpenIcon, href: "/transaction" },
  { name: "Settings", icon: Cog6ToothIcon, href: "/settings" },
];

export const Sidebar = () => {
  const router = useRouter();

  return (
    <>
      <div className=" h-screen flex-grow flex-col hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5 pb-4">
        <div className="flex flex-shrink-0 justify-start h-max items-center space-x-2  px-4">
          <Image
            src={"https://candypay.fun/logo.png"}
            width={30}
            className="rounded-full"
            height={30}
            alt={"candypay"}
          />
          <h1 className="text-xl font-bold">CandyPay</h1>
        </div>

        <div className="mt-10 flex flex-grow flex-col">
          <nav className="flex-1  space-y-1 bg-white" aria-label="Sidebar">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  router.push(item.href);
                }}
                className={classNames(
                  item.href === router.route
                    ? "bg-indigo-50 border-violet-500 text-violet-500"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group w-full flex items-center px-3 py-2 text-sm font-medium border-l-4"
                )}
              >
                <item.icon
                  className={classNames(
                    item.href === router.route
                      ? "text-violet-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "mr-3 flex-shrink-0 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};
