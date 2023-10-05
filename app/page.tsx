import { Card } from "@/components/card";
import { Score } from "@/components/score";
import { supabase } from "@/lib/supabase";
import { cache } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "edge";

const fetchPubs = cache(async () => {
  return await supabase
    .from("Pubs")
    .select(`*, Scores(*)`)
    .eq("Scores.team_id", 2);
});

const fetchPeople = cache(async () => {
  return await supabase.from("Persons").select().eq("team_id", 2);
});

export default async function Home() {
  const [{ data: pubs }, { data: personsData }] = await Promise.all([
    fetchPubs(),
    fetchPeople(),
  ]);

  if (!pubs || !personsData) {
    return <p>error</p>;
  }

  const mappedData = pubs.map((pub) => {
    const mappedScores = personsData?.map((person) => {
      const scores = pub.Scores.find((score) => score.person_id === person.id);
      return {
        ...scores,
        name: person.name,
        person_id: person.id,
        team_id: person.team_id,
      };
    });

    return {
      pub: {
        id: pub.id,
        name: pub.name,
        drink: pub.drink,
        hidden: pub.hidden,
      },
      scores: mappedScores,
    };
  });

  const allScores = mappedData
    .map((value) => value.scores)
    .flatMap((value) => value);

  return (
    <main>
      <Score allScores={allScores} />
      <div className="space-y-8 ">
        {mappedData.map((value) => (
          <Card pub={value.pub} scores={value.scores} key={value.pub.id} />
        ))}
      </div>
    </main>
  );
}
