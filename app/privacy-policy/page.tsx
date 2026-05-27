import BackButton from '@/components/BackToHome'
import React from 'react'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Privacy Policy | AgileCoder",
  description: "Privacy Policy for AgileCoder. Learn how we collect, use, and protect your information.",
  openGraph: {
    title: "Privacy Policy | AgileCoder",
    description: "Privacy Policy for AgileCoder. Learn how we collect, use, and protect your information.",
    url: "https://www.agilecoder.in/privacy-policy",
    siteName: "AgileCoder",
    type: "website",
  },
}

const PrivacyPolicy = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-foreground">
      <div>
        <BackButton />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-foreground">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">
        <strong>Effective Date:</strong> October 19, 2025
      </p>

      <p className="mb-6 leading-relaxed">
        This Privacy Policy explains how we collect, use, disclose, and protect the personal information you
        provide or that we collect when you access or use our services on{' '}
        <a
          href="https://www.agilecoder.in"
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.agilecoder.in
        </a>
        . It explains your privacy rights and choices, and how to contact us about our privacy practices.
        Please read this Policy carefully. By using our Platform, you consent to the data practices described
        in this Policy. This Privacy Policy has been created with the help of the{' '}
        <a
          href="https://listwr.com/privacy-policy-generator"
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Free Privacy Policy Generator
        </a>
        .
      </p>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mt-10 text-foreground">Entity and Contact Information</h2>
        <p>
          This Privacy Policy is published on behalf of an individual operator located in Odisha, India. Business
          names and registered addresses are not applicable in this case. All references to “I”, “me”, or “my”
          refer to the individual operator.
        </p>
        <h3 className="text-xl font-semibold mt-6 text-foreground">How to Contact Us</h3>
        <p>
          If you have questions, requests, or concerns about this Privacy Policy, please contact us at:{' '}
          <strong>support@agilecoder.in</strong>.
        </p>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>
        <p>
          We collect multiple types of information to operate effectively and provide you the best experience.
          The categories of information we collect include:
        </p>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">1.1. Information You Provide Directly</h3>
          <p>
            When you register, create an account, fill forms, contact us, or otherwise communicate with us, you
            may provide personal information such as your name, email address, phone number, billing and payment
            information, profile information, and other identifiers.
          </p>

          <h3 className="text-xl font-semibold text-foreground">1.2. Automatically Collected Information</h3>
          <p>
            We automatically collect technical and usage data when you interact with the Platform, which may
            include IP address, device identifiers, device model and operating system, browser type, language
            preferences, access times, pages visited, and performance metrics.
          </p>

          <h3 className="text-xl font-semibold text-foreground">1.3. Location Data</h3>
          <p>
            We may collect approximate or precise location data from your device if you grant permissions. You
            can control location access in your device settings.
          </p>

          <h3 className="text-xl font-semibold text-foreground">1.4. Payment and Transaction Data</h3>
          <p>
            When you make purchases or use paid features, we collect payment data processed by secure
            third-party payment processors. We do not store full payment card numbers on our servers unless
            explicitly required and disclosed.
          </p>
        </div>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-foreground">2. How We Use Information</h2>
        <p>We use collected information for the following purposes:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>To provide, operate, maintain, and improve our platform and related services.</li>
          <li>To authenticate users, manage accounts, and provide customer support.</li>
          <li>To process payments, prevent fraud, and enforce our Terms of Service.</li>
          <li>To personalize content and recommendations where allowed.</li>
          <li>To comply with legal obligations and protect rights and safety.</li>
        </ul>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-foreground">3. Cookies and Tracking Technologies</h2>
        <p>
          We use essential cookies for functionality and may use analytics cookies to understand how our site is
          used. You can manage or disable cookies through your browser settings.
        </p>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
          4. Advertising and Analytics
          <img
            src="https://listwr.com/badge/analytics.svg"
            alt="analytics"
            className="w-6 h-6 inline-block"
          />
        </h2>
        <p>
          We may use third-party analytics tools and advertising networks to analyze and improve performance.
          Learn more about Google Analytics privacy here:{' '}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Partner Sites Policy
          </a>
          .
        </p>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-foreground">5. Data Retention and Security</h2>
        <p>
          We retain personal information as long as necessary for business, legal, or compliance purposes. We
          apply administrative, technical, and physical safeguards to protect data, including encryption and
          access controls.
        </p>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-foreground">6. Children’s Privacy</h2>
        <p>
          Our Platform is not directed to children under 13. We do not knowingly collect data from minors. If
          you believe a child has provided information, please contact us to remove it.
        </p>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-foreground">7. Your Rights</h2>
        <p>
          You may have the right to access, correct, or delete your personal data, and to withdraw consent where
          applicable. Contact us at <strong>support@agilecoder.in</strong> to exercise these rights.
        </p>
      </section>

      <section className="space-y-4 mt-10 border-t border-border pt-8">
        <p>
          <strong>Publisher:</strong> agilecoder.in (Odisha, India)
        </p>
        <p>
          <strong>Last updated:</strong> October 19, 2025
        </p>
      </section>
    </main>
  )
}

export default PrivacyPolicy
