"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveCase(formData: FormData) {
  const phoneHolder = (formData.get("phoneHolder") as string) || "";
  const driver = (formData.get("driver") as string) || "";
  const legacyCombo = [phoneHolder, driver].filter(Boolean).join(" / ") || (formData.get("phoneHolderDriver") as string) || "";

  const data = {
    callerName: (formData.get("callerName") as string) || "",
    callerNumber: (formData.get("callerNumber") as string) || "",
    location: (formData.get("location") as string) || "",
    animal: (formData.get("animal") as string) || "Mammal",
    caseInfo: (formData.get("caseInfo") as string) || "",
    additionalInfo: (formData.get("additionalInfo") as string) || "",
    animalAdditionalInfo: (formData.get("animalAdditionalInfo") as string) || "",
    priority: (formData.get("priority") as string) || "Priority",
    actionTaken: (formData.get("actionTaken") as string) || "Pending",
    species: (formData.get("species") as string) || "",
    actionConclusion: (formData.get("actionConclusion") as string) || "",
    phoneHolder: phoneHolder,
    driver: driver,
    phoneHolderDriver: legacyCombo,
    status: (formData.get("status") as string) || "Status",
    username: (formData.get("username") as string) || "Rescuer",
  };

  const id = formData.get("id") as string;

  if (id) {
    await prisma.case.update({
      where: { id },
      data,
    });
  } else {
    await prisma.case.create({
      data,
    });
  }

  revalidatePath("/");
  redirect("/");
}
