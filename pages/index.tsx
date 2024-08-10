import Text from "./src/component/atom/Text";
import { color } from "./src/utils/color-map";

export default function Home() {
  return (
    <main className={`w-screen h-screen`}>
      <div className={`w-full h-full grid place-items-center`}>
        <span>SUMMER FLOW</span>
        <Text fontSize="body1" color={color.water_blue}>
          텍스트 테스트
        </Text>
      </div>
    </main>
  );
}
