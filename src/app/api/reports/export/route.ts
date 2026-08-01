import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get("year");
  const month = searchParams.get("month"); // 1-12
  const category = searchParams.get("category");

  const whereClause: any = {};

  if (year && month) {
    const y = parseInt(year);
    const m = parseInt(month) - 1; // 0-indexed in JS Date
    const startDate = new Date(Date.UTC(y, m, 1));
    const endDate = new Date(Date.UTC(y, m + 1, 0, 23, 59, 59, 999));
    whereClause.createdAt = {
      gte: startDate,
      lte: endDate,
    };
  }

  if (category && category !== "ALL") {
    whereClause.animal = {
      contains: category,
    };
  }

  const cases = await prisma.case.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });

  // Build CSV content
  const headers = [
    "Log ID",
    "Date & Time",
    "Category",
    "Species",
    "Location",
    "Additional Location Info",
    "Case Info",
    "Phone Holder",
    "Driver",
    "Caller Name",
    "Caller Number",
    "Priority",
    "Action Taken",
    "Action Conclusion",
    "Status",
    "Remarks",
  ];

  const escapeCSV = (val: any) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const csvRows = [
    headers.join(","),
    ...cases.map((c) =>
      [
        escapeCSV(c.id),
        escapeCSV(new Date(c.createdAt).toISOString()),
        escapeCSV(c.animal),
        escapeCSV(c.species || ""),
        escapeCSV(c.location),
        escapeCSV(c.animalAdditionalInfo || ""),
        escapeCSV(c.caseInfo),
        escapeCSV(c.phoneHolder || ""),
        escapeCSV(c.driver || ""),
        escapeCSV(c.callerName),
        escapeCSV(c.callerNumber),
        escapeCSV(c.priority),
        escapeCSV(c.actionTaken),
        escapeCSV(c.actionConclusion || ""),
        escapeCSV(c.status),
        escapeCSV(c.additionalInfo || ""),
      ].join(",")
    ),
  ];

  const csvContent = csvRows.join("\n");
  const filename = `ACRES_Rescue_Report_${year || "All"}_${month || "All"}.csv`;

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
