import { useState } from 'react';

import cn from 'classnames';

import { Button } from 'components/Button';

import StepsClasses from './Steps.module.scss';
import type { Step } from './Steps.type';

type StepsProps = {
  steps: Step[];
};

function Steps({ steps }: StepsProps) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className={StepsClasses.root}>
      <div className={StepsClasses.steps}>
        {steps.map((step, index) => {
          const inProgress = index === currentStep;
          const finished = index < currentStep;
          const waiting = index > currentStep;

          return (
            <div
              key={step.id}
              className={cn({
                [StepsClasses.stepInProgress]: inProgress,
                [StepsClasses.stepFinished]: finished,
                [StepsClasses.stepWaiting]: waiting
              })}
            >
              <span
                className={cn({
                  [StepsClasses.stepInProgressTitle]: inProgress,
                  [StepsClasses.stepFinishedTitle]: finished,
                  [StepsClasses.stepWaitingTitle]: waiting
                })}
              >{`${index + 1}. ${step.title}`}</span>
            </div>
          );
        })}
      </div>
      <div className={StepsClasses.currentStep}>
        {steps[currentStep] ? steps[currentStep].component : null}
      </div>
      <div className={StepsClasses.footer}>
        <p className={StepsClasses.footerHelperText}>
          * This information is mandatory
        </p>
        <div className={StepsClasses.controls}>
          <Button
            variant="ghost"
            color="default"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0}
          >
            Previous Step
          </Button>
          <Button
            variant="subtle"
            color="default"
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={currentStep === steps.length - 1}
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Steps;
