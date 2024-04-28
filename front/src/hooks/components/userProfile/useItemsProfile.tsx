import { ChangeEvent, useState } from 'react';
import { uploadOriginalContent } from '../../../api/originalContent';

const MAX_FILE_SIZE_BYTES = 1073741824;

export const useItemsProfile = () => {
  const [file, setFile] = useState<File>();
  const [message, setMessage] = useState('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const allowedTypes = [
      'image/png',
      'image/webp',
      'audio/ogg',
      'audio/flac',
      'video/h264',
    ];
    const content = event.target.files?.[0];

    if (content) {
      if (!allowedTypes.includes(content.type)) {
        setMessage('File type not allowed');

        return;
      }

      if (content.size > MAX_FILE_SIZE_BYTES) {
        setMessage('File size exceeds the limit (1GB)');

        return;
      }

      setMessage('');
      setFile(content);
    }
  };

  const handleUploadFile = async () => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
        await uploadOriginalContent(formData);
        setMessage('File uploaded successfully');
      }
    } catch (error) {
      setMessage(`Error uploading file: ${error}`);
    }
  };

  return {
    file,
    message,
    handleFileChange,
    handleUploadFile,
  };
};
