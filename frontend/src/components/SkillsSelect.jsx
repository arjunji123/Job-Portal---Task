import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

const skills = [
  { label: "JavaScript", value: "JavaScript" },
  { label: "React", value: "React" },
  { label: "Node.js", value: "Node.js" },
  { label: "CSS", value: "CSS" },
];

const SkillsSelect = ({ control, name }) => {
  return (
    <div className="w-full mb-6">
      <label htmlFor={name} className="font-medium flex">
        Select Your Skills
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={[]} // can be jobData.skills if passed down
        render={({ field }) => (
          <Select
            {...field}
            isMulti
            options={skills}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Select skills"
            isSearchable
            value={skills.filter((skill) =>
              field.value?.some((val) => val.value === skill.value)
            )} // make sure selected options are objects from the options array
            onChange={(selected) => field.onChange(selected)}
          />
        )}
      />
    </div>
  );
};

export default SkillsSelect;
