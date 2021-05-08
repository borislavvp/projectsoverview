import { inject } from "@vue/composition-api";
import { PdfManagerInjectionKey } from "./types/PdfManagerInjectionKey";

export function usePdfManager() {
  const manager = inject(PdfManagerInjectionKey);

  if (manager === undefined) throw new Error("Pdf manager not available.");

  return manager;
}