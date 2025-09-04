import { useRef } from "react";
import { BackgroundGradient } from "./components/BackgroundGradient";
import { YellowBrickRoad } from "./components/YellowBrickRoad";
import { ScrollItem } from "./components/ScrollItem";
import { PresentReveal } from "./components/PresentReveal";
import { useScrollAnimation } from "./hooks/useScrollAnimation";
import { useRoadAnimation } from "./hooks/useProgressiveReveal";

function App() {
  const roadProgress = useRoadAnimation();

  // Refs for scroll sections
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  // Animation hooks
  const section2 = useScrollAnimation(section2Ref);
  const section3 = useScrollAnimation(section3Ref);
  const section4 = useScrollAnimation(section4Ref);
  const section5 = useScrollAnimation(section5Ref);
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

      {/* Journey Section 1 */}
      <section
        ref={section2Ref}
        className="min-h-[100dvh] min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {section2.isVisible && (
          <ScrollItem side="left" isVisible={section2.isVisible}>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
              35 Years of Amazing! ✨
            </h3>
            <p className="text-sm md:text-base text-gray-500 italic leading-relaxed mb-3">
              "A heart is shown not by how much you love, but by how much you
              are loved by others."
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Do you know how special you are? We do. Your kindness and
              enthusiasm make every day brighter for everyone around you. Anyone
              who is lucky enough to know you knows this.
            </p>
          </ScrollItem>
        )}
      </section>

      {/* Journey Section 2 */}
      <section
        ref={section3Ref}
        className="min-h-[100dvh] min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {section3.isVisible && (
          <ScrollItem side="right" isVisible={section3.isVisible}>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
              A Special Surprise 🎁
            </h3>
            <p className="text-sm md:text-base text-gray-500 italic leading-relaxed mb-3">
              "Somewhere over the rainbow skies are blue …"
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              You deserve the best, and we wanted to make sure you get it for
              your 35th. It may not be what you were expecting, but you're in a
              family used to going the long way.
            </p>
          </ScrollItem>
        )}
      </section>

      {/* Journey Section 3 */}
      <section
        ref={section4Ref}
        className="min-h-[100dvh] min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {section4.isVisible && (
          <ScrollItem side="left" isVisible={section4.isVisible}>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
              Almost There! 🌈
            </h3>
            <p className="text-sm md:text-base text-gray-500 italic leading-relaxed mb-3">
              "You've always had the power, my dear. You just had to learn it
              for yourself."
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Hope you've enjoyed your magical journey. You're now ready for the
              surprise ahead.
            </p>
          </ScrollItem>
        )}
      </section>

      {/* Journey Section 4 */}
      <section
        ref={section5Ref}
        className="min-h-[100dvh] min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {section5.isVisible && (
          <ScrollItem side="right" isVisible={section5.isVisible}>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
              Your Surprise Awaits! ✨
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              The yellow brick road has led you through this magical journey,
              and now it's time for the moment you've been waiting for. Your
              birthday surprise is just ahead!
            </p>
          </ScrollItem>
        )}
      </section>

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
