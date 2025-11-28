import React from 'react';
import { User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="w-[70px] h-10 bg-[#000078] rounded-lg flex items-center justify-center">
              <span className="text-white">СОГАЗ</span>
            </div>
            <nav className="flex gap-6">
              <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors">
                Частным лицам
              </a>
              <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors">
                Бизнесу
              </a>
              <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors">
                Премиум
              </a>
              <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors">
                Еще
              </a>
            </nav>
          </div>
          <a href="#" className="flex items-center gap-2 text-[#000078] hover:text-[#006ba3] transition-colors">
            Личный кабинет
            <User className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
