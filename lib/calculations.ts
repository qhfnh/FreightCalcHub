export type DimensionUnit = "in" | "cm";
export type WeightUnit = "lb" | "kg";

export type BillableSource = "actual" | "dimensional";

const INCHES_PER_CM = 0.39370078740157477;
const POUNDS_PER_KG = 2.20462262185;
const CUBIC_INCHES_PER_CUBIC_FOOT = 1728;
const CUBIC_FEET_PER_CUBIC_METER = 35.3146667215;

function positive(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function toInches(value: number, unit: DimensionUnit): number {
  const safe = positive(value);
  return unit === "cm" ? safe * INCHES_PER_CM : safe;
}

function toPounds(value: number, unit: WeightUnit): number {
  const safe = positive(value);
  return unit === "kg" ? safe * POUNDS_PER_KG : safe;
}

function fromPounds(value: number, unit: WeightUnit): number {
  return unit === "kg" ? value / POUNDS_PER_KG : value;
}

function rectangleCount(
  itemLength: number,
  itemWidth: number,
  spaceLength: number,
  spaceWidth: number
): number {
  const normal =
    Math.floor(spaceLength / itemLength) * Math.floor(spaceWidth / itemWidth);
  const rotated =
    Math.floor(spaceLength / itemWidth) * Math.floor(spaceWidth / itemLength);
  return Math.max(normal, rotated);
}

function permutations(values: [number, number, number]): [number, number, number][] {
  const [a, b, c] = values;
  return [
    [a, b, c],
    [a, c, b],
    [b, a, c],
    [b, c, a],
    [c, a, b],
    [c, b, a]
  ];
}

export interface DimensionalWeightInput {
  length: number;
  width: number;
  height: number;
  divisor: number;
  dimensionUnit: DimensionUnit;
  weightUnit: WeightUnit;
}

export interface DimensionalWeightResult {
  volume: number;
  volumeUnit: "cubic inches" | "cubic centimeters";
  dimensionalWeight: number;
}

export function calculateDimensionalWeight(
  input: DimensionalWeightInput
): DimensionalWeightResult {
  const length = positive(input.length);
  const width = positive(input.width);
  const height = positive(input.height);
  const divisor = positive(input.divisor);
  const volume = length * width * height;

  return {
    volume,
    volumeUnit:
      input.dimensionUnit === "cm" ? "cubic centimeters" : "cubic inches",
    dimensionalWeight: divisor > 0 ? volume / divisor : 0
  };
}

export interface ActualVsDimensionalWeightInput extends DimensionalWeightInput {
  actualWeight: number;
}

export interface ActualVsDimensionalWeightResult
  extends DimensionalWeightResult {
  actualWeight: number;
  billableWeight: number;
  roundedActualWeight: number;
  roundedDimensionalWeight: number;
  roundedBillableWeight: number;
  billableSource: BillableSource;
}

export function calculateActualVsDimensionalWeight(
  input: ActualVsDimensionalWeightInput
): ActualVsDimensionalWeightResult {
  const dim = calculateDimensionalWeight(input);
  const actualWeight = positive(input.actualWeight);
  const billableSource =
    dim.dimensionalWeight > actualWeight ? "dimensional" : "actual";

  return {
    ...dim,
    actualWeight,
    billableWeight:
      billableSource === "dimensional" ? dim.dimensionalWeight : actualWeight,
    roundedActualWeight: Math.ceil(actualWeight),
    roundedDimensionalWeight: Math.ceil(dim.dimensionalWeight),
    roundedBillableWeight: Math.ceil(
      billableSource === "dimensional" ? dim.dimensionalWeight : actualWeight
    ),
    billableSource
  };
}

export interface FreightDensityInput {
  weight: number;
  length: number;
  width: number;
  height: number;
  dimensionUnit: DimensionUnit;
  weightUnit: WeightUnit;
}

export interface FreightDensityResult {
  cubicFeet: number;
  cubicMeters: number;
  densityLbPerFt3: number;
  densityKgPerM3: number;
}

export function calculateFreightDensity(
  input: FreightDensityInput
): FreightDensityResult {
  const lengthIn = toInches(input.length, input.dimensionUnit);
  const widthIn = toInches(input.width, input.dimensionUnit);
  const heightIn = toInches(input.height, input.dimensionUnit);
  const weightLb = toPounds(input.weight, input.weightUnit);
  const cubicFeet =
    (lengthIn * widthIn * heightIn) / CUBIC_INCHES_PER_CUBIC_FOOT;
  const cubicMeters = cubicFeet / CUBIC_FEET_PER_CUBIC_METER;
  const densityLbPerFt3 = cubicFeet > 0 ? weightLb / cubicFeet : 0;
  const densityKgPerM3 =
    cubicMeters > 0 ? fromPounds(weightLb, "kg") / cubicMeters : 0;

  return {
    cubicFeet,
    cubicMeters,
    densityLbPerFt3,
    densityKgPerM3
  };
}

const freightClassBreaks: Array<{ minimumDensity: number; freightClass: string }> =
  [
    { minimumDensity: 35, freightClass: "55" },
    { minimumDensity: 30, freightClass: "60" },
    { minimumDensity: 22.5, freightClass: "65" },
    { minimumDensity: 15, freightClass: "70" },
    { minimumDensity: 13.5, freightClass: "77.5" },
    { minimumDensity: 12, freightClass: "85" },
    { minimumDensity: 10.5, freightClass: "92.5" },
    { minimumDensity: 9, freightClass: "100" },
    { minimumDensity: 8, freightClass: "110" },
    { minimumDensity: 7, freightClass: "125" },
    { minimumDensity: 6, freightClass: "150" },
    { minimumDensity: 5, freightClass: "175" },
    { minimumDensity: 4, freightClass: "200" },
    { minimumDensity: 3, freightClass: "250" },
    { minimumDensity: 2, freightClass: "300" },
    { minimumDensity: 1, freightClass: "400" },
    { minimumDensity: 0, freightClass: "500" }
  ];

export interface FreightClassResult extends FreightDensityResult {
  estimatedClass: string;
}

export function calculateFreightClass(
  input: FreightDensityInput
): FreightClassResult {
  const density = calculateFreightDensity(input);
  if (density.densityLbPerFt3 > 50) {
    return {
      ...density,
      estimatedClass: "50"
    };
  }

  const match =
    freightClassBreaks.find(
      (item) => density.densityLbPerFt3 >= item.minimumDensity
    ) ?? freightClassBreaks[freightClassBreaks.length - 1];

  return {
    ...density,
    estimatedClass: match.freightClass
  };
}

export interface PalletBuildInput {
  cartonLength: number;
  cartonWidth: number;
  cartonHeight: number;
  palletLength: number;
  palletWidth: number;
  maxStackHeight: number;
  dimensionUnit: DimensionUnit;
}

export interface PalletBuildResult {
  cartonsPerLayer: number;
  layers: number;
  totalCartons: number;
  footprintUtilization: number;
}

export function calculatePalletBuild(input: PalletBuildInput): PalletBuildResult {
  const cartonsPerLayer = rectangleCount(
    positive(input.cartonLength),
    positive(input.cartonWidth),
    positive(input.palletLength),
    positive(input.palletWidth)
  );
  const layers =
    positive(input.cartonHeight) > 0
      ? Math.floor(positive(input.maxStackHeight) / positive(input.cartonHeight))
      : 0;
  const palletArea = positive(input.palletLength) * positive(input.palletWidth);
  const cartonArea =
    positive(input.cartonLength) * positive(input.cartonWidth) * cartonsPerLayer;

  return {
    cartonsPerLayer,
    layers,
    totalCartons: cartonsPerLayer * layers,
    footprintUtilization: palletArea > 0 ? cartonArea / palletArea : 0
  };
}

export interface CasesPerPalletInput {
  caseLength: number;
  caseWidth: number;
  caseHeight: number;
  caseWeight: number;
  palletLength: number;
  palletWidth: number;
  maxStackHeight: number;
  maxPalletWeight: number;
  dimensionUnit: DimensionUnit;
  weightUnit: WeightUnit;
}

export interface CasesPerPalletResult {
  casesPerLayer: number;
  layers: number;
  casesBySpace: number;
  casesByWeight: number;
  totalCases: number;
  limitingFactor: "space" | "weight";
}

export function calculateCasesPerPallet(
  input: CasesPerPalletInput
): CasesPerPalletResult {
  const build = calculatePalletBuild({
    cartonLength: input.caseLength,
    cartonWidth: input.caseWidth,
    cartonHeight: input.caseHeight,
    palletLength: input.palletLength,
    palletWidth: input.palletWidth,
    maxStackHeight: input.maxStackHeight,
    dimensionUnit: input.dimensionUnit
  });
  const casesByWeight =
    positive(input.caseWeight) > 0
      ? Math.floor(positive(input.maxPalletWeight) / positive(input.caseWeight))
      : 0;
  const totalCases = Math.min(build.totalCartons, casesByWeight || build.totalCartons);

  return {
    casesPerLayer: build.cartonsPerLayer,
    layers: build.layers,
    casesBySpace: build.totalCartons,
    casesByWeight,
    totalCases,
    limitingFactor: casesByWeight > 0 && casesByWeight < build.totalCartons ? "weight" : "space"
  };
}

export interface ContainerLoadingInput {
  itemLength: number;
  itemWidth: number;
  itemHeight: number;
  itemWeight: number;
  containerLength: number;
  containerWidth: number;
  containerHeight: number;
  maxPayload: number;
  dimensionUnit: DimensionUnit;
  weightUnit: WeightUnit;
}

export interface ContainerLoadingResult {
  unitsBySpace: number;
  unitsByPayload: number;
  estimatedUnits: number;
  limitingFactor: "space" | "payload";
  bestOrientation: [number, number, number];
}

export function calculateContainerLoading(
  input: ContainerLoadingInput
): ContainerLoadingResult {
  const container = [
    positive(input.containerLength),
    positive(input.containerWidth),
    positive(input.containerHeight)
  ] as [number, number, number];
  let unitsBySpace = 0;
  let bestOrientation: [number, number, number] = [
    positive(input.itemLength),
    positive(input.itemWidth),
    positive(input.itemHeight)
  ];

  for (const orientation of permutations(bestOrientation)) {
    const count =
      Math.floor(container[0] / orientation[0]) *
      Math.floor(container[1] / orientation[1]) *
      Math.floor(container[2] / orientation[2]);

    if (count > unitsBySpace) {
      unitsBySpace = count;
      bestOrientation = orientation;
    }
  }

  const unitsByPayload =
    positive(input.itemWeight) > 0
      ? Math.floor(positive(input.maxPayload) / positive(input.itemWeight))
      : 0;
  const estimatedUnits = Math.min(
    unitsBySpace,
    unitsByPayload || unitsBySpace
  );

  return {
    unitsBySpace,
    unitsByPayload,
    estimatedUnits,
    limitingFactor:
      unitsByPayload > 0 && unitsByPayload < unitsBySpace ? "payload" : "space",
    bestOrientation
  };
}

export interface CartonsPerContainerInput {
  cartonLength: number;
  cartonWidth: number;
  cartonHeight: number;
  containerLength: number;
  containerWidth: number;
  containerHeight: number;
  fillEfficiency: number;
  dimensionUnit: DimensionUnit;
}

export interface CartonsPerContainerResult {
  theoreticalCartons: number;
  adjustedCartons: number;
  containerVolume: number;
  cartonVolume: number;
}

export function calculateCartonsPerContainer(
  input: CartonsPerContainerInput
): CartonsPerContainerResult {
  const containerVolume =
    positive(input.containerLength) *
    positive(input.containerWidth) *
    positive(input.containerHeight);
  const cartonVolume =
    positive(input.cartonLength) *
    positive(input.cartonWidth) *
    positive(input.cartonHeight);
  const theoreticalCartons =
    cartonVolume > 0 ? Math.floor(containerVolume / cartonVolume) : 0;
  const efficiency = Math.min(Math.max(positive(input.fillEfficiency), 0), 100);

  return {
    theoreticalCartons,
    adjustedCartons: Math.floor(theoreticalCartons * (efficiency / 100)),
    containerVolume,
    cartonVolume
  };
}

export interface WarehouseSpaceInput {
  palletCount: number;
  palletLength: number;
  palletWidth: number;
  stackLevels: number;
  aisleFactor: number;
  dimensionUnit: DimensionUnit;
}

export interface WarehouseSpaceResult {
  storagePositions: number;
  floorAreaFt2: number;
  floorAreaM2: number;
  netPalletAreaFt2: number;
}

export function calculateWarehouseSpace(
  input: WarehouseSpaceInput
): WarehouseSpaceResult {
  const stackLevels = Math.max(1, Math.floor(positive(input.stackLevels)));
  const storagePositions = Math.ceil(positive(input.palletCount) / stackLevels);
  const palletLengthIn = toInches(input.palletLength, input.dimensionUnit);
  const palletWidthIn = toInches(input.palletWidth, input.dimensionUnit);
  const netPalletAreaFt2 =
    (palletLengthIn * palletWidthIn) / (12 * 12);
  const floorAreaFt2 =
    storagePositions * netPalletAreaFt2 * positive(input.aisleFactor);

  return {
    storagePositions,
    floorAreaFt2,
    floorAreaM2: floorAreaFt2 / 10.7639104167,
    netPalletAreaFt2
  };
}

export interface PalletStorageInput {
  pallets: number;
  palletsPerBay: number;
  rackLevels: number;
  targetOccupancy: number;
  bayWidth: number;
  bayDepth: number;
  dimensionUnit: DimensionUnit;
}

export interface PalletStorageResult {
  requiredPositions: number;
  requiredBays: number;
  estimatedRackFootprintFt2: number;
  estimatedRackFootprintM2: number;
  positionsPerBay: number;
}

export function calculatePalletStorage(
  input: PalletStorageInput
): PalletStorageResult {
  const occupancy = Math.min(Math.max(positive(input.targetOccupancy), 1), 100);
  const requiredPositions = Math.ceil(positive(input.pallets) / (occupancy / 100));
  const positionsPerBay =
    Math.max(1, Math.floor(positive(input.palletsPerBay))) *
    Math.max(1, Math.floor(positive(input.rackLevels)));
  const requiredBays = Math.ceil(requiredPositions / positionsPerBay);
  const bayWidthIn = toInches(input.bayWidth, input.dimensionUnit);
  const bayDepthIn = toInches(input.bayDepth, input.dimensionUnit);
  const estimatedRackFootprintFt2 =
    requiredBays * ((bayWidthIn * bayDepthIn) / (12 * 12));

  return {
    requiredPositions,
    requiredBays,
    estimatedRackFootprintFt2,
    estimatedRackFootprintM2: estimatedRackFootprintFt2 / 10.7639104167,
    positionsPerBay
  };
}
