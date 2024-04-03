import { FC } from 'react';

interface Props {
  message: string;
  color: 'red' | '#16502d';
}

export const Message: FC<Props> = ({ message, color }) => (
  <span style={{ color }}>{message}</span>
);

export const renderMessages = (
  formMessages: { [key: string]: string },
  color: 'red' | '#16502d',
) =>
  Object.keys(formMessages).map((fieldName, index) => (
    <Message key={index} message={formMessages[fieldName]} color={color} />
  ));
