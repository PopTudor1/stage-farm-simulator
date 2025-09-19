export enum GoldUnit {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
}

export const goldUnitValues: Record<GoldUnit, number> = {
  [GoldUnit.A]: 1e6, // 1 million
  [GoldUnit.B]: 1e9, // 1 billion
  [GoldUnit.C]: 1e12, // 1 trillion
  [GoldUnit.D]: 1e15, // quadrillion
  [GoldUnit.E]: 1e18, // quintillion
  [GoldUnit.F]: 1e21, // sextillion
};
