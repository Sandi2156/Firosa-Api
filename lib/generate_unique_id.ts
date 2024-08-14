import { generateSlug } from "random-word-slugs";

function generateUniqueId() {
  return generateSlug();
}

export { generateUniqueId };
