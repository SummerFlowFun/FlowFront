interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal = ({ children, onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-4/5 max-w-lg text-center">
        <h2 className="text-xl font-bold mb-4">Food Information</h2>
        <p>{children}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};
