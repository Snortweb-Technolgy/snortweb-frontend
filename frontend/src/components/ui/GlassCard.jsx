import React from "react";

export default function GlassCard({ children, className = "", ...props }) {
  return (
    <div
      className={`border border-border-main bg-bg-primary dark:bg-bg-secondary p-6 transition-all duration-100 dark:rounded-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
