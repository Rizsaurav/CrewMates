import React from "react";
import { Link } from "react-router-dom";

export default function CrewmateCard({ crewmate }) {
  return (
    <div className="bg-card p-4 rounded-lg shadow-md border">
      <h2 className="text-xl font-bold">{crewmate.name}</h2>
      <p className="text-sm text-muted-foreground">Color: {crewmate.color}</p>
      <p className="text-sm text-muted-foreground">Speed: {crewmate.speed}</p>
      <Link to={`/crewmate/${crewmate.id}`}>
        <button className="btn mt-3">View</button>
      </Link>
    </div>
  );
}
