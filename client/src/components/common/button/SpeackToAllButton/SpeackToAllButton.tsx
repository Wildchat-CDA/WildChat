import { useContext } from 'react';
import { AudioContext } from '../../../../context/AudioContext';
import IconButton from '../IconButton/IconButton';
import Tooltip from '../../Tooltip/Tooltip';

function SpeakToAllButton() {
  const audioContext = useContext(AudioContext);

  if (!audioContext) {
    throw new Error("SpeakToAllButton must be used within an AudioProvider");
  }

  const { isMuted, isMute } = audioContext;

  return (
    <Tooltip content={isMuted ? 'Prendre la parole' : 'Arrêter de parler'}>
      <IconButton
        icon={isMuted ? 'NoSpeak.png' : 'speak.png'}
        text='Prendre la parole'
        onClick={isMute}
        isActive={!isMuted}
        ariaLabel={isMuted ? 'Prendre la parole' : 'Arrêter de parler'}
      />
    </Tooltip>
  );
}

export default SpeakToAllButton;