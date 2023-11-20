import "./App.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "./global";

type LightsResponse = Promise<
  {
    brightness: number;
    color: { hue: number; saturation: number; kelvin: number };
    connected: boolean;
    effect: string;
    group: { id: string; name: string };
    label: string;
    last_seen: string;
    location: { id: string; name: string };
    id: string;
    power: "on" | "off";
    seconds_since_seen: number;
    uuid: string;
  }[]
>;

function App() {
  const { data } = useQuery({
    queryKey: ["lightData"],
    queryFn: () =>
      fetch("http://localhost:3000/lights", {}).then(
        (res) => res.json() as LightsResponse
      ),
  });

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `http://localhost:3000/lights/id:${id}/toggle`,
        {
          method: "POST",
          body: JSON.stringify({ duration: 0.5 }),
        }
      );

      const responseBody = await response.json();

      if (!response.ok) throw responseBody;

      return responseBody;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });

  return (
    <div>
      {data &&
        data.map((item) => (
          <div key={item.id}>
            <p>id: {item.id}</p>
            <p>{item.label}</p>
            <p>{item.power}</p>
            <button onClick={() => mutation.mutate(item.id)}>
              toggle power
            </button>
          </div>
        ))}
    </div>
  );
}

export default App;
