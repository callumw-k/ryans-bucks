"use client";
import { useEffect, useState } from "react";
import { Tables } from "@/database-helpers.types";
import { supabase } from "@/lib/supabase";
import { ScoreWithName } from "./card";

export const Field = (props: {
  title: string;
  value?: number;
  titleClass?: string;
  inverse?: boolean;
}) => {
  return (
    <div className="grid gap-[0.75rem] grid-cols-1">
      <p className={`m-0 italic text-center ${props.titleClass ?? ""}`}>
        {props.title}
      </p>
      <div
        className={`border ${props.inverse ? "border-none" : "border-black"} ${
          props.inverse ? "bg-black" : "bg-none"
        } py-2 px-4 text-center min-w-[3.25rem] min-h-[2.625rem]`}
      >
        <p
          className={`m-0 ${props.inverse ? "text-white" : "text-black"} ${
            props.inverse && "font-[700]"
          }`}
        >
          {props.value}
        </p>
      </div>
    </div>
  );
};

export const ScoreField = (props: {
  score: ScoreWithName;
  pub_id: number;
  team_id: number;
  drink_id: number;
}) => {
  const [player, setPlayer] = useState({
    name: props.score.name,
    score: props.score.score ?? "",
    score_id: props.score.id,
  });

  const updateScore = async (score: number) => {
    await supabase.from("Scores").upsert({
      score,
      team_id: props.team_id,
      pub_id: props.pub_id,
      person_id: props.score.person_id,
      drink_id: props.drink_id,
      ...(player.score_id && { id: player.score_id }),
    });
  };

  const deleteScore = async () => {
    const score_id = player.score_id;
    if (score_id) {
      await supabase.from("Scores").delete().eq("id", score_id);
    }
  };

  useEffect(() => {
    const channel = supabase
      .channel(
        `realtime_scores_${props.pub_id}_${props.score.person_id}_${
          player.score_id ?? ""
        }_${props.drink_id}`,
      )
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
              score: "",
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
    props.drink_id,
    props.pub_id,
    props.score.id,
    props.score.name,
    props.score.person_id,
    setPlayer,
  ]);

  return (
    <div className="grid gap-[0.75rem] grid-cols-1">
      <p className={`m-0 italic text-center`}>{player.name}</p>
      <input
        value={player.score}
        onChange={(e) => {
          const newScore = e.target.value ? parseInt(e.target.value) : "";
          setPlayer((player) => ({
            ...player,
            score: newScore,
          }));
        }}
        onBlur={(e) => {
          const newScore = e.target.value;
          if (newScore) {
            updateScore(parseInt(newScore));
            return;
          }
          deleteScore();
        }}
        className={`border border-black py-2 px-4 text-center min-w-[3.25rem] max-w-[3.25rem] min-h-[2.625rem]`}
      ></input>
    </div>
  );
};
