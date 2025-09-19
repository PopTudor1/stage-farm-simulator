export enum ItemStarsEnum {
  ONE_STAR = "ONE_STAR",
  TWO_STARS = "TWO_STARS",
  THREE_STARS = "THREE_STARS",
  FOUR_STARS = "FOUR_STARS",
}

export const ItemStarsEnumLabel: Record<ItemStarsEnum, string> = {
  [ItemStarsEnum.ONE_STAR]: "1 star",
  [ItemStarsEnum.TWO_STARS]: "2 stars",
  [ItemStarsEnum.THREE_STARS]: "3 stars",
  [ItemStarsEnum.FOUR_STARS]: "4 stars",
};
