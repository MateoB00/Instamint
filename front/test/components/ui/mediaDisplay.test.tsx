import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MediaDisplay from '../../../src/components/ui/cards/modal/common/mediaDisplay';

describe('MediaDisplay component', () => {
  it('renders a video element for .mp4 media files', () => {
    render(<MediaDisplay mediaUrl="video.mp4" mediaName="example.mp4" />);
    const videoElement = screen.getByTestId('video');
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute('width', '250');
    expect(videoElement).toHaveAttribute('height', '250');
    const sourceElement = screen.getByTestId('video').querySelector('source');
    expect(sourceElement).toHaveAttribute('src', 'video.mp4');
    expect(sourceElement).toHaveAttribute('type', 'video/mp4');
  });

  it('renders an audio element for .ogg media files', () => {
    render(<MediaDisplay mediaUrl="audio.ogg" mediaName="audio.ogg" />);
    const audioElement = screen.getByTestId('audio');
    expect(audioElement).toBeInTheDocument();
    expect(audioElement).toHaveAttribute('src', 'audio.ogg');
  });

  it('renders an audio element for .flac media files', () => {
    render(<MediaDisplay mediaUrl="audio.flac" mediaName="audio.flac" />);
    const audioElement = screen.getByTestId('audio');
    expect(audioElement).toBeInTheDocument();
    expect(audioElement).toHaveAttribute('src', 'audio.flac');
  });

  it('renders an image element', () => {
    render(<MediaDisplay mediaUrl="picture.jpg" mediaName="picture.jpg" />);
    const imageElement = screen.getByTestId('image');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'picture.jpg');
    expect(imageElement).toHaveAttribute('width', '400');
    expect(imageElement).toHaveAttribute('height', '400');
  });
});
