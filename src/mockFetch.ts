import { RawResponseData } from "./define";
import { mockData } from "./data";

export default async function mockFetch(id: number): Promise<RawResponseData[]> {
  return mockData[id];
}
