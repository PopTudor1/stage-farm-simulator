import { StageRewardsModel } from "../models/stage-rewards-model";

export function findBestDarknessFarmingStage(
  formsData: StageRewardsModel[],
  numForms: number
): { stage: number; darknessPerMinute: number } | null {
  const visibleForms = formsData.slice(0, numForms);
  if (visibleForms.length === 0) return null;

  let bestStage = visibleForms[0].stage;
  let maxDarknessPerMinute =
    ((visibleForms[0].darknessEnergy?.chance ?? 0) / 100) *
    (visibleForms[0].darknessEnergy?.value ?? 0) *
    (visibleForms[0].killsPerMinute ?? 1);

  for (const form of visibleForms) {
    const expectedPerMonster =
      ((form.darknessEnergy?.chance ?? 0) / 100) *
      (form.darknessEnergy?.value ?? 0);
    const darknessPerMinute = expectedPerMonster * (form.killsPerMinute ?? 1);

    if (darknessPerMinute > maxDarknessPerMinute) {
      maxDarknessPerMinute = darknessPerMinute;
      bestStage = form.stage;
    }
  }

  return { stage: bestStage, darknessPerMinute: maxDarknessPerMinute };
}
