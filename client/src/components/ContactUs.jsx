import { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  async function onSubmit(data) {
    const { email, subject, message } = data;
    try {
      const response = await fetch("https://dmsl-beta-xrq6.vercel.app/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, subject, message }),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setStatusType("success");
        reset();
      } else {
        setStatus("Failed to send message. Please try again.");
        setStatusType("error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("An error occurred. Please try again later.");
      setStatusType("error");
    }

    // Clear the status message after 3 seconds
    setTimeout(() => {
      setStatus("");
    }, 8000);
  }

  return (
    <section className="contact-us">
      <div className="container row">
        <div className="contact-us_content">
          <h2>LET’S TALK</h2>
          <h1>Write Us</h1>
          <p>Feel free to reach out with whatever question you might have.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-inputs">
            <div className="contact-us__input">
              <input
                type="email"
                name="email"
                {...register("email", { required: "Required Field" })}
                placeholder="Your email address"
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <span className="contact-us__errmsg">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="contact-us__input">
              <input
                type="text"
                name="subject"
                {...register("subject", { required: "Required Field" })}
                placeholder="Subject"
                aria-invalid={errors.subject ? "true" : "false"}
              />
              {errors.subject && (
                <span className="contact-us__errmsg">
                  {errors.subject.message}
                </span>
              )}
            </div>
          </div>

          <div className="contact-us__textarea">
            <textarea
              name="message"
              {...register("message", { required: "Required Field" })}
              placeholder="Write message here"
              aria-invalid={errors.message ? "true" : "false"}
            ></textarea>
            {errors.message && (
              <span className="contact-us__errmsg">
                {errors.message.message}
              </span>
            )}
          </div>

          <div className="contact-form__btn-container">
            <button disabled={isSubmitting} type="submit" className="btn">
              {isSubmitting ? (
                <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
              ) : (
                "SEND NOW"
              )}
            </button>
            {status && (
              <div
                className="contact-us-status-message"
                aria-invalid={statusType === "success" ? "true" : "false"}
              >
                {status}
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
