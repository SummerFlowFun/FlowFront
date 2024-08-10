import Image from "next/image";
import { useRouter } from "next/router";
import ARROW_LEFT_ICON from "../../../assets/icon/arrow-left-icon.svg";
import CLOSE_ICON from "../../../assets/icon/close-icon.svg";
interface Props {
  title?: string;
}
const Header = (props: Props) => {
  const { title } = props;
  const router = useRouter();

  return (
    <>
      <div className="fixed top-0 py-3 flex flex-row px-4 justify-between items-center bg-transparent">
        <Image src={ARROW_LEFT_ICON} alt={""} onClick={() => router.back()} />
        <span>{title}</span>
        <Image src={CLOSE_ICON} alt={""} onClick={() => router.back()} />
      </div>
    </>
  );
};

export default Header;
