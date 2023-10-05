"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Tables } from "@/database-helpers.types";
import { ScoreField } from "./score-field";

export type ScoreWithName = Partial<Tables<"Scores">> & {
  name: string;
  person_id: number;
  team_id: number;
};

export interface CardProps {
  pub: Tables<"Pubs">;
  scores: Array<ScoreWithName>;
}

export const Card = (props: CardProps) => {
  const [pub, setPub] = useState(props.pub);

  useEffect(() => {
    const channel = supabase
      .channel(`realtime_pubs_${props.pub.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Pubs",
          filter: `id=eq.${props.pub.id}`,
        },
        (payload) => {
          setPub({ ...pub, ...(payload.new as Tables<"Pubs">) });
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [pub, setPub, props.pub.id]);

  return (
    <div className="border-y border-y-black  px-[0.375rem] py-4">
      {pub.hidden && (
        <div className="py-4 ">
          <h2 className="text-4xl text-center italic">Hidden</h2>
        </div>
      )}
      {!pub.hidden && (
        <div className="flex justify-between">
          <div className="space-y-2">
            <h2 className="m-0 text-2xl italic">{pub.name}</h2>
            <hr className="w-10 bg-black h-[2px]" />
            <p className="italic">{pub.drink}</p>
          </div>
          <div className="flex gap-4">
            {props.scores.map((score) => (
              <ScoreField
                pub_id={props.pub.id}
                key={score.name}
                score={score}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
