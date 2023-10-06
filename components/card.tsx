"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Tables } from "@/database-helpers.types";
import { Field, ScoreField } from "./score-field";

export type ScoreWithName = Partial<Tables<"Scores">> & {
  name: string;
  person_id: number;
  team_id: number;
};

export interface CardProps {
  pub: Tables<"Pubs">;
  drink: { id: number; name: string; par: number };
  scores: Array<ScoreWithName>;
}

export const Card = (props: CardProps) => {
  const [pub, setPub] = useState(props.pub);

  useEffect(() => {
    const channel = supabase
      .channel(`realtime_pubs_${props.pub.id}_${props.drink.id}`)
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
  }, [pub, setPub, props.pub.id, props.drink.id]);

  return (
    <div className="border-y border-y-black  px-[0.375rem] py-4 ">
      {pub.hidden && (
        <div className="py-4 ">
          <h2 className="text-4xl text-center italic">Hidden</h2>
        </div>
      )}
      {!pub.hidden && (
        <div className="flex justify-between items-center">
          <div className="space-y-2 mr-2">
            <h2 className="m-0 text-2xl italic">{pub.name}</h2>
            <hr className="w-10 bg-black h-[2px]" />
            <p>{props.drink.name}</p>
          </div>
          <div className="flex gap-4 mt-3 flex-shrink-0">
            <Field
              inverse
              titleClass="font-[700]"
              title="Par"
              value={props.drink.par}
            />
            {props.scores.map((score) => (
              <ScoreField
                pub_id={props.pub.id}
                key={score.name}
                score={score}
                team_id={score.team_id}
                drink_id={props.drink.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
