import "./OtpForm.css";

interface OtpFormProps {
  code: string;
  setCode: (value: string) => void;
  appError: string | null;
  setAppError: (value: string | null) => void;
}
export const OtpForm = ({
  code,
  setCode,
  appError,
  setAppError,
}: OtpFormProps) => {
  return (
    <div className="phoneForm">
      <input
        className="inputOtp"
        type="text"
        placeholder="Проверочный код"
        value={code}
        onChange={(event) => {
          const value = event.target.value.replace(/\D/g, "").slice(0, 6);

          setCode(value);

          if (appError) {
            setAppError(null);
          }
        }}
      />
      {appError && <p className="error">{appError}</p>}
    </div>
  );
};
