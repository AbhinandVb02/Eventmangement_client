"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export function TimingSelector({
  value = "1 hours before",
  onChange,
  className = "",
}) {
  const parseValue = (val) => {
    const parts = val.split(" ");
    return {
      amount: parts[0] || "1",
      unit: parts[1] || "hours",
      relation: parts[2] || "before",
    };
  };

  const {
    amount: initialAmount,
    unit: initialUnit,
    relation: initialRelation,
  } = parseValue(value);

  const [amount, setAmount] = useState(initialAmount);
  const [unit, setUnit] = useState(initialUnit);
  const [relation, setRelation] = useState(initialRelation);

  const prevValueRef = useRef("");

  useEffect(() => {
    const newValue = `${amount} ${unit} ${relation}`;

    // Prevent unnecessary updates to avoid infinite loops
    if (prevValueRef.current !== newValue) {
      prevValueRef.current = newValue;
      onChange(newValue);
    }
  }, [amount, unit, relation, onChange]);

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {/* Amount Input */}
      <div className="relative">
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-20 h-10 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Unit Selector */}
      <div className="relative">
        <div className="relative">
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="h-10 pl-3 pr-10 text-sm bg-white border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary dark:bg-background"
          >
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </div>
      </div>

      {/* Relation Selector */}
      <div className="relative">
        <div className="relative">
          <select
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            className="h-10 pl-3 pr-10 text-sm bg-white border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary dark:bg-background"
          >
            <option value="before">Before</option>
            <option value="after">After</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">the event</div>
    </div>
  );
}
