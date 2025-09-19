import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import StageFarmSimulator from "./stage-farm-simulator";
import "./styles/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StageFarmSimulator />
  </StrictMode>
);
