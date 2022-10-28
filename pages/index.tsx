/* eslint-disable @next/next/no-img-element */
import { useWallet } from "@solana/wallet-adapter-react";
import { useUser } from "use-supabase-hooks";
import {
  useWalletModal,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { supabase } from "../config/supabase";
import * as bs58 from "bs58";
const Home: NextPage = () => {
  const [newUserState, setNewUserState] = useState<
    "SignUp" | "wallet-connet" | "api-key"
  >("SignUp");
  const [businessname, setBusinessname] = useState<string>("");

  const router = useRouter();
  const { connected, publicKey, signMessage } = useWallet();
  const WalletAddress = async () => {
    const session = await supabase.auth.getSession();
    const { data } = await axios.post("/api/user", {
      token: session.data.session?.access_token,
    });
    if (data.metadata === null) {
      return null;
    } else {
      return data.metadata;
    }
  };
  const PostNewUser = async (sign: any) => {
    const user = await supabase.auth.getUser();
    const { data } = await supabase.auth.getSession();

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/onboard`,
        {
          email: user.data.user?.email,
          username: user.data.user?.user_metadata.name,
          wallet_address: publicKey?.toString(),
          avatar: user.data.user?.user_metadata.picture,
          business_name: businessname,
          signature: sign,
        },
        {
          headers: {
            Authorization: `Bearer ${data.session?.access_token}`,
          },
        }
      )
      .then(() => {
        router.push("/dashboard");
      });
  };

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (e) => {
      if (e === "SIGNED_IN") {
        const res = await WalletAddress();
        if (res !== null) {
          return router.push("/dashboard");
        } else {
          setNewUserState("wallet-connet");
        }
      }
    });
  }, []);
  const signthing = async () => {
    const message = new TextEncoder().encode("CANDYPAY");
    // Sign the bytes using the wallet
    const signature = await signMessage!(message);
    // const n = new TextEncoder().encoding(signature);
    const aa = bs58.encode(signature).toString();
    console.log(aa);

    await PostNewUser(aa);

    // console.log(signature);
  };
  return (
    <>
      <div className="flex min-h-screen  flex-col  justify-center py-12 sm:px-6 lg:px-8">
        {newUserState === "SignUp" && (
          <>
            <div className="flex justify-center text-4xl font-bold">
              <h1>Login</h1>
            </div>
            <div className="mt-8 sm:mx-auto border-2 rounded-lg sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 flex flex-col gap-10 shadow sm:rounded-lg sm:px-10">
                <button
                  onClick={() => {
                    signInWithGoogle().then(() => {
                      console.log("helo");
                    });
                  }}
                  className="bg-orange-400 w-full h-12 rounded-lg"
                >
                  Login with google
                </button>
                <button className="bg-blue-500 w-full h-12 rounded-lg">
                  Login with twitter
                </button>
              </div>
            </div>
          </>
        )}
        {newUserState === "wallet-connet" && (
          <div className="flex justify-center items-center flex-col">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Business Name
              </label>
              <div className="mt-1 w-80">
                <input
                  type="text"
                  onChange={(e) => {
                    setBusinessname(e.target.value);
                  }}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="abcd...."
                />
              </div>
            </div>
            <h1 className="text-2xl my-5font-extrabold">
              Please Connect wallet Which you want to use
            </h1>
            <WalletMultiButton />

            <button
              onClick={() => signthing()}
              className="w-96 h-14 mt-12 text-white rounded-lg bg-violet-600"
            >
              Submit Details
            </button>
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default Home;
