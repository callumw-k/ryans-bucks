import { Card } from "@/components/card";
import { Score } from "@/components/score";
import { supabase } from "@/lib/supabase";
import { cache } from "react";
import { cookies } from "next/headers";
import { Tables } from "@/database-helpers.types";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "edge";

const fetchPubs = cache(async (team_id: number) => {
  return await supabase
    .from("Drinks")
    .select(`*, Scores(*), Pubs(*)`)
    .eq("Scores.team_id", team_id);
});

const fetchPeople = cache(async (team_id: number) => {
  return await supabase.from("Persons").select().eq("team_id", team_id);
});

export default async function Home() {
  //handle auth
  const cookieStore = cookies();
  const user = cookieStore.get("user")?.value;
  const parsedUser = user ? (JSON.parse(user) as Tables<"Persons">) : null;

  if (!parsedUser) {
    redirect("/enter");
  }

  const [{ data: pubs }, { data: personsData }] = await Promise.all([
    fetchPubs(parsedUser.team_id),
    fetchPeople(parsedUser.team_id),
  ]);

  if (!pubs || !personsData) {
    return <p>error</p>;
  }

  const newMappedData = pubs.map((value) => {
    const mappedScores = personsData?.map((person) => {
      const scores = value.Scores.find(
        (score) => score.person_id === person.id,
      );

      return {
        ...scores,
        name: person.name,
        person_id: person.id,
        team_id: person.team_id,
      };
    });
    return {
      drink: {
        id: value.id,
        name: value.name,
        par: value.par,
      },
      pub: value.Pubs!,
      scores: mappedScores,
    };
  });

  const allScores = pubs.map((value) => value.Scores).flatMap((value) => value);

  return (
    <main>
      <Score team_id={parsedUser.team_id} allScores={allScores} />
      <div className="space-y-8 overflow-x-auto mb-11">
        {newMappedData.map((value) => (
          <Card
            pub={value.pub}
            drink={value.drink}
            scores={value.scores}
            key={value.drink.id}
          />
        ))}
      </div>
    </main>
  );
}
