import React, { useState, useEffect, useRef } from "react";

interface StepObj {
  description: string;
  completed: boolean;
  highlighted: boolean;
  selected: boolean;
}

const Stepper = ({ steps, currentStepNumber }: any) => {
  const [stepperSteps, setStep] = useState([] as StepObj[]);
  const stepsStateRef = useRef();

  useEffect(() => {
    const stepsState = steps.map((step: string) => {
      return {
        description: step,
        completed: false,
        highlighted: false,
        selected: false,
      };
    });
    stepsStateRef.current = stepsState;
    const currentSteps = updateStep(currentStepNumber - 1, stepsState);
    setStep(currentSteps);
  }, [currentStepNumber, steps]);

  useEffect(() => {
    const currentSteps = updateStep(
      currentStepNumber - 1,
      stepsStateRef.current
    );
    setStep(currentSteps);
  }, [currentStepNumber]);

  function updateStep(stepNumber: number, steps: any) {
    const newSteps = [...steps];
    let stepCounter = 0;
    while (stepCounter < newSteps.length) {
      //current step
      if (stepCounter === stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: true,
          selected: true,
          completed: false,
        };
        stepCounter++;
      }
      // Past step
      else if (stepCounter < stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: true,
          completed: true,
        };
        stepCounter++;
      }
      // Future steps
      else {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: false,
          completed: false,
        };
        stepCounter++;
      }
    }
    return newSteps;
  }

  const stepsDisplay = stepperSteps.map((step: StepObj, index: number) => {
    return (
      <div
        key={index}
        className={
          index !== stepperSteps.length - 1
            ? "w-full flex items-center"
            : "flex items-center"
        }
      >
        <div className="relative flex flex-col items-center text-gray-600">
          <div
            className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${
              step.highlighted
                ? "bg-white border-sky-600 text-white"
                : step.completed
                ? "bg-sky-600 border-sky-600 text-white"
                : "bg-white"
            }`}
          >
            <span
              className={`text-sm h-12 w-12 py-3 ${
                step.highlighted
                  ? "text-sky-600"
                  : step.completed
                  ? "text-white"
                  : "text-gray-500"
              }`}
            >
              {index === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-bookmark "
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              ) : index === 1 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-user-plus "
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
              ) : index === 2 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="currentColor"
                  viewBox="0 0 340 340"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M92.5,340h155V0h-155V340z M112.5,20h115v60H180v20h47.5v60H160v20h67.5v60H180v20h47.5v60h-115V20z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-mail "
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              )}
            </span>
          </div>

          <div
            className={`absolute top-0 hidden sm:block text-center mt-16 w-32 text-xs font-medium uppercase ${
              step.highlighted ? "text-gray-600" : "text-gray-400"
            }`}
          >
            {step.description}
          </div>
        </div>
        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
            step.completed ? "border-sky-600" : "border-gray-300"
          }`}
        ></div>
      </div>
    );
  });

  return (
    <div className="mx-auto py-6 sm:p-6 max-w-4xl">
      <div className="flex justify-between items-center">{stepsDisplay}</div>
    </div>
  );
};
export default Stepper;
//Stepper.js
