"use client"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import GameSetup from "./GameSetup"
import GameBoard from "./GameBoard"
import { GameConfig, GameState } from "./types"
import { ArrowLeft } from "lucide-react"

export default function MemoryGameManager() {
    // Start directly at SETUP since we are solo-only now
    const [gameState, setGameState] = useState<GameState>('SETUP')
    const [config, setConfig] = useState<GameConfig>({
        gridSize: 4,
        theme: 'apprentice'
    })

    const handleStartGame = (newConfig: GameConfig) => {
        setConfig(newConfig)
        setGameState('PLAYING')
    }

    const handleRestart = () => {
        setConfig({ ...config }) // Triggers re-render if key logic depends on object identity or just rely on GameBoard internal reset
    }

    return (
        <div className="w-full">
            {/* Header / Nav if deep in game */}
            {gameState !== 'SETUP' && (
                <div className="w-full max-w-4xl flex justify-start mb-6">
                    <button
                        onClick={() => setGameState('SETUP')}
                        className="flex items-center text-muted-foreground hover:text-primary transition-colors font-medium"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Abandon Expedition
                    </button>
                </div>
            )}

            <AnimatePresence mode="wait">
                {gameState === 'SETUP' && (
                    <motion.div
                        key="setup"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                    >
                        <GameSetup
                            onStartGame={handleStartGame}
                        />
                    </motion.div>
                )}

                {gameState === 'PLAYING' && (
                    <motion.div
                        key="board"
                        className="w-full flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <GameBoard
                            key={Date.now()} // Force remount on restart for cleanliness
                            config={config}
                            onGameEnd={() => {}}
                            onRestart={handleRestart}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
