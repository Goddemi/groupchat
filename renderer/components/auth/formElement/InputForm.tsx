import { forwardRef } from "react";

interface Props {
  label: string;
  id: "email" | "password";
}

const InputForm = forwardRef(
  (props: Props, ref: React.Ref<HTMLInputElement>) => {
    return (
      <div className="mb-6 flex justify-end">
        <label htmlFor={props.id} className="mr-3">
          <span>{props.label}</span>
        </label>
        <div>
          <input
            name={props.id}
            type={props.id}
            ref={ref}
            autoComplete="new-password"
            className="border-b border-indigo-300 outline-0"
          />
        </div>
      </div>
    );
  }
);

InputForm.displayName = "InputForm";
export default InputForm;
