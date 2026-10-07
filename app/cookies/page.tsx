import type { Metadata } from "next";
import LegalPage, { ContactLink } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: "Elimatic's website does not use tracking cookies.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie policy">
      <h2>No tracking cookies</h2>
      <p>
        This website does not use cookies for analytics, advertising or tracking, and it does not
        load third-party scripts. That is why you are not asked to accept cookies.
      </p>

      <h2>What your browser stores</h2>
      <p>
        Like any website, your browser may cache files such as images and fonts to load pages
        faster. All of them come from this website. Nothing is used to identify you or follow you
        across other websites.
      </p>

      <h2>If this changes</h2>
      <p>
        If we ever add cookies that are not strictly necessary, we will update this page and ask
        for your consent first.
      </p>

      <h2>Contact</h2>
      <p>
        Questions can be sent to <ContactLink />.
      </p>
    </LegalPage>
  );
}
