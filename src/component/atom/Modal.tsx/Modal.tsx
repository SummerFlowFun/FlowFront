interface Props {
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
}

export const Modal = ({ children, onClose, className }: Props) => {
  return (
    <div
      className="

    flex
    absolute
    items-center
    bg-black
    justify-center

    z-50
    rounded-lg
  "
    >
      <div
        className={`
        bg-white
        relative
        rounded-2xl
        shadow-2xl
        p-10
        ${className}
      `}
      >
        <button
          className="
          absolute
          top-5
          right-5
          text-2xl
          text-gray-500
          focus:outline-none
        "
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
