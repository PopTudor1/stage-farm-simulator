import { StageRewardsModel } from "../models/stage-rewards-model";

export function findBestDiceFarmingStage(
  formsData: StageRewardsModel[],
  numForms: number
): { stage: number; dicePerMinute: number } | null {
  const visibleForms = formsData.slice(0, numForms);
  if (visibleForms.length === 0) return null;

  let bestStage = visibleForms[0].stage;
  let maxDicePerMinute =
    ((visibleForms[0].dice.chance ?? 0) / 100) *
    (visibleForms[0].dice.value ?? 0) *
    (visibleForms[0].killsPerMinute ?? 1);

  for (const form of visibleForms) {
    const expectedPerMonster =
      ((form.dice.chance ?? 0) / 100) * (form.dice.value ?? 0);
    const dicePerMinute = expectedPerMonster * (form.killsPerMinute ?? 1);

    if (dicePerMinute > maxDicePerMinute) {
      maxDicePerMinute = dicePerMinute;
      bestStage = form.stage;
    }
  }

  return { stage: bestStage, dicePerMinute: maxDicePerMinute };
}
