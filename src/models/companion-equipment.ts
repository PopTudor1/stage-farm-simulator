import { CompanionItemRarityEnum } from "../enums/item-rarity-enum";

export type CompanionEquipment = {
  rarity: CompanionItemRarityEnum;
  chance: number;
};
