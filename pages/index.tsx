/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { supabase } from "../config/supabase";

const Home: NextPage = () => {
  const [authState, setAuthState] = useState<"SIGNIN" | "SIGNUP">("SIGNIN");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (data.session) {
      router.push("/dashboard");
    }
  }
  async function signUpWithEmail() {
    const { data } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (data.user?.identities?.length) {
      toast.success("Verfiy your email and Sign In");
      // please confirm your email, or send again
    } else {
      toast.error("You already Have a account");
      // already signed up, sign in instead?
    }
  }
  return (
    <>
      <div className="flex min-h-screen  flex-col  justify-center py-12 sm:px-6 lg:px-8">
        <div className="flex justify-center text-4xl font-bold">
          <h1>{authState === "SIGNIN" ? "Sign In" : "Sign Up"}</h1>
        </div>
        <div className="mt-8 sm:mx-auto border-2 rounded-lg sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                if (authState === "SIGNIN") {
                  signInWithEmail();
                } else {
                  signUpWithEmail();
                }
              }}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="flex justify-end mt-3">
              <button
                onClick={() => {
                  if (authState === "SIGNIN") {
                    setAuthState("SIGNUP");
                  } else {
                    setAuthState("SIGNIN");
                  }
                }}
                className="text-base font-semibold"
              >
                {authState === "SIGNUP"
                  ? "Already Have a account ?"
                  : "Create One ?"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Home;
