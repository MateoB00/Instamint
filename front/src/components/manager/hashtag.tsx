import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  hashtags: string[];
  setHashtags: Dispatch<SetStateAction<string[]>>;
}

const HashtagManager = ({ hashtags, setHashtags }: Props) => {
  const [newHashtag, setNewHashtag] = useState('');

  const handleAddHashtag = () => {
    const hashtagArray = [...hashtags, newHashtag];
    setHashtags(hashtagArray);
  };

  const handleRemoveHashtag = (index: number) => {
    const hashtagArray = hashtags.filter((_, idx) => idx !== index);
    setHashtags(hashtagArray);
  };

  return (
    <div className="hashtag">
      <input
        type="text"
        value={newHashtag}
        onChange={(e) => setNewHashtag(e.target.value)}
        placeholder="#hashtag"
      />
      <button type="button" onClick={handleAddHashtag}>
        Add Hashtag
      </button>
      {hashtags.map((tag: string, index: number) => (
        <div key={index}>
          {tag}
          <button type="button" onClick={() => handleRemoveHashtag(index)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default HashtagManager;
