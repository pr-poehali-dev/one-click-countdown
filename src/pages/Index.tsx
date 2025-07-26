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
    
    if (savedClickState === 'true') {
      setHasClicked(true);
      setUserClickNumber(Number(savedClickNumber));
    }
    
    if (savedTotalClicks) {
      setTotalClicks(Number(savedTotalClicks));
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">


          <div className="mb-12">
            <Card className="inline-block p-12 bg-white/80 backdrop-blur-sm border-slate-200 shadow-xl">
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="text-6xl font-bold text-primary mb-2 font-inter">
                    {totalClicks.toLocaleString()}
                  </div>
                  <div className="text-slate-600 font-open-sans">
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
                    <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                      <div className="text-2xl font-bold text-primary mb-1 font-inter">
                        #{userClickNumber.toLocaleString()}
                      </div>
                      <div className="text-slate-700 font-open-sans">
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