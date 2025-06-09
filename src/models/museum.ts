export interface ResourceBaseInfos {
  id: string;
  type: string;
}

export interface MuseumCollectionSearchResponse extends ResourceBaseInfos {
  "@context": string;
  partOf: {
    id: string;
    type: string;
    totalItems: 827423;
    first: ResourceBaseInfos;
    last: ResourceBaseInfos;
  };
  next: ResourceBaseInfos;
  orderedItems: ResourceBaseInfos[];
}

export interface ArtItemResponse extends ResourceBaseInfos {
  "@context": string;
  produced_by: never;
  subject_of: never;
  identified_by: Array<{
    type: string;
    content: string;
    classified_as?: never;
    language?: never;
  }>;
  classified_as: never;
  dimension: never;
  made_of: never;
  shows: Array<{
    id: string;
    type: string;
    subject_to: never;
    represents_instance_of_type: never;
    digitally_shown_by: ResourceBaseInfos[];
  }>;
  referred_to_by: never;
  equivalent: never;
  member_of: never;
}

export interface ArtItemShow extends ResourceBaseInfos {
  subject_to: never;
  represents: never;
  represents_instance_of_type: never;
  digitally_shown_by: ResourceBaseInfos[];
}

export interface ArtworkDetails {
  title: string;
  imageUrl: string;
}
