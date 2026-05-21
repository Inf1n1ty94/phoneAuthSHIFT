import { useState, useEffect } from "react";
import { PhoneForm } from "../components/PhoneForm/PhoneForm";
import { OtpForm } from "../components/OtpForm/OtpForm";

import { requestOtp, signIn } from "../api/auth";

export const App = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);

  const handleSendOtp = async () => {
    if (!phone) {
      setPhoneError("Поле является обязательным");
      return;
    }

    try {
      setLoading(true);
      setPhoneError(null);

      await requestOtp(phone);

      setStep("otp");
      setTimer(60);
    } catch (e) {
      setPhoneError("Ошибка");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!code || code.length !== 6) {
      setCodeError("Код должен содержать 6 цифр");
      return;
    }

    try {
      setLoading(true);
      setCodeError(null);

      await signIn(phone, code);

      setStep("otp");
      setTimer(60);
    } catch (e) {
      setCodeError("Неверный код");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step !== "otp") return;
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [step, timer]);

  return (
    <div className="container">
      <div className="info">
        <h1 className="title">Вход</h1>

        <p className="description">
          {step === "phone"
            ? `Введите номер телефона для входа в личный кабинет`
            : `Введите проверочный код для входа в личный кабинет`}
        </p>
      </div>
      <div className="formsContainer">
        <PhoneForm
          phone={phone}
          setPhone={setPhone}
          appError={phoneError}
          setAppError={setPhoneError}
        />

        {step === "otp" && (
          <OtpForm
            code={code}
            setCode={setCode}
            appError={codeError}
            setAppError={setCodeError}
          />
        )}
      </div>
      <button
        className="btn-send"
        onClick={step === "phone" ? handleSendOtp : handleSignIn}
        disabled={loading}
      >
        {loading ? "Загрузка" : step === "phone" ? "Продолжить" : "Войти"}
      </button>

      {step === "otp" &&
        (timer > 0 ? (
          <p className="resendText">
            Запросить код повторно можно через {timer} секунд
          </p>
        ) : (
          <button className="btn-resend" onClick={handleSendOtp}>
            Запросить код ещё раз
          </button>
        ))}
    </div>
  );
};
