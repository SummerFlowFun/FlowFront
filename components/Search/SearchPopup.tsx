export const SearchPopup = ({ setStage }: any) => {
  return (
    <>
      <div
        className={`fixed z-10 top-0 left-0 w-full h-full grid place-items-center animate-MoveUp`}
      >
        <div
          className={`w-full max-w-[26.875rem] h-full grid grid-rows-[3rem_auto]`}
        >
          <div
            className={`w-full h-[3rem] bg-milky_white grid grid-cols-[auto_3rem] place-items-center`}
          >
            <div></div>
            <button onClick={() => setStage(2)} className={`font-bold`}>
              X
            </button>
          </div>

          <div
            className={`bg-milky_white overflow-scroll flex flex-col gap-4 justify-center`}
          >
            <div className={`w-full h-[7rem] flex items-end justify-center`}>
              <span className={`font-jeju`}>식단 영양 분포</span>
            </div>
            <div
              className={`w-full h-full overflow-scroll  bg-milky_white flex rounded-lg justify-center`}
            >
              <div
                className={`w-4/5 h-[25rem] overflow-scroll rounded-lg flex flex-col bg-white`}
              >
                <span>1</span>
                <span>end</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
