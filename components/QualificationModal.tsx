"use client";

import { useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/* ─── Global modal context — call anywhere via useQualificationModal() ── */
interface ModalContextValue {
  open: () => void;
}
const ModalContext = createContext<ModalContextValue>({ open: () => {} });
export function useQualificationModal() {
  return useContext(ModalContext);
}

type Step = "gate" | "survey" | "capture" | "success";

const objectiveOptions = [
  "Long-term wealth preservation",
  "Speculative / short-term trading",
];
const allocationOptions = [
  "Under $250K",
  "$250K – $1M",
  "$1M – $5M",
  "$5M+",
];
const concernOptions = [
  "Drawdown protection",
  "Missing the next top",
];

export function QualificationModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("gate");
  const [objective, setObjective] = useState("");
  const [allocation, setAllocation] = useState("");
  const [concern, setConcern] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const open = () => {
    setStep("gate");
    setObjective("");
    setAllocation("");
    setConcern("");
    setEmail("");
    setName("");
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);

  const surveyComplete = objective && allocation && concern;

  return (
    <ModalContext.Provider value={{ open }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] modal-backdrop flex items-center justify-center p-4 sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="whale-locked relative w-full max-w-lg bg-[#121212] border border-[#2C2C2C] rounded-sm overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={close}
                className="absolute top-5 right-5 text-silver/50 hover:text-white transition-colors z-10"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Top accent line */}
              <div className="h-[2px] bg-burnt" />

              <div className="p-8 sm:p-10">
                <AnimatePresence mode="wait">
                  {step === "gate" && (
                    <motion.div
                      key="gate"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-burnt eyebrow-mono mb-4">Qualification Required</div>
                      <h3 className="text-2xl font-black text-white leading-tight mb-4">
                        The Market Capital Group Playbook is reserved for serious allocators.
                      </h3>
                      <p className="text-silver text-sm leading-relaxed mb-8">
                        Please complete a 60-second structural check to see if your
                        portfolio qualifies for our risk management framework.
                      </p>
                      <button
                        onClick={() => setStep("survey")}
                        className="btn-burnt w-full"
                      >
                        Begin Qualification →
                      </button>
                    </motion.div>
                  )}

                  {step === "survey" && (
                    <motion.div
                      key="survey"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-burnt eyebrow-mono mb-4">Step 1 of 2</div>
                      <h3 className="text-xl font-black text-white mb-8">Structural Check</h3>

                      <div className="space-y-7">
                        <div>
                          <label className="block text-xs tracking-wide text-silver mb-3">
                            What is your primary investment objective with Bitcoin?
                          </label>
                          <div className="space-y-2">
                            {objectiveOptions.map((opt) => (
                              <button
                                key={opt}
                                onClick={() => setObjective(opt)}
                                className={`w-full text-left px-4 py-3 rounded-sm border text-sm transition-all duration-150 ${
                                  objective === opt
                                    ? "border-burnt bg-burnt/10 text-white"
                                    : "border-[#2C2C2C] text-silver hover:border-silver/40"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs tracking-wide text-silver mb-3">
                            What is your current approximate Bitcoin allocation?
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {allocationOptions.map((opt) => (
                              <button
                                key={opt}
                                onClick={() => setAllocation(opt)}
                                className={`px-3 py-3 rounded-sm border text-sm transition-all duration-150 ${
                                  allocation === opt
                                    ? "border-burnt bg-burnt/10 text-white"
                                    : "border-[#2C2C2C] text-silver hover:border-silver/40"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs tracking-wide text-silver mb-3">
                            What is your biggest concern in the next bear cycle?
                          </label>
                          <div className="space-y-2">
                            {concernOptions.map((opt) => (
                              <button
                                key={opt}
                                onClick={() => setConcern(opt)}
                                className={`w-full text-left px-4 py-3 rounded-sm border text-sm transition-all duration-150 ${
                                  concern === opt
                                    ? "border-burnt bg-burnt/10 text-white"
                                    : "border-[#2C2C2C] text-silver hover:border-silver/40"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => surveyComplete && setStep("capture")}
                        disabled={!surveyComplete}
                        className={`w-full mt-8 btn-burnt ${!surveyComplete ? "opacity-30 cursor-not-allowed" : ""}`}
                      >
                        Continue →
                      </button>
                    </motion.div>
                  )}

                  {step === "capture" && (
                    <motion.div
                      key="capture"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-burnt eyebrow-mono mb-4">Step 2 of 2</div>
                      <h3 className="text-xl font-black text-white mb-3">
                        Where should we send the Playbook?
                      </h3>
                      <p className="text-silver text-sm leading-relaxed mb-8">
                        Your profile qualifies for the MCG Bitcoin Risk Management Playbook.
                        Enter your details to receive it.
                      </p>

                      <div className="space-y-4">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full name"
                          className="w-full bg-[#0D0D0D] border border-[#2C2C2C] focus:border-burnt rounded-sm px-4 py-3.5 text-sm text-white placeholder-silver/40 focus:outline-none transition-colors duration-200"
                        />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Institutional email address"
                          className="w-full bg-[#0D0D0D] border border-[#2C2C2C] focus:border-burnt rounded-sm px-4 py-3.5 text-sm text-white placeholder-silver/40 focus:outline-none transition-colors duration-200"
                        />
                      </div>

                      <button
                        onClick={() => email && name && setStep("success")}
                        disabled={!email || !name}
                        className={`w-full mt-6 btn-burnt ${!email || !name ? "opacity-30 cursor-not-allowed" : ""}`}
                      >
                        Request Access
                      </button>
                      <p className="text-silver/40 text-xs leading-relaxed mt-4">
                        Qualification required. For accredited investors only. Nothing
                        herein constitutes financial, legal, or tax advice.
                      </p>
                    </motion.div>
                  )}

                  {step === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      className="text-center py-4"
                    >
                      <div className="w-12 h-12 mx-auto mb-6 rounded-full border border-burnt flex items-center justify-center">
                        <span className="text-burnt text-xl font-black">₿</span>
                      </div>
                      <h3 className="text-2xl font-black text-white mb-3">Request Received.</h3>
                      <p className="text-silver text-sm leading-relaxed max-w-xs mx-auto">
                        Check your inbox — the MCG Bitcoin Risk Management Playbook is
                        on its way to {email || "your email"}.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}
