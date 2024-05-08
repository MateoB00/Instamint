import { Message } from '../Message';
import Button from '../Button';
import Input from '../Input';
import { useItemsProfile } from '../../../hooks/components/userProfile/useItemsProfile';

export default function SideBar() {
  const { message, handleFileChange, handleUploadFile } = useItemsProfile();

  return (
    <div className="sideBar">
      <div className="status">
        <span>Status</span>
        <div className="choice">
          <Button>All</Button>
          <Button>New</Button>
          <Button>Most likes</Button>
        </div>
      </div>
      <div className="price">
        <span>Price</span>
        <div className="choice">
          <Input name="min" type="text" placeholder="Min" />
          <Input name="max" type="text" placeholder="Max" />
        </div>
      </div>
      <div>
        <span>Upload a content</span>
        <Input type="file" onChange={handleFileChange} />
        <Button onClick={handleUploadFile}>Upload</Button>
        <div>{message && <Message color="red" message={message} />}</div>
      </div>
    </div>
  );
}
