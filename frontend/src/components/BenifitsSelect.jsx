import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

// Benefits options
const benefitsOptions = [
  { value: "Health Insurance", label: "Health Insurance" },
  { value: "Paid Time Off", label: "Paid Time Off" },
  { value: "Retirement Plan", label: "Retirement Plan" },
  { value: "Work From Home", label: "Work From Home" },
];

const BenefitsSelect = ({ control, name }) => {
  return (
    <div className="w-full mb-6">
      <label htmlFor={name} className="font-medium flex">
        Benefits
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <Select
            {...field}
            isMulti
            options={benefitsOptions}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Select benefits"
            isSearchable
            onChange={(selected) => field.onChange(selected)}
          />
        )}
      />
    </div>
  );
};

export default BenefitsSelect;
