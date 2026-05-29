export interface IntervieweeTourStep {
  id: string;
  selector: string;
  title: string;
  description: string;
  placement: "top" | "bottom" | "left" | "right";
  /** When true, this step is skipped if the target element is not in the DOM */
  optional?: boolean;
}

export const TOUR_STORAGE_KEY = "aural_interviewee_tour_done";

export function markTourCompleted(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TOUR_STORAGE_KEY, "true");
  } catch {
    // localStorage unavailable
  }
}
