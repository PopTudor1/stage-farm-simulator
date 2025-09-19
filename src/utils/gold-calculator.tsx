import { GoldUnit, goldUnitValues } from "../enums/gold-unit-enum";
import { StageRewardsModel } from "../models/stage-rewards-model";

// Parse gold string like "36.542B" or "9324"
export function parseGold(goldStr: string): number {
  const match = goldStr.match(/^([\d.]+)([A-F])?$/);

  if (!match) {
    alert(
      `Invalid gold format: "${goldStr}". Use a number or number+unit (A-F). Example : 2.34C`
    );
    return 0; // fallback value
  }

  const [, value, unit] = match;
  if (!unit) {
    return parseFloat(value);
  }
  return parseFloat(value) * goldUnitValues[unit as GoldUnit];
}

// Convert raw number to best-fitting unit
export function formatGold(amount: number): string {
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

export function findBestGoldFarmingStage(
  formsData: StageRewardsModel[],
  numForms: number,
  goldRate: number
): { stage: number; goldPerMinute: string } | null {
  const visibleForms = formsData.slice(0, numForms);
  if (visibleForms.length === 0) return null;

  let bestStage = visibleForms[0].stage;

  const baseGoldFirst =
    parseGold(visibleForms[0].gold.toString()) *
    (visibleForms[0].killsPerMinute ?? 1);
  let maxGoldPerMinute = calculateFinalGold(baseGoldFirst, goldRate);

  for (let i = 0; i < visibleForms.length; i++) {
    const form = visibleForms[i];
    const baseGoldPerMinute =
      parseGold(form.gold.toString()) * (form.killsPerMinute ?? 1);

    const goldPerMinute = calculateFinalGold(baseGoldPerMinute, goldRate);

    if (goldPerMinute > maxGoldPerMinute) {
      maxGoldPerMinute = goldPerMinute;
      bestStage = form.stage;
    }
  }

  return { stage: bestStage, goldPerMinute: formatGold(maxGoldPerMinute) };
}
// Main calculation
export function calculateFinalGold(baseGold: number, goldRate: number): number {
  const multiplier = 1 + goldRate / 100;
  const finalAmount = baseGold * multiplier;
  return finalAmount;
}

//TODO usage from ChatGPT
// export default function GoldCalculator() {
//   const [goldDrop, setGoldDrop] = useState("36.542B");
//   const [rateIncrease, setRateIncrease] = useState(1835);
//   const [finalGold, setFinalGold] = useState("");

//   const handleCalculate = () => {
//     const result = calculateFinalGold(goldDrop, rateIncrease);
//     setFinalGold(result);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-2">Gold Calculator</h1>
//       <input
//         className="border p-2 mb-2"
//         value={goldDrop}
//         onChange={(e) => setGoldDrop(e.target.value)}
//         placeholder="Base Gold (e.g., 36.542B)"
//       />
//       <input
//         className="border p-2 mb-2 ml-2"
//         type="number"
//         value={rateIncrease}
//         onChange={(e) => setRateIncrease(Number(e.target.value))}
//         placeholder="Gold Rate Increase %"
//       />
//       <button
//         className="bg-blue-500 text-white p-2 ml-2 rounded"
//         onClick={handleCalculate}
//       >
//         Calculate
//       </button>
//       {finalGold && <p className="mt-2">Final Gold: {finalGold}</p>}
//     </div>
//   );
// }
