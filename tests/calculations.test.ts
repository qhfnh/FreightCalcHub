import { describe, expect, it } from "vitest";
import {
  calculateActualVsDimensionalWeight,
  calculateCartonsPerContainer,
  calculateCasesPerPallet,
  calculateContainerLoading,
  calculateDimensionalWeight,
  calculateFreightClass,
  calculateFreightDensity,
  calculatePalletBuild,
  calculatePalletStorage,
  calculateWarehouseSpace
} from "@/lib/calculations";

describe("freight calculator math", () => {
  it("calculates dimensional weight from imperial dimensions", () => {
    const result = calculateDimensionalWeight({
      length: 24,
      width: 18,
      height: 12,
      divisor: 139,
      dimensionUnit: "in",
      weightUnit: "lb"
    });

    expect(result.volume).toBeCloseTo(5184, 2);
    expect(result.dimensionalWeight).toBeCloseTo(37.29, 2);
  });

  it("compares actual and dimensional weight and chooses billable weight", () => {
    const result = calculateActualVsDimensionalWeight({
      actualWeight: 22,
      length: 24,
      width: 18,
      height: 12,
      divisor: 139,
      dimensionUnit: "in",
      weightUnit: "lb"
    });

    expect(result.dimensionalWeight).toBeCloseTo(37.29, 2);
    expect(result.billableWeight).toBeCloseTo(37.29, 2);
    expect(result.roundedDimensionalWeight).toBe(38);
    expect(result.roundedActualWeight).toBe(22);
    expect(result.roundedBillableWeight).toBe(38);
    expect(result.billableSource).toBe("dimensional");
  });

  it("rounds the billable display weight up when actual weight is higher", () => {
    const result = calculateActualVsDimensionalWeight({
      actualWeight: 39.2,
      length: 24,
      width: 18,
      height: 12,
      divisor: 139,
      dimensionUnit: "in",
      weightUnit: "lb"
    });

    expect(result.billableSource).toBe("actual");
    expect(result.roundedActualWeight).toBe(40);
    expect(result.roundedDimensionalWeight).toBe(38);
    expect(result.roundedBillableWeight).toBe(40);
  });

  it("calculates density in pounds per cubic foot", () => {
    const result = calculateFreightDensity({
      weight: 480,
      length: 48,
      width: 40,
      height: 48,
      dimensionUnit: "in",
      weightUnit: "lb"
    });

    expect(result.cubicFeet).toBeCloseTo(53.33, 2);
    expect(result.densityLbPerFt3).toBeCloseTo(9, 2);
  });

  it("maps density to an estimated freight class", () => {
    const result = calculateFreightClass({
      weight: 480,
      length: 48,
      width: 40,
      height: 48,
      dimensionUnit: "in",
      weightUnit: "lb"
    });

    expect(result.densityLbPerFt3).toBeCloseTo(9, 2);
    expect(result.estimatedClass).toBe("100");
  });

  it("uses the requested density breakpoints for freight class estimates", () => {
    const class50 = calculateFreightClass({
      weight: 50.1,
      length: 12,
      width: 12,
      height: 12,
      dimensionUnit: "in",
      weightUnit: "lb"
    });
    const class55AtBoundary = calculateFreightClass({
      weight: 50,
      length: 12,
      width: 12,
      height: 12,
      dimensionUnit: "in",
      weightUnit: "lb"
    });
    const class500 = calculateFreightClass({
      weight: 0.9,
      length: 12,
      width: 12,
      height: 12,
      dimensionUnit: "in",
      weightUnit: "lb"
    });

    expect(class50.estimatedClass).toBe("50");
    expect(class55AtBoundary.estimatedClass).toBe("55");
    expect(class500.estimatedClass).toBe("500");
  });

  it("estimates cartons on a pallet using the best floor orientation", () => {
    const result = calculatePalletBuild({
      cartonLength: 12,
      cartonWidth: 10,
      cartonHeight: 8,
      palletLength: 48,
      palletWidth: 40,
      maxStackHeight: 56,
      dimensionUnit: "in"
    });

    expect(result.cartonsPerLayer).toBe(16);
    expect(result.layers).toBe(7);
    expect(result.totalCartons).toBe(112);
  });

  it("limits cases per pallet by both height and weight", () => {
    const result = calculateCasesPerPallet({
      caseLength: 12,
      caseWidth: 10,
      caseHeight: 8,
      caseWeight: 18,
      palletLength: 48,
      palletWidth: 40,
      maxStackHeight: 56,
      maxPalletWeight: 1600,
      dimensionUnit: "in",
      weightUnit: "lb"
    });

    expect(result.casesBySpace).toBe(112);
    expect(result.casesByWeight).toBe(88);
    expect(result.totalCases).toBe(88);
  });

  it("calculates container loading by orientation and payload", () => {
    const result = calculateContainerLoading({
      itemLength: 24,
      itemWidth: 20,
      itemHeight: 20,
      itemWeight: 45,
      containerLength: 232,
      containerWidth: 92,
      containerHeight: 94,
      maxPayload: 48000,
      dimensionUnit: "in",
      weightUnit: "lb"
    });

    expect(result.unitsBySpace).toBe(144);
    expect(result.unitsByPayload).toBe(1066);
    expect(result.estimatedUnits).toBe(result.unitsBySpace);
  });

  it("calculates cartons per container with fill efficiency", () => {
    const result = calculateCartonsPerContainer({
      cartonLength: 16,
      cartonWidth: 12,
      cartonHeight: 10,
      containerLength: 475,
      containerWidth: 92,
      containerHeight: 94,
      fillEfficiency: 85,
      dimensionUnit: "in"
    });

    expect(result.theoreticalCartons).toBeGreaterThan(2000);
    expect(result.adjustedCartons).toBeLessThan(result.theoreticalCartons);
  });

  it("estimates warehouse floor space from pallet count and aisle factor", () => {
    const result = calculateWarehouseSpace({
      palletCount: 250,
      palletLength: 48,
      palletWidth: 40,
      stackLevels: 2,
      aisleFactor: 1.45,
      dimensionUnit: "in"
    });

    expect(result.storagePositions).toBe(125);
    expect(result.floorAreaFt2).toBeCloseTo(2416.67, 2);
  });

  it("estimates pallet storage positions and bay count", () => {
    const result = calculatePalletStorage({
      pallets: 360,
      palletsPerBay: 2,
      rackLevels: 4,
      targetOccupancy: 90,
      bayWidth: 96,
      bayDepth: 42,
      dimensionUnit: "in"
    });

    expect(result.requiredPositions).toBe(400);
    expect(result.requiredBays).toBe(50);
    expect(result.estimatedRackFootprintFt2).toBeCloseTo(1400, 2);
  });
});
