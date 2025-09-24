"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Flame, Facebook, ScanEye } from "lucide-react"

export default function SpySystem() {
  const [currentStage, setCurrentStage] = useState(0)
  const [showContent, setShowContent] = useState(true)
  const [fileName, setFileName] = useState<string | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
  const [investigatedHandle, setInvestigatedHandle] = useState<string>("")
  const [investigatedAge, setInvestigatedAge] = useState<string>("")
  const [investigatedGender, setInvestigatedGender] = useState<string>("")
  const [investigatedLocation, setInvestigatedLocation] = useState<string>("")
  const [investigatedPhone, setInvestigatedPhone] = useState<string>("")
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisMessage, setAnalysisMessage] = useState("Initializing scan...")
  const [animationFrame, setAnimationFrame] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10 * 60)
  const [showMissedMatch, setShowMissedMatch] = useState(false)
  const [randomNotifications, setRandomNotifications] = useState<
    { id: number; user: string; action: string; time: string }[]
  >([])
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [whatsappPhoto, setWhatsappPhoto] = useState<string | null>(null)
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false)

  // Data for random notifications
  const randomUsers = [
    "Ana Silva",
    "João Pereira",
    "Maria Oliveira",
    "Pedro Santos",
    "Camila Souza",
    "Lucas Costa",
    "Mariana Almeida",
    "Rafael Martins",
    "Beatriz Lima",
    "Gustavo Rocha",
    "Isabela Fernandes",
    "Felipe Gomes",
    "Lara Ribeiro",
    "Daniel Carvalho",
    "Sofia Mendes",
  ]
  const notificationActions = [
    "accessed the final result.",
    "downloaded the full report.",
    "viewed private data.",
    "initiated a new scan.",
    "shared the findings.",
    "verified the intelligence.",
  ]

  // Add these arrays for placeholder images
  const femalePlaceholders = [
    "/images/female-placeholder-1.jpeg",
    "/images/female-placeholder-2.jpeg",
    "/images/female-placeholder-3.jpeg",
    "/images/female-placeholder-4.jpeg",
    "/images/female-placeholder-5.jpeg",
    "/images/female-placeholder-6.avif",
    "/images/female-placeholder-7.jpeg",
    "/images/female-placeholder-8.jpeg",
  ]

  const malePlaceholders = [
    "/images/male-placeholder-1.jpeg",
    "/images/male-placeholder-2.jpeg",
    "/images/male-placeholder-3.jpeg",
    "/images/male-placeholder-4.jpeg",
    "/images/male-placeholder-5.jpeg",
    "/images/male-placeholder-6.jpeg",
    "/images/male-placeholder-7.png",
  ]

  // Cleanup for image preview URL
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl)
      }
    }
  }, [imagePreviewUrl])

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (currentStage === 6 && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [currentStage, timeLeft])

  // Random notifications effect
  useEffect(() => {
    let notificationInterval: NodeJS.Timeout | undefined
    if (currentStage === 6) {
      notificationInterval = setInterval(() => {
        const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)]
        const randomAction = notificationActions[Math.floor(Math.random() * notificationActions.length)]
        const newNotification = {
          id: Date.now(),
          user: randomUser,
          action: randomAction,
          time: "Just now",
        }
        setRandomNotifications((prevNotifications) => {
          const updated = [newNotification, ...prevNotifications]
          return updated.slice(0, 5)
        })
      }, 3000)
    }
    return () => clearInterval(notificationInterval)
  }, [currentStage])

  useEffect(() => {
    if (currentStage === 4) {
      const showTimer = setTimeout(() => {
        setShowMissedMatch(true)
      }, 4000)

      const hideTimer = setTimeout(() => {
        setShowMissedMatch(false)
      }, 7000)

      return () => {
        clearTimeout(showTimer)
        clearTimeout(hideTimer)
      }
    }
  }, [currentStage])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const nextStage = useCallback(() => {
    setShowContent(false)
    setTimeout(() => {
      setCurrentStage((prev) => prev + 1)
      setShowContent(true)
      if (currentStage === 0) {
        setFileName(null)
        setImagePreviewUrl(null)
        setInvestigatedHandle("")
        setInvestigatedAge("")
        setInvestigatedGender("")
        setInvestigatedLocation("")
        setInvestigatedPhone("")
        setAnalysisProgress(0)
        setIsAnalyzing(false)
      }
      if (currentStage + 1 === 6) {
        setTimeLeft(10 * 60)
        setRandomNotifications([])
      }
    }, 500)
  }, [currentStage, imagePreviewUrl])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      setFileName(file.name)
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl)
      }
      setImagePreviewUrl(URL.createObjectURL(file))
    } else {
      setFileName(null)
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl)
      }
      setImagePreviewUrl(null)
    }
  }

  const startAnalysis = useCallback(() => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setAnalysisMessage("Initializing facial recognition protocols...")
    setAnimationFrame(0)

    let progress = 0
    let frame = 0
    const intervalDuration = 150
    const totalDuration = 15000
    const increment = 100 / (totalDuration / intervalDuration)

    const messages = [
      "Analyzing facial biometrics and unique identifiers...",
      "Cross-referencing encrypted public and private databases...",
      "Establishing secure connection to social network APIs...",
      "Decrypting hidden profiles and shadow accounts...",
      "Extracting private message logs and media attachments...",
      "Phone number found! Cross-referencing with social profiles...",
      "Identifying anomalous interaction patterns and suspicious likes...",
      "Compiling comprehensive intelligence report...",
      "Finalizing data integrity verification and extraction...",
      "Analysis complete. Results ready for decryption.",
    ]
    let messageIndex = 0

    const interval = setInterval(() => {
      progress += increment
      frame++

      if (progress <= 100) {
        setAnalysisProgress(Math.min(100, Math.round(progress)))

        const newIndex = Math.floor((progress / 100) * messages.length)
        if (newIndex > messageIndex && newIndex < messages.length) {
          messageIndex = newIndex
          setAnalysisMessage(messages[newIndex])
        }

        setAnimationFrame(frame)
      }
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          nextStage()
        }, 500)
      }
    }, intervalDuration)
  }, [nextStage, investigatedPhone])

  const fetchWhatsAppPhoto = async (phoneNumber: string) => {
    if (!phoneNumber || phoneNumber.length < 10) return

    setIsLoadingPhoto(true)
    try {
      const response = await fetch("/api/whatsapp-photo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phoneNumber }),
      })

      const data = await response.json()
      if (data.success && data.result) {
        setWhatsappPhoto(data.result)
      }
    } catch (error) {
      console.error("Error fetching WhatsApp photo:", error)
    } finally {
      setIsLoadingPhoto(false)
    }
  }

  const renderStage = () => {
    const matchImageSrc =
      investigatedGender === "Feminino"
        ? "/images/tinder-match-female.jpeg"
        : investigatedGender === "Masculino"
          ? "/images/tinder-match-male.png"
          : "/placeholder.svg?height=300&width=200"

    switch (currentStage) {
      case 0:
        return (
          <div className="text-center space-y-8">
            <p className="text-4xl md:text-5xl font-bold text-white tracking-wider animate-pulse">SPY 3</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wider animate-pulse">
              💔 FEELING BETRAYED?
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              "You deserve to know the truth. Even the conversations he tried to hide…"
            </p>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Discover hidden profiles, private messages, and suspicious likes on:
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-3xl">
              <div className="flex flex-col items-center gap-2">
                <Camera className="text-purple-500" size={56} />
                <span className="text-white text-base">Instagram</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Facebook className="text-blue-600" size={56} />
                <span className="text-white text-base">Facebook</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Flame className="text-red-500" size={56} />
                <span className="text-white text-base">Tinder</span>
              </div>
            </div>
            <Button
              onClick={nextStage}
              className="mt-10 px-10 py-5 text-xl font-bold uppercase bg-gradient-to-r from-pink-500 to-red-600 text-white shadow-lg hover:from-pink-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 animate-pulse-slow"
            >
              ➡️ START SCANNING
            </Button>
          </div>
        )
      case 6:
        return (
          <div className="text-center space-y-8">
            <p className="text-3xl md:text-4xl font-bold text-white max-w-2xl mx-auto leading-relaxed animate-fade-in">
              "Want full access to secret profiles, deleted conversations, and like history?"
            </p>
            {timeLeft > 0 ? (
              <p className="text-2xl md:text-3xl font-bold text-yellow-400 animate-pulse">
                Offer ends in: {formatTime(timeLeft)}
              </p>
            ) : (
              <p className="text-2xl md:text-3xl font-bold text-red-500">Offer expired!</p>
            )}
            <Button
              onClick={() => window.open("https://www.mundpay.com", "_blank")}
              disabled={timeLeft === 0}
              className="mt-10 px-10 py-5 text-xl font-bold uppercase bg-gradient-to-r from-red-700 to-black text-white shadow-lg hover:from-red-800 hover:to-gray-900 transition-all duration-300 transform hover:scale-105 animate-pulse-slow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              💣 SEE FINAL RESULT
            </Button>

            <div className="mt-8 w-full max-w-md mx-auto text-left space-y-2 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-lg font-bold text-white mb-3">
                <span className="text-green-400">[LIVE FEED]</span> Recent Accesses:
              </p>
              {randomNotifications.map((notification) => (
                <div key={notification.id} className="flex items-center gap-2 text-sm text-gray-300 animate-fade-in">
                  <ScanEye size={16} className="text-blue-400" />
                  <span className="font-mono">
                    <span className="text-purple-300">{notification.user}</span> {notification.action}
                  </span>
                  <span className="ml-auto text-xs text-gray-500">{notification.time}</span>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-black via-gray-900 to-red-900 font-inter">
      <div
        className={`absolute inset-0 bg-grid-pattern opacity-10 animate-pulse-grid`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fillOpacity='0.2' fillRule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div
        className={`relative z-10 transition-opacity duration-500 ${
          showContent ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {renderStage()}
      </div>
    </div>
  )
}
