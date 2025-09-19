import { GoldUnit, goldUnitValues } from "../enums/gold-unit-enum";
import { StageRewardsModel } from "../models/stage-rewards-model";

// Finder with experienceRate
export function findBestXPFarmingStage(
  formsData: StageRewardsModel[],
  numForms: number,
  experienceRate: number
): { stage: number; xpPerMinute: string } | null {
  const visibleForms = formsData.slice(0, numForms);

  if (visibleForms.length === 0) return null;

  let bestStage = visibleForms[0].stage;

  const baseXPFirst =
    (visibleForms[0].experience ?? 0) * (visibleForms[0].killsPerMinute ?? 1);
  let maxXPPerMinute = calculateFinalExperience(baseXPFirst, experienceRate);

  for (let i = 0; i < visibleForms.length; i++) {
    const form = visibleForms[i];
    const baseXPPerMinute = (form.experience ?? 0) * (form.killsPerMinute ?? 1);

    const xpPerMinute = calculateFinalExperience(
      baseXPPerMinute,
      experienceRate
    );

    if (xpPerMinute > maxXPPerMinute) {
      maxXPPerMinute = xpPerMinute;
      bestStage = form.stage;
    }
  }

  return { stage: bestStage, xpPerMinute: formatExp(maxXPPerMinute) };
}

// Convert raw number to best-fitting unit
export function formatExp(amount: number): string {
  const units = Object.entries(goldUnitValues).reverse() as [
    GoldUnit,
    number
  ][];
  for (const [unit, value] of units) {
    if (amount >= value) {
      return (amount / value).toFixed(3) + unit;
    }
  }
  return amount.toFixed(3); // fallback: plain number
}

// Main calculation
export function calculateFinalExperience(
  baseXP: number,
  experienceRate: number
): number {
  // If experienceRate = 100 → double the XP
  const multiplier = 1 + experienceRate / 100;
  return baseXP * multiplier;
}
