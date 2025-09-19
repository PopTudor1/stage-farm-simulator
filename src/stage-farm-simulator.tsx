import { useState } from "react";
import RatesForm from "./components/rates-form/rates-form";
import StageForm from "./components/stage-form/stage-form";
import { BerserkerRatesModel } from "./models/berserker-rates-model";
import { StageRewardsModel } from "./models/stage-rewards-model";
import "./stage-farm-simulator.css";
import { findBestXPFarmingStage } from "./utils/experience-calculator";
import { findBestGoldFarmingStage } from "./utils/gold-calculator";

export default function StageFarmSimulator() {
  const [numForms, setNumForms] = useState(1); // controlled by input
  const [numFormsInput, setNumFormsInput] = useState<string>("1"); // controlled input as string
  const [formsData, setFormsData] = useState<StageRewardsModel[]>(
    Array(4)
      .fill(null)
      .map(() => ({
        stage: 1,
        killsPerMinute: 1,
        experience: 0,
        gold: 0,
        enhancementStone: { chance: 0, value: 0 },
        dice: { chance: 0, value: 0 },
        darknessEnergy: { chance: 0, value: 0 },
        stageEssence: { chance: 0, value: 0 },
        equipment: [],
        companionEquipment: [],
      }))
  );

  const [rates, setRates] = useState<BerserkerRatesModel>({
    goldRate: 0,
    experienceRate: 0,
    enhancementStoneDropRate: 0,
    itemDropRate: 0,
    paragonExperienceRate: 0,
  });

  const [bestXPStageResult, setBestXPStageResult] = useState<{
    stage: number;
    xpPerMinute: string;
  } | null>(null);

  const [bestGoldStageResult, setBestGoldStageResult] = useState<{
    stage: number;
    goldPerMinute: string;
  } | null>(null);

  // const [bestEnhancementStageResult, setBestEnhancementStageResult] = useState<{
  //   stage: number;
  //   stonesPerMinute: number;
  // } | null>(null);

  // const [bestDiceStageResult, setBestDiceStageResult] = useState<{
  //   stage: number;
  //   dicePerMinute: number;
  // } | null>(null);

  // const [bestDarknessStageResult, setBestDarknessStageResult] = useState<{
  //   stage: number;
  //   darknessPerMinute: number;
  // } | null>(null);

  // const [bestEssenceStageResult, setBestEssenceStageResult] = useState<{
  //   stage: number;
  //   essencePerMinute: number;
  // } | null>(null);

  // const [bestSwordStageResult, setBestSwordStageResult] = useState<{
  //   stage: number;
  //   itemsPerMinute: number;
  //   bestEquipment: RewardEquipment | null;
  // } | null>(null);

  // const [bestRingStageResult, setBestRingStageResult] = useState<{
  //   stage: number;
  //   itemsPerMinute: number;
  //   bestEquipment: RewardEquipment | null;
  // } | null>(null);

  // const [bestGauntletStageResult, setBestGauntletStageResult] = useState<{
  //   stage: number;
  //   itemsPerMinute: number;
  //   bestEquipment: RewardEquipment | null;
  // } | null>(null);

  // const [bestNecklaceStageResult, setBestNecklaceStageResult] = useState<{
  //   stage: number;
  //   itemsPerMinute: number;
  //   bestEquipment: RewardEquipment | null;
  // } | null>(null);

  const handleSubmitAll = () => {
    let xpResult;
    if (
      rates.paragonExperienceRate == null ||
      rates.paragonExperienceRate == 0
    ) {
      console.log("merge normal");

      xpResult = findBestXPFarmingStage(
        formsData,
        numForms,
        rates.experienceRate
      );
    } else {
      console.log("merge cu paragon");

      xpResult = findBestXPFarmingStage(
        formsData,
        numForms,
        rates.paragonExperienceRate * 100
      );
    }
    setBestXPStageResult(xpResult);

    const goldResult = findBestGoldFarmingStage(
      formsData,
      numForms,
      rates.goldRate
    );
    setBestGoldStageResult(goldResult);

    // const stoneResult = findBestEnhancementFarmingStage(
    //   formsData,
    //   numForms,
    //   rates.enhancementStoneDropRate
    // );
    // setBestEnhancementStageResult(stoneResult);

    // const diceResult = findBestDiceFarmingStage(formsData, numForms);
    // setBestDiceStageResult(diceResult);

    // const darknessResult = findBestDarknessFarmingStage(formsData, numForms);
    // setBestDarknessStageResult(darknessResult);

    // const essenceResult = findBestStageEssenceFarmingStage(formsData, numForms);
    // setBestEssenceStageResult(essenceResult);

    // const swordResult = findBestEquipmentFarmingStage(
    //   formsData,
    //   numForms,
    //   EquipmentTypeEnum.SWORD,
    //   rates.itemDropRate
    // );
    // setBestSwordStageResult(swordResult);

    // const ringResult = findBestEquipmentFarmingStage(
    //   formsData,
    //   numForms,
    //   EquipmentTypeEnum.RING,
    //   rates.itemDropRate
    // );
    // setBestRingStageResult(ringResult);

    // const gauntletResult = findBestEquipmentFarmingStage(
    //   formsData,
    //   numForms,
    //   EquipmentTypeEnum.GAUNTLET,
    //   rates.itemDropRate
    // );
    // setBestGauntletStageResult(gauntletResult);

    // const necklaceResult = findBestEquipmentFarmingStage(
    //   formsData,
    //   numForms,
    //   EquipmentTypeEnum.NECKLACE,
    //   rates.itemDropRate
    // );
    // setBestNecklaceStageResult(necklaceResult);
  };

  return (
    <div className="farm-container">
      <span className="title">Stage Farming Simulator</span>
      <span className="madeBy">
        ( made by Tudique26 from the KNIGHTSXORDER guild on Trakan US server )
      </span>
      <span className="disclaimer">
        <strong>DISCLAIMER:</strong>{" "}
        <span className="disclaimer-message">
          The formulas and values displayed are only APPROXIMATIONS. Please take
          them with a grain of salt. They may be updated in future releases.
        </span>
      </span>

      <RatesForm rates={rates} setRates={setRates} />

      <div className="stage-selector-container">
        <span className="step">
          Step 2: Choose how many stages you want to compare.{" "}
        </span>
        <div className="stage-selector">
          <label className="label">Stages (max 4):</label>
          <input
            type="number"
            min={1}
            max={4}
            value={numFormsInput}
            onChange={(e) => {
              let val = e.target.value;

              // Allow clearing
              if (val === "") {
                setNumFormsInput("");
                return;
              }

              let parsed = Number(val);
              if (!isNaN(parsed)) {
                // Clamp to 1–4
                parsed = Math.min(Math.max(parsed, 1), 4);
                val = parsed.toString();
                setNumForms(parsed); // update numeric state
              }

              setNumFormsInput(val); // update input display
            }}
            className="input"
            placeholder="stages"
          />
        </div>
      </div>
      <div className="stages-content-container">
        <span className="step">
          Step 3: Copy the EXP & GOLD data from the stage screen + add your KPM
          for each stage.
        </span>
        <div className="forms-container">
          {formsData.slice(0, numForms).map((data, index) => (
            <StageForm
              key={index}
              formData={data}
              setFormData={(newData) => {
                const updated = [...formsData];
                updated[index] = newData;
                setFormsData(updated);
              }}
            />
          ))}
        </div>
      </div>
      <div className="button-container">
        <span className="step">
          Step 4: Click on the button to see the results.
        </span>
        <button className="best-stage-button" onClick={handleSubmitAll}>
          Show Best Stage to farm
        </button>
      </div>
      <div className="results-container">
        {bestXPStageResult && (
          <span className="best-stage-row">
            <strong>Best Stage for XP:</strong>
            <span className="value">
              {bestXPStageResult.stage} ({bestXPStageResult.xpPerMinute} XP/min)
            </span>
          </span>
        )}
        {bestGoldStageResult && (
          <span className="best-stage-row">
            <strong>Best Stage for Gold:</strong>
            <span className="value">
              {bestGoldStageResult.stage} ({bestGoldStageResult.goldPerMinute}{" "}
              Gold/min)
            </span>
          </span>
        )}
        {/* {bestEnhancementStageResult && (
            <div
              style={{
                marginTop: "1rem",
                color: "yellow",
                marginBottom: "1rem",
              }}
            >
              <strong>Best Stage to Farm Enhancement Stones:</strong>{" "}
              {bestEnhancementStageResult.stage} (
              {bestEnhancementStageResult.stonesPerMinute.toFixed(2)}{" "}
              stones/min)
            </div>
          )}
          {bestDiceStageResult && (
            <div
              style={{
                marginTop: "1rem",
                color: "yellow",
                marginBottom: "1rem",
              }}
            >
              <strong>Best Stage to Farm Dice:</strong>{" "}
              {bestDiceStageResult.stage} (
              {bestDiceStageResult.dicePerMinute.toFixed(2)} dice/min)
            </div>
          )}
          {bestDarknessStageResult && (
            <div
              style={{
                marginTop: "1rem",
                color: "yellow",
                marginBottom: "1rem",
              }}
            >
              <strong>Best Stage to Farm Darkness Energy:</strong>{" "}
              {bestDarknessStageResult.stage} (
              {bestDarknessStageResult.darknessPerMinute.toFixed(2)} per min)
            </div>
          )}
          {bestEssenceStageResult && (
            <div
              style={{
                marginTop: "1rem",
                color: "yellow",
                marginBottom: "1rem",
              }}
            >
              <strong>Best Stage to Farm Stage Essence:</strong>{" "}
              {bestEssenceStageResult.stage} (
              {bestEssenceStageResult.essencePerMinute.toFixed(2)} per min)
            </div>
          )}
          {bestSwordStageResult && (
            <div
              style={{
                marginTop: "1rem",
                color: "yellow",
                marginBottom: "1rem",
              }}
            >
              <strong>Best Stage to Farm Swords:</strong>{" "}
              {bestSwordStageResult.stage} (
              {bestSwordStageResult.itemsPerMinute.toFixed(2)}{" "}
              {
                ItemStarsEnumLabel[
                  bestSwordStageResult.bestEquipment?.stars as ItemStarsEnum
                ]
              }{" "}
              {bestSwordStageResult.bestEquipment?.rarity} per min)
            </div>
          )}
          {bestRingStageResult && (
            <div
              style={{
                marginTop: "1rem",
                color: "yellow",
                marginBottom: "1rem",
              }}
            >
              <strong>Best Stage to Farm Rings:</strong>{" "}
              {bestRingStageResult.stage} (
              {bestRingStageResult.itemsPerMinute.toFixed(2)}{" "}
              {
                ItemStarsEnumLabel[
                  bestRingStageResult.bestEquipment?.stars as ItemStarsEnum
                ]
              }{" "}
              {bestRingStageResult.bestEquipment?.rarity} per min)
            </div>
          )}
          {bestGauntletStageResult && (
            <div
              style={{
                marginTop: "1rem",
                color: "yellow",
                marginBottom: "1rem",
              }}
            >
              <strong>Best Stage to Farm Gauntlets:</strong>{" "}
              {bestGauntletStageResult.stage} (
              {bestGauntletStageResult.itemsPerMinute.toFixed(2)}{" "}
              {
                ItemStarsEnumLabel[
                  bestGauntletStageResult.bestEquipment?.stars as ItemStarsEnum
                ]
              }{" "}
              {bestGauntletStageResult.bestEquipment?.rarity} per min)
            </div>
          )}
          {bestNecklaceStageResult && (
            <div
              style={{
                marginTop: "1rem",
                color: "yellow",
                marginBottom: "1rem",
              }}
            >
              <strong>Best Stage to Farm Necklaces:</strong>{" "}
              {bestNecklaceStageResult.stage} (
              {bestNecklaceStageResult.itemsPerMinute.toFixed(2)}{" "}
              {
                ItemStarsEnumLabel[
                  bestNecklaceStageResult.bestEquipment?.stars as ItemStarsEnum
                ]
              }{" "}
              {bestNecklaceStageResult.bestEquipment?.rarity} per min)
            </div>
          )} */}
      </div>

      {/* Single submit button */}
    </div>
  );
}
