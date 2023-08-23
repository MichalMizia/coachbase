import { toast } from "react-hot-toast";
import { ZodError } from "zod";

interface useErrorValidationProps {
  error: any;
  defaultErrorMessage?: string;
  toastDuration?: number;
  custom?: boolean;
}

export function useErrorValidation({
  error,
  defaultErrorMessage,
  toastDuration,
  custom,
}: useErrorValidationProps): void {
  if (error instanceof ZodError) {
    toast.error("Formularz wypełniony niepoprawnie");
  } else if (error instanceof Error && error.message) {
    toast.error(
      (t) => (
        <div className="space-y-1">
          {custom ? (
            <>
              <h4 className="text-xl font-semibold">
                {defaultErrorMessage || "Coś poszło nie tak"}
              </h4>
              <p>{error.message}</p>
            </>
          ) : (
            error.message
          )}
        </div>
      ),
      {
        className: custom ? "custom" : "",
        duration: toastDuration ? toastDuration : 6000,
      }
    );
  } else if (error?.data?.message) {
    toast.error(
      (t) => (
        <div className="space-y-1">
          {custom ? (
            <>
              <h4 className="text-xl font-semibold">
                {defaultErrorMessage || "Coś poszło nie tak"}
              </h4>
              <p>{error.data.message}</p>
            </>
          ) : (
            error.data.message
          )}
        </div>
      ),
      {
        className: custom ? "custom" : "",
        duration: toastDuration ? toastDuration : 6000,
      }
    );
  } else {
    toast.error(
      (t) => (
        <div className="space-y-1">
          {custom ? (
            <>
              <h4 className="text-xl font-semibold">
                {defaultErrorMessage || "Coś poszło nie tak"}
              </h4>
              <p>
                Upewnij się że poprawnie wypełniłeś formularz i spróbuj
                ponownie.
              </p>
            </>
          ) : (
            defaultErrorMessage || "Coś poszło nie tak"
          )}
        </div>
      ),
      {
        className: custom ? "custom" : "",
        duration: toastDuration ? toastDuration : 6000,
      }
    );
  }

  return;
}
