import { LeaderboardTable } from "@/components/leaderboard-table";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 5;
export const runtime = "edge";

export default async function LeaderboardPage() {
  const { data } = await supabase.from("Teams").select(`*, Scores(*)`);
  if (!data) return <p>Error</p>;

  const mappedData = data
    .map((team) => {
      let totalScore = 0;
      team.Scores.forEach((score) => {
        totalScore += score.score;
      });
      return { id: team.id, team_name: team.team_name, totalScore };
    })
    .sort((a, b) => b.totalScore - a.totalScore);

  return <LeaderboardTable data={mappedData} />;
}
