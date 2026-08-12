import React from "react";
import { useApp } from "../context/AppContext";
import MaintenanceScreen from "./ui/MaintenanceScreen";

export default function MaintenanceGate({ children }) {
  const { settings, isSettingsLoading } = useApp();

  // If initial settings are loading, show dark backdrop while checking gate
  if (isSettingsLoading && !settings) {
    return <div className="h-screen w-full bg-[#07080A]" />;
  }

  // If Maintenance Mode is enabled in live MongoDB settings
  if (settings && settings.maintenanceMode === true) {
    return <MaintenanceScreen settings={settings} />;
  }

  // Render normal website
  return children;
}
