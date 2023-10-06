"use client";
import { Tables } from "@/database-helpers.types";
import { supabase } from "@/lib/supabase";
import { cache, useEffect, useMemo, useState } from "react";

const computeScore = (allScores: Tables<"Scores">[]): number => {
  let totalScore = 0;
  allScores.forEach((score) => {
    totalScore += score.score;
  });
  return totalScore;
};

export function Score(props: {
  allScores: Tables<"Scores">[];
  team_id: number;
}) {
  const [score, setScore] = useState(computeScore(props.allScores));

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
          const { data } = await supabase
            .from("Scores")
            .select()
            .eq("team_id", props.team_id);

          if (!data) return;

          setScore(computeScore(data));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [props.team_id]);
  return (
    <div className="my-11 px-4 text-center text-3xl">
      <h1 className="font-sans">Score: {score}</h1>
    </div>
  );
}
