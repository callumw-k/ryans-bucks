"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  async function signIn() {
    const { data } = await supabase
      .from("Persons")
      .select()
      .eq("username", username);
    if (data && data.length !== 0) {
      const [user] = data;
      document.cookie = `user=${JSON.stringify(user)}; max-age=2592000; path=/`;
      router.push("/");
      return;
    }
    setError("User not found");
  }

  return (
    <>
      <div className="text-center space-y-12 max-w-sm mx-auto mt-11">
        <p className="text-xl">
          As the flood’s close in, 20ish weary animals make their way to...
        </p>
        <p className="text-4xl mt-6">RYAN’S ARK</p>
        <p className="text-xl">
          What a journey it’s been. The animals decide to quench their thirst
          along the way and play a little game.
        </p>
        <p className="text-xl">They called it...</p>
        <p className="text-4xl">PUB GOLF</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        <div className="flex items-center justify-center mt-16 max-w-xl mx-auto">
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-none text-xl p-4 w-full max-w-[10rem] border-2 border-black  focus:outline-none text-center mr-2"
            title="Username"
            placeholder="USERNAME"
          />
          <button className="border-2 border-black py-4 text-xl px-6 ">
            ENTER
          </button>
        </div>
        <div className="text-center">
          {error && <p className="mt-4">{error}</p>}
          <p className="mt-4">
            Login details are your first name all lowercase.
          </p>
        </div>
      </form>
    </>
  );
}
