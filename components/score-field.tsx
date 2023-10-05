"use client";
import { useEffect, useState } from "react";
import { Tables } from "@/database-helpers.types";
import { supabase } from "@/lib/supabase";
import { ScoreWithName } from "./card";

export const ScoreField = (props: { score: ScoreWithName; pub_id: number }) => {
  const [player, setPlayer] = useState({
    name: props.score.name,
    score: props.score.score,
    score_id: props.score.id,
  });

  useEffect(() => {
    const channel = supabase
      .channel(`realtime_scores_${props.pub_id}_${props.score.person_id}`)
      .on(
        `postgres_changes`,
        {
          event: "*",
          schema: "public",
          table: "Scores",
          filter: `person_id=eq.${props.score.person_id}`,
        },
        (payload) => {
          const newScore = payload.new as Tables<"Scores">;
          if (
            payload.eventType === "DELETE" &&
            payload.old.id === player.score_id
          ) {
            setPlayer((player) => ({
              name: player.name,
              score: undefined,
              score_id: undefined,
            }));
            return;
          }

          if (newScore.pub_id === props.pub_id) {
            setPlayer((player) => ({
              ...player,
              score: newScore.score,
              score_id: newScore.id,
            }));
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [
    player.score_id,
    props.pub_id,
    props.score.id,
    props.score.name,
    props.score.person_id,
    setPlayer,
  ]);

  return (
    <div className="grid gap-[0.75rem] grid-cols-1">
      <p className="m-0 italic">{player.name}</p>
      <div className="border border-black py-2 px-4 text-center min-w-[3.25rem] min-h-[2.625rem]">
        <p className="m-0">{player.score}</p>
      </div>
    </div>
  );
};
