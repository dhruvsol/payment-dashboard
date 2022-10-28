import axios from "axios";
import { NextPage } from "next";
import React, { useState } from "react";
import { supabase } from "../../config/supabase";
import MainLayout from "../../layouts";

const Settings: NextPage = () => {
  const [keys, setKeys] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
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
      username: user.data.metadata.username,
      avatar: user.data.metadata.avatar,
    });
    setKeys(getapikey.data);
    setLoading(false);
    console.log(getapikey.data);
  };
  return (
    <>
      <MainLayout>
        <div className="flex justify-end mt-10 mr-32">
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
