import { BerserkerRatesModel } from "../../models/berserker-rates-model";
import "./rates-form.css";

type Props = {
  rates: BerserkerRatesModel;
  setRates: (newRates: BerserkerRatesModel) => void;
};

export default function RatesForm({ rates, setRates }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Allow clearing the input
    if (value === "") {
      setRates((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    // Parse and clamp numeric input
    const parsed = Number(value);
    if (!isNaN(parsed)) {
      const clamped = Math.min(Math.max(parsed, 0), 999999);
      setRates((prev) => ({ ...prev, [name]: clamped }));
    }
  };

  return (
    <div className="rates-form-container">
      <span className="step">Step 1: Enter your berserker stats.</span>
      <div className="rate-container">
        <label className="label">Gold Rate:</label>
        <input
          type="number"
          name="goldRate" // important for dynamic handling
          value={rates.goldRate}
          onChange={handleChange}
          className="input"
          min={0}
          max={999999}
          placeholder="Berserker value"
        />
      </div>
      <div className="rate-container">
        <label className="label">Experience Rate:</label>
        <input
          type="number"
          name="experienceRate" // important for dynamic handling
          value={rates.experienceRate}
          onChange={handleChange}
          className="input"
          min={0}
          max={999999999}
          placeholder="Berserker value"
        />
      </div>

      {/* <label>Enh. Stone Drop Rate:</label>
      <input
        type="number"
        value={rates.enhancementStoneDropRate}
        onChange={(e) =>
          handleChange("enhancementStoneDropRate", Number(e.target.value))
        }
      />

      <label>Item Drop Rate:</label>
      <input
        type="number"
        value={rates.itemDropRate}
        onChange={(e) => handleChange("itemDropRate", Number(e.target.value))}
      />

      <label>Paragon Experience Rate:</label>
      <input
        type="number"
        value={rates.paragonExperienceRate}
        onChange={(e) =>
          handleChange("paragonExperienceRate", Number(e.target.value))
        }
      /> */}
    </div>
  );
}
