import { LifxStateContext } from "@/hooks/useLifxState";
import { lights, setLightState, togglePower } from "@/lib/elysia";
import type { HSLBK } from "@/lib/types";
import { createColorBody, createWhiteBody } from "@/lib/utils";
import { Power, type Group } from "@server/types";
import type { ReactNode } from "react";
import { useReducer } from "react";

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
  }: {
    hslbk: HSLBK;
    groupId: string;
    lightId: string;
  }) => {
    dispatchLifx({
      type: "set hslbk",
      payload: { groupId, lightId, hslbk },
    });
    if (hslbk.saturation === 0) {
      await setLightState({ id: lightId, color: createWhiteBody(hslbk) });
    } else {
      await setLightState({ id: lightId, color: createColorBody(hslbk) });
    }
  };

  return (
    <LifxStateContext.Provider
      value={{
        lifxState,
        setHslbk,
        toggleSwitch,
      }}
    >
      {children}
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
            newLight.lightness = action.payload.hslbk.lightness;
            newLight.brightness = action.payload.hslbk.brightness;
            newLight.power = Power.ON;
            return newLight;
          });
        }

        return g;
      });
  }
}
