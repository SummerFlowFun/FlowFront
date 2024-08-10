import Text from "@/src/component/atom/Text";
import { color } from "@/src/utils/color-map";

export default function Home() {
  return (
    <main className={`w-screen h-screen grid place-items-center bg-black`}>
      <div className={`w-full max-w-[26.875rem] h-full bg-white`}>
        <span>SUMMER FLOW</span>
        <Text fontSize="body1" color={color.water_blue}>
          텍스트 테스트
        </Text>
      </div>
    </main>
  );
}
