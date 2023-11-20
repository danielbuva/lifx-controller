import { useLightsData } from "../../hooks/get";
import { useToggle } from "../../hooks/post";

export default function LightList() {
  const { data } = useLightsData();
  const toggleLight = useToggle();

  return (
    <div>
      {data &&
        data.map((item) => (
          <div key={item.id}>
            <p>id: {item.id}</p>
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
