import axios from "axios";
import { NextPage } from "next";
import React, { useState } from "react";
import { supabase } from "../../config/supabase";
import MainLayout from "../../layouts";

const Settings: NextPage = () => {
  const [keys, setKeys] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUserName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const genrate = async () => {
    setLoading(true);
    const { data: session } = await supabase.auth.getSession();
    const { data: userInfo } = await supabase.auth.getUser();
    const user = await axios.post("/api/user", {
      email: userInfo.user?.email,
      token: session.session?.access_token,
    });
    const getapikey = await axios.post("/api/api-key", {
      email: user.data.metadata.email,
      wallet: user.data.metadata.wallet_address,
      username: username,
      avatar: avatar,
    });
    setKeys(getapikey.data);
    setLoading(false);
  };
  const PostImg = async (blob: any) => {
    const data = new FormData();
    data.append("image", blob);
    const dat = await fetch(
      "https://api.imgbb.com/1/upload?key=8f2e19a86e65bf101ebd3019b6c0adab",
      {
        method: "POST",
        body: data,
      }
    )
      .then((res) => res.json())
      .then((r) => {
        setAvatar(r.data.url);
      });
  };
  return (
    <>
      <MainLayout>
        <div className="flex justify-end flex-col items-end gap-4 mt-10 mr-32">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="mt-1 w-80">
              <input
                type="text"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="abcd...."
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Avatar
            </label>
            <div className="mt-1 w-80">
              <input
                type="file"
                onChange={(e) => {
                  PostImg(e.target.files![0]);
                }}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="abcd...."
              />
            </div>
          </div>
          <button
            onClick={genrate}
            className="bg-violet-500 text-white rounded-lg h-12 w-[13rem]"
          >
            {!loading ? "Genrate" : "loading..."}
          </button>
        </div>
        {keys && (
          <div className="mt-10 ml-14">
            <div className="flex justify-start gap-10 items-center mb-10">
              <h1 className="text-2xl font-medium  ">
                The Keys will be shown once do to security reasons
              </h1>
              <button
                onClick={() => {
                  window.navigator.clipboard.writeText(
                    JSON.stringify({
                      private_key: keys?.private_api_key,
                      public_key: keys?.public_api_key,
                    })
                  );
                }}
                className="h-10 w-20 bg-violet-500 font-bold text-white rounded"
              >
                copy
              </button>
            </div>

            <h1 className="font-lg text-lg mb-2">
              Private Keys: {keys?.private_api_key}
            </h1>
            <h1 className="font-lg text-lg">
              Public Keys: {keys?.public_api_key}
            </h1>
          </div>
        )}
      </MainLayout>
    </>
  );
};

export default Settings;
