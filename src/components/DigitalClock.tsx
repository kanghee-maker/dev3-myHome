'use client';

import { useState, useEffect } from 'react';

export default function DigitalClock() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // 시간 포맷팅 (HH:MM:SS)
      const timeString = now.toLocaleTimeString('ko-KR', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      
      // 날짜 포맷팅 (YYYY년 MM월 DD일 요일)
      const dateString = now.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      });
      
      setCurrentTime(timeString);
      setCurrentDate(dateString);
    };

    // 초기 시간 설정
    updateTime();
    
    // 1초마다 업데이트
    const timer = setInterval(updateTime, 1000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl p-8 shadow-2xl">
      <div className="text-center">
        <div className="text-6xl font-mono font-bold text-white mb-4 tracking-wider">
          {currentTime}
        </div>
        <div className="text-xl text-blue-100 font-medium">
          {currentDate}
        </div>
      </div>
    </div>
  );
}
