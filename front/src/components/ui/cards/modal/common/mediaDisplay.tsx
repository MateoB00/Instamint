interface Props {
  mediaUrl: string;
  mediaName: string;
}

const MediaDisplay = ({ mediaUrl, mediaName }: Props) => {
  const isVideo = mediaName.endsWith('.mp4');
  const isAudio = mediaName.endsWith('.ogg') || mediaName.endsWith('.flac');

  return (
    <>
      {isVideo && (
        <video data-testid="video" controls width={250} height={250}>
          <source src={mediaUrl} type="video/mp4" />
        </video>
      )}
      {isAudio && <audio data-testid="audio" controls src={mediaUrl}></audio>}
      {!isVideo && !isAudio && (
        <img
          data-testid="image"
          className="imgContent"
          src={mediaUrl}
          width={400}
          height={400}
        />
      )}
    </>
  );
};

export default MediaDisplay;
