import React from "react";
import { useApp } from "../context/AppContext";
import MaintenanceScreen from "./ui/MaintenanceScreen";

export default function MaintenanceGate({ children }) {
  const { settings } = useApp();

  // If Maintenance Mode is enabled in live MongoDB settings
  if (settings && settings.maintenanceMode === true) {
    return <MaintenanceScreen settings={settings} />;
  }

  // Render normal website immediately without waiting for settings API response
  return children;
}

