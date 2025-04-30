import React from "react";
import TomSelect from "../../base-components/TomSelect";

interface TomSelectBoxProps {
  options: { id: string; name: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  loading: boolean;
}

const TomSelectBox: React.FC<TomSelectBoxProps> = ({ options, value, onChange, loading, placeholder = "لطفا انتخاب کنید" }) => {
  const handleChange = (newValue: string) => {
    onChange(newValue);
  };

  return (
    <>
      {loading ? (
        <div className="mt-2 text-sm text-center text-gray-500">در حال بارگذاری...</div>
      ) : (
        <TomSelect
          value={value}
          onChange={handleChange}
          options={{
            placeholder,
          }}
          className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
        >
          {options.map((option) => (
            <>
              {/* {console.log(option)} */}
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            </>
          ))}
        </TomSelect>
      )}
    </>
  );
};

export default TomSelectBox;
