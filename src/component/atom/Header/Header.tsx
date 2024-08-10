import Image from "next/image";
import { useRouter } from "next/router";
import ARROW_LEFT_ICON from "../../../assets/icon/arrow-left-icon.svg";
import CLOSE_ICON from "../../../assets/icon/close-icon.svg";
interface Props {
  title?: string;
  leftIcon?: string;
  rightIcon?: string;
  backHandler?: () => void;
  closeHandler?: () => void;
}
const Header = (props: Props) => {
  const { title, backHandler, closeHandler, leftIcon, rightIcon } = props;
  const router = useRouter();

  return (
    <>
      <div className="fixed top-0 w-full max-w-[26.875rem] py-3 flex flex-row px-4 justify-between items-center bg-transparent">
        <Image
          src={leftIcon ? leftIcon : ARROW_LEFT_ICON}
          alt={""}
          onClick={() => {
            if (backHandler) {
              backHandler();
              return;
            }
            router.back();
          }}
          className="cursor-pointer"
        />
        <span>{title}</span>
        <Image
          src={rightIcon ? rightIcon : CLOSE_ICON}
          alt={""}
          onClick={() => {
            if (closeHandler) {
              closeHandler();
              return;
            }
            router.replace("/main");
          }}
          className="cursor-pointer"
        />
      </div>
    </>
  );
};

export default Header;
