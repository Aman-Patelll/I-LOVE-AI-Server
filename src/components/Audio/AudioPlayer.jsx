// AudioPlayer.js

import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

const AudioPlayer = ({ audioSrc }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSeek = value => {
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <Box
      width={['95%', '80%']}
      height={'100%'}
      display={'flex'}
      flexDirection={'column'}
      justifyItems={'center'}
      alignItems={'center'}
      gap={5}
    >
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <Slider
        value={currentTime}
        max={audioRef.current && audioRef.current.duration}
        onChange={handleSeek}
        aria-label="audio seek"
        mt={4}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>

      <Button onClick={togglePlay} colorScheme="teal">
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
    </Box>
  );
};

export default AudioPlayer;
