"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const DataComponent = ({ name, score }: { name: string; score: number }) => {
  return (
    <>
      <div className="p-4 border border-black">
        <p>{name}</p>
      </div>
      <p className="p-4 border-black border text-center">{score}</p>
    </>
  );
};

export function LeaderboardTable(props: {
  data: {
    id: number;
    team_name: string;
    totalScore: number;
  }[];
}) {
  const [totalScores, setTotalScore] = useState(props.data);

  useEffect(() => {
    const channel = supabase
      .channel(`realtime_total_score`)
      .on(
        `postgres_changes`,
        {
          event: "*",
          schema: "public",
          table: "Scores",
        },
        async () => {
          const { data } = await supabase.from("Teams").select(`*, Scores(*)`);

          if (!data) return;

          const mappedData = data
            .map((team) => {
              let totalScore = 0;
              team.Scores.forEach((score) => {
                totalScore += score.score;
              });
              return { id: team.id, team_name: team.team_name, totalScore };
            })
            .sort((a, b) => b.totalScore - a.totalScore);

          setTotalScore(mappedData);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="mt-11 mb-12">
      <h1 className="text-center font-sans text-3xl">Leaderboard</h1>
      <div className="mt-8  justify-center grid grid-cols-[minmax(0,12rem)_auto]">
        <p className="p-4 border border-black bg-black text-white">Team</p>
        <p className="p-4 border border-black bg-black text-white">Score</p>
        {totalScores.map((team) => (
          <DataComponent
            name={team.team_name ?? ""}
            score={team.totalScore}
            key={team.id}
          />
        ))}
      </div>
    </div>
  );
}
