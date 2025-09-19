import { EquipmentTypeEnum } from "../enums/equipment-type-enum";
import { ItemRarityEnum } from "../enums/item-rarity-enum";
import { ItemStarsEnum } from "../enums/item-stars-enum";

export type RewardEquipment = {
  type: EquipmentTypeEnum;
  rarity: ItemRarityEnum;
  stars: ItemStarsEnum;
  chance: number;
};
