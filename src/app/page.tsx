import LogDashboard from "@/components/LogDashboard";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch cases from database, ordered by creation date descending
  const logs = await prisma.case.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return <LogDashboard logs={logs} />;
}
