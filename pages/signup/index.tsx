import Text from "@/src/component/atom/Text";
import Image from "next/image";
import { useRouter } from "next/router";
import ARROW_LEFT_ICON from "../../src/assets/icon/arrow-left-icon.svg";
import CLOSE_ICON from "../../src/assets/icon/close-icon.svg";

const SignUpPage = () => {
  const router = useRouter();
  return (
    <div className={`w-screen h-screen grid place-items-center bg-black`}>
      <div className={`w-full max-w-[26.875rem] h-full bg-white`}>
        <div className="py-3 flex flex-row px-4 justify-between items-center">
          <Image src={ARROW_LEFT_ICON} alt={""} />
          <Text fontSize={"title"}>회원가입</Text>
          <Image src={CLOSE_ICON} alt={""} onClick={() => router.back()} />
        </div>
        <div className="bg-milky_white"></div>
      </div>
    </div>
  );
};

export default SignUpPage;
