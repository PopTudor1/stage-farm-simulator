import { StageRewardsModel } from "../models/stage-rewards-model";

// Finder with enhancementStoneDropRate
export function findBestEnhancementFarmingStage(
  formsData: StageRewardsModel[],
  numForms: number,
  enhancementStoneDropRate: number
): { stage: number; stonesPerMinute: number } | null {
  const visibleForms = formsData.slice(0, numForms);
  if (visibleForms.length === 0) return null;

  let bestStage = visibleForms[0].stage;

  const baseStonesFirst =
    ((visibleForms[0].enhancementStone.chance ?? 0) / 100) *
    (visibleForms[0].enhancementStone.value ?? 0) *
    (visibleForms[0].killsPerMinute ?? 1);

  let maxStonesPerMinute = calculateFinalStones(
    baseStonesFirst,
    enhancementStoneDropRate
  );

  for (const form of visibleForms) {
    const expectedPerMonster =
      ((form.enhancementStone.chance ?? 0) / 100) *
      (form.enhancementStone.value ?? 0);

    const baseStonesPerMinute = expectedPerMonster * (form.killsPerMinute ?? 1);

    const stonesPerMinute = calculateFinalStones(
      baseStonesPerMinute,
      enhancementStoneDropRate
    );

    if (stonesPerMinute > maxStonesPerMinute) {
      maxStonesPerMinute = stonesPerMinute;
      bestStage = form.stage;
    }
  }

  return { stage: bestStage, stonesPerMinute: maxStonesPerMinute };
}

// Main calculation
export function calculateFinalStones(
  baseStones: number,
  enhancementStoneDropRate: number
): number {
  const multiplier = 1 + enhancementStoneDropRate / 100;
  return baseStones * multiplier;
}
