import { notFound, redirect } from "next/navigation";
import { CountryDetail } from "@/components/country-detail";
import { AuthGuard } from "@/components/auth-guard";
import { retryFetch } from "@/lib/utils";
import { useEffect } from "react";

interface CountryPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getCountry(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_REST_COUNTRIES_API_URL;
    const response = await retryFetch(`${baseUrl}/alpha/${id}`, {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching country:", error);
    return null;
  }
}

async function getBorderCountries(borders: string[]) {
  const baseUrl = process.env.NEXT_PUBLIC_REST_COUNTRIES_API_URL;
  if (!borders || borders.length === 0) return [];

  try {
    const response = await retryFetch(
      `${baseUrl}/alpha?codes=${borders.join(",")}&fields=name,cca2`,
      {
        next: { revalidate: 86400 },
      }
    );

    if (!response.ok) {
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching border countries:", error);
    return [];
  }
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { id } = await params;
  const country = await getCountry(id);

  if (!country) {
    notFound();
  }

  const borderCountries = await getBorderCountries(country.borders || []);

  return (
    <AuthGuard>
      <CountryDetail country={country} borderCountries={borderCountries} />
    </AuthGuard>
  );
}

export async function generateStaticParams() {
  const baseUrl = process.env.NEXT_PUBLIC_REST_COUNTRIES_API_URL;

  try {
    const response = await retryFetch(`${baseUrl}/all?fields=cca2`);

    if (!response.ok) {
      console.error("Failed to fetch countries for static params");
      return [];
    }

    const countries = await response.json();

    return countries.map((country: any) => ({
      id: country.cca2.toLowerCase(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
