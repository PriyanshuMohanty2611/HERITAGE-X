"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Gamepad2, X, RefreshCcw, Trophy, User, Cpu, 
  RotateCcw, Play, ChevronRight, ChevronLeft, 
  Dices, ArrowUpRight, Crown, Sparkles, Zap,
  Timer, Target, Swords, Users
} from "lucide-react";
import { Sidebar } from "../../components/Sidebar";
import { TopHeader } from "../../components/TopHeader";
import { Footer } from "../../components/Footer";

// ─── TYPES ───────────────────────────────────────────────────────────────────

type GameMode = "HUB" | "TIC_TAC_TOE" | "SNAKE_LADDER" | "LUDO";

// ─── TIC TAC TOE LOGIC & COMPONENTS ──────────────────────────────────────────

const TIC_TAC_TOE_WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [gameMode, setGameMode] = useState<"PVP" | "PVE">("PVE");

  const checkWinner = (squares: (string | null)[]) => {
    for (let i = 0; i < TIC_TAC_TOE_WIN_PATTERNS.length; i++) {
      const [a, b, c] = TIC_TAC_TOE_WIN_PATTERNS[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return null;
  };

  const handleSquareClick = useCallback((i: number) => {
    if (winner || board[i]) return;
    const nextBoard = [...board];
    nextBoard[i] = isXNext ? "X" : "O";
    setBoard(nextBoard);
    setIsXNext(!isXNext);
    
    const win = checkWinner(nextBoard);
    if (win) {
      setWinner(win.winner);
      setWinningLine(win.line);
    } else if (!nextBoard.includes(null)) {
      setWinner("DRAW");
    }
  }, [board, isXNext, winner]);

  // Simple AI (Random move for O)
  useEffect(() => {
    if (gameMode === "PVE" && !isXNext && !winner) {
      const timer = setTimeout(() => {
        const availableIndices = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
        if (availableIndices.length > 0) {
          const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
          handleSquareClick(randomIndex);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isXNext, gameMode, board, winner, handleSquareClick]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
  };

  return (
    <div className="flex flex-col items-center gap-10 p-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex items-center gap-6 mb-4">
        <button 
          onClick={() => setGameMode("PVP")}
          className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${gameMode === "PVP" ? "bg-purple-600 text-white shadow-xl" : "bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10"}`}
        >
          <Users className="w-4 h-4 inline-block mr-2" /> Player vs Player
        </button>
        <button 
           onClick={() => setGameMode("PVE")}
           className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${gameMode === "PVE" ? "bg-purple-600 text-white shadow-xl" : "bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10"}`}
        >
          <Cpu className="w-4 h-4 inline-block mr-2" /> Player vs CPU
        </button>
      </div>

      <div className="relative group p-1 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 rounded-[40px] shadow-3xl">
        <div className="bg-slate-900/90 backdrop-blur-3xl rounded-[38px] p-10 grid grid-cols-3 gap-6 shadow-inner">
          {board.map((val, i) => {
            const isWinningSquare = winningLine?.includes(i);
            return (
              <button
                key={i}
                onClick={() => handleSquareClick(i)}
                className={`w-28 h-28 lg:w-36 lg:h-36 rounded-3xl flex items-center justify-center text-5xl lg:text-7xl font-black transition-all transform active:scale-90 relative overflow-hidden group/square
                  ${val === "X" ? "text-purple-400" : "text-indigo-400"}
                  ${isWinningSquare ? "bg-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.3)] border-2 border-purple-500/50" : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30"}`}
              >
                {val === "X" && <div className="animate-in zoom-in spin-in duration-300">X</div>}
                {val === "O" && <div className="animate-in zoom-in duration-300">O</div>}
                {!val && !winner && <div className="opacity-0 group-hover/square:opacity-10 text-white">{isXNext ? "X" : "O"}</div>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        {winner ? (
          <div className="text-center space-y-4 animate-in fade-in zoom-in duration-500">
            <h3 className="text-4xl font-black italic tracking-tighter uppercase text-white">
              {winner === "DRAW" ? "Linguistic Tie" : `${winner === "X" ? "Sovereign X" : "Matrix O"} Victory`}
            </h3>
            <button 
              onClick={resetGame}
              className="px-10 py-5 bg-purple-600 text-white font-black uppercase text-[11px] tracking-[0.3em] rounded-2xl shadow-2xl hover:bg-purple-700 active:scale-95 transition-all flex items-center gap-3"
            >
              <RotateCcw className="w-4 h-4" /> REBOOT PROTOCOL
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-3xl">
            <div className={`w-3 h-3 rounded-full animate-pulse ${isXNext ? "bg-purple-500 shadow-purple-500/50 shadow-lg" : "bg-indigo-500 shadow-indigo-500/50 shadow-lg"}`} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">
              Awaiting Node <span className={isXNext ? "text-purple-400" : "text-indigo-400"}>{isXNext ? "X" : "O"}</span> Input...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SNAKE & LADDER LOGIC & COMPONENTS ──────────────────────────────────────

const snakes: Record<number, number> = {
  16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78
};
const ladders: Record<number, number> = {
  1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100
};

function SnakeLadder() {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [cpuPosition, setCpuPosition] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [diceRoll, setDiceRoll] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [gameLog, setGameLog] = useState<string[]>(["Neural Protocol Initialized. Ready for deployment."]);

  const addLog = (msg: string) => setGameLog(prev => [msg, ...prev].slice(0, 5));

  const rollDice = useCallback(() => {
    if (isRolling || winner) return;
    setIsRolling(true);
    
    // Animate dice roll
    let count = 0;
    const interval = setInterval(() => {
      setDiceRoll(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 10) {
        clearInterval(interval);
        finalizeMove();
      }
    }, 50);
  }, [isRolling, winner]);

  const finalizeMove = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
    setIsRolling(false);

    if (isPlayerTurn) {
      movePlayer("PLAYER", roll);
    } else {
      movePlayer("CPU", roll);
    }
  };

  const movePlayer = (type: "PLAYER" | "CPU", roll: number) => {
    let currentPos = type === "PLAYER" ? playerPosition : cpuPosition;
    let nextPos = currentPos + roll;
    
    if (nextPos > 100) {
       addLog(`${type} Over-calculated move. Buffer required.`);
       setIsPlayerTurn(!isPlayerTurn);
       return;
    }

    // Handle Snake or Ladder
    let effectMsg = "";
    if (ladders[nextPos]) {
      nextPos = ladders[nextPos];
      effectMsg = " [PORTAL UP LINK]";
    } else if (snakes[nextPos]) {
      nextPos = snakes[nextPos];
      effectMsg = " [SYSTEM COLLAPSE]";
    }

    if (type === "PLAYER") {
      setPlayerPosition(nextPos);
      addLog(`PLAYER advanced to Node ${nextPos}${effectMsg}`);
    } else {
      setCpuPosition(nextPos);
      addLog(`CPU localized to Node ${nextPos}${effectMsg}`);
    }

    if (nextPos === 100) {
      setWinner(type);
      addLog(`CRITICAL VICTORY: ${type} ATTAINED APEX NODE.`);
    } else {
      setIsPlayerTurn(type === "CPU"); // Toggle
    }
  };

  // CPU logic
  useEffect(() => {
    if (!isPlayerTurn && !winner && !isRolling) {
      const timer = setTimeout(() => rollDice(), 1500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner, isRolling, rollDice]);

  const tiles = Array.from({ length: 100 }, (_, i) => 100 - i);

  return (
    <div className="flex flex-col lg:flex-row gap-10 p-4 animate-in fade-in zoom-in duration-700">
      {/* Game Board */}
      <div className="relative p-1 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 rounded-[40px] shadow-3xl overflow-hidden shrink-0">
         <div className="bg-slate-900/90 backdrop-blur-3xl rounded-[38px] p-4 grid grid-cols-10 gap-1 w-[350px] sm:w-[500px] lg:w-[600px] aspect-square relative shadow-inner">
            {tiles.map(n => {
               // Chessboard pattern
               const row = Math.floor((100 - n) / 10);
               const col = (100 - n) % 10;
               const isAlternate = (row + col) % 2 === 0;

               // Actual visual index for Zigzag
               let displayN = n;
               const currentRow = Math.floor((100 - n) / 10);
               if (currentRow % 2 !== 0) {
                  // This is a logic mess for display, let's keep it simple for now or skip zigzag visual mapping
               }

               return (
                  <div key={n} className={`relative flex items-center justify-center rounded-lg border border-white/5 text-[8px] font-black uppercase text-slate-500/30 ${isAlternate ? "bg-white/5" : "bg-transparent"}`}>
                     {n}
                     {/* Snake/Ladder indicators */}
                     {snakes[n] && <div className="absolute inset-0 bg-red-500/10 rounded-lg flex items-center justify-center"><Zap className="w-3/4 h-3/4 text-red-500/20" /></div>}
                     {ladders[n] && <div className="absolute inset-0 bg-emerald-500/10 rounded-lg flex items-center justify-center"><ArrowUpRight className="w-3/4 h-3/4 text-emerald-500/20" /></div>}
                     
                     {playerPosition === n && (
                        <div className="absolute z-10 w-4 h-4 sm:w-6 sm:h-6 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.6)] border-2 border-white flex items-center justify-center animate-bounce">
                           <User className="w-1/2 h-1/2 text-white" />
                        </div>
                     )}
                     {cpuPosition === n && (
                        <div className="absolute z-10 w-4 h-4 sm:w-6 sm:h-6 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.6)] border-2 border-white flex items-center justify-center animate-pulse">
                           <Cpu className="w-1/2 h-1/2 text-white" />
                        </div>
                     )}
                  </div>
               );
            })}
         </div>
      </div>

      {/* Control Panel */}
      <div className="flex-1 space-y-8">
         <div className="space-y-2">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Sovereign Serpent Hub</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em]">Node-Based Gravity Matrix</p>
         </div>

         <div className="grid grid-cols-2 gap-4">
            <div className={`p-6 rounded-[2rem] border transition-all ${isPlayerTurn ? "bg-purple-600/10 border-purple-500/50 shadow-2xl shadow-purple-900/10" : "bg-white/5 border-white/10 opacity-50"}`}>
               <p className="text-[9px] font-black uppercase tracking-widest text-purple-400">Biological Node</p>
               <h4 className="text-xl font-black text-white italic">PLAYER (P1)</h4>
               <p className="text-4xl font-black text-white mt-2">{playerPosition} <span className="text-[10px] opacity-40">POS</span></p>
            </div>
            <div className={`p-6 rounded-[2rem] border transition-all ${!isPlayerTurn ? "bg-indigo-600/10 border-indigo-500/50 shadow-2xl shadow-indigo-900/10" : "bg-white/5 border-white/10 opacity-50"}`}>
               <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400">Neural Node</p>
               <h4 className="text-xl font-black text-white italic">CPU (V2)</h4>
               <p className="text-4xl font-black text-white mt-2">{cpuPosition} <span className="text-[10px] opacity-40">POS</span></p>
            </div>
         </div>

         <div className="p-10 rounded-[2.5rem] bg-slate-900/50 border border-white/10 flex flex-col items-center gap-8 shadow-inner">
            <div className="relative group">
               <div className={`w-28 h-28 bg-white/5 border-4 rounded-3xl flex items-center justify-center shadow-3xl transition-transform duration-300 ${isRolling ? "rotate-180 scale-110 border-purple-500" : "border-white/10"}`}>
                  <span className="text-6xl font-black text-white">{diceRoll || "?"}</span>
               </div>
               {isRolling && <div className="absolute inset-0 blur-2xl bg-purple-600/20 animate-pulse rounded-full" />}
            </div>

            <button 
               onClick={rollDice}
               disabled={!isPlayerTurn || !!winner || isRolling}
               className={`w-full py-6 rounded-[1.5rem] font-black uppercase text-[11px] tracking-[0.4em] shadow-2xl transition-all flex items-center justify-center gap-4 active:scale-95
                  ${!isPlayerTurn || !!winner || isRolling ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-purple-600 text-white hover:bg-purple-700 shadow-purple-900/30"}`}
            >
               {isRolling ? "LOCALIZING..." : <><Dices className="w-5 h-5" /> BROADCAST ROLL</>}
            </button>
         </div>

         <div className="space-y-4">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 underline underline-offset-4 pointer-events-none">
               <Timer className="w-3 h-3" /> Execution Log
            </p>
            <div className="bg-slate-950/50 rounded-2xl border border-white/5 p-5 space-y-2 h-40 overflow-y-auto scrollbar-hide">
               {gameLog.map((log, i) => (
                  <p key={i} className={`text-[10px] font-bold ${i === 0 ? "text-purple-400" : "text-slate-500 opacity-60"}`}>
                    [SYNC_P-{i}] {log}
                  </p>
               ))}
            </div>
         </div>

         {winner && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
               <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-3xl animate-in fade-in duration-500" />
               <div className="relative bg-white/10 border border-white/20 p-16 rounded-[4rem] text-center space-y-8 animate-in zoom-in duration-500">
                  <Crown className="w-24 h-24 text-amber-400 mx-auto animate-bounce" />
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Victory Node Synchronized</p>
                     <h2 className="text-6xl font-black italic tracking-tighter text-white uppercase">{winner} WINS</h2>
                  </div>
                  <button 
                    onClick={() => { setWinner(null); setPlayerPosition(0); setCpuPosition(0); setIsPlayerTurn(true); setDiceRoll(0); setGameLog(["Reset sequence complete."]); }}
                    className="px-12 py-6 bg-purple-600 text-white font-black uppercase tracking-widest rounded-full shadow-2xl shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all"
                  >RESTART MATRIX</button>
               </div>
            </div>
         )}
      </div>
    </div>
  );
}

// ─── LUDO SIMULATOR LOGIC & COMPONENTS ──────────────────────────────────────

function Ludo() {
   const [activePlayer, setActivePlayer] = useState(0); // 0: Red, 1: Blue
   const [diceRoll, setDiceRoll] = useState(0);
   const [isRolling, setIsRolling] = useState(false);
   const [boardState, setBoardState] = useState({
      red: [0, 0, 0, 0],   // 0: base, 1-52: board, 53-58: home
      blue: [0, 0, 0, 0],
   });

   const rollDice = () => {
      if (isRolling) return;
      setIsRolling(true);
      setTimeout(() => {
         const roll = Math.floor(Math.random() * 6) + 1;
         setDiceRoll(roll);
         setIsRolling(false);
         // Auto-move for demo if possible, or just logic
      }, 800);
   };

   return (
      <div className="p-10 flex flex-col items-center gap-10 animate-in fade-in duration-1000">
         <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-3xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shadow-3xl mx-auto">
               <Users className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-4xl font-black italic tracking-tighter uppercase text-white">Ludo Galactic Hub</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.5em]">Multi-Player Competitive Matrix</p>
         </div>

         {/* Board Mockup - high fidelity */}
         <div className="relative w-full max-w-2xl aspect-square bg-white shadow-2xl rounded-[3rem] overflow-hidden p-6 grid gap-1" style={{ gridTemplateColumns: 'repeat(15, 1fr)', gridTemplateRows: 'repeat(15, 1fr)' }}>
            {/* Red Base */}
            <div className="col-span-6 row-span-6 bg-red-100 rounded-3xl border-4 border-red-500 flex items-center justify-center gap-4">
               {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />)}
            </div>
            <div className="col-span-3 row-span-6 bg-slate-50 border-x border-slate-100 grid grid-cols-3 gap-1 p-2">
               {Array.from({length: 18}).map((_, i) => <div key={i} className={`rounded ${i === 7 ? "bg-red-500" : "bg-slate-200"}`} />)}
            </div>
            <div className="col-span-6 row-span-6 bg-blue-100 rounded-3xl border-4 border-blue-500 flex items-center justify-center gap-4">
               {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />)}
            </div>

            <div className="col-span-6 row-span-3 bg-slate-50 border-y border-slate-100 grid grid-rows-3 grid-flow-col gap-1 p-2">
               {Array.from({length: 18}).map((_, i) => <div key={i} className={`rounded ${i === 7 ? "bg-red-500" : "bg-slate-200"}`} />)}
            </div>
            <div className="col-span-3 row-span-3 bg-gradient-to-br from-red-500 via-indigo-500 to-blue-500 flex items-center justify-center p-4">
               <Crown className="text-white w-full h-full opacity-20" />
            </div>
            <div className="col-span-6 row-span-3 bg-slate-50 border-y border-slate-100 grid grid-rows-3 grid-flow-col gap-1 p-2">
               {Array.from({length: 18}).map((_, i) => <div key={i} className={`rounded ${i === 10 ? "bg-blue-500" : "bg-slate-200"}`} />)}
            </div>

            <div className="col-span-6 row-span-6 bg-green-100 rounded-3xl border-4 border-green-500 flex items-center justify-center gap-4">
               {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />)}
            </div>
            <div className="col-span-3 row-span-6 bg-slate-50 border-x border-slate-100 grid grid-cols-3 gap-1 p-2">
               {Array.from({length: 18}).map((_, i) => <div key={i} className={`rounded ${i === 10 ? "bg-blue-500" : "bg-slate-200"}`} />)}
            </div>
            <div className="col-span-6 row-span-6 bg-amber-100 rounded-3xl border-4 border-amber-500 flex items-center justify-center gap-4">
               {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50" />)}
            </div>

            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center">
               <div className="bg-white p-12 rounded-[3.5rem] shadow-4xl text-center space-y-6">
                  <Lock className="w-16 h-16 text-slate-400 mx-auto opacity-30" />
                  <h4 className="text-3xl font-black text-slate-950 uppercase italic tracking-tighter">Full Sync Processing</h4>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest max-w-[200px]">Strategic Multiplayer protocols are being optimized for global deployment.</p>
                  <div className="flex items-center gap-2 justify-center">
                     <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
                     <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
                     <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                  </div>
               </div>
            </div>
         </div>

         <button 
            onClick={() => {}} 
            className="px-16 py-6 bg-blue-600 text-white font-black uppercase text-[12px] tracking-widest rounded-full shadow-2xl shadow-blue-900/40 active:scale-95 transition-all opacity-50 cursor-not-allowed"
         >
            INITIATE LUDO SEQUENCE
         </button>
      </div>
   );
}

const Lock = ({ className }: { className?: string }) => (
   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
   </svg>
);

// ─── MAIN ACTIVITY HUB ───────────────────────────────────────────────────────

export default function ActivitiesPage() {
  const [mode, setMode] = useState<GameMode>("HUB");

  return (
    <main className="heritage-page-shell flex h-dvh w-screen font-sans overflow-hidden bg-transparent text-white relative">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full" />
      </div>

      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <div className="header-neural h-20 flex items-center justify-between px-6 z-20 shrink-0">
          <TopHeader />
        </div>

        <div className="flex-1 overflow-y-auto p-6 lg:p-12 scrollbar-hide neural-content-shell">
          <div className="max-w-[1600px] mx-auto space-y-14 pb-16">
            
            {/* Header Section */}
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="flex items-center gap-6">
                <div onClick={() => setMode("HUB")} className="w-20 h-20 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-2xl hover:scale-105 transition-all cursor-pointer group">
                  <Gamepad2 className="w-10 h-10 text-purple-400 group-hover:rotate-12 transition-transform" />
                </div>
                <div>
                  <h1 className="text-5xl lg:text-7xl font-black text-white uppercase italic tracking-tighter">
                    Cultural Nexus
                  </h1>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.5em] mt-2 ml-1 underline decoration-purple-500/50 underline-offset-8">
                    Interactive Heritage Games v4.0
                  </p>
                </div>
              </div>

              {mode !== "HUB" && (
                 <button 
                  onClick={() => setMode("HUB")}
                  className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 hover:bg-white/10 hover:border-purple-400 transition-all shadow-xl"
                 >
                   <ChevronLeft className="w-4 h-4" /> Back to Matrix
                 </button>
              )}
            </header>

            {/* Content Area */}
            <section className="min-h-[600px] flex flex-col items-center">
               {mode === "HUB" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full animate-in fade-in slide-in-from-bottom-10 duration-1000">
                     <GameCard 
                        title="Tic Tac Toe"
                        desc="Sovereign Node Conflict Protocol. Challenge the Neural Brain or a biological adversary."
                        icon={<Swords className="w-8 h-8" />}
                        color="from-purple-600 to-indigo-600"
                        onPlay={() => setMode("TIC_TAC_TOE")}
                     />
                     <GameCard 
                        title="Snake & Ladder"
                        desc="Navigate the Sovereign Serpent Matrix. Outmaneuver the system to reach apex node 100."
                        icon={<Dices className="w-8 h-8" />}
                        color="from-emerald-600 to-teal-600"
                        onPlay={() => setMode("SNAKE_LADDER")}
                     />
                     <GameCard 
                        title="Ludo Matrix"
                        desc="High-Stakes Strategic Deployment. Coordinate with global nodes in a four-way conflict."
                        icon={<Users className="w-8 h-8" />}
                        color="from-blue-600 to-sky-600"
                        onPlay={() => setMode("LUDO")}
                     />
                  </div>
               )}

               {mode === "TIC_TAC_TOE" && <TicTacToe />}
               {mode === "SNAKE_LADDER" && <SnakeLadder />}
               {mode === "LUDO" && <Ludo />}
            </section>

            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}

function GameCard({ title, desc, icon, color, onPlay }: { title: string, desc: string, icon: any, color: string, onPlay: () => void }) {
   return (
      <div className="relative group overflow-hidden p-[2px] rounded-[3rem] transition-all hover:scale-[1.02] active:scale-95 shadow-2xl">
         <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 group-hover:opacity-40 transition-opacity`} />
         <div className="relative bg-slate-900/90 backdrop-blur-2xl rounded-[2.9rem] p-10 h-full flex flex-col justify-between border border-white/5 space-y-8">
            <div className="space-y-6">
               <div className={`w-16 h-16 rounded-[1.5rem] bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-2xl`}>
                  {icon}
               </div>
               <div className="space-y-2">
                  <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">{title}</h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed tracking-wide">{desc}</p>
               </div>
            </div>
            
            <button 
               onClick={onPlay}
               className={`w-full py-5 rounded-2xl bg-gradient-to-r ${color} text-white text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl flex items-center justify-center gap-4 hover:brightness-110 transition-all`}
            >
               Initiate <Play className="w-4 h-4 fill-white" />
            </button>
         </div>
      </div>
   );
}
