import React, { useState } from "react";

type TInputValues = {
  [key: string]: any;
};

type TUseFormReturn = {
  values: TInputValues;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setValues: React.Dispatch<React.SetStateAction<TInputValues>>;
};

export function useForm(inputValues: TInputValues): TUseFormReturn {
  const [values, setValues] = useState<TInputValues>(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { value, name } = event.target;

    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}
