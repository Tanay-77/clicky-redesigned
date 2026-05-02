'use client';

import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Film,
  Palette,
  Play,
  Search,
  Scissors,
  Send,
} from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const editSteps = ['Moving to 10s', 'Selecting clip', 'Cutting clip'];
const timeMarks = ['0s', '5s', '10s', '15s', '20s'];
const promptExamples = [
  {
    prompt: 'how do i color grade this in davinci resolve?',
    app: 'DaVinci Resolve',
    result: 'Opening color panel',
    icon: Palette,
  },
  {
    prompt: 'clicky agent, turn this figma into a working webpage',
    app: 'Figma + VS Code',
    result: 'Generating page files',
    icon: Code2,
  },
  {
    prompt: 'teach me what this after effects panel does',
    app: 'After Effects',
    result: 'Inspecting selected panel',
    icon: Film,
  },
  {
    prompt: 'clicky agent, find cameras like this one under $1k',
    app: 'Browser',
    result: 'Comparing matches',
    icon: Search,
  },
  {
    prompt: 'help me design this logo in figma',
    app: 'Figma',
    result: 'Creating logo variants',
    icon: Palette,
  },
  {
    prompt: 'clicky agent, summarize this pdf and email it to my team',
    app: 'PDF + Mail',
    result: 'Drafting email',
    icon: Send,
  },
];
const promptStatuses = ['Executing task...', 'Opening app...', 'Done'];
const demoUrl = 'https://x.com/FarzaTV/status/2048203459976188261/video/1';

export default function Home() {
  const mockupRef = useRef<HTMLElement>(null);
  const promptsRef = useRef<HTMLElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const [promptTick, setPromptTick] = useState(0);
  const promptsInView = useInView(promptsRef, { amount: 0.35, once: true });
  const { scrollYProgress } = useScroll({
    target: mockupRef,
    offset: ['start 85%', 'start 25%'],
  });
  const mockupRotateX = useTransform(scrollYProgress, [0, 1], [45, 0]);
  const mockupY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const mockupScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      setCursor({ x: event.clientX, y: event.clientY, visible: true });
    };

    const handlePointerLeave = () => {
      setCursor((current) => ({ ...current, visible: false }));
    };

    window.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  useEffect(() => {
    if (!promptsInView) {
      return;
    }

    const interval = window.setInterval(() => {
      setPromptTick((tick) => tick + 1);
    }, 1350);

    return () => window.clearInterval(interval);
  }, [promptsInView]);

  const activePromptIndex = Math.floor(promptTick / promptStatuses.length) % promptExamples.length;
  const activePromptPhase = promptTick % promptStatuses.length;
  const activePromptRow = Math.floor(activePromptIndex / 2);
  const activePromptColumn = activePromptIndex % 2;

  return (
    <div className="min-h-screen bg-[var(--pitch-black)] selection:bg-[var(--aether-blue)] selection:text-white flex flex-col">
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        animate={{
          x: cursor.x + 18,
          y: cursor.y + 18,
          opacity: cursor.visible ? 1 : 0,
          scale: cursor.visible ? 1 : 0.85,
        }}
        transition={{ type: 'spring', stiffness: 520, damping: 34, mass: 0.35 }}
      >
        <Image src="/logo.png" alt="" width={26} height={26} className="rounded-[6px]" />
      </motion.div>

      <header className="flex flex-none items-center justify-between px-6 py-4 mx-auto w-full max-w-6xl">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-[var(--porcelain)] font-semibold text-[16px] tracking-tight">
            <span className="flex items-center gap-2">
              <Image src="/logo.png" alt="Clicky logo" width={28} height={28} className="rounded-[6px]" />
              Clicky
            </span>
          </Link>
          
        </div>
        <div className="flex items-center gap-4">
          <Link href={demoUrl} target="_blank" rel="noreferrer" className="bg-[var(--aether-blue)] text-[var(--porcelain)] h-8 px-4 rounded-[6px] text-[13px] font-medium hover:bg-[#4630d8] transition-colors shadow-[0_0_10px_rgba(83,58,253,0.18)] hover:shadow-[0_0_15px_rgba(83,58,253,0.32)] flex items-center gap-1.5">
            Watch Demo <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center pt-24 pb-16 px-4">
        <div className="text-center max-w-3xl flex flex-col items-center">
          <h1 className="text-[56px] md:text-[72px] tracking-[-0.22px] font-medium leading-[1.05] text-[var(--porcelain)]">
           An ai buddy that lives<br className="hidden md:block" /> on your mac.
          </h1>

          <p className="text-[16px] md:text-[18px] text-[var(--storm-cloud)] max-w-xl mt-5 leading-relaxed">
            Clicky executes tasks by clicking, typing, and navigating your computer - just from your instructions.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-stretch gap-3 w-full sm:w-auto sm:justify-center">
            <div className="relative w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-[var(--graphite)] border border-[var(--charcoal-grey)] rounded-[8px] h-[46px] px-4 text-[15px] w-full sm:w-[280px] text-[var(--porcelain)] placeholder:text-[var(--storm-cloud)] focus:outline-none focus:border-[var(--aether-blue)] focus:ring-1 focus:ring-[var(--aether-blue)]/30 transition-all shadow-sm"
              />
            </div>
            <button className="bg-[var(--aether-blue)] text-[var(--porcelain)] h-[46px] px-7 rounded-[8px] text-[15px] font-semibold hover:bg-[#4630d8] transition-all shadow-[0_0_12px_rgba(83,58,253,0.2)] hover:shadow-[0_0_20px_rgba(83,58,253,0.35)] w-full sm:w-auto whitespace-nowrap cursor-pointer">
              Download
            </button>
            <a href='https://tally.so/r/kdWMjM' className="w-full sm:w-auto sm:ml-1"><button className="h-[46px] px-5 border border-[var(--charcoal-grey)] rounded-[8px] text-[15px] font-medium text-[var(--porcelain)] hover:bg-[var(--graphite)] hover:border-[var(--storm-cloud)]/40 transition-all flex items-center justify-center gap-2 whitespace-nowrap w-full cursor-pointer">
              Join Windows waitlist <ArrowUpRight className="w-4 h-4 opacity-70" />
            </button></a>
          </div>
        </div>

        <section ref={mockupRef} className="relative mt-20 w-full max-w-[1000px] mx-auto [perspective:1400px]">
          <div className="absolute top-1/2 left-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--aether-blue)]/5 blur-[120px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            style={{
              rotateX: mockupRotateX,
              y: mockupY,
              scale: mockupScale,
              transformOrigin: 'center top',
              transformStyle: 'preserve-3d',
            }}
            className="relative overflow-hidden rounded-[6px] border border-[var(--charcoal-grey)] bg-[#0b0c0e] shadow-2xl"
          >
            <div className="flex h-12 items-center border-b border-[var(--charcoal-grey)] bg-[#121315] px-4">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-[#2a2c33]" />
                <div className="h-3 w-3 rounded-full bg-[#2a2c33]" />
                <div className="h-3 w-3 rounded-full bg-[#2a2c33]" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 text-[12px] font-medium text-[var(--storm-cloud)]">
                <span className="flex items-center gap-2">
                  <Image src="/logo.png" alt="" width={20} height={20} className="rounded-[4px]" />
                  Clicky Editing Session
                </span>
              </div>
            </div>

            <div className="grid gap-4 p-4 lg:grid-cols-[1fr_260px]">
              <div className="min-w-0">
                <div className="mb-4 rounded-[6px] border border-[var(--aether-blue)]/40 bg-[var(--aether-blue)]/10 p-3">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[var(--storm-cloud)]">
                    <Image src="/logo.png" alt="" width={14} height={14} className="rounded-[3px]" />
                    User Command
                  </div>
                  <div className="mt-2 text-[14px] font-medium text-[var(--porcelain)]">
                    Cut this clip at 10 seconds
                  </div>
                </div>

                <div className="overflow-hidden rounded-[6px] border border-[var(--charcoal-grey)] bg-[#101113]">
                  <div className="flex h-10 items-center justify-between border-b border-[var(--charcoal-grey)] px-3">
                    <div className="flex items-center gap-2 text-[12px] text-[var(--porcelain)]">
                      <Film className="h-4 w-4 text-[var(--aether-blue)]" />
                      sequence-01.mov
                    </div>
                    <div className="flex items-center gap-1.5 rounded-[4px] border border-[var(--aether-blue)]/45 bg-[var(--aether-blue)]/10 px-2 py-1 text-[11px] text-[var(--porcelain)]">
                      <Scissors className="h-3.5 w-3.5 text-[var(--aether-blue)]" />
                      Split Tool
                    </div>
                  </div>

                  <div className="grid gap-4 p-4 lg:grid-cols-[1fr_190px]">
                    <div className="relative aspect-video overflow-hidden rounded-[6px] border border-[var(--charcoal-grey)] bg-[#08090a]">
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,#15171d_0%,#222638_42%,#0f1011_43%,#08090a_100%)]" />
                      <div className="absolute left-[11%] top-[16%] h-[52%] w-[38%] rounded-[5px] bg-[#2f3449]" />
                      <div className="absolute bottom-[17%] left-[19%] h-[7%] w-[48%] rounded-full bg-[#533afd]/80 blur-[18px]" />
                      <div className="absolute right-[12%] top-[18%] h-[60%] w-[20%] rounded-t-full bg-[#2a2d37]" />
                      <div className="absolute inset-x-0 bottom-0 flex h-9 items-center justify-between bg-black/45 px-3 text-[11px] text-[var(--storm-cloud)]">
                        <span>Preview</span>
                        <span className="text-[var(--porcelain)]">00:00:10:00</span>
                      </div>
                      <button className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white">
                        <Play className="ml-0.5 h-4 w-4 fill-white" />
                      </button>
                    </div>

                    <div className="rounded-[6px] border border-[var(--charcoal-grey)] bg-[#0c0d0e] p-3">
                      <div className="flex items-center gap-2 text-[11px] font-medium text-[var(--porcelain)]">
                        <Image src="/logo.png" alt="" width={14} height={14} className="rounded-[3px]" />
                        Action Flow
                      </div>
                      <div className="mt-3 flex flex-col gap-2">
                        {editSteps.map((step, index) => (
                          <motion.div
                            key={step}
                            className="flex items-center gap-2 rounded-[4px] border border-[var(--charcoal-grey)] bg-[#111216] px-2 py-2 text-[11px] text-[var(--porcelain)]"
                            animate={{
                              borderColor: [
                                'rgba(35,37,42,1)',
                                'rgba(83,58,253,0.75)',
                                'rgba(35,37,42,1)',
                              ],
                            }}
                            transition={{ duration: 6, repeat: Infinity, delay: index * 0.8 }}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-[var(--aether-blue)]" />
                            {step}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[var(--charcoal-grey)] bg-[#0b0c0e] p-4">
                    <div className="mb-2 grid grid-cols-5 text-[10px] text-[var(--storm-cloud)]">
                      {timeMarks.map((mark) => (
                        <div key={mark} className="relative">
                          <span className={mark === '10s' ? 'text-[var(--porcelain)]' : ''}>{mark}</span>
                        </div>
                      ))}
                    </div>

                    <div className="relative h-[148px] rounded-[6px] border border-[var(--charcoal-grey)] bg-[#08090a] p-4">
                      <div className="absolute left-4 right-4 top-8 h-px bg-[var(--charcoal-grey)]" />
                      <div className="absolute left-4 right-4 top-24 h-px bg-[var(--charcoal-grey)]" />

                      <div className="absolute left-[calc(50%-1px)] top-3 z-30 h-[124px] w-[2px] bg-[var(--aether-blue)] shadow-[0_0_16px_rgba(83,58,253,0.8)]" />
                      <div className="absolute left-1/2 top-1 z-30 -translate-x-1/2 rounded-[4px] bg-[var(--aether-blue)] px-2 py-0.5 text-[10px] font-medium text-white">
                        10s
                      </div>

                      <motion.div
                        className="absolute left-[8%] right-[8%] top-12 h-[46px] rounded-[5px] border border-[var(--aether-blue)]/70 bg-[var(--aether-blue)]/10"
                        animate={{ opacity: [0.2, 0.55, 0.2] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                      />

                      <div className="absolute left-[8%] top-12 h-[46px] w-[41.5%] overflow-hidden rounded-l-[5px] border border-[var(--aether-blue)]/65 bg-[#2d2f3b]">
                        <div className="flex h-full items-center gap-2 px-3 text-[11px] text-[var(--porcelain)]">
                          <Film className="h-3.5 w-3.5 text-[var(--aether-blue)]" />
                          clip_A_001.mov
                        </div>
                        <div className="absolute inset-x-2 bottom-2 h-1 rounded-full bg-white/15" />
                      </div>

                      <div className="absolute left-[51%] top-12 h-[46px] w-[41%] overflow-hidden rounded-r-[5px] border border-[var(--aether-blue)]/65 bg-[#252836]">
                        <div className="flex h-full items-center gap-2 px-3 text-[11px] text-[var(--porcelain)]">
                          <Film className="h-3.5 w-3.5 text-[var(--aether-blue)]" />
                          clip_A_001.mov
                        </div>
                        <div className="absolute inset-x-2 bottom-2 h-1 rounded-full bg-white/15" />
                      </div>

                      <motion.div
                        className="absolute left-1/2 top-[58px] z-40 h-[34px] w-[34px] -translate-x-1/2 rounded-full border border-[var(--aether-blue)]/70 bg-[var(--aether-blue)]/15"
                        animate={{ scale: [0.75, 1.2, 0.75], opacity: [0, 0.8, 0] }}
                        transition={{ duration: 1.1, repeat: Infinity, delay: 3.5 }}
                      />

                      <motion.div
                        className="absolute z-50 pointer-events-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                        initial={{ x: 80, y: 78 }}
                        animate={{
                          x: [80, 250, 430, 430, 512, 512],
                          y: [78, 78, 78, 78, 20, 78],
                          scale: [1, 1, 1, 0.9, 1, 0.9],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          times: [0, 0.25, 0.48, 0.58, 0.74, 1],
                          ease: 'easeInOut',
                        }}
                      >
                        <Image src="/logo.png" alt="" width={30} height={30} className="rounded-[7px]" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="rounded-[6px] border border-[var(--charcoal-grey)] bg-[#101113] p-4">
                <div className="text-[10px] uppercase tracking-wider text-[var(--storm-cloud)]">Current Mission</div>
                <div className="mt-2 text-[15px] font-medium leading-snug text-[var(--porcelain)]">
                  Cut the selected video clip exactly at 10 seconds.
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  {editSteps.map((step) => (
                    <div key={step} className="flex items-center gap-2 text-[12px] text-[var(--porcelain)]">
                      <CheckCircle2 className="h-4 w-4 text-[var(--aether-blue)]" />
                      {step}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[6px] border border-[var(--aether-blue)]/45 bg-[var(--aether-blue)]/10 p-3">
                  <div className="flex items-center gap-2 text-[12px] font-medium text-[var(--porcelain)]">
                    <Scissors className="h-4 w-4 text-[var(--aether-blue)]" />
                    Final State
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-[var(--storm-cloud)]">
                    The clip is now two separate timeline segments, with the playhead parked at the 10-second cut point.
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-1.5 font-mono text-[10px] text-[var(--storm-cloud)]">
                  <div className="text-[var(--porcelain)]">&gt; locate timeline clip</div>
                  <div>&gt; seek 00:00:10:00</div>
                  <div>&gt; activate split tool</div>
                  <div className="text-[var(--aether-blue)]">&gt; cut complete</div>
                </div>
              </aside>
            </div>
          </motion.div>
        </section>

        <section ref={promptsRef} className="w-full max-w-[1000px] mx-auto mt-32 px-1 pb-10">
          <div className="mb-7 text-center">
            <div className="text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--aether-blue)]">
              Prompt to action
            </div>
            <h2 className="mt-3 text-[32px] md:text-[44px] font-medium leading-tight text-[var(--porcelain)]">
              Clicky acts on anything you ask
            </h2>
          </div>

          <div className="relative">
            <motion.div
              className="pointer-events-none absolute z-30 hidden md:block"
              animate={{
                left: activePromptColumn === 0 ? 'calc(50% - 50px)' : 'calc(100% - 50px)',
                top: 46 + activePromptRow * 134,
                scale: activePromptPhase === 1 ? 0.88 : 1,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            >
              <Image src="/logo.png" alt="" width={30} height={30} className="rounded-[7px]" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {promptExamples.map((example, index) => {
                const Icon = example.icon;
                const isActive = index === activePromptIndex;

                return (
                  <motion.div
                    key={example.prompt}
                    className={`relative min-h-[118px] overflow-hidden rounded-[8px] border px-5 py-5 transition-colors ${
                      isActive
                        ? 'border-[var(--aether-blue)]/70 bg-[var(--aether-blue)]/10'
                        : 'border-[var(--charcoal-grey)] bg-[#111216] hover:border-[var(--storm-cloud)]/35'
                    }`}
                    animate={{ y: isActive && activePromptPhase === 1 ? 2 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex h-8 w-8 flex-none items-center justify-center rounded-[6px] border ${
                        isActive
                          ? 'border-[var(--aether-blue)]/50 bg-[var(--aether-blue)]/15'
                          : 'border-[var(--charcoal-grey)] bg-[#0b0c0e]'
                      }`}>
                        <Icon className="h-4 w-4 text-[var(--aether-blue)]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[16px] leading-relaxed text-[var(--storm-cloud)]">
                          &quot;{example.prompt}&quot;
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
                          <span className="rounded-full border border-[var(--charcoal-grey)] bg-[#0b0c0e] px-2.5 py-1 text-[var(--storm-cloud)]">
                            {example.app}
                          </span>
                          {isActive && (
                            <motion.span
                              key={`${activePromptIndex}-${activePromptPhase}`}
                              className="rounded-full border border-[var(--aether-blue)]/45 bg-[var(--aether-blue)]/15 px-2.5 py-1 text-[var(--porcelain)]"
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              {promptStatuses[activePromptPhase]}
                            </motion.span>
                          )}
                        </div>
                      </div>
                    </div>

                    {isActive && (
                      <motion.div
                        className="mt-4 rounded-[6px] border border-[var(--aether-blue)]/35 bg-[#0b0c0e] px-3 py-2 text-[12px] text-[var(--porcelain)]"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.25 }}
                      >
                        {activePromptPhase === 2 ? 'Task complete' : example.result}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="flex-none py-6 text-center text-[13px] text-[var(--storm-cloud)]">
        made by farza &lt;3
      </footer>
    </div>
  );
}
