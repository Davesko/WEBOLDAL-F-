export const contactEmail = "nagyhaza.david@gmail.com";
export type Photograph = {
  id: number;
  kind?: "image" | "video";
  src: string;
  thumb: string;
  title: string;
  description: string;
  shoot: string;
  category: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
  frameRatio?: "16 / 9" | "4 / 3" | "1 / 1" | "4 / 5" | "9 / 16";
};
// Titles are editorial labels, not claims about a client or commission.
// Only the visibly matching snow and poker photographs share a shoot group.
const photo = (
  id: number,
  title: string,
  shoot: string,
  category: string,
  description: string,
  alt: string,
  width: number,
  height: number,
): Photograph => ({
  id,
  title,
  shoot,
  category,
  description,
  alt,
  width,
  height,
  src: `/media/photo-${String(id).padStart(2, "0")}.webp`,
  thumb: `/media/thumb-${String(id).padStart(2, "0")}.webp`,
});
export const photographs: Photograph[] = [
  photo(
    2,
    "Red, against winter.",
    "red-in-snow",
    "Fashion",
    "Saturated red interrupts an almost colourless winter landscape. The frame is built around the tension between a bold silhouette and the stillness of the snow.",
    "A model in a red puffer jacket and silver sunglasses in a snowy landscape.",
    1781,
    2226,
  ),
  photo(
    5,
    "An alpine close-up.",
    "red-in-snow",
    "Fashion",
    "A closer look at the same visual language: red skis, textured clothing and a sharp graphic contrast with the snow. Gesture brings the composition to life.",
    "A model crouches in the snow beside red skis and a red bag.",
    2358,
    3538,
  ),
  photo(
    6,
    "Lines in the snow.",
    "red-in-snow",
    "Fashion",
    "Two skis turn the landscape into a frame within the frame. A low viewpoint brings the colour, pose and geometry into one composition.",
    "A seated model in red framed by two skis in the snow.",
    2839,
    3551,
  ),
  photo(
    4,
    "After dark.",
    "after-dark",
    "Staged portrait",
    "Firelight breaks through deep shadow. Two figures, contrasting textures and a restrained palette give a staged portrait the atmosphere of a film still.",
    "Two figures in dark clothing, illuminated by fire in an industrial setting.",
    2850,
    2850,
  ),
  photo(
    3,
    "The shape of sound.",
    "shape-of-sound",
    "Music portrait",
    "Movement becomes part of the portrait. The blurred gesture of a cellist carries the energy of the performance beyond a single, frozen moment.",
    "A monochrome, motion-blurred portrait of a tattooed cellist.",
    2069,
    3104,
  ),
  photo(
    1,
    "Under the light.",
    "under-the-light",
    "Conceptual portrait",
    "A single overhead light isolates a figure and a table covered in sheet music. The darkness is as much a part of the composition as the illuminated scene.",
    "A hooded figure at a table of sheet music beneath a single overhead light.",
    2160,
    2160,
  ),
  photo(
    7,
    "Outside the ordinary.",
    "leopard-study",
    "Fashion portrait",
    "Leopard print, worn metal and a direct overhead viewpoint bring texture to the foreground. The portrait sits between composed fashion imagery and a found moment.",
    "A model in leopard print lies beside a rusted metal structure.",
    3800,
    2532,
  ),
  photo(
    8,
    "The look across the table.",
    "blue-table",
    "Fashion story",
    "An overhead portrait set among cards and poker chips. The blue table becomes a graphic backdrop, drawing attention to the gaze and the details of the styling.",
    "An overhead portrait of a model on a blue poker table surrounded by cards and chips.",
    2532,
    3800,
  ),
  photo(
    9,
    "Steel and open sky.",
    "steel-and-sky",
    "Fashion portrait",
    "A low angle turns steel scaffolding into a geometric setting. Against the open sky, the figure becomes both the focal point and part of the structure.",
    "A model posed inside a steel structure against a blue sky, photographed from below.",
    2532,
    3800,
  ),
  photo(
    10,
    "A scene at the table.",
    "blue-table",
    "Fashion story",
    "The wider frame reveals the scene around the portrait: hands, cards, chips and deliberately provocative staging. A fashion image with the tension of a cinematic tableau.",
    "A staged fashion scene at a blue poker table with a model, playing cards, chips and a handgun.",
    2532,
    3800,
  ),
];
export const getPhotograph = (id: string | number) => photographs.find((p) => p.id === Number(id));
// Flex rows tessellate exactly; ratios differ, but there are no gaps.
// span / row gives a width fraction. Mobile reflows the SAME ten DOM tiles.
export const collage = [
  { id: 7, ratio: "16 / 9", span: 16, row: 49, mspan: 16, mrow: 28, x: -1.1, y: -0.65 },
  { id: 2, ratio: "4 / 3", span: 12, row: 49, mspan: 12, mrow: 28, x: -0.5, y: -1.3 },
  { id: 3, ratio: "1 / 1", span: 9, row: 49, mspan: 9, mrow: 21, x: 0.3, y: -1.2 },
  { id: 9, ratio: "4 / 3", span: 12, row: 49, mspan: 12, mrow: 21, x: 1.2, y: -0.8 },
  { id: 1, ratio: "1 / 1", span: 9, row: 37, mspan: 9, mrow: 25, x: -1.35, y: 0.15 },
  { id: 4, ratio: "16 / 9", span: 16, row: 37, mspan: 16, mrow: 25, x: 0.25, y: -0.8 },
  { id: 8, ratio: "4 / 3", span: 12, row: 37, mspan: 12, mrow: 21, x: 1.2, y: 0.65 },
  { id: 5, ratio: "1 / 1", span: 9, row: 37, mspan: 9, mrow: 21, x: -0.5, y: 1.2 },
  { id: 6, ratio: "16 / 9", span: 16, row: 37, mspan: 16, mrow: 28, x: 0.3, y: 1.3 },
  { id: 10, ratio: "4 / 3", span: 12, row: 37, mspan: 12, mrow: 28, x: -1.1, y: 1 },
];
