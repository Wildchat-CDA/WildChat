import './Dropdown.css';

interface DropdownItem {
  icon: string;
  text: string;
  onClick: () => void;
}

interface DropdownProps {
  items: DropdownItem[];
  onClose: () => void;
}

function Dropdown({ items, onClose }: DropdownProps) {
  return (
    <div className="dropdown">
      {items.map((item, index) => (
        <div
          key={index}
          className="dropdown-item"
          onClick={() => {
            item.onClick();
            onClose();
          }}
        >
          {item.icon && (
            <img 
              src={item.icon} 
              alt="" 
              className="dropdown-icon" 
              onError={(e) => {
                console.error(`Failed to load icon: ${item.icon}`);
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}

export default Dropdown;