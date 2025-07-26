import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import confetti from 'canvas-confetti';

const Index = () => {
  const [totalClicks, setTotalClicks] = useState(0);
  const [userClickNumber, setUserClickNumber] = useState<number | null>(null);
  const [hasClicked, setHasClicked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const milestones = [100, 1000, 10000, 100000, 1000000, 10000000, 100000000];

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  useEffect(() => {
    const savedClickState = localStorage.getItem('hasClicked');
    const savedClickNumber = localStorage.getItem('userClickNumber');
    const savedTotalClicks = localStorage.getItem('totalClicks');
    const savedTheme = localStorage.getItem('isDarkMode');
    
    if (savedClickState === 'true') {
      setHasClicked(true);
      setUserClickNumber(Number(savedClickNumber));
    }
    
    if (savedTotalClicks) {
      setTotalClicks(Number(savedTotalClicks));
    } else {
      // Временно устанавливаем 99 для демонстрации конфетти при достижении 100
      setTotalClicks(99);
    }
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'true');
    }

    const interval = setInterval(() => {
      const currentTotal = Number(localStorage.getItem('totalClicks') || '0');
      const newTotal = currentTotal + Math.floor(Math.random() * 3);
      
      // Проверяем достижение вехи
      if (milestones.includes(newTotal)) {
        triggerConfetti();
      }
      
      setTotalClicks(newTotal);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    if (hasClicked) return;

    setIsAnimating(true);
    const newTotal = totalClicks + 1;
    const clickNumber = newTotal;
    
    // Проверяем достижение вехи при клике пользователя
    if (milestones.includes(newTotal)) {
      triggerConfetti();
    }
    
    setTotalClicks(newTotal);
    setUserClickNumber(clickNumber);
    setHasClicked(true);
    
    localStorage.setItem('hasClicked', 'true');
    localStorage.setItem('userClickNumber', clickNumber.toString());
    localStorage.setItem('totalClicks', newTotal.toString());

    setTimeout(() => setIsAnimating(false), 600);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('isDarkMode', newTheme.toString());
  };

  return (
    <div className={`min-h-screen font-inter transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-slate-50 to-slate-100'
    }`}>
      {/* Переключатель темы */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="sm"
          className={`rounded-full p-2 ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700' 
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={18} />
        </Button>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">


          <div className="mb-12">
            <Card className={`inline-block p-12 backdrop-blur-sm shadow-xl transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-slate-800/80 border-slate-600' 
                : 'bg-white/80 border-slate-200'
            }`}>
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className={`text-6xl font-bold text-primary mb-2 font-inter ${
                    isDarkMode ? 'text-blue-400' : ''
                  }`}>
                    {totalClicks.toLocaleString()}
                  </div>
                  <div className={`font-open-sans ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    всего нажатий
                  </div>
                </div>

                <Button
                  onClick={handleButtonClick}
                  disabled={hasClicked}
                  size="lg"
                  className={`
                    text-2xl px-12 py-8 h-auto rounded-2xl font-semibold font-inter
                    transition-all duration-300 transform
                    ${hasClicked 
                      ? 'bg-slate-400 cursor-not-allowed' 
                      : 'bg-primary hover:bg-primary/90 hover:scale-105 active:scale-95'
                    }
                    ${isAnimating ? 'animate-pulse scale-110' : ''}
                  `}
                >
                  <Icon name="MousePointer" size={28} className="mr-3" />
                  {hasClicked ? 'Уже нажал!' : 'Нажми меня!'}
                </Button>

                {userClickNumber && (
                  <div className="mt-6 animate-fade-in">
                    <div className={`rounded-xl p-4 border transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-blue-400/10 border-blue-400/20' 
                        : 'bg-primary/10 border-primary/20'
                    }`}>
                      <div className={`text-2xl font-bold mb-1 font-inter ${
                        isDarkMode ? 'text-blue-400' : 'text-primary'
                      }`}>
                        #{userClickNumber.toLocaleString()}
                      </div>
                      <div className={`font-open-sans ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Твой номер среди всех нажавших
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>



          <div className="mt-16 text-center">
            <div>
              <a 
                href="https://youtube.com/@somsom-v_1.0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Icon name="Youtube" size={24} />
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;