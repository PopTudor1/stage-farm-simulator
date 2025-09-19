import { ChangeEvent } from "react";
import { StageRewardsModel } from "../../models/stage-rewards-model";
import "./stage-form.css";

type Props = {
  formData: StageRewardsModel;
  setFormData: (newData: StageRewardsModel) => void;
};

// type RewardItemKey =
//   | "enhancementStone"
//   | "dice"
//   | "darknessEnergy"
//   | "stageEssence";

export default function StageForm({ formData, setFormData }: Props) {
  // Define min/max rules per field path
  const clampRules: Record<string, { min: number; max: number }> = {
    stage: { min: 0, max: 5000 },
    killsPerMinute: { min: 0, max: 1000 },
    experience: { min: 0, max: 999999999 },
    // add more as needed
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    path: string
  ) => {
    const { type, value } = e.target;

    let finalValue: string | number = value;

    if (type === "number") {
      if (value === "") {
        finalValue = "";
      } else {
        const parsed = Number(value);
        if (!isNaN(parsed)) {
          const rule = clampRules[path] ?? { min: 0, max: 999999999 };
          finalValue = Math.min(Math.max(parsed, rule.min), rule.max);
        }
      }
    }

    const keys = path.split(".");
    const updated: any = { ...formData };

    let obj = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];

      if (!isNaN(Number(keys[i + 1]))) {
        obj[key] = [...obj[key]];
      } else {
        obj[key] = { ...obj[key] };
      }
      obj = obj[key];
    }

    obj[keys[keys.length - 1]] = finalValue;

    setFormData(updated);
  };

  // const addEquipment = () => {
  //   if (formData.equipment.length >= 4) return;
  //   setFormData({
  //     ...formData,
  //     equipment: [
  //       ...formData.equipment,
  //       {
  //         type: EquipmentTypeEnum.SWORD,
  //         rarity: ItemRarityEnum.A,
  //         stars: ItemStarsEnum.ONE_STAR,
  //         chance: 0,
  //       },
  //     ],
  //   });
  // };

  // const addCompanion = () => {
  //   if ((formData.companionEquipment?.length ?? 0) >= 3) return;
  //   setFormData({
  //     ...formData,
  //     companionEquipment: [
  //       ...(formData.companionEquipment ?? []),
  //       { rarity: CompanionItemRarityEnum.B, chance: 0 },
  //     ],
  //   });
  // };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="stage-form-container">
        {/* <h2>Stage</h2> */}
        <div className="stage-container">
          <label className="label">Stage:</label>
          <input
            type="number"
            value={formData.stage}
            onChange={(e) => handleChange(e, "stage")}
            className="input"
            min={0}
            max={5000}
          />
        </div>
        <div className="stage-container">
          <label className="label">KPM:</label>
          <input
            type="number"
            value={formData.killsPerMinute}
            onChange={(e) => handleChange(e, "killsPerMinute")}
            className="input"
            min={0}
            max={1000}
          />
        </div>
        <div className="stage-container">
          <label className="label">Experience:</label>
          <input
            type="number"
            value={formData.experience}
            onChange={(e) => handleChange(e, "experience")}
            className="input"
            min={0}
            max={999999}
          />
        </div>
        <div className="stage-container">
          <label className="label">Gold:</label>
          <input
            type="string"
            value={formData.gold}
            onChange={(e) => handleChange(e, "gold")}
            className="input"
          />
        </div>

        {/* {(
        [
          "enhancementStone",
          "dice",
          "darknessEnergy",
          "stageEssence",
        ] as RewardItemKey[]
      ).map((key) => (
        <div key={key}>
          <h3>{key}</h3>
          <div>
            <label>Chance:</label>
            <input
              type="number"
              value={formData[key]?.chance}
              onChange={(e) => handleChange(e, `${key}.chance`)}
            />
          </div>
          <div>
            <label>Value:</label>
            <input
              type="number"
              value={formData[key]?.value}
              onChange={(e) => handleChange(e, `${key}.value`)}
            />
          </div>
        </div>
      ))} */}

        {/* <h2>Equipment</h2>
      {formData.equipment?.map((eq, i) => (
        <div key={i}>
          <select
            value={eq.type}
            onChange={(e) => handleChange(e, `equipment.${i}.type`)}
            style={{ width: "100px" }}
          >
            {Object.values(EquipmentTypeEnum).map((v) => (
              <option key={v} value={v}>
                {EquipmentTypeEnumLabel[v]}
              </option>
            ))}
          </select>
          <select
            value={eq.rarity}
            onChange={(e) => handleChange(e, `equipment.${i}.rarity`)}
          >
            {Object.values(ItemRarityEnum).map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <select
            value={eq.stars}
            onChange={(e) => handleChange(e, `equipment.${i}.stars`)}
            style={{ width: "80px" }}
          >
            {Object.values(ItemStarsEnum).map((v) => (
              <option key={v} value={v}>
                {ItemStarsEnumLabel[v]}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={eq.chance}
            onChange={(e) => handleChange(e, `equipment.${i}.chance`)}
            style={{ width: "70px" }}
          />
          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                equipment: formData.equipment.filter((_, index) => index !== i),
              })
            }
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addEquipment}
        disabled={formData.equipment.length >= 4}
      >
        Add Equipment
      </button>

      <h2>Companion Equipment</h2>
      {formData.companionEquipment?.map((c, i) => (
        <div key={i}>
          <select
            value={c.rarity}
            onChange={(e) => handleChange(e, `companionEquipment.${i}.rarity`)}
          >
            {Object.values(CompanionItemRarityEnum).map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={c.chance}
            onChange={(e) => handleChange(e, `companionEquipment.${i}.chance`)}
          />
          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                companionEquipment: formData.companionEquipment?.filter(
                  (_, index) => index !== i
                ),
              })
            }
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addCompanion}
        disabled={(formData.companionEquipment?.length ?? 0) >= 3}
      >
        Add Companion Equipment
      </button> */}

        {/* <button type="submit">Submit</button> */}
      </div>
    </form>
  );
}
