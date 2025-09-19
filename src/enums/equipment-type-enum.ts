export enum EquipmentTypeEnum {
  SWORD = "SWORD",
  RING = "RING",
  GAUNTLET = "GAUNTLET",
  NECKLACE = "NECKLACE",
}

export const EquipmentTypeEnumLabel: Record<EquipmentTypeEnum, string> = {
  [EquipmentTypeEnum.SWORD]: "Sword",
  [EquipmentTypeEnum.RING]: "Ring",
  [EquipmentTypeEnum.GAUNTLET]: "Gauntlet",
  [EquipmentTypeEnum.NECKLACE]: "Necklace",
};
