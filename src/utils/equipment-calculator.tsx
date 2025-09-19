import { EquipmentTypeEnum } from "../enums/equipment-type-enum";
import { ItemRarityEnum } from "../enums/item-rarity-enum";
import { ItemStarsEnum } from "../enums/item-stars-enum";
import { RewardEquipment } from "../models/reward-equipment";
import { StageRewardsModel } from "../models/stage-rewards-model";

// Utility: multiplier for rarity + stars
function getEquipmentMultiplier(eq: RewardEquipment): number {
  const starOrder = [
    ItemStarsEnum.ONE_STAR,
    ItemStarsEnum.TWO_STARS,
    ItemStarsEnum.THREE_STARS,
    ItemStarsEnum.FOUR_STARS,
  ];

  const rarityOrder = [
    ItemRarityEnum.D,
    ItemRarityEnum.C,
    ItemRarityEnum.B,
    ItemRarityEnum.A,
    ItemRarityEnum.S,
    ItemRarityEnum.SR,
  ];

  const starIndex = starOrder.indexOf(eq.stars);
  const rarityIndex = rarityOrder.indexOf(eq.rarity);

  if (rarityIndex === -1 || starIndex === -1) {
    throw new Error("Invalid equipment");
  }

  const baseRarityMultiplier = 4;
  const rarityMultiplier = Math.pow(5, baseRarityMultiplier * rarityIndex);
  const starMultiplier = Math.pow(5, starIndex);

  return rarityMultiplier * starMultiplier;
}

// Normalized value in 1★ D
export function equipmentValueInOneStarD(equipment: RewardEquipment): number {
  return getEquipmentMultiplier(equipment);
}

//TODO not good, check it later
export function calculateItemValuePerMinute(
  stage: StageRewardsModel,
  type: EquipmentTypeEnum,
  itemDropRate: number
): number {
  const items = stage.equipment.filter((eq) => eq.type === type);

  if (items.length === 0) return 0;

  // Only one item can drop per monster. Calculate weighted average
  const weightedValuePerMonster = items.reduce((sum, eq) => {
    return sum + (eq.chance / 100) * equipmentValueInOneStarD(eq);
  }, 0);

  // Maximum one item per monster => expected value cannot exceed 1x value
  // So we divide by sum of chances if >100%, otherwise it's fine
  const totalChance = items.reduce((sum, eq) => sum + eq.chance, 0);
  const normalizedValue =
    totalChance > 100
      ? weightedValuePerMonster / (totalChance / 100)
      : weightedValuePerMonster;

  const perMinute = normalizedValue * (stage.killsPerMinute ?? 1);

  return perMinute * (1 + itemDropRate / 100); // include drop rate bonus
}

// Finder: picks best stage, returns real items/min for chosen rarity+stars, includes itemDropRate
export function findBestEquipmentFarmingStage(
  formsData: StageRewardsModel[],
  numForms: number,
  type: EquipmentTypeEnum,
  itemDropRate: number
): {
  stage: number;
  itemsPerMinute: number;
  bestEquipment: RewardEquipment | null;
} | null {
  const visibleForms = formsData.slice(0, numForms);
  if (visibleForms.length === 0) return null;

  let bestStage = visibleForms[0].stage;
  let maxValuePerMinute = calculateItemValuePerMinute(
    visibleForms[0],
    type,
    itemDropRate
  );
  let bestEquipment: RewardEquipment | null =
    visibleForms[0].equipment.find((eq) => eq.type === type) ?? null;

  for (const form of visibleForms) {
    const valuePerMinute = calculateItemValuePerMinute(
      form,
      type,
      itemDropRate
    );
    if (valuePerMinute > maxValuePerMinute) {
      maxValuePerMinute = valuePerMinute;
      bestStage = form.stage;
      bestEquipment = form.equipment.find((eq) => eq.type === type) ?? null;
    }
  }

  // Convert back into actual items/minute for the chosen rarity+stars
  let realItemsPerMinute = 0;
  if (bestEquipment) {
    const multiplier = getEquipmentMultiplier(bestEquipment);
    realItemsPerMinute = maxValuePerMinute / multiplier;
  }

  return {
    stage: bestStage,
    itemsPerMinute: realItemsPerMinute,
    bestEquipment: bestEquipment,
  };
}
