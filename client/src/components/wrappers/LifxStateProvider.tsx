import { LifxStateContext } from "@/hooks/useLifxState";
import { lights, setLightState, togglePower } from "@/lib/elysia";
import type { HSLBK } from "@/lib/types";
import { createColorBody, createWhiteBody } from "@/lib/utils";
import { Power, type Group } from "@server/types";
import type { ReactNode } from "react";
import { useReducer, useState } from "react";

import Layout from "./Layout";

type SetSwitchState = {
  type: "set hslbk";
  payload: {
    groupId: string;
    lightId: string;
    hslbk: HSLBK;
  };
};

type TogglePower = {
  type: "toggle power";
  payload: {
    groupId: string;
    lightId: string;
  };
};

export type LifxAction = SetSwitchState | TogglePower;

export default function LifxStateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [lifxState, dispatchLifx] = useReducer(lifxReducer, lights ?? []);
  const [activeLightIndices, setActiveLightIndices] = useState<{
    groupI: number;
    lightI: number;
  } | null>(null);

  const toggleSwitch = async ({
    type,
    groupId,
    lightId,
  }: {
    type: "group" | "light";
    lightId: string;
    groupId: string;
  }) => {
    dispatchLifx({ type: "toggle power", payload: { groupId, lightId } });
    if (type === "group") {
      await togglePower("group:" + groupId);
    } else {
      await togglePower("id:" + lightId);
    }
  };

  const setHslbk = async ({
    hslbk,
    groupId,
    lightId,
    isColor,
  }: {
    hslbk: HSLBK;
    groupId: string;
    lightId: string;
    isColor: boolean;
  }) => {
    dispatchLifx({
      type: "set hslbk",
      payload: { groupId, lightId, hslbk },
    });
    if (isColor) {
      await setLightState({ id: lightId, color: createColorBody(hslbk) });
    } else {
      await setLightState({ id: lightId, color: createWhiteBody(hslbk) });
    }
  };

  return (
    <LifxStateContext.Provider
      value={{
        lifxState,
        setHslbk,
        toggleSwitch,
        activeLightIndices,
        setActiveLightIndices,
      }}
    >
      <Layout>{children}</Layout>
    </LifxStateContext.Provider>
  );
}

function lifxReducer(state: Group[], action: LifxAction) {
  if (state.length === 0) return state;
  const newState = [...state];
  switch (action.type) {
    case "toggle power":
      return newState.map((g, i) => {
        if (g.groupId !== action.payload.groupId) return g;

        const currentGroup = state[i];
        if (currentGroup) {
          g.lights = currentGroup.lights.map((l) => {
            if (l.id !== action.payload.lightId) return l;
            const newLight = { ...l };
            newLight.power = l.power === Power.ON ? Power.OFF : Power.ON;

            return newLight;
          });
        }
        return g;
      });

    case "set hslbk":
      return newState.map((g, i) => {
        if (g.groupId !== action.payload.groupId) return g;

        const currentGroup = state[i];
        if (currentGroup) {
          g.lights = currentGroup.lights.map((l) => {
            if (l.id !== action.payload.lightId) return l;
            const newLight = { ...l };
            newLight.color = { ...l.color };
            newLight.color.hue = action.payload.hslbk.hue;
            newLight.color.saturation = action.payload.hslbk.saturation;
            newLight.color.lightness = action.payload.hslbk.lightness;
            newLight.brightness = action.payload.hslbk.brightness;
            newLight.power = Power.ON;
            return newLight;
          });
        }

        return g;
      });
  }
}
