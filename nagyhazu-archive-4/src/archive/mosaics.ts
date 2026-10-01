// Repeated frames are intentional layout examples, explicitly requested by the
// owner. They keep pointing to the original photograph page, never new shoots.
const ids = [7, 1, 8, 2, 5, 6, 3, 4, 9, 10, 7, 2, 9, 6, 1, 8, 4, 5];
const columns = [1, 5, 8, 13, 17, 20];
const spans = [4, 3, 5, 4, 3, 5];
const rowSets = [
  [4, 4, 4],
  [3, 5, 4],
  [5, 4, 3],
  [3, 5, 4],
  [5, 3, 4],
  [4, 5, 3],
];
const mobileRows = [3, 3, 4, 2, 3, 3];
export const openingTiles = ids.map((id, index) => {
  const group = Math.floor(index / 3),
    order = index % 3;
  const row = 1 + rowSets[group].slice(0, order).reduce((a, b) => a + b, 0);
  const mobileOrder = index % 6;
  return {
    key: `opening-${index}`,
    id,
    column: columns[group],
    columns: spans[group],
    row,
    rows: rowSets[group][order],
    mobileColumn: Math.floor(index / 6) + 1,
    mobileRow: 1 + mobileRows.slice(0, mobileOrder).reduce((a, b) => a + b, 0),
    mobileRows: mobileRows[mobileOrder],
  };
});
export type MosaicCollection = {
  key: string;
  title: string;
  subtitle: string;
  hero: number;
  left: number[];
  top: number[];
  bottom: number[];
  right: number[];
};
export const mosaicCollections: MosaicCollection[] = [
  {
    key: "winter",
    title: "RED, AGAINST WINTER.",
    subtitle: "Fashion / Selected frames",
    hero: 2,
    left: [5, 6, 2],
    top: [6, 5],
    bottom: [2, 6],
    right: [6, 2, 5],
  },
  {
    key: "light",
    title: "LIGHT & MOVEMENT.",
    subtitle: "Selected portraits",
    hero: 4,
    left: [1, 3, 4],
    top: [3, 1],
    bottom: [1, 4],
    right: [4, 1, 3],
  },
  {
    key: "editorial",
    title: "OUTSIDE THE ORDINARY.",
    subtitle: "Editorial selection",
    hero: 8,
    left: [7, 9, 10],
    top: [9, 7],
    bottom: [10, 8],
    right: [10, 7, 9],
  },
];
