"use server";

import capitalizeFirstLetters from "@/utils/capitalizeFirstLetters";
import { saveMeal } from "./api";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: capitalizeFirstLetters(formData.get("title")),
    description: formData.get("description"),
    location: formData.get("location"),
    scheduled_at: formData.get("scheduled_at"),
    max_reservations: parseInt(formData.get("max_reservations")),
    price: parseInt(formData.get("price")),
    image_url: formData.get("image"),
  };

  const errors = [];

  if (isInvalidText(meal.title)) errors.push("Please enter a valid title");
  if (isInvalidText(meal.description))
    errors.push("Please provide a description");
  if (isInvalidText(meal.location))
    errors.push("Please enter a valid location");
  if (isInvalidText(meal.scheduled_at))
    errors.push("Please select a date and time");
  if (isNaN(meal.max_reservations) || meal.max_reservations <= 0)
    errors.push("Please enter a valid number of maximum reservations");
  if (isNaN(meal.price) || meal.price < 0)
    errors.push("Please enter a valid price");
  if (meal.image_url.size === 0) errors.push("Please upload an image");

  if (errors.length > 0) {
    return {
      errors: errors,
    };
  }

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
