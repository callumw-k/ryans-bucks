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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signIn();
      }}
    >
      <div className="flex flex-col items-center justify-center mt-8 max-w-xl mx-auto">
        <p>Login details are your first name, all lowercase.</p>
        <input
          onChange={(e) => setUsername(e.target.value)}
          className="mt-6 rounded-none p-4 w-full max-w-xs border-y-2 border-y-black  focus:outline-none"
          title="Username"
          placeholder="username"
        />
        <button className="border-y-2 border-y-black py-2 text-xl px-6 mt-8">
          ENTER
        </button>
        {error && <p className="mt-4">{error}</p>}
      </div>
    </form>
  );
}
