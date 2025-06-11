import { CountryGrid } from "@/components/country-grid";
import { SearchAndFilter } from "@/components/search-and-filter";
import { Suspense } from "react";
import { CountryGridSkeleton } from "@/components/country-grid-skeleton";
import { retryFetch } from "@/lib/utils";

async function getCountries() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_REST_COUNTRIES_API_URL;
    const response = await retryFetch(
      `${baseUrl}/all?fields=name,flags,population,region,capital,cca2`,
      {
        next: { revalidate: 86400 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}

export default async function HomePage() {
  const countries = await getCountries();

  return (
    <div className="space-y-8">
      <SearchAndFilter />

      <Suspense fallback={<CountryGridSkeleton />}>
        <CountryGrid countries={countries} />
      </Suspense>
    </div>
  );
}
