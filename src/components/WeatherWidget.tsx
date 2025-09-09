'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  location: string;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        
        // 안양시 동안구 관양동의 좌표
        const lat = 37.3889;
        const lon = 126.9578;
        
        // 실제 구현 시에는 환경변수를 사용하세요
        // const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        
        // API 키가 없는 경우 더미 데이터 사용
        const dummyWeather: WeatherData = {
          temperature: Math.floor(Math.random() * 20) + 5, // 5-25도 랜덤
          description: ['맑음', '흐림', '비', '눈', '구름 조금'][Math.floor(Math.random() * 5)],
          humidity: Math.floor(Math.random() * 40) + 40, // 40-80% 랜덤
          windSpeed: Math.floor(Math.random() * 10) + 1, // 1-10 m/s 랜덤
          icon: '01d',
          location: '안양시 동안구 관양동'
        };
        
        // 실제 API 호출을 시뮬레이션하기 위한 지연
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setWeather(dummyWeather);
        setError('');
      } catch (err) {
        setError('날씨 정보를 가져올 수 없습니다.');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    
    // 10분마다 날씨 정보 업데이트
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (description: string) => {
    switch (description) {
      case '맑음': return '☀️';
      case '흐림': return '☁️';
      case '비': return '🌧️';
      case '눈': return '❄️';
      case '구름 조금': return '⛅';
      default: return '🌤️';
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-6 shadow-2xl">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>날씨 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-2xl p-6 shadow-2xl">
        <div className="text-center text-white">
          <p className="text-lg">⚠️ {error}</p>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-6 shadow-2xl text-white">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">{weather.location}</h3>
        
        <div className="flex items-center justify-center mb-4">
          <span className="text-4xl mr-3">{getWeatherIcon(weather.description)}</span>
          <div>
            <div className="text-3xl font-bold">{weather.temperature}°C</div>
            <div className="text-sm opacity-90">{weather.description}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="font-semibold">습도</div>
            <div className="text-lg">{weather.humidity}%</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="font-semibold">풍속</div>
            <div className="text-lg">{weather.windSpeed} m/s</div>
          </div>
        </div>
      </div>
    </div>
  );
}
