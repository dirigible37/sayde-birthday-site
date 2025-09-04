import { useRef } from "react";
import { BackgroundGradient } from "./components/BackgroundGradient";
import { YellowBrickRoad } from "./components/YellowBrickRoad";
import { JourneyFlow } from "./components/JourneyFlow";
import { PresentReveal } from "./components/PresentReveal";
import { useScrollAnimation } from "./hooks/useScrollAnimation";
import { useRoadAnimation } from "./hooks/useProgressiveReveal";

function App() {
  const roadProgress = useRoadAnimation();

  // Refs for remaining sections
  const section1Ref = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  // Animation hooks
  const final = useScrollAnimation(finalRef, {
    threshold: 0.8,
    rootMargin: "-10% 0px -10% 0px",
  });

  return (
    <div className="relative">
      <BackgroundGradient />
      <YellowBrickRoad progress={roadProgress} />
      

      {/* Welcome Section */}
      <section
        ref={section1Ref}
        className="flex justify-center relative z-10 py-24 md:py-32 backdrop-blur-sm bg-gradient-to-b from-black to-black/30"
      >
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
            It's your Birthday Week!
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 md:mb-8 text-yellow-400 animate-fade-in-up delay-300">
            "Just follow the yellow brick road."
          </h2>
          <p className="text-lg md:text-xl opacity-90 animate-fade-in-up delay-500 leading-relaxed">
            In celebration of you and your 35th birthday, we're sending you on a
            (virtual) journey. So, put on your ruby red slippers (um, Bangs),
            and keep scrolling.
          </p>
          <div className="mt-8 animate-bounce-gentle">
            <div className="text-3xl">👇</div>
            <p className="text-sm mt-2 opacity-75">Scroll down to begin</p>
          </div>
        </div>
      </section>

      {/* Journey Flow - All text and photo sections */}
      <JourneyFlow />

      {/* Spacer before final section */}
      <div className="h-96" />

      {/* Final Present Reveal Section */}
      <section
        ref={finalRef}
        className="min-h-[100dvh] min-h-screen flex items-center justify-center relative"
      >
        {final.isVisible && <PresentReveal isVisible={final.isVisible} />}
      </section>
    </div>
  );
}

export default App;
