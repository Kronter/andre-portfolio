import Head from "next/head";
import { useEffect } from "react";

const LINKEDIN_URL =
  "https://www.linkedin.com/in/andr%C3%A9-nunn-bastos-gottgtroy-b56616172";

export default function LinkedInRedirect() {
  useEffect(() => {
    window.location.replace(LINKEDIN_URL);
  }, []);

  return (
    <>
      <Head>
        <title>Redirecting to LinkedIn...</title>
        <meta httpEquiv="refresh" content={`0; url=${LINKEDIN_URL}`} />
        <meta name="robots" content="noindex" />
      </Head>

      <p>
        Redirecting to{" "}
        <a href={LINKEDIN_URL}>
          LinkedIn
        </a>
        ...
      </p>
    </>
  );
}