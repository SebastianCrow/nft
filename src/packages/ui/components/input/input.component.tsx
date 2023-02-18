import { FunctionComponent } from 'react';

interface InputProps {
  placeholder?: string;
}

export const Input: FunctionComponent<InputProps> = ({ placeholder }) => {
  return (
    <input
      placeholder={placeholder}
      className="bg-slate-100 py-3 px-6 rounded-lg"
    />
  );
};
