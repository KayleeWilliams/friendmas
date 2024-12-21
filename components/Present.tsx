"use client";

import React from "react";
import { DotLottieReact, DotLottie } from "@lottiefiles/dotlottie-react";

import ScrollModal from "@/components/ScrollModal";

type PresentAnimation = DotLottie | null;

export default function Present() {
  const [animation, setAnimation] = React.useState<PresentAnimation>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedButton, setSelectedButton] = React.useState<number | null>(
    null
  );

  const animationRefCallback = (animation: PresentAnimation) => {
    setAnimation(animation);
  };

  const handlePresentClick = () => {
    if (animation) {
      try {
        console.log("playing animation");
        animation.play();
      } catch (error) {
        console.error("Error playing animation:", error);
      }
    }
  };

  React.useEffect(() => {
    function onFrameChange({ currentFrame }: { currentFrame: number }) {
      console.log("frame", Math.round(currentFrame));
      if (Math.round(currentFrame) === 65) {
        setShowModal(true);
      }
    }

    // Listen to events emitted by the DotLottie instance when it is available.
    if (animation) {
      animation.addEventListener("frame", onFrameChange);
    }

    return () => {
      // Remove event listeners when the component is unmounted.
      if (animation) {
        animation.removeEventListener("frame", onFrameChange);
      }
    };
  }, [animation]);

  const handleButtonClick = (button: number) => {
    setSelectedButton(button);
    new Audio("/yippee.wav").play();
  };

  return (
    <div className="md:col-start-2 md:col-span-3">
      <button
        type="button"
        onClick={handlePresentClick}
        className="cursor-pointer size-[400px] md:size-[900px]"
      >
        <DotLottieReact
          src="/present.lottie"
          style={{
            width: "100%",
            height: "auto",
          }}
          dotLottieRefCallback={animationRefCallback}
        />
      </button>

      <ScrollModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-2xl font-bold">Merry Christmas!!! 🎄</h2>
        <p>
          Thank you for being an amazing friend, I wish you a very merry
          Christmas and a happy new year!
          <br />
          <br />
          Would you like to renew our friendship for the next year?
        </p>
        <div className="flex gap-4 mt-4 justify-center">
          <button
            type="button"
            className="relative group px-4 py-2 rounded-lg"
            onClick={() => handleButtonClick(0)}
          >
            {selectedButton === 0 && (
              <div className="absolute inset-[-8px] rounded-full border-2 border-red-500 -rotate-[10deg]" />
            )}
            Yes
          </button>
          <button
            type="button"
            className="relative group px-4 py-2 rounded-sm"
            onClick={() => handleButtonClick(1)}
          >
            {selectedButton === 1 && (
              <div className="absolute inset-[-8px] rounded-full border-2 border-red-500 -rotate-[2deg]" />
            )}
            Definitely
          </button>
          <button
            type="button"
            className="relative group px-4 py-2 rounded-lg underline underline-offset-1"
            onClick={() => handleButtonClick(2)}
          >
            {selectedButton === 2 && (
              <div className="absolute inset-[-8px] rounded-full border-2 border-red-500 rotate-[1deg]" />
            )}
            Absolutely!!
          </button>
        </div>
        <p className="mt-6 text-xs">(Circle your choice)</p>
      </ScrollModal>
    </div>
  );
}
