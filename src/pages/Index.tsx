import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [totalClicks, setTotalClicks] = useState(0);
  const [userClickNumber, setUserClickNumber] = useState<number | null>(null);
  const [hasClicked, setHasClicked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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
      setTotalClicks(currentTotal + Math.floor(Math.random() * 3));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    if (hasClicked) return;

    setIsAnimating(true);
    const newTotal = totalClicks + 1;
    const clickNumber = newTotal;
    
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



          <div className="mt-16 text-center space-y-4">
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-200">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-slate-700 font-open-sans">
                Счетчик обновляется в реальном времени
              </span>
            </div>
            
            <div>
              <a 
                href="https://youtube.com/@som456" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-primary transition-colors font-open-sans"
              >
                <Icon name="Youtube" size={20} />
                YouTube: som456
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;