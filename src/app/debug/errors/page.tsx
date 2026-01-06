"use client"

import React, { useEffect, useState } from "react";
import errorLogger, { LoggedError } from "@/lib/errorLogger";
import { buttonVariants } from "@/components/ui/button";

export default function ErrorDebugPage() {
  const [errors, setErrors] = useState<LoggedError[]>([]);

  useEffect(() => {
    setErrors(errorLogger.getErrors());
  }, []);

  function refresh() {
    setErrors(errorLogger.getErrors());
  }

  function clearAll() {
    errorLogger.clearErrors();
    setErrors([]);
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Logged Client Errors</h1>
      <div className="mt-4 flex gap-2">
        <button className={buttonVariants()} onClick={refresh}>
          Refresh
        </button>
        <button className={buttonVariants({ variant: "destructive" })} onClick={clearAll}>
          Clear All
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {errors.length === 0 && <div className="text-sm text-muted-foreground">No client errors logged.</div>}
        {errors.map((e) => (
          <div key={e.id} className="border rounded p-3">
            <div className="flex justify-between">
              <div>
                <div className="font-mono text-sm">{e.time}</div>
                <div className="font-semibold">{e.message}</div>
                <div className="text-xs text-muted-foreground">{e.name}</div>
              </div>
            </div>
            {e.stack && (
              <pre className="mt-2 overflow-x-auto text-xs bg-slate-50 p-2 rounded">{e.stack}</pre>
            )}
            {e.extra && <pre className="mt-2 text-xs">{JSON.stringify(e.extra, null, 2)}</pre>}
          </div>
        ))}
      </div>
    </main>
  );
}
