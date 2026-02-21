import { getSearchProperties } from "@/lib/properties";
import SearchResultsView from "./SearchResultsView";

function getParam(
  params: Record<string, string | string[] | undefined>,
  key: string
): string | undefined {
  const v = params[key];
  return typeof v === "string" ? v : Array.isArray(v) ? v[0] : undefined;
}

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const location = getParam(params, "location");
  const guestsRaw = getParam(params, "guests");
  const guests = guestsRaw ? Math.max(0, parseInt(guestsRaw, 10)) : undefined;
  const results = await getSearchProperties({ location, guests });

  return <SearchResultsView results={results} searchParams={params} />;
}
