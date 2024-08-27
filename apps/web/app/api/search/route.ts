import { utils } from "@/lib/source";
import { createSearchAPI } from "fumadocs-core/search/server";

export const { GET } = createSearchAPI("advanced", {
  indexes: utils.getPages().map((page) => ({
    title: page.data.title,
    structuredData: page.data.exports.structuredData,
    id: page.url,
    url: page.url,
  })),
});
