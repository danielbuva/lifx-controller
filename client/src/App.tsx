import "./App.css";
import { useQuery } from "@tanstack/react-query";

const token = import.meta.env.VITE_TOKEN;

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
      fetch("https://api.lifx.com/v1/lights/all", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json() as LightsResponse),
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
