import { Card } from "@/components/card";
import { Score } from "@/components/score";
import { supabase } from "@/lib/supabase";

const fetchPubs = async () => {
  return await supabase
    .from("Pubs")
    .select(`*, Scores(*)`)
    .eq("Scores.team_id", 2);
};

export default async function Home() {
  const { data: pubs } = await fetchPubs();
  const { data: personsData } = await supabase
    .from("Persons")
    .select()
    .eq("team_id", 2);

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
      <div className="space-y-8 max-w-sm mx-auto">
        {mappedData.map((value) => (
          <Card pub={value.pub} scores={value.scores} key={value.pub.id} />
        ))}
      </div>
    </main>
  );
}
