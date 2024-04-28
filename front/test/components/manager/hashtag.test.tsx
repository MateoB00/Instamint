import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import HashtagManager from '../../../src/components/manager/hashtag';

const mockSetHashtags = jest.fn();

describe('Hashtag', () => {
  it('adds a new hashtag', () => {
    render(<HashtagManager hashtags={[]} setHashtags={mockSetHashtags} />);

    const inputElement = screen.getByPlaceholderText('#hashtag');
    fireEvent.change(inputElement, { target: { value: 'newHashtag' } });

    fireEvent.click(screen.getByText('Add Hashtag'));

    expect(mockSetHashtags).toHaveBeenCalledWith(['newHashtag']);
  });

  it('removes a hashtag', () => {
    const hashtags = ['hashtag1', 'hashtag2'];
    render(
      <HashtagManager hashtags={hashtags} setHashtags={mockSetHashtags} />,
    );

    fireEvent.click(screen.getAllByText('Remove')[0]);

    expect(mockSetHashtags).toHaveBeenCalledWith(['hashtag2']);
  });
});
