export interface SpriteDefinition {
  name: string;
  dimensions: [number, number, number, number];
}

export type SpriteSheet = Map<string, ImageBitmap>;

const createSpriteSheet = async (
  sheet: CanvasImageSource,
  definitions: SpriteDefinition[]
): Promise<SpriteSheet> => {
  const sprites = await Promise.all(
    definitions.map(({ dimensions }) => {
      return createImageBitmap(sheet, ...dimensions);
    })
  );

  return new Map<string, ImageBitmap>(
    definitions.map(({ name }, i) => [name, sprites[i]])
  );
};

export default createSpriteSheet;
