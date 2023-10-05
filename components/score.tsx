"use client";
import { Tables } from "@/database-helpers.types";
import { rampart_one } from "@/lib/fonts";
import { supabase } from "@/lib/supabase";
import { useEffect, useMemo, useState } from "react";
import { CardProps, ScoreWithName } from "./card";
import { publicDecrypt } from "crypto";

const computeScore = (allScores: ScoreWithName[]): number => {
  return allScores.reduce((total, score) => total + (score.score ?? 0), 0);
};

export function Score(props: { allScores: ScoreWithName[] }) {
  const [score, setScore] = useState(computeScore(props.allScores));
  const cachedScores = useMemo(() => props.allScores, [props.allScores]);

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
        (payload) => {
          const newScore = payload.new as Tables<"Scores">;
          const newScoreData = cachedScores.map((value) => {
            if (value.id === newScore.id) {
              return { ...value, score: newScore.score };
            }
            return value;
          });
          console.debug(newScoreData);
          setScore(computeScore(newScoreData));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [cachedScores]);
  return (
    <div className="my-11 px-4 text-center text-3xl">
      <h1 className={rampart_one.className}>Score: {score}</h1>
    </div>
  );
}
