"use server";

import capitalizeFirstLetters from "@/utils/capitalizeFirstLetters";
import { saveMeal } from "./api";
import { redirect } from "next/navigation";

export async function shareMeal(formData) {
  const meal = {
    title: capitalizeFirstLetters(formData.get("title")),
    description: formData.get("description"),
    location: formData.get("location"),
    scheduled_at: formData.get("scheduled_at"),
    max_reservations: parseInt(formData.get("max_reservations")),
    price: parseInt(formData.get("price")),
    image_url: formData.get("image"),
  };
  await saveMeal(meal);
  redirect("/meals");
}
