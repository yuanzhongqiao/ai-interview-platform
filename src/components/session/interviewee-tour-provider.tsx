"use client";

import {
  getChatTourSteps,
  getIntervieweeUi,
  getVoiceTourSteps,
} from "@/lib/i18n/interviewee-ui";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { markTourCompleted, type IntervieweeTourStep } from "./interviewee-tour-steps";

interface TourLabels {
  skipTour: string;
  back: string;
  next: string;
  done: string;
  formatStepOf: (index: number, total: number) => string;
}

interface IntervieweeTourContextValue {
  active: boolean;
  finished: boolean;
  steps: IntervieweeTourStep[];
  currentStep: IntervieweeTourStep | null;
  stepIndex: number;
  totalSteps: number;
  labels: TourLabels;
  next: () => void;
  prev: () => void;
  skip: () => void;
  restart: () => void;
}

const IntervieweeTourContext =
  createContext<IntervieweeTourContextValue | null>(null);

export function useIntervieweeTour() {
  return useContext(IntervieweeTourContext);
}

export function IntervieweeTourProvider({
  mode,
  language,
  startImmediately = false,
  children,
}: {
  mode: "voice" | "chat";
  language?: string;
  /** Start the tour right away (used by the preview layout) */
  startImmediately?: boolean;
  children: React.ReactNode;
}) {
  const steps = useMemo(
    () =>
      mode === "voice"
        ? getVoiceTourSteps(language)
        : getChatTourSteps(language),
    [mode, language],
  );
  const labels = useMemo(() => {
    const ui = getIntervieweeUi(language);
    return {
      skipTour: ui.tour.skipTour,
      back: ui.tour.back,
      next: ui.tour.next,
      done: ui.tour.done,
      formatStepOf: ui.tour.formatStepOf,
    };
  }, [language]);

  const [active, setActive] = useState(false);
  const [finished, setFinished] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (startImmediately) {
      const timer = setTimeout(() => setActive(true), 600);
      return () => clearTimeout(timer);
    }
  }, [startImmediately]);

  const finish = useCallback(() => {
    setActive(false);
    setFinished(true);
    markTourCompleted();
  }, []);

  const findNextVisible = useCallback(
    (from: number, direction: 1 | -1): number | null => {
      let idx = from;
      while (idx >= 0 && idx < steps.length) {
        const step = steps[idx];
        if (!step.optional || document.querySelector(step.selector)) return idx;
        idx += direction;
      }
      return null;
    },
    [steps],
  );

  const next = useCallback(() => {
    const nextVisible = findNextVisible(stepIndex + 1, 1);
    if (nextVisible === null) {
      finish();
      return;
    }
    setStepIndex(nextVisible);
  }, [stepIndex, findNextVisible, finish]);

  const prev = useCallback(() => {
    const prevVisible = findNextVisible(stepIndex - 1, -1);
    if (prevVisible !== null) setStepIndex(prevVisible);
  }, [stepIndex, findNextVisible]);

  const skip = useCallback(() => {
    finish();
  }, [finish]);

  const restart = useCallback(() => {
    setStepIndex(0);
    setFinished(false);
    setActive(true);
  }, []);

  const currentStep = active ? (steps[stepIndex] ?? null) : null;

  const value = useMemo(
    () => ({
      active,
      finished,
      steps,
      currentStep,
      stepIndex,
      totalSteps: steps.length,
      labels,
      next,
      prev,
      skip,
      restart,
    }),
    [
      active,
      finished,
      steps,
      currentStep,
      stepIndex,
      labels,
      next,
      prev,
      skip,
      restart,
    ],
  );

  return (
    <IntervieweeTourContext.Provider value={value}>
      {children}
    </IntervieweeTourContext.Provider>
  );
}
