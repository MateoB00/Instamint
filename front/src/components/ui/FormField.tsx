import { useField, Field } from 'formik';
import '../../scss/components/ui/input.scss';

interface Props {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  className: string;
}

const FormField = ({ name, label, ...otherProps }: Props) => {
  const [field, meta] = useField(name);
  const hasError = Boolean(meta.error && meta.touched);

  return (
    <>
      {label && (
        <label htmlFor={field.name} className="labelForm">
          {label}
        </label>
      )}
      <Field
        id={field.name}
        {...field}
        {...otherProps}
        aria-describedby={hasError ? `${field.name}-error` : ''}
        checked={field.value}
      />
      {hasError && (
        <span id={`${field.name}-error`} className="text-red" role="alert">
          {meta.error}
        </span>
      )}
    </>
  );
};

export default FormField;
