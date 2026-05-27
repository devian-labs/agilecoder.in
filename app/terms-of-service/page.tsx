import BackButton from '@/components/BackToHome'
import React from 'react'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Terms and Conditions | AgileCoder",
  description: "Terms and Conditions for browsing and using AgileCoder services.",
  openGraph: {
    title: "Terms and Conditions | AgileCoder",
    description: "Terms and Conditions for browsing and using AgileCoder services.",
    url: "https://www.agilecoder.in/terms-of-service",
    siteName: "AgileCoder",
    type: "website",
  },
}

const TermsOfService = () => {
  return (
    <main className="max-w-3xl mx-auto px-5 py-10">
      <BackButton />

      <h1 className="text-3xl font-bold mb-4 text-foreground">Terms and Conditions</h1>
      <p className="text-sm text-muted-foreground mb-8">
        <strong>Effective Date:</strong> October 19, 2025
      </p>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p>
          These Terms and Conditions ("Terms") govern your access to and use of our website. These Terms form a legally binding agreement between you and <strong>agilecoder.in</strong>. By accessing, browsing, registering for, or otherwise using the Platform, you accept and agree to be bound by these Terms in full. If you do not agree to these Terms, you must not access or use the Platform. Please read these Terms carefully and retain a copy for your records.
          This Terms & Conditions has been created with the help of the{' '}
          <a
            href="https://listwr.com/terms-and-conditions-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Free Terms & Conditions Generator
          </a>.
        </p>

        <h2>1. Definitions</h2>
        <ul className="list-disc pl-6">
          <li><strong>"Platform"</strong> means the website, mobile application, services, features, tools, content and functionality made available by agilecoder.in via its web domains and mobile applications.</li>
          <li><strong>"User"</strong> or <strong>"you"</strong> means any individual or entity that accesses, browses, registers for, or uses the Platform.</li>
          <li><strong>"Account"</strong> means a user account registered on the Platform when account creation is required to access certain features.</li>
          <li><strong>"User Content"</strong> means any content, materials, information, data, text, images, audio, video, feedback or other materials that Users submit, post, upload, or otherwise make available through the Platform ("upload_content").</li>
          <li><strong>"Subscription Plan"</strong> means any recurring paid plan, membership, or tier offered through the Platform ("subscription_plan").</li>
          <li><strong>"Purchase"</strong> means any one-time paid transaction or sale conducted on the Platform ("user_buy").</li>
        </ul>

        <h2>2. Eligibility</h2>
        <p>
          Access to certain parts of the Platform may be limited to individuals who are of legal age to form binding contracts in their jurisdiction (commonly 18 years or older). By accessing or using the Platform you represent and warrant that you meet the eligibility requirements and you will comply with all applicable laws and regulations.
        </p>
        <p>
          If you are using the Platform on behalf of a company, organization, or other legal entity, you represent and warrant that you have the authority to agree to these Terms on behalf of that entity. We may request proof of identity, age, or authority prior to allowing access to certain features.
        </p>

        <h2>3. Use of the Platform and Acceptable Conduct</h2>
        <p>
          You agree to use the Platform only for lawful, authorized, and proper purposes. You will not use the Platform to engage in deceptive, malicious, or illegal conduct, and you will not attempt to disrupt, interfere with, or compromise the security, integrity, or performance of the Platform.
        </p>

        <h2>4. Ownership of Platform Content (Own Content)</h2>
        <p>
          All intellectual property rights in and to the Platform, including but not limited to software, designs, text, graphics, logos, images, audio, video, data compilations and the selection and arrangement thereof (collectively, "Platform Content"), are the exclusive property of agilecoder.in or its licensors, and are protected by copyright, trademark, patent and other intellectual property and unfair competition laws.
        </p>

        <h2>5. Feedback and Suggestions (Feedback Suggestion)</h2>
        <p>
          If you provide feedback, suggestions, ideas, or improvement proposals (Feedback) regarding the Platform, you agree that such Feedback is non-confidential and non-proprietary.
        </p>

        <h2>6. Privacy and Data Protection</h2>
        <p>
          Your privacy is important. Our Privacy Policy describes how we collect, use, share and protect personal information collected via the Platform. By using the Platform you consent to such processing.
        </p>

        <h2>7. Warranties and Disclaimers</h2>
        <p className="uppercase font-semibold text-foreground">
          The platform is provided on an “as is” and “as available” basis.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by applicable law, in no event will agilecoder.in or its affiliates, officers, directors, employees or agents be liable for any indirect, incidental, special, consequential, exemplary or punitive damages.
        </p>

        <h2>9. Indemnification</h2>
        <p>
          You agree to indemnify, defend and hold harmless agilecoder.in and its affiliates, licensors, and service providers from and against any claims or damages arising from your use of the Platform.
        </p>

        <h2>10. Termination and Suspension</h2>
        <p>
          We may suspend or terminate access to all or part of the Platform immediately, without prior notice or liability, for any reason, including if you breach the Terms.
        </p>

        <h2>11. Governing Law and Dispute Resolution</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of India. You agree that any dispute shall be resolved by the competent courts located in Odisha, India.
        </p>

        <h2>12. Force Majeure</h2>
        <p>
          Neither party shall be liable for any failure or delay in performance due to causes beyond its reasonable control.
        </p>

        <h2>13. Third-Party Services and Links</h2>
        <p>
          The Platform may contain links to third-party websites or services. Such links are provided for convenience only and do not constitute an endorsement.
        </p>

        <h2>14. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. Continued use of the Platform after changes are posted constitutes acceptance of the revised Terms.
        </p>

        <h2>15. Miscellaneous</h2>
        <p>
          If any provision of these Terms is held invalid, that provision will be limited so that these Terms remain in full force. These Terms, along with our Privacy Policy, form the entire agreement between you and agilecoder.in.
        </p>

        <h2>16. Contact Information</h2>
        <p>
          For questions or concerns, please contact: <strong>support@agilecoder.in</strong>.
        </p>

        <p className="text-sm text-muted-foreground mt-8">
          <strong>Last updated:</strong> October 19, 2025.
        </p>
      </div>
    </main>
  )
}

export default TermsOfService
