import CaseForm from "@/components/CaseForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditCasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const log = await prisma.case.findUnique({
    where: { id },
  });

  if (!log) {
    notFound();
  }

  return <CaseForm initialData={log} />;
}
