import { CompanionEquipment } from "./companion-equipment";
import { RewardEquipment } from "./reward-equipment";
import { RewardItem } from "./reward-item";

export type StageRewardsModel = {
  stage: number;
  killsPerMinute: number;
  experience?: number;
  gold: string | number;
  enhancementStone: RewardItem;
  dice: RewardItem;
  darknessEnergy?: RewardItem;
  equipment: RewardEquipment[];
  companionEquipment?: CompanionEquipment[];
  stageEssence?: RewardItem;
};
