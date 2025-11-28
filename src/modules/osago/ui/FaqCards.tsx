import { ChevronRight } from 'lucide-react';

interface FaqCard {
  title: string;
  id: string;
}

interface FaqCardsProps {
  cards: FaqCard[];
}

export function FaqCards({ cards }: FaqCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
      {cards.map((card) => (
        <a
          key={card.id}
          href="#"
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-900 flex-1">{card.title}</span>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 ml-4" />
          </div>
        </a>
      ))}
    </div>
  );
}
