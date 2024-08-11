interface Props {
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
}

export const Modal = ({ children, onClose, className }: Props) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${className}`}
    >
      <div className="bg-white rounded-lg p-8 w-4/5 max-w-lg text-center">
        <h2 className="text-xl font-bold mb-4"></h2>
        <p>{children}</p>
        <button
          onClick={onClose}
          className="mt-4 font-jeju px-4 py-2 w-full bg-juicy_orange text-white rounded-full"
        >
          닫기
        </button>
      </div>
    </div>
  );
};
