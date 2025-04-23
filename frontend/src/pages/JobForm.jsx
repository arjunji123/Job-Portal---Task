import { useForm, Controller } from "react-hook-form";
import {
  useCreateDraftJobMutation,
  useCreateJobMutation,
} from "../services/jobApi";
import StateCityDropdown from "../components/StateCityDropdown";
import SkillsSelect from "../components/SkillsSelect";
import BenefitsSelect from "../components/BenifitsSelect";
import { useNavigate } from "react-router-dom";

const JobForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
    getValues,
  } = useForm();
  const [createJob, { isLoading }] = useCreateJobMutation();
  const [createDraftJob] = useCreateDraftJobMutation();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const jobPayload = {
        ...data,
        skills: data.skills?.map((item) => item.value) || [],
        benefits: data.benefits?.map((item) => item.value) || [],
        status: "saved",
      };
      await createJob(jobPayload).unwrap();
      alert("Job Saved Successfully!");
      reset();
      navigate("/");
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Something went wrong!");
    }
  };
  const onSaveDraft = async (data) => {
    try {
      // Manually bypass validation here for the draft job
      const draftPayload = {
        ...data,
        skills: data.skills?.map((item) => item.value) || [],
        benefits: data.benefits?.map((item) => item.value) || [],
        status: "drafted", // Setting job status as 'draft'
      };
      console.log("Draft Payload Before API Call: ", draftPayload);

      // Remove the required fields for draft
      const filteredDraftPayload = {
        ...draftPayload,
        job_title: data.job_title || "",
        category: data.category || "",
        job_designation: data.job_designation || "",
        job_type: data.job_type || "",
        min_experience: data.min_experience || "",
        max_experience: data.max_experience || "",
        highest_qualification: data.highest_qualification || "",
        area: data.area || "",
        requirements: data.requirements || "",
        salary_type: data.salary_type || "",
        min_salary: data.min_salary || "",
        max_salary: data.max_salary || "",
      };

      // Call the API to save the draft job
      await createDraftJob(filteredDraftPayload).unwrap();
      alert("Job Saved as Draft Successfully!");
      reset(); // Reset the form to clear all values
      navigate("/");
    } catch (error) {
      console.error("Error saving draft job:", error);
      alert("Something went wrong while saving the draft!");
    }
  };

  return (
    <div className="jobs-list max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold mb-10 text-center text-indigo-700 tracking-tight">
        Add Job{" "}
      </h2>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
        <form className="space-y-4">
          <div className="w-full mb-6">
            <label htmlFor="job_title" className="font-medium flex">
              Job Title
            </label>
            <input
              {...register("job_title")}
              placeholder="Job Title"
              className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="w-full mb-6">
            <label htmlFor="category" className="font-medium flex">
              Category
            </label>
            <select
              {...register("category")}
              className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
            </select>
          </div>

          <div className="w-full mb-6">
            <label htmlFor="job_designation" className="font-medium flex">
              Job Designation
            </label>
            <textarea
              {...register("job_designation")}
              placeholder="Job Designation"
              className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="w-full mb-6">
            <label htmlFor="job_type" className="font-medium flex">
              Job Type
            </label>
            <select
              {...register("job_type")}
              className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Select Job Type
              </option>
              <option value="Remote">Remote</option>
              <option value="Onsite">Onsite</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="w-full">
              <label htmlFor="min_experience" className="font-medium flex">
                Min Experience
              </label>
              <select
                {...register("min_experience")}
                className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Min Experience
                </option>
                <option value="0-1">0-1 Years</option>
                <option value="1-3">1-3 Years</option>
                <option value="3-5">3-5 Years</option>
                <option value="5-10">5-10 Years</option>
                <option value="10+">10+ Years</option>
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="max_experience" className="font-medium flex">
                Max Experience
              </label>
              <select
                {...register("max_experience")}
                className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Max Experience
                </option>
                <option value="1">1 Year</option>
                <option value="3">3 Years</option>
                <option value="5">5 Years</option>
                <option value="10">10 Years</option>
                <option value="15">15+ Years</option>
              </select>
            </div>
          </div>

          <div className="w-full mb-6">
            <label htmlFor="highest_qualification" className="font-medium flex">
              Highest Qualification
            </label>
            <select
              {...register("highest_qualification")}
              className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Select Highest Qualification
              </option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="MBA">MBA</option>
              <option value="B.Sc">B.Sc</option>
              <option value="M.Sc">M.Sc</option>
              <option value="B.Com">B.Com</option>
              <option value="M.Com">M.Com</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <StateCityDropdown register={register} setValue={setValue} />

          <div className="w-full mb-6">
            <label htmlFor="area" className="font-medium flex">
              Area (Optional)
            </label>
            <input
              type="text"
              {...register("area")}
              placeholder="Area (Optional)"
              className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="w-full mb-6">
            <label htmlFor="requirements" className="font-medium flex">
              No. of Vacancies
            </label>
            <input
              type="number"
              {...register("requirements", {
                valueAsNumber: true,
              })}
              placeholder="No. of Vacancies"
              className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              min="0"
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              }
            />
          </div>

          <div className="w-full mb-6">
            <label htmlFor="salary_type" className="font-medium flex">
              Salary Type
            </label>
            <select
              {...register("salary_type")}
              className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Salary Type</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
              <option value="Hourly">Hourly</option>
            </select>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="w-full">
              <label htmlFor="min_salary" className="font-medium flex">
                Min Salary
              </label>
              <select
                {...register("min_salary")}
                className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Min Salary
                </option>
                <option value="30000">30,000</option>
                <option value="40000">40,000</option>
                <option value="50000">50,000</option>
                <option value="60000">60,000</option>
                <option value="70000">70,000</option>
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="max_salary" className="font-medium flex">
                Max Salary
              </label>
              <select
                {...register("max_salary")}
                className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Max Salary
                </option>
                <option value="40000">40,000</option>
                <option value="50000">50,000</option>
                <option value="60000">60,000</option>
                <option value="70000">70,000</option>
                <option value="80000">80,000</option>
              </select>
            </div>
          </div>
          <div className="w-full mb-6">
            <label htmlFor="job_description" className="font-medium flex">
              Job Description
            </label>
            <textarea
              {...register("job_description")}
              placeholder="Job Description"
              className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-4 mb-6">
            <div className="w-1/2">
              <Controller
                name="skills"
                control={control} // Ensure control is passed correctly here
                render={({ field }) => (
                  <SkillsSelect {...field} control={control} />
                )}
              />
            </div>

            <div className="w-1/2">
              <Controller
                name="benefits"
                control={control} // Ensure control is passed correctly here
                render={({ field }) => (
                  <BenefitsSelect {...field} control={control} />
                )}
              />
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="w-full bg-blue-500 text-white p-2 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Job"}
            </button>
            <button
              type="button"
              onClick={() => onSaveDraft(getValues())} // Direct getValues se data lo
              className="w-full bg-gray-500 text-white p-2 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Saving Draft..." : "Save as Draft"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
