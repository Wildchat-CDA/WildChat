import React from 'react';
import './Dropdown.css';

interface DropdownItem {
  icon: string;
  text: string;
  onClick: () => void;
}

interface DropdownProps {
  items: DropdownItem[];
}

function Dropdown({ items }: DropdownProps) {
  return (
    <div className="dropdown">
      {items.map((item, index) => (
        <div key={index} className="dropdown-item" onClick={item.onClick}>
          <img src={`/icons/${item.icon}`} alt={item.text} className="dropdown-icon" />
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}

export default Dropdown;