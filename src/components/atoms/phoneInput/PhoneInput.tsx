import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface PhoneInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  pattern?: string; // e.g., "(XXX) XXX-XXXX"
  errorMessage?: string;
  className?: string;
}

const formatPhoneNumber = (phoneNumber: string, pattern: string) => {
  const numbers = phoneNumber.replace(/\D/g, ''); // Remove all non-digits
  let formattedNumber = '';

  let numberIndex = 0;
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === 'X' && numberIndex < numbers.length) {
      formattedNumber += numbers[numberIndex];
      numberIndex++;
    } else if (pattern[i] !== 'X') {
      formattedNumber += pattern[i];
    } else {
      break;
    }
  }

  return formattedNumber;
};

export const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  placeholder = '',
  value = '',
  onChange,
  pattern = '(XXX) XXX-XXXX',
  errorMessage = 'Invalid phone number format',
  className
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = formatPhoneNumber(inputValue, pattern);

    setInternalValue(formattedValue);

    // Validate the input
    const regex = new RegExp('^' + pattern.replace(/X/g, '\\d') + '$');
    setIsValid(regex.test(formattedValue));

    if (onChange) {
      onChange(formattedValue);
    }
  };

  return (
    <div className={twMerge('w-full', className)}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <input
        type="text"
        className={twMerge(
          'block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
          isValid ? 'border-gray-300' : 'border-red-500'
        )}
        placeholder={placeholder}
        value={internalValue}
        onChange={handleChange}
      />
      {!isValid && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
    </div>
  );
};
