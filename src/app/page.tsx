import { redirect } from "next/navigation";

export default function Home() {
  // Langsung arahkan traffic root ke dashboard
  redirect("/dashboard");
}