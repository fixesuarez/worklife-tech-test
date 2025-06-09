import type {
  ArtItemResponse,
  ArtworkDetails,
  MuseumCollectionSearchResponse,
  ResourceBaseInfos,
} from "@/models/museum";
import { httpGet } from "../utils/http";

export const getMuseumCollection = async (
  searchParams: Record<string, string>,
) => {
  let endpoint =
    "https://data.rijksmuseum.nl/search/collection?imageAvailable=true";
  if (searchParams) {
    const queryString = new URLSearchParams(searchParams).toString();
    endpoint += `&${queryString}`;
  }
  const response = (await httpGet(endpoint)) as MuseumCollectionSearchResponse;
  return response;
};

export const getArtworkDetails = async (
  artworks: ResourceBaseInfos[],
): Promise<ArtworkDetails[]> => {
  const artworkDetails = await Promise.all(
    artworks.map(async (artwork) => {
      try {
        const { shows, identified_by } = (await httpGet(
          artwork.id,
        )) as ArtItemResponse;

        const title = fetchArtworkTitle(identified_by);
        const imageUrl = await fetchArtworkImageUrl(shows);

        return { imageUrl, title };
      } catch (error) {
        console.error(
          `Error fetching details for artwork ${artwork.id}:`,
          error,
        );
        return;
      }
    }),
  );
  return artworkDetails.filter((detail) => detail !== undefined);
};

const fetchArtworkTitle = (
  identified_by: { type: string; content: string }[],
): string => {
  return (
    identified_by.find((item) => item.type === "Name")?.content ||
    "Title not available"
  );
};

const fetchArtworkImageUrl = async (
  shows: { digitally_shown_by?: { id?: string }[] }[],
): Promise<string> => {
  if (!shows[0]?.digitally_shown_by?.[0]?.id) return "";
  const { access_point } = (await httpGet(
    shows[0].digitally_shown_by[0].id,
  )) as { access_point: ResourceBaseInfos[] };
  return access_point[0]?.id || "";
};
