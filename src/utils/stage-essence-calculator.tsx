import { StageRewardsModel } from "../models/stage-rewards-model";

export function findBestStageEssenceFarmingStage(
  formsData: StageRewardsModel[],
  numForms: number
): { stage: number; essencePerMinute: number } | null {
  const visibleForms = formsData.slice(0, numForms);
  if (visibleForms.length === 0) return null;

  let bestStage = visibleForms[0].stage;
  let maxEssencePerMinute =
    ((visibleForms[0].stageEssence?.chance ?? 0) / 100) *
    (visibleForms[0].stageEssence?.value ?? 0) *
    (visibleForms[0].killsPerMinute ?? 1);

  for (const form of visibleForms) {
    const expectedPerMonster =
      ((form.stageEssence?.chance ?? 0) / 100) *
      (form.stageEssence?.value ?? 0);
    const essencePerMinute = expectedPerMonster * (form.killsPerMinute ?? 1);

    if (essencePerMinute > maxEssencePerMinute) {
      maxEssencePerMinute = essencePerMinute;
      bestStage = form.stage;
    }
  }

  return { stage: bestStage, essencePerMinute: maxEssencePerMinute };
}
