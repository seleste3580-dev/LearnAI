"use client"

import { useEffect } from "react";
import errorLogger from "@/lib/errorLogger";

export default function ErrorLoggerInit() {
  useEffect(() => {
    function onError(message: any, source?: string, lineno?: number, colno?: number, error?: any) {
      errorLogger.logError(error || message, { source, lineno, colno });
    }

    function onUnhandledRejection(ev: PromiseRejectionEvent) {
      errorLogger.logError(ev.reason || "UnhandledRejection", { promise: true });
    }

    window.addEventListener("error", (ev: ErrorEvent) => {
      onError(ev.message, ev.filename, ev.lineno, ev.colno, ev.error);
    });
    window.addEventListener("unhandledrejection", onUnhandledRejection as any);

    // expose a debug helper on window
    // @ts-ignore
    window.__learnai_get_errors = errorLogger.getErrors;

    return () => {
      window.removeEventListener("unhandledrejection", onUnhandledRejection as any);
    };
  }, []);

  return null;
}
