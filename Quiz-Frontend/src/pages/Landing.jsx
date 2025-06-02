const Landing = () => {
  return (
    <div className="antialiased bg-purple-500">
      <section className="relative">
        <div className="z-10">
          <div className="mx-auto max-w-5xl px-6 md:px-2 py-10 md:py-24 flex flex-col gap-6 items-center">
            <h1 className="text-4xl font-bold text-center max-w-[600px] text-white">
              Are you smart enough to conquer them all? <br />
              Put your knowledge to the test
            </h1>
            <p className="text-white text-base md:text-lg text-center max-w-[600px]">
              QuizMe is your one stop shop for all your quiz needs. Compete with
              others as you race to complete every quiz available.
            </p>
          </div>
        </div>
        <div className="-z-10 absolute top-0 w-full h-[200px] bg-gradiant"></div>
      </section>

      <section className="px-6 md:px-2 pb-10">
        <div className="space-y-10">
          <div className="relative mx-auto sm:px-7 px-4 max-w-screen-xl py-10 flex flex-col md:flex-row items-center rounded bg-white">
            <div className="flex-1 text-black md:pl-10 md:pr-4 mb-6 md:mb-0">
              <h2 className="text-4xl font-bold mb-4">Make Your Own Quizzes</h2>
              <p className="text-lg">
                Create engaging quizzes, challenge your friends!
              </p>
            </div>
            <div className="flex-1 md:pl-4">
              <img
                src="./imgs/brainpen.png"
                className="mx-auto w-full max-w-full md:w-[80%] rounded"
                alt="Make your own quizzes image"
              />
            </div>
          </div>
          <div className="relative mx-auto sm:px-7 px-4 max-w-screen-xl py-10 flex flex-col md:flex-row items-center rounded bg-white ">
            <div className="flex-1 md:pr-10 mb-6 md:mb-0 order-2 md:order-1">
              <img
                src="./imgs/leaderboard.png"
                className="mx-auto w-full max-w-full md:w-[80%] rounded"
                alt="Leaderboards image"
              />
            </div>

            <div className="flex-1 text-black md:pl-4 order-1 md:order-2">
              <h2 className="text-4xl font-bold mb-4">Top The Leaderboard</h2>
              <p className="text-lg">
                Every question you get right brings you one step closer to the
                top!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
