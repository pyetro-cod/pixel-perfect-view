// Mapeia id do produto -> URL da foto em src/assets/products (ex.: "01" -> 01.jpeg)
const modules = import.meta.glob<string>("../assets/products/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
});

const imageById: Record<string, string> = {};
for (const [path, url] of Object.entries(modules)) {
  const filename = path.split("/").pop() ?? "";
  const id = filename.replace(/\.[^.]+$/, "");
  imageById[id] = url;
}

export const getProductImage = (id: string): string | undefined => imageById[id];