"use client"

export type LoggedError = {
  id: string;
  message: string;
  name?: string;
  stack?: string | null;
  url?: string;
  time: string;
  extra?: any;
};

const STORAGE_KEY = "learnai_errors";

function nowISO() {
  return new Date().toISOString();
}

export function logError(err: any, extra?: any) {
  try {
    const e: LoggedError = {
      id: String(Date.now()) + Math.random().toString(36).slice(2, 8),
      message: (err && err.message) || String(err) || "Unknown error",
      name: err && err.name,
      stack: err && err.stack ? String(err.stack) : null,
      url: typeof window !== "undefined" ? window.location.href : undefined,
      time: nowISO(),
      extra,
    };

    const raw = typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    const arr: LoggedError[] = raw ? JSON.parse(raw) : [];
    arr.unshift(e);
    // cap to 200 entries
    if (arr.length > 200) arr.length = 200;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    // also print to console
    // eslint-disable-next-line no-console
    console.error("[ErrorLogger]", e);
    return e;
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.error("[ErrorLogger] failed to log:", ex, err);
    return null;
  }
}

export function getErrors(): LoggedError[] {
  try {
    const raw = typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    return raw ? (JSON.parse(raw) as LoggedError[]) : [];
  } catch (ex) {
    return [];
  }
}

export function clearErrors() {
  try {
    if (typeof localStorage !== "undefined") localStorage.removeItem(STORAGE_KEY);
  } catch (ex) {
    // ignore
  }
}

export default { logError, getErrors, clearErrors };
