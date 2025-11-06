import { ChangeEvent, CSSProperties, KeyboardEvent } from "react";

interface InputProps {
    type: 'text' | 'password';
    value: string;
    placeholder: string;
    disabled: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void | undefined;
    onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export default function Input({ type, value, placeholder, disabled, onChange, onKeyUp }: InputProps) {
    return (
        <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange ? onChange : undefined}
            onKeyUp={onKeyUp ? onKeyUp : undefined}
            disabled={disabled}
            className="w-full h-15 px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
        />
    );
}