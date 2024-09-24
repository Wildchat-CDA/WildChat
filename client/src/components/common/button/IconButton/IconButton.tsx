interface IconButtonProps {
  icon: string;
  text: string;
  onClick: () => void;
  ariaLabel: string;
  isActive?: boolean;
  accueil?: boolean;
  messagesPrives?: boolean;
  listePresences?: boolean;
  elevesConnectes?: boolean;
  mainsLevees?: boolean;
}

function IconButton({ 
  icon, 
  text, 
  onClick, 
  ariaLabel, 
  isActive = false,
  accueil,
  messagesPrives,
  listePresences,
  elevesConnectes,
  mainsLevees
}: IconButtonProps) {
  return (
    <button
      className={`nav-item ${isActive ? 'active' : ''} ${accueil ? 'accueil' : ''} 
                 ${messagesPrives ? 'messages-prives' : ''} ${listePresences ? 'liste-presences' : ''}
                 ${elevesConnectes ? 'eleves-connectes' : ''} ${mainsLevees ? 'mains-levees' : ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={isActive}
    >
      <div className='icon-wrapper'>
        <img
          src={`/icons/${icon}`}
          alt=''
          aria-hidden='true'
          className='nav-icon'
        />
      </div>
      <span className='nav-text'>{text}</span>
    </button>
  );
}

export default IconButton;