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
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("http://localhost:3000/lights", {}).then(
        (res) => res.json() as LightsResponse
      ),
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://localhost:8000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseBody = await response.json();

      if (!response.ok) throw responseBody;

      return responseBody;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });

  console.log({ error, isPending });
  console.log(data);

  return (
    <div>
      {data &&
        data.map((item) => (
          <div key={item.id}>
            <p>{item.label}</p>
            <p>{item.power}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
