"use client"

import React from "react";
import errorLogger from "@/lib/errorLogger";

type Props = {
  children: React.ReactNode;
};

class Boundary extends React.Component<Props, { hasError: boolean; error?: any }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    errorLogger.logError(error, { reactInfo: info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <p className="mt-2 text-sm text-muted-foreground">The error has been logged to local storage for debugging.</p>
        </div>
      );
    }
    return this.props.children as React.ReactElement;
  }
}

export default function ErrorBoundary({ children }: Props) {
  return <Boundary>{children}</Boundary>;
}
