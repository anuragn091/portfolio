import { redirect } from "next/navigation";

// All posts now live on Medium/LinkedIn — redirect blog root
export default function BlogSlugPage() {
  redirect("/blog");
}
