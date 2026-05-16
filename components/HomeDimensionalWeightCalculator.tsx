"use client";

import { useMemo, useState } from "react";
import {
  calculateActualVsDimensionalWeight,
  type DimensionUnit,
  type WeightUnit
} from "@/lib/calculations";

type Values = {
  length: number;
  width: number;
  height: number;
  actualWeight: number;
  divisor: number;
};

const defaultValues: Values = {
  length: 24,
  width: 18,
  height: 12,
  actualWeight: 22,
  divisor: 139
};

const scenarios: Array<{ label: string; values: Values }> = [
  {
    label: "Apparel box",
    values: { length: 18, width: 14, height: 8, actualWeight: 9, divisor: 139 }
  },
  {
    label: "Home goods",
    values: { length: 24, width: 18, height: 16, actualWeight: 18, divisor: 139 }
  },
  {
    label: "Bulky light item",
    values: { length: 32, width: 24, height: 18, actualWeight: 16, divisor: 139 }
  }
];

function format(value: number, digits = 0) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0
  }).format(value);
}

function defaultDivisor(dimensionUnit: DimensionUnit, weightUnit: WeightUnit) {
  if (dimensionUnit === "in" && weightUnit === "lb") return 139;
  if (dimensionUnit === "in" && weightUnit === "kg") return 306.4;
  if (dimensionUnit === "cm" && weightUnit === "lb") return 2268;
  return 5000;
}

function Field({
  label,
  name,
  suffix,
  value,
  onChange
}: {
  label: string;
  name: keyof Values;
  suffix: string;
  value: number;
  onChange: (name: keyof Values, value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-steel">
        {label}
      </span>
      <div className="mt-1 flex rounded-md border border-line bg-white shadow-sm transition focus-within:border-mint focus-within:ring-2 focus-within:ring-mint/10">
        <input
          className="min-w-0 flex-1 rounded-l-md px-3 py-2.5 text-base font-semibold text-ink outline-none"
          inputMode="decimal"
          min={name === "divisor" ? 1 : 0}
          onChange={(event) => onChange(name, event.target.value)}
          step={name === "divisor" ? 1 : 0.1}
          type="number"
          value={Number.isFinite(value) ? value : ""}
        />
        <span className="flex min-w-14 items-center justify-center border-l border-line bg-paper px-3 text-xs font-semibold text-steel">
          {suffix}
        </span>
      </div>
    </label>
  );
}

function Toggle({
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
    <div>
      <span className="text-xs font-semibold uppercase tracking-wide text-steel">
        {label}
      </span>
      <div className="mt-1 inline-flex rounded-md border border-line bg-white p-1 shadow-sm">
        {options.map((option) => (
          <button
            className={`rounded px-3 py-1.5 text-sm font-semibold transition ${
              value === option.value
                ? "bg-ink text-white"
                : "text-steel hover:text-mint"
            }`}
            key={option.value}
            onClick={() => onChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function HomeDimensionalWeightCalculator() {
  const [dimensionUnit, setDimensionUnit] = useState<DimensionUnit>("in");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("lb");
  const [divisorPreset, setDivisorPreset] = useState<"139" | "166" | "custom">(
    "139"
  );
  const [values, setValues] = useState<Values>(defaultValues);

  const result = useMemo(
    () =>
      calculateActualVsDimensionalWeight({
        ...values,
        dimensionUnit,
        weightUnit
      }),
    [dimensionUnit, values, weightUnit]
  );

  const invalidField = Object.entries(values).find(
    ([name, value]) => !Number.isFinite(value) || value <= (name === "divisor" ? 0 : 0)
  );
  const volumeLabel = dimensionUnit === "cm" ? "cubic cm" : "cubic in";
  const dimIsDriver = result.billableSource === "dimensional";

  function updateValue(name: keyof Values, value: string) {
    setValues((current) => ({
      ...current,
      [name]: Number(value)
    }));
  }

  function changeDimensionUnit(nextUnit: DimensionUnit) {
    setDimensionUnit(nextUnit);
    if (divisorPreset !== "custom") {
      setValues((current) => ({
        ...current,
        divisor: defaultDivisor(nextUnit, weightUnit)
      }));
    }
  }

  function changeWeightUnit(nextUnit: WeightUnit) {
    setWeightUnit(nextUnit);
    if (divisorPreset !== "custom") {
      setValues((current) => ({
        ...current,
        divisor: defaultDivisor(dimensionUnit, nextUnit)
      }));
    }
  }

  function reset() {
    setDimensionUnit("in");
    setWeightUnit("lb");
    setDivisorPreset("139");
    setValues(defaultValues);
  }

  return (
    <section
      aria-label="Dimensional Weight Calculator"
      className="overflow-hidden rounded-xl border border-line bg-white shadow-soft"
      id="calculator"
    >
      <div className="border-b border-line bg-ink px-5 py-4 text-white">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-100">
          Ecommerce shipping calculator
        </p>
        <h2 className="mt-1 text-2xl font-black">
          Dimensional Weight Calculator
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-200">
          Enter package details and compare actual, dimensional, and billable
          weight instantly.
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-5">
          <div className="flex flex-wrap gap-3">
            <Toggle
              label="Dimensions"
              onChange={(value) => changeDimensionUnit(value as DimensionUnit)}
              options={[
                { label: "inches", value: "in" },
                { label: "cm", value: "cm" }
              ]}
              value={dimensionUnit}
            />
            <Toggle
              label="Weight"
              onChange={(value) => changeWeightUnit(value as WeightUnit)}
              options={[
                { label: "lb", value: "lb" },
                { label: "kg", value: "kg" }
              ]}
              value={weightUnit}
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Field
              label="Length"
              name="length"
              onChange={updateValue}
              suffix={dimensionUnit}
              value={values.length}
            />
            <Field
              label="Width"
              name="width"
              onChange={updateValue}
              suffix={dimensionUnit}
              value={values.width}
            />
            <Field
              label="Height"
              name="height"
              onChange={updateValue}
              suffix={dimensionUnit}
              value={values.height}
            />
            <Field
              label="Actual weight"
              name="actualWeight"
              onChange={updateValue}
              suffix={weightUnit}
              value={values.actualWeight}
            />
          </div>

          <div className="mt-5 rounded-lg border border-line bg-paper p-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-steel">
              DIM divisor preset
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["139", "166", "custom"] as const).map((preset) => (
                <button
                  className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                    divisorPreset === preset
                      ? "bg-mint text-white"
                      : "border border-line bg-white text-steel hover:border-mint hover:text-mint"
                  }`}
                  key={preset}
                  onClick={() => {
                    setDivisorPreset(preset);
                    if (preset !== "custom") {
                      setValues((current) => ({
                        ...current,
                        divisor: Number(preset)
                      }));
                    }
                  }}
                  type="button"
                >
                  {preset === "custom" ? "Custom" : preset}
                </button>
              ))}
            </div>
            {divisorPreset === "custom" ? (
              <div className="mt-3 max-w-xs">
                <Field
                  label="Custom divisor"
                  name="divisor"
                  onChange={updateValue}
                  suffix="divisor"
                  value={values.divisor}
                />
              </div>
            ) : null}
          </div>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-steel">
              Try a package scenario
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {scenarios.map((scenario) => (
                <button
                  className="rounded-full border border-line bg-white px-3 py-2 text-sm font-semibold text-ink transition hover:border-mint hover:text-mint"
                  key={scenario.label}
                  onClick={() => {
                    setDimensionUnit("in");
                    setWeightUnit("lb");
                    setDivisorPreset("139");
                    setValues(scenario.values);
                  }}
                  type="button"
                >
                  {scenario.label}
                </button>
              ))}
            </div>
          </div>

          {invalidField ? (
            <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              Enter positive values for all dimensions, weight, and divisor.
            </div>
          ) : null}

          <button
            className="mt-5 rounded-md border border-line px-4 py-2 text-sm font-semibold text-ink transition hover:border-mint hover:text-mint"
            onClick={reset}
            type="button"
          >
            Reset
          </button>
        </div>

        <div className="border-t border-line bg-[#0f766e] p-5 text-white lg:border-l lg:border-t-0">
          <div className="rounded-lg bg-white/10 p-4">
            <p className="text-sm font-semibold text-teal-50">
              Estimated billable weight
            </p>
            <div className="mt-2 flex items-end gap-2">
              <strong className="text-5xl font-black leading-none">
                {format(result.roundedBillableWeight)}
              </strong>
              <span className="pb-1 text-lg font-bold">{weightUnit}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-teal-50">
              {dimIsDriver
                ? "Dimensional weight is higher than actual weight for this package."
                : "Actual weight is higher than dimensional weight for this package."}
            </p>
          </div>

          <dl className="mt-5 space-y-3">
            {[
              ["Dimensional weight", `${format(result.roundedDimensionalWeight)} ${weightUnit}`],
              ["Actual weight", `${format(result.roundedActualWeight)} ${weightUnit}`],
              ["Cubic volume", `${format(result.volume)} ${volumeLabel}`],
              ["Billing driver", dimIsDriver ? "Dimensional" : "Actual"]
            ].map(([label, value]) => (
              <div
                className="flex items-center justify-between gap-4 border-b border-white/20 pb-3 last:border-0"
                key={label}
              >
                <dt className="text-sm text-teal-50">{label}</dt>
                <dd className="text-right text-base font-bold">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 rounded-md bg-white/10 p-3 text-xs leading-5 text-teal-50">
            Results are estimates. Always confirm carrier, NMFC, warehouse, or
            loading requirements before making shipping decisions.
          </p>
        </div>
      </div>
    </section>
  );
}
