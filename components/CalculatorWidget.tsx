"use client";

import { useMemo, useState } from "react";
import type { CalculatorType } from "@/lib/calculator-content";
import {
  calculateActualVsDimensionalWeight,
  calculateCartonsPerContainer,
  calculateCasesPerPallet,
  calculateContainerLoading,
  calculateFreightClass,
  calculateFreightDensity,
  calculatePalletBuild,
  calculatePalletStorage,
  calculateWarehouseSpace,
  type DimensionUnit,
  type WeightUnit
} from "@/lib/calculations";

interface FieldConfig {
  name: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  help?: string;
}

interface CalculatorConfig {
  dimensionToggle: boolean;
  weightToggle: boolean;
  divisorPreset?: boolean;
  fields: FieldConfig[];
  defaults: Record<string, number>;
}

interface CalculatorWidgetProps {
  type: CalculatorType;
  title: string;
}

const configs: Record<CalculatorType, CalculatorConfig> = {
  "dimensional-weight": {
    dimensionToggle: true,
    weightToggle: true,
    divisorPreset: true,
    defaults: {
      length: 24,
      width: 18,
      height: 12,
      actualWeight: 22,
      divisor: 139
    },
    fields: [
      { name: "length", label: "Length", min: 0, step: 0.1 },
      { name: "width", label: "Width", min: 0, step: 0.1 },
      { name: "height", label: "Height", min: 0, step: 0.1 },
      { name: "actualWeight", label: "Actual weight", min: 0, step: 0.1 }
    ]
  },
  "actual-vs-dimensional-weight": {
    dimensionToggle: true,
    weightToggle: true,
    defaults: {
      actualWeight: 22,
      length: 24,
      width: 18,
      height: 12,
      divisor: 139
    },
    fields: [
      { name: "actualWeight", label: "Actual weight", min: 0, step: 0.1 },
      { name: "length", label: "Length", min: 0, step: 0.1 },
      { name: "width", label: "Width", min: 0, step: 0.1 },
      { name: "height", label: "Height", min: 0, step: 0.1 },
      { name: "divisor", label: "DIM divisor", min: 1, step: 1 }
    ]
  },
  "freight-density": {
    dimensionToggle: true,
    weightToggle: true,
    defaults: { weight: 480, length: 48, width: 40, height: 48 },
    fields: [
      { name: "length", label: "Length", min: 0, step: 0.1 },
      { name: "width", label: "Width", min: 0, step: 0.1 },
      { name: "height", label: "Height", min: 0, step: 0.1 },
      { name: "weight", label: "Total shipment weight", min: 0, step: 0.1 }
    ]
  },
  "freight-class": {
    dimensionToggle: true,
    weightToggle: true,
    defaults: { weight: 480, length: 48, width: 40, height: 48 },
    fields: [
      { name: "weight", label: "Shipment weight", min: 0, step: 0.1 },
      { name: "length", label: "Packed length", min: 0, step: 0.1 },
      { name: "width", label: "Packed width", min: 0, step: 0.1 },
      { name: "height", label: "Packed height", min: 0, step: 0.1 }
    ]
  },
  pallet: {
    dimensionToggle: true,
    weightToggle: false,
    defaults: {
      cartonLength: 12,
      cartonWidth: 10,
      cartonHeight: 8,
      palletLength: 48,
      palletWidth: 40,
      maxStackHeight: 56
    },
    fields: [
      { name: "cartonLength", label: "Carton length", min: 0, step: 0.1 },
      { name: "cartonWidth", label: "Carton width", min: 0, step: 0.1 },
      { name: "cartonHeight", label: "Carton height", min: 0, step: 0.1 },
      { name: "palletLength", label: "Pallet length", min: 0, step: 0.1 },
      { name: "palletWidth", label: "Pallet width", min: 0, step: 0.1 },
      { name: "maxStackHeight", label: "Usable stack height", min: 0, step: 0.1 }
    ]
  },
  "cases-per-pallet": {
    dimensionToggle: true,
    weightToggle: true,
    defaults: {
      caseLength: 12,
      caseWidth: 10,
      caseHeight: 8,
      caseWeight: 18,
      palletLength: 48,
      palletWidth: 40,
      maxStackHeight: 56,
      maxPalletWeight: 1600
    },
    fields: [
      { name: "caseLength", label: "Case length", min: 0, step: 0.1 },
      { name: "caseWidth", label: "Case width", min: 0, step: 0.1 },
      { name: "caseHeight", label: "Case height", min: 0, step: 0.1 },
      { name: "caseWeight", label: "Case weight", min: 0, step: 0.1 },
      { name: "palletLength", label: "Pallet length", min: 0, step: 0.1 },
      { name: "palletWidth", label: "Pallet width", min: 0, step: 0.1 },
      { name: "maxStackHeight", label: "Usable stack height", min: 0, step: 0.1 },
      { name: "maxPalletWeight", label: "Max pallet weight", min: 0, step: 1 }
    ]
  },
  "container-loading": {
    dimensionToggle: true,
    weightToggle: true,
    defaults: {
      itemLength: 24,
      itemWidth: 20,
      itemHeight: 20,
      itemWeight: 45,
      containerLength: 232,
      containerWidth: 92,
      containerHeight: 94,
      maxPayload: 48000
    },
    fields: [
      { name: "itemLength", label: "Item length", min: 0, step: 0.1 },
      { name: "itemWidth", label: "Item width", min: 0, step: 0.1 },
      { name: "itemHeight", label: "Item height", min: 0, step: 0.1 },
      { name: "itemWeight", label: "Item weight", min: 0, step: 0.1 },
      { name: "containerLength", label: "Container length", min: 0, step: 0.1 },
      { name: "containerWidth", label: "Container width", min: 0, step: 0.1 },
      { name: "containerHeight", label: "Container height", min: 0, step: 0.1 },
      { name: "maxPayload", label: "Max payload", min: 0, step: 1 }
    ]
  },
  "cartons-per-container": {
    dimensionToggle: true,
    weightToggle: false,
    defaults: {
      cartonLength: 16,
      cartonWidth: 12,
      cartonHeight: 10,
      containerLength: 475,
      containerWidth: 92,
      containerHeight: 94,
      fillEfficiency: 85
    },
    fields: [
      { name: "cartonLength", label: "Carton length", min: 0, step: 0.1 },
      { name: "cartonWidth", label: "Carton width", min: 0, step: 0.1 },
      { name: "cartonHeight", label: "Carton height", min: 0, step: 0.1 },
      { name: "containerLength", label: "Container length", min: 0, step: 0.1 },
      { name: "containerWidth", label: "Container width", min: 0, step: 0.1 },
      { name: "containerHeight", label: "Container height", min: 0, step: 0.1 },
      { name: "fillEfficiency", label: "Fill efficiency %", min: 1, max: 100, step: 1 }
    ]
  },
  "warehouse-space": {
    dimensionToggle: true,
    weightToggle: false,
    defaults: {
      palletCount: 250,
      palletLength: 48,
      palletWidth: 40,
      stackLevels: 2,
      aisleFactor: 1.45
    },
    fields: [
      { name: "palletCount", label: "Pallet count", min: 0, step: 1 },
      { name: "palletLength", label: "Pallet length", min: 0, step: 0.1 },
      { name: "palletWidth", label: "Pallet width", min: 0, step: 0.1 },
      { name: "stackLevels", label: "Stack levels", min: 1, step: 1 },
      { name: "aisleFactor", label: "Aisle factor", min: 1, step: 0.05 }
    ]
  },
  "pallet-storage": {
    dimensionToggle: true,
    weightToggle: false,
    defaults: {
      pallets: 360,
      palletsPerBay: 2,
      rackLevels: 4,
      targetOccupancy: 90,
      bayWidth: 96,
      bayDepth: 42
    },
    fields: [
      { name: "pallets", label: "Pallets to store", min: 0, step: 1 },
      { name: "palletsPerBay", label: "Pallets per bay", min: 1, step: 1 },
      { name: "rackLevels", label: "Rack levels", min: 1, step: 1 },
      { name: "targetOccupancy", label: "Target occupancy %", min: 1, max: 100, step: 1 },
      { name: "bayWidth", label: "Bay width", min: 0, step: 0.1 },
      { name: "bayDepth", label: "Bay depth", min: 0, step: 0.1 }
    ]
  }
};

function defaultDivisor(dimensionUnit: DimensionUnit, weightUnit: WeightUnit) {
  if (dimensionUnit === "in" && weightUnit === "lb") return 139;
  if (dimensionUnit === "in" && weightUnit === "kg") return 306.4;
  if (dimensionUnit === "cm" && weightUnit === "lb") return 2268;
  return 5000;
}

function format(value: number, digits = 1) {
  const minimumFractionDigits = digits > 0 && value > 0 && value < 10 ? 1 : 0;
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits
  }).format(value);
}

function suffixForField(
  name: string,
  dimensionUnit: DimensionUnit,
  weightUnit: WeightUnit
) {
  if (name.toLowerCase().includes("weight") || name === "maxPayload") {
    return weightUnit;
  }
  if (
    name.toLowerCase().includes("length") ||
    name.toLowerCase().includes("width") ||
    name.toLowerCase().includes("height") ||
    name.toLowerCase().includes("depth")
  ) {
    return dimensionUnit;
  }
  return "";
}

function ResultRow({
  label,
  value,
  emphasis = false
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex items-start justify-between gap-4 border-b border-white/15 py-3 last:border-0 ${
        emphasis ? "text-white" : "text-slate-200"
      }`}
    >
      <span className="text-sm font-medium">{label}</span>
      <strong
        className={`text-right ${
          emphasis ? "text-xl font-black" : "text-base font-bold"
        }`}
      >
        {value}
      </strong>
    </div>
  );
}

export function CalculatorWidget({ type, title }: CalculatorWidgetProps) {
  const config = configs[type];
  const [dimensionUnit, setDimensionUnit] = useState<DimensionUnit>("in");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("lb");
  const [divisorPreset, setDivisorPreset] = useState<"139" | "166" | "custom">(
    "139"
  );
  const [values, setValues] = useState<Record<string, number>>(config.defaults);

  const validationMessages = config.fields
    .filter((field) => {
      const value = values[field.name];
      return (
        !Number.isFinite(value) ||
        value <= 0 ||
        (field.max !== undefined && value > field.max)
      );
    })
    .map((field) => `${field.label} must be ${field.max ? `between ${field.min ?? 0} and ${field.max}` : "greater than zero"}.`);

  const result = useMemo(() => {
    switch (type) {
      case "dimensional-weight":
        return calculateActualVsDimensionalWeight({
          actualWeight: values.actualWeight,
          length: values.length,
          width: values.width,
          height: values.height,
          divisor: values.divisor,
          dimensionUnit,
          weightUnit
        });
      case "actual-vs-dimensional-weight":
        return calculateActualVsDimensionalWeight({
          actualWeight: values.actualWeight,
          length: values.length,
          width: values.width,
          height: values.height,
          divisor: values.divisor,
          dimensionUnit,
          weightUnit
        });
      case "freight-density":
        return calculateFreightDensity({
          weight: values.weight,
          length: values.length,
          width: values.width,
          height: values.height,
          dimensionUnit,
          weightUnit
        });
      case "freight-class":
        return calculateFreightClass({
          weight: values.weight,
          length: values.length,
          width: values.width,
          height: values.height,
          dimensionUnit,
          weightUnit
        });
      case "pallet":
        return calculatePalletBuild({
          cartonLength: values.cartonLength,
          cartonWidth: values.cartonWidth,
          cartonHeight: values.cartonHeight,
          palletLength: values.palletLength,
          palletWidth: values.palletWidth,
          maxStackHeight: values.maxStackHeight,
          dimensionUnit
        });
      case "cases-per-pallet":
        return calculateCasesPerPallet({
          caseLength: values.caseLength,
          caseWidth: values.caseWidth,
          caseHeight: values.caseHeight,
          caseWeight: values.caseWeight,
          palletLength: values.palletLength,
          palletWidth: values.palletWidth,
          maxStackHeight: values.maxStackHeight,
          maxPalletWeight: values.maxPalletWeight,
          dimensionUnit,
          weightUnit
        });
      case "container-loading":
        return calculateContainerLoading({
          itemLength: values.itemLength,
          itemWidth: values.itemWidth,
          itemHeight: values.itemHeight,
          itemWeight: values.itemWeight,
          containerLength: values.containerLength,
          containerWidth: values.containerWidth,
          containerHeight: values.containerHeight,
          maxPayload: values.maxPayload,
          dimensionUnit,
          weightUnit
        });
      case "cartons-per-container":
        return calculateCartonsPerContainer({
          cartonLength: values.cartonLength,
          cartonWidth: values.cartonWidth,
          cartonHeight: values.cartonHeight,
          containerLength: values.containerLength,
          containerWidth: values.containerWidth,
          containerHeight: values.containerHeight,
          fillEfficiency: values.fillEfficiency,
          dimensionUnit
        });
      case "warehouse-space":
        return calculateWarehouseSpace({
          palletCount: values.palletCount,
          palletLength: values.palletLength,
          palletWidth: values.palletWidth,
          stackLevels: values.stackLevels,
          aisleFactor: values.aisleFactor,
          dimensionUnit
        });
      case "pallet-storage":
        return calculatePalletStorage({
          pallets: values.pallets,
          palletsPerBay: values.palletsPerBay,
          rackLevels: values.rackLevels,
          targetOccupancy: values.targetOccupancy,
          bayWidth: values.bayWidth,
          bayDepth: values.bayDepth,
          dimensionUnit
        });
    }
  }, [dimensionUnit, type, values, weightUnit]);

  function updateValue(name: string, value: string) {
    setValues((current) => ({
      ...current,
      [name]: Number(value)
    }));
  }

  function reset() {
    setDimensionUnit("in");
    setWeightUnit("lb");
    setDivisorPreset("139");
    setValues(config.defaults);
  }

  function changeDimensionUnit(nextUnit: DimensionUnit) {
    setDimensionUnit(nextUnit);
    if ("divisor" in values && !(config.divisorPreset && divisorPreset !== "custom")) {
      setValues((current) => ({
        ...current,
        divisor: defaultDivisor(nextUnit, weightUnit)
      }));
    }
  }

  function changeWeightUnit(nextUnit: WeightUnit) {
    setWeightUnit(nextUnit);
    if ("divisor" in values && !(config.divisorPreset && divisorPreset !== "custom")) {
      setValues((current) => ({
        ...current,
        divisor: defaultDivisor(dimensionUnit, nextUnit)
      }));
    }
  }

  return (
    <section
      aria-label={`${title} tool`}
      className="overflow-hidden rounded-xl border border-line bg-white shadow-soft"
      id="calculator"
    >
      <div className="flex flex-col gap-4 border-b border-line bg-ink px-5 py-4 text-white md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-100">
            Interactive calculator
          </p>
          <h2 className="mt-1 text-2xl font-black text-white">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-200">
            Enter values below and get an immediate planning estimate.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {config.dimensionToggle ? (
            <UnitToggle
              label="Dimensions"
              options={[
                { label: "inches", value: "in" },
                { label: "cm", value: "cm" }
              ]}
              value={dimensionUnit}
              onChange={(value) => changeDimensionUnit(value as DimensionUnit)}
            />
          ) : null}
          {config.weightToggle ? (
            <UnitToggle
              label="Weight"
              options={[
                { label: "lb", value: "lb" },
                { label: "kg", value: "kg" }
              ]}
              value={weightUnit}
              onChange={(value) => changeWeightUnit(value as WeightUnit)}
            />
          ) : null}
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-5">
          {config.divisorPreset ? (
            <DivisorPresetControl
              preset={divisorPreset}
              value={values.divisor}
              onPresetChange={(preset) => {
                setDivisorPreset(preset);
                if (preset !== "custom") {
                  setValues((current) => ({
                    ...current,
                    divisor: Number(preset)
                  }));
                }
              }}
              onValueChange={(value) => updateValue("divisor", value)}
            />
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2">
            {config.fields.map((field) => (
              <label className="block" key={field.name}>
                <span className="text-xs font-semibold uppercase tracking-wide text-steel">
                  {field.label}
                </span>
                <div className="mt-1 flex rounded-md border border-line bg-white shadow-sm transition focus-within:border-mint focus-within:ring-2 focus-within:ring-mint/10">
                  <input
                    className="focus-ring min-w-0 flex-1 rounded-l-md px-3 py-2.5 text-base font-semibold text-ink"
                    inputMode="decimal"
                    max={field.max}
                    min={field.min}
                    onChange={(event) => updateValue(field.name, event.target.value)}
                    step={field.step ?? 0.1}
                    type="number"
                    value={Number.isFinite(values[field.name]) ? values[field.name] : ""}
                  />
                  {suffixForField(field.name, dimensionUnit, weightUnit) ? (
                    <span className="flex min-w-12 items-center justify-center border-l border-line bg-paper px-3 text-xs font-semibold text-steel">
                      {suffixForField(field.name, dimensionUnit, weightUnit)}
                    </span>
                  ) : null}
                </div>
                {field.help ? (
                  <span className="mt-1 block text-xs text-steel">{field.help}</span>
                ) : null}
              </label>
            ))}
          </div>
          {validationMessages.length > 0 ? (
            <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              {validationMessages[0]}
            </div>
          ) : null}
          <button
            className="focus-ring mt-5 rounded-md border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-mint hover:text-mint"
            onClick={reset}
            type="button"
          >
            Reset
          </button>
        </div>

        <div className="border-t border-line bg-mint p-5 text-white lg:border-l lg:border-t-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-50">
            Output
          </p>
          <h3 className="mt-1 text-2xl font-black">Estimated result</h3>
          <ResultDetails
            dimensionUnit={dimensionUnit}
            result={result}
            type={type}
            weightUnit={weightUnit}
          />
          <p className="mt-5 rounded-md border border-white/10 bg-white/10 p-3 text-xs leading-5 text-slate-200">
            {type === "freight-class"
              ? "Freight class may also depend on handling, stowability, and liability. This calculator gives a density-based estimate only."
              : "Results are estimates. Always confirm carrier, NMFC, warehouse, or loading requirements before making shipping decisions."}
          </p>
        </div>
      </div>
    </section>
  );
}

function UnitToggle({
  label,
  options,
  value,
  onChange
}: {
  label: string;
  options: Array<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded-md border border-white/15 bg-white/10 p-1">
      <span className="sr-only">{label}</span>
      {options.map((option) => (
        <button
          className={`focus-ring rounded px-3 py-1.5 text-sm font-semibold ${
            value === option.value
              ? "bg-white text-ink shadow-sm"
              : "text-slate-200 hover:bg-white/10 hover:text-white"
          }`}
          key={option.value}
          onClick={() => onChange(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function DivisorPresetControl({
  preset,
  value,
  onPresetChange,
  onValueChange
}: {
  preset: "139" | "166" | "custom";
  value: number;
  onPresetChange: (preset: "139" | "166" | "custom") => void;
  onValueChange: (value: string) => void;
}) {
  const options: Array<{ label: string; value: "139" | "166" | "custom" }> = [
    { label: "139", value: "139" },
    { label: "166", value: "166" },
    { label: "Custom", value: "custom" }
  ];

  return (
    <div className="mb-4 rounded-lg border border-line bg-white p-4 shadow-sm">
      <span className="text-xs font-semibold uppercase tracking-wide text-steel">
        DIM divisor preset
      </span>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            className={`focus-ring rounded-md px-3 py-2 text-sm font-semibold ${
              preset === option.value
                ? "bg-mint text-white shadow-sm"
                : "border border-line bg-white text-steel hover:border-mint hover:text-mint"
            }`}
            key={option.value}
            onClick={() => onPresetChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
      {preset === "custom" ? (
        <label className="mt-3 block">
          <span className="text-sm font-medium text-ink">Custom divisor</span>
          <input
            className="focus-ring mt-1 w-full rounded-md border border-line px-3 py-2 text-ink focus:border-mint"
            inputMode="decimal"
            min={1}
            onChange={(event) => onValueChange(event.target.value)}
            step={1}
            type="number"
            value={Number.isFinite(value) ? value : ""}
          />
        </label>
      ) : null}
      <p className="mt-2 text-xs leading-5 text-steel">
        139 and 166 are common inch/lb parcel divisors. Use Custom when your
        carrier agreement or metric calculation uses a different divisor.
      </p>
    </div>
  );
}

function ResultDetails({
  type,
  result,
  dimensionUnit,
  weightUnit
}: {
  type: CalculatorType;
  // The calculator type controls the result shape in the switch below.
  // Keeping this local avoids a large discriminated wrapper around pure math functions.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: any;
  dimensionUnit: DimensionUnit;
  weightUnit: WeightUnit;
}) {
  if (type === "freight-class") {
    return (
      <div className="mt-4">
        <ResultRow label="Cubic feet" value={`${format(result.cubicFeet, 2)} cu ft`} />
        <ResultRow
          label="Freight density"
          value={`${format(result.densityLbPerFt3, 2)} lb/cu ft`}
        />
        <ResultRow
          emphasis
          label="Estimated freight class"
          value={`Class ${result.estimatedClass}`}
        />
      </div>
    );
  }

  if (type === "freight-density") {
    return (
      <div className="mt-4">
        <ResultRow label="Cubic feet" value={`${format(result.cubicFeet, 2)} cu ft`} />
        <ResultRow
          emphasis
          label="Density in lb/ft³"
          value={`${format(result.densityLbPerFt3, 2)} lb/cu ft`}
        />
        <div className="mt-4 rounded-md bg-white/10 p-3 text-sm leading-6 text-slate-200">
          Higher density often means lower estimated freight class. For a
          density-based class estimate, use the{" "}
          <a
            className="font-semibold text-white underline"
            href="/calculators/freight-class-calculator"
          >
            Freight Class Calculator
          </a>
          .
        </div>
      </div>
    );
  }

  switch (type) {
    case "dimensional-weight":
      return (
        <div className="mt-4">
          <ResultRow
            emphasis
            label="Billable weight"
            value={`${format(result.roundedBillableWeight, 0)} ${weightUnit}`}
          />
          <ResultRow
            label="Dimensional weight"
            value={`${format(result.roundedDimensionalWeight, 0)} ${weightUnit}`}
          />
          <ResultRow
            label="Actual weight"
            value={`${format(result.roundedActualWeight, 0)} ${weightUnit}`}
          />
          <ResultRow
            label="Cubic volume"
            value={`${format(result.volume, 0)} ${dimensionUnit}³`}
          />
        </div>
      );
    case "actual-vs-dimensional-weight":
      return (
        <div className="mt-4">
          <ResultRow
            emphasis
            label="Estimated billable weight"
            value={`${format(result.roundedBillableWeight, 0)} ${weightUnit}`}
          />
          <ResultRow
            label="Billing driver"
            value={result.billableSource === "dimensional" ? "Dimensional" : "Actual"}
          />
          <ResultRow
            label="Dimensional weight"
            value={`${format(result.roundedDimensionalWeight, 0)} ${weightUnit}`}
          />
        </div>
      );
    case "__unused_freight_density" as never:
      return (
        <div className="mt-4">
          <ResultRow
            emphasis
            label="Freight density"
            value={`${format(result.densityLbPerFt3, 2)} lb/ft³`}
          />
          <ResultRow
            label="Metric density"
            value={`${format(result.densityKgPerM3, 1)} kg/m³`}
          />
          <ResultRow label="Cube" value={`${format(result.cubicFeet, 2)} ft³`} />
        </div>
      );
    case "__unused_freight_class" as never:
      return (
        <div className="mt-4">
          <ResultRow
            label="Cubic feet"
            value={`${format(result.cubicFeet, 2)} cu ft`}
          />
          <ResultRow
            label="Freight density"
            value={`${format(result.densityLbPerFt3, 2)} lb/ft³`}
          />
          <ResultRow label="Cube" value={`${format(result.cubicFeet, 2)} ft³`} />
        </div>
      );
    case "pallet":
      return (
        <div className="mt-4">
          <ResultRow
            emphasis
            label="Total cartons per pallet"
            value={format(result.totalCartons, 0)}
          />
          <ResultRow label="Cartons per layer" value={format(result.cartonsPerLayer, 0)} />
          <ResultRow label="Layers" value={format(result.layers, 0)} />
          <ResultRow
            label="Footprint use"
            value={`${format(result.footprintUtilization * 100, 1)}%`}
          />
        </div>
      );
    case "cases-per-pallet":
      return (
        <div className="mt-4">
          <ResultRow
            emphasis
            label="Estimated cases per pallet"
            value={format(result.totalCases, 0)}
          />
          <ResultRow label="Cases by space" value={format(result.casesBySpace, 0)} />
          <ResultRow label="Cases by weight" value={format(result.casesByWeight, 0)} />
          <ResultRow label="Limiting factor" value={result.limitingFactor} />
        </div>
      );
    case "container-loading":
      return (
        <div className="mt-4">
          <ResultRow
            emphasis
            label="Estimated units"
            value={format(result.estimatedUnits, 0)}
          />
          <ResultRow label="Units by space" value={format(result.unitsBySpace, 0)} />
          <ResultRow label="Units by payload" value={format(result.unitsByPayload, 0)} />
          <ResultRow label="Limiting factor" value={result.limitingFactor} />
        </div>
      );
    case "cartons-per-container":
      return (
        <div className="mt-4">
          <ResultRow
            emphasis
            label="Adjusted cartons"
            value={format(result.adjustedCartons, 0)}
          />
          <ResultRow
            label="Theoretical cartons"
            value={format(result.theoreticalCartons, 0)}
          />
          <ResultRow
            label="Container volume"
            value={`${format(result.containerVolume, 0)} ${dimensionUnit}³`}
          />
        </div>
      );
    case "warehouse-space":
      return (
        <div className="mt-4">
          <ResultRow
            emphasis
            label="Estimated floor area"
            value={`${format(result.floorAreaFt2, 1)} ft²`}
          />
          <ResultRow
            label="Metric floor area"
            value={`${format(result.floorAreaM2, 1)} m²`}
          />
          <ResultRow
            label="Storage positions"
            value={format(result.storagePositions, 0)}
          />
        </div>
      );
    case "pallet-storage":
      return (
        <div className="mt-4">
          <ResultRow
            emphasis
            label="Required pallet positions"
            value={format(result.requiredPositions, 0)}
          />
          <ResultRow label="Required rack bays" value={format(result.requiredBays, 0)} />
          <ResultRow label="Positions per bay" value={format(result.positionsPerBay, 0)} />
          <ResultRow
            label="Rack footprint"
            value={`${format(result.estimatedRackFootprintFt2, 1)} ft²`}
          />
        </div>
      );
  }
}
