import type { Metadata } from "next";
import LegalPage, { CompanyIdentity, ContactLink } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The terms that apply when you use the Elimatic website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use">
      <h2>About these terms</h2>
      <p>
        These terms apply to your use of this website, run by <CompanyIdentity />. By using the
        website, you accept them. Use of the Elimatic platform itself is covered by a separate
        agreement.
      </p>

      <h2>Information on this website</h2>
      <p>
        The content is general information about Elimatic. It is not an offer, and it is not
        advice for your specific situation. Illustrations and examples show how the product works
        and are not guarantees of results. We work to keep the content accurate, but it may change
        without notice.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The Elimatic name, logo, text, graphics and design on this website belong to Elimatic or
        its licensors. Other company names and logos belong to their respective owners. You may
        not copy or reuse the content beyond normal browsing and sharing links without our
        permission.
      </p>

      <h2>Links to other websites</h2>
      <p>We are not responsible for the content of websites we link to.</p>

      <h2>Liability</h2>
      <p>
        The website is provided as it is. To the extent permitted by law, we are not liable for
        loss arising from use of the website or reliance on its content.
      </p>

      <h2>Changes</h2>
      <p>We may update these terms. The date at the top shows the latest version.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to <ContactLink />.
      </p>
    </LegalPage>
  );
}
