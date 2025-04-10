import { TABNEWS_API_URL } from "../config/configs.ts";
import type {
  AnalyticsChildContentPublished,
  AnalyticsRootContentPublished,
  AnalyticsUserCreated,
  GetContentByUserParams,
  GetContentParams,
  GetContentsParams,
  GetStatusResponse,
  TabNewsContent,
  TabNewsContentChildren,
  TabNewsContentWithBody,
} from "../types/index.ts";

export async function getApiStatus(): Promise<GetStatusResponse> {
  const response = await fetch(`${TABNEWS_API_URL}/status`);
  const data = await response.json();

  return data as GetStatusResponse;
}

export async function getContents({
  page = 1,
  per_page = 30,
  strategy = "relevant",
}: GetContentsParams = {}): Promise<TabNewsContent[]> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    per_page: per_page.toString(),
    strategy: strategy,
  });

  const response = await fetch(`${TABNEWS_API_URL}/contents?${queryParams}`);
  const data = await response.json();

  return data as TabNewsContent[];
}

export async function getContentsByUser({
  username,
  page = 1,
  per_page = 30,
  strategy = "relevant",
}: GetContentByUserParams): Promise<TabNewsContent[]> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    per_page: per_page.toString(),
    strategy: strategy,
  });

  const response = await fetch(
    `${TABNEWS_API_URL}/contents/${username}?${queryParams}`
  );
  const data = await response.json();

  return data as TabNewsContent[];
}

export async function getContent({
  username,
  slug,
}: GetContentParams): Promise<TabNewsContentWithBody> {
  const response = await fetch(
    `${TABNEWS_API_URL}/contents/${username}/${slug}`
  );
  const data = await response.json();

  return data as TabNewsContentWithBody;
}

export async function getContentChildren({
  username,
  slug,
}: GetContentParams): Promise<TabNewsContentChildren[]> {
  const response = await fetch(
    `${TABNEWS_API_URL}/contents/${username}/${slug}/children`
  );
  const data = await response.json();

  return data as TabNewsContentChildren[];
}

export async function getAnalyticsUserCreated(): Promise<
  AnalyticsUserCreated[]
> {
  const response = await fetch(`${TABNEWS_API_URL}/analytics/users-created`);
  const data = await response.json();

  return data as AnalyticsUserCreated[];
}

export async function getAnalyticsRootContentPublished(): Promise<
  AnalyticsRootContentPublished[]
> {
  const response = await fetch(
    `${TABNEWS_API_URL}/analytics/root-content-published`
  );
  const data = await response.json();

  return data as AnalyticsRootContentPublished[];
}

export async function getAnalyticsChildContentPublished(): Promise<
  AnalyticsChildContentPublished[]
> {
  const response = await fetch(
    `${TABNEWS_API_URL}/analytics/child-content-published`
  );
  const data = await response.json();

  return data as AnalyticsChildContentPublished[];
}

export async function getRssFeed(): Promise<string> {
  const response = await fetch(`${TABNEWS_API_URL}/contents/rss`);
  const data = await response.text();

  return data;
}
