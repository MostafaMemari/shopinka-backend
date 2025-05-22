'use client';

import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'select';
  placeholder?: string;
  value?: string;
  options?: { value: string; label: string }[];
}

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields?: FormField[];
  buttonText: string;
  onSubmit: (formData: Record<string, string>) => void;
  customForm?: React.ReactElement;
}

const GenericModal: React.FC<GenericModalProps> = ({ isOpen, onClose, title, fields = [], buttonText, onSubmit, customForm }) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.id]: field.value || '' }), {}),
  );

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData(fields.reduce((acc, field) => ({ ...acc, [field.id]: field.value || '' }), {}));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="main-scroll fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0">
      <div className="relative max-h-full w-full max-w-2xl mx-auto">
        <div className="divide-y overflow-hidden rounded-lg bg-muted shadow-sm ring-1 ring-gray-100 dark:ring-white/5">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="md:text-lg">{title}</h3>
              <button onClick={onClose} className="">
                <FaTimes className="h-5 w-5" />
                <span className="sr-only">Close Modal</span>
              </button>
            </div>
          </div>
          <div className="space-y-6 px-4 py-5 sm:p-6">
            {customForm ? (
              customForm
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {fields.map((field) => (
                  <div
                    key={field.id}
                    className={
                      field.type === 'select' ? 'col-span-2 flex items-center justify-between gap-x-6' : 'col-span-2 sm:col-span-1'
                    }
                  >
                    {field.type === 'text' ? (
                      <label className="relative block rounded-lg border shadow-base w-full">
                        <input
                          type="text"
                          id={field.id}
                          className="peer w-full rounded-lg border-none bg-transparent px-4 py-3 placeholder-transparent focus:outline-hidden focus:ring-0"
                          placeholder={field.placeholder}
                          value={formData[field.id]}
                          onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                        />
                        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/60 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                          {field.label}
                        </span>
                      </label>
                    ) : (
                      field.options?.map((optionGroup, index) => (
                        <div key={`${field.id}-${index}`} className="w-full">
                          <label htmlFor={`${field.id}-${index}`} className="mb-2 block font-medium text-text/90">
                            {optionGroup.label}
                          </label>
                          <select
                            id={`${field.id}-${index}`}
                            className="mb-6 block w-full rounded-lg border bg-muted p-2 text-text/90 outline-hidden focus:ring-0 dark:placeholder-zinc-400"
                            value={formData[field.id]?.split('-')[index] || ''}
                            onChange={(e) => {
                              const newValue = formData[field.id] ? formData[field.id].split('-') : ['', '', ''];
                              newValue[index] = e.target.value;
                              setFormData({
                                ...formData,
                                [field.id]: newValue.join('-'),
                              });
                            }}
                          >
                            <option value="">{optionGroup.label}</option>
                            {optionGroup.value.split(',').map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))
                    )}
                    <div className="my-2 h-6 text-red-500 dark:text-red-400"></div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center justify-end gap-x-4">
              <button onClick={handleSubmit} className="btn-primary w-full px-4 py-2 xs:w-fit" type="button">
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;
