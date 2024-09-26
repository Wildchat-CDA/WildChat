import { ReactNode, useState, useRef, useEffect } from 'react';
import './tooltip.css';

interface TooltipProps {
  content: string;
  children: ReactNode;
}

function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && tooltipRef.current && containerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      const topPosition = containerRect.top > tooltipRect.height + 10;
      const leftPosition = containerRect.left + (containerRect.width / 2) - (tooltipRect.width / 2);

      tooltipRef.current.style.top = topPosition ? `-${tooltipRect.height + 10}px` : `${containerRect.height + 10}px`;
      tooltipRef.current.style.left = `${leftPosition}px`;
    }
  }, [isVisible]);

  return (
    <div 
      className="tooltip-container" 
      ref={containerRef}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="tooltip-text" ref={tooltipRef}>
          {content}
        </div>
      )}
    </div>
  );
}

export default Tooltip;