import { Dispatch, SetStateAction, useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface Props {
  hashtags: string[];
  setHashtags: Dispatch<SetStateAction<string[]>>;
}

const HashtagManager = ({ hashtags, setHashtags }: Props) => {
  const [newHashtag, setNewHashtag] = useState('');

  const handleAddHashtag = () => {
    if (newHashtag !== '' && !hashtags.includes(newHashtag)) {
      const hashtagArray = [...hashtags, newHashtag];
      setHashtags(hashtagArray);
    }
  };

  const handleRemoveHashtag = (index: number) => {
    const hashtagArray = hashtags.filter((_, idx) => idx !== index);
    setHashtags(hashtagArray);
  };

  return (
    <div className="hashtag">
      <Input
        type="text"
        value={newHashtag}
        onChange={(e) => setNewHashtag(e.target.value)}
        placeholder="#hashtag"
      />
      <Button type="button" onClick={handleAddHashtag}>
        Add Hashtag
      </Button>
      {hashtags.map((tag: string, index: number) => (
        <div key={index}>
          {tag}
          <Button type="button" onClick={() => handleRemoveHashtag(index)}>
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
};

export default HashtagManager;
