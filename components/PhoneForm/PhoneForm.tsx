import "./PhoneForm.css";

interface PhoneFormProps {
  phone: string;
  setPhone: (value: string) => void;
  appError: string | null;
  setAppError: (value: string | null) => void;
}
export const PhoneForm = ({
  phone,
  setPhone,
  appError,
  setAppError,
}: PhoneFormProps) => {
  return (
    <div className="phoneForm">
      <input
        className="inputPhone"
        type="text"
        placeholder="Телефон"
        value={phone}
        onChange={(event) => {
          const value = event.target.value.replace(/\D/g, "").slice(0, 11);

          setPhone(value);

          if (appError) {
            setAppError(null);
          }
        }}
      />
      {appError && <p className="error">{appError}</p>}
    </div>
  );
};
