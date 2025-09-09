import DigitalClock from '@/components/DigitalClock';
import WeatherWidget from '@/components/WeatherWidget';
import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* 헤더 */}
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          🏠 KangHee's Home
        </h1>
        <p className="text-gray-600">강희의 개인 대시보드</p>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="container mx-auto px-4 pb-8">
        {/* 시계와 날씨를 상단에 배치 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DigitalClock />
          <WeatherWidget />
        </div>

        {/* TodoList를 하단에 배치 */}
        <div className="max-w-2xl mx-auto">
          <TodoList />
        </div>
      </main>

      {/* 푸터 */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Made with ❤️ using Next.js & Tailwind CSS</p>
        <p className="mt-1">© {new Date().getFullYear()} KangHee's Home</p>
      </footer>
    </div>
  );
}
