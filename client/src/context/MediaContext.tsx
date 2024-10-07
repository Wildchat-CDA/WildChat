import { createContext, useState, useContext, useEffect } from 'react';

interface MediaState {
  isMicrophoneOn: boolean;
  isWebcamOn: boolean;
  isScreenSharing: boolean;
  microphoneVolume: number;
  speakerVolume: number;
  selectedMicrophone: string | null;
  selectedWebcam: string | null;
  selectedSpeaker: string | null;
  availableMicrophones: MediaDeviceInfo[];
  availableWebcams: MediaDeviceInfo[];
  availableSpeakers: MediaDeviceInfo[];
  isCalling: boolean;
}

interface MediaContextType extends MediaState {
  toggleMicrophone: () => void;
  toggleWebcam: () => void;
  toggleScreenSharing: () => void;
  setMicrophoneVolume: (volume: number) => void;
  setSpeakerVolume: (volume: number) => void;
  selectMicrophone: (deviceId: string) => void;
  selectWebcam: (deviceId: string) => void;
  selectSpeaker: (deviceId: string) => void;
  refreshDevices: () => Promise<void>;
  toggleCall: (prevState: boolean) => void;
}

export const MediaContext = createContext<MediaContextType | undefined>(
  undefined
);

export const MediaProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, setState] = useState<MediaState>({
    isMicrophoneOn: false,
    isWebcamOn: false,
    isScreenSharing: false,
    microphoneVolume: 1,
    speakerVolume: 1,
    selectedMicrophone: null,
    selectedWebcam: null,
    selectedSpeaker: null,
    availableMicrophones: [],
    availableWebcams: [],
    availableSpeakers: [],
    isCalling: false,
  });

  const refreshDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setState((prevState) => ({
        ...prevState,
        availableMicrophones: devices.filter(
          (device) => device.kind === 'audioinput'
        ),
        availableWebcams: devices.filter(
          (device) => device.kind === 'videoinput'
        ),
        availableSpeakers: devices.filter(
          (device) => device.kind === 'audiooutput'
        ),
      }));
    } catch (error) {
      console.error('Error enumerating devices:', error);
    }
  };

  useEffect(() => {
    refreshDevices();
    navigator.mediaDevices.addEventListener('devicechange', refreshDevices);
    return () => {
      navigator.mediaDevices.removeEventListener(
        'devicechange',
        refreshDevices
      );
    };
  }, []);

  const toggleMicrophone = () => {
    setState((prevState) => ({
      ...prevState,
      isMicrophoneOn: !prevState.isMicrophoneOn,
    }));
  };

  const toggleWebcam = () => {
    setState((prevState) => ({
      ...prevState,
      isWebcamOn: !prevState.isWebcamOn,
    }));
  };

  const toggleScreenSharing = () => {
    setState((prevState) => ({
      ...prevState,
      isScreenSharing: !prevState.isScreenSharing,
    }));
  };

  const setMicrophoneVolume = (volume: number) => {
    setState((prevState) => ({ ...prevState, microphoneVolume: volume }));
  };

  const setSpeakerVolume = (volume: number) => {
    setState((prevState) => ({ ...prevState, speakerVolume: volume }));
  };

  const selectMicrophone = (deviceId: string) => {
    setState((prevState) => ({ ...prevState, selectedMicrophone: deviceId }));
  };

  const selectWebcam = (deviceId: string) => {
    setState((prevState) => ({ ...prevState, selectedWebcam: deviceId }));
  };

  const selectSpeaker = (deviceId: string) => {
    setState((prevState) => ({ ...prevState, selectedSpeaker: deviceId }));
  };

  const toggleCall = (isCalling: boolean) => {
    setState((prevState) => ({ ...prevState, isCalling: isCalling }));
  };

  return (
    <MediaContext.Provider
      value={{
        ...state,
        toggleMicrophone,
        toggleWebcam,
        toggleScreenSharing,
        setMicrophoneVolume,
        setSpeakerVolume,
        selectMicrophone,
        selectWebcam,
        selectSpeaker,
        refreshDevices,
        toggleCall,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};
