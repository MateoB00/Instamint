import { Message } from './Message';

interface Messages {
  apiError: string;
  apiSuccess: string;
}

interface Props {
  messages: Messages;
}

const FormApiMessagesComponent = ({ messages }: Props) => (
  <>
    {messages.apiError && <Message message={messages.apiError} color="red" />}
    {messages.apiSuccess && (
      <Message message={messages.apiSuccess} color="#b3ff80" />
    )}
  </>
);

export default FormApiMessagesComponent;
