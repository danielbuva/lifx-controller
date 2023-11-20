import { useLightsData } from "../../hooks/get";
import { useToggle } from "../../hooks/post";

export default function LightList() {
  const { data } = useLightsData();
  const toggleLight = useToggle();

  if (!data) return null;

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <p>{item.label}</p>
          <p>{item.power}</p>
          <button onClick={() => toggleLight(item.id)}>
            toggle power
          </button>
        </div>
      ))}
    </div>
  );
}
