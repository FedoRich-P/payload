import React, {Fragment} from 'react';
import { ChevronRight } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  href: string;
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm">
      {items.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
          <a
            href={item.href}
            className={`${
              index === items.length - 1
                ? 'text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            } transition-colors`}
          >
            {item.label}
          </a>
        </Fragment>
      ))}
    </nav>
  );
}
