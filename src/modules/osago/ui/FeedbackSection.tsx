'use client'

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export function FeedbackSection() {
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);

  return (
    <section className="bg-white rounded-2xl p-8 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-900">Получилось найти ответ?</h3>
        <div className="flex gap-4">
          <button
            onClick={() => setFeedback('no')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              feedback === 'no'
                ? 'bg-[#000078] text-white border-[#000078]'
                : 'bg-white text-[#000078] border-[#000078] hover:bg-[#000078] hover:text-white'
            }`}
          >
            <ThumbsDown className="w-5 h-5" />
            Нет
          </button>
          <button
            onClick={() => setFeedback('yes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              feedback === 'yes'
                ? 'bg-[#000078] text-white border-[#000078]'
                : 'bg-white text-[#000078] border-[#000078] hover:bg-[#000078] hover:text-white'
            }`}
          >
            <ThumbsUp className="w-5 h-5" />
            Да
          </button>
        </div>
      </div>
    </section>
  );
}
