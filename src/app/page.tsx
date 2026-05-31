import HomeClient from "@/components/HomeClient";
import { loadAllData } from "@/lib/dataLoader";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { courses, mappings, departmentRows } = await loadAllData();

  return (
    <HomeClient
      courses={courses}
      mappings={mappings}
      departmentRows={departmentRows}
    />
  );
}
