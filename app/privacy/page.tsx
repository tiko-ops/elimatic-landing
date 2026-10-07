import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { CompanyIdentity, ContactLink } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Elimatic handles the personal data you share with us.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy">
      <h2>Who we are</h2>
      <p>
        This website is run by <CompanyIdentity />, which is responsible for the personal data
        described here. Questions about your data can be sent to <ContactLink />.
      </p>

      <h2>What we collect</h2>
      <p>When you request a demo, we collect what you enter in the form:</p>
      <ul>
        <li>your name</li>
        <li>your work email</li>
        <li>your company and role</li>
        <li>your message, if you write one</li>
      </ul>
      <p>
        To prevent abuse, your IP address is used briefly to limit repeated submissions. We do not
        store it with your request.
      </p>

      <h2>Why we use it</h2>
      <p>
        Only to respond to your request, arrange a demo and follow up on it. We process the data
        because you asked us to contact you, and because we have a legitimate interest in
        answering business enquiries. We do not sell your data or use it for advertising.
      </p>

      <h2>Who can see it</h2>
      <p>
        Our team, and the service providers that help us run the website and deliver your request
        to us by email. They may only use the data on our behalf.
      </p>

      <h2>How long we keep it</h2>
      <p>
        For as long as needed to handle your request and any follow-up. After that it is deleted.
        You can ask us to delete it at any time.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask to see, correct or delete your data, to restrict or object to how we use it,
        and to receive a copy of it. Contact us at <ContactLink />. You can also complain to your
        data protection authority. In Sweden, that is the Swedish Authority for Privacy Protection
        (IMY).
      </p>

      <h2>Cookies</h2>
      <p>
        This website does not use tracking cookies. Read more in our{" "}
        <Link href="/cookies" className="font-medium text-accent hover:underline">
          cookie policy
        </Link>
        .
      </p>

      <h2>Changes</h2>
      <p>
        If we change how we handle personal data, we will update this page and the date at the top.
      </p>
    </LegalPage>
  );
}
