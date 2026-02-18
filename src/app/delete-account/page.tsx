// app/delete-account/page.tsx (or pages/delete-account.tsx for Pages Router)
// app/delete-account/page.tsx (or pages/delete-account.tsx for Pages Router)
import React from "react";

export default function DeleteAccountPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold text-gray-800 border-b-4 border-blue-500 pb-3 mb-5">
        Delete Your egoo Account
      </h1>

      <div className="mb-5">
        <p>
          <strong>App Name:</strong> egoo
        </p>
        <p>
          <strong>Developer:</strong> egoo
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-400 rounded p-4 my-5">
        <strong>⚠️ Important:</strong> Deleting your account is permanent and
        cannot be undone. Please read this page carefully before proceeding.
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
        How to Request Account Deletion
      </h2>

      <p className="mb-4">
        To request deletion of your egoo driver account and associated data,
        please follow these steps:
      </p>

      <div className="bg-gray-50 border-l-4 border-blue-500 rounded p-4 my-4">
        <span className="font-bold text-blue-500 text-lg">Step 1:</span> Send an
        email to{" "}
        <a
          href="mailto:midoalzahbe@gmail.com"
          className="text-blue-500 font-bold hover:underline"
        >
          midoalzahbe@gmail.com
        </a>{" "}
        with the subject line:{" "}
        <strong>"Account Deletion Request - egoo Driver"</strong>
      </div>

      <div className="bg-gray-50 border-l-4 border-blue-500 rounded p-4 my-4">
        <span className="font-bold text-blue-500 text-lg">Step 2:</span> In your
        email, include the following information:
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Your full name (as registered in the app)</li>
          <li>Your phone number (used to register your account)</li>
          <li>Your email address (associated with your account)</li>
          <li>A clear statement requesting account deletion</li>
          <li>Confirmation that you understand the deletion is permanent</li>
        </ul>
      </div>

      <div className="bg-gray-50 border-l-4 border-blue-500 rounded p-4 my-4">
        <span className="font-bold text-blue-500 text-lg">Step 3:</span> For
        security purposes, we may need to verify your identity before processing
        your deletion request. We may contact you to confirm your identity.
      </div>

      <div className="bg-gray-50 border-l-4 border-blue-500 rounded p-4 my-4">
        <span className="font-bold text-blue-500 text-lg">Step 4:</span> Once
        your identity is verified, we will process your deletion request within{" "}
        <strong>30 days</strong> (or as required by applicable law).
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
        What Data Will Be Deleted
      </h2>

      <p className="mb-4">
        When you request account deletion, the following data will be
        permanently deleted:
      </p>

      <ul className="list-disc ml-6 space-y-2 mb-6">
        <li>
          <strong>Account Information:</strong> Your name, email address, phone
          number, and account credentials
        </li>
        <li>
          <strong>Profile Data:</strong> Your driver profile, vehicle
          information, and preferences
        </li>
        <li>
          <strong>Location Data:</strong> Your real-time and historical location
          data (except as noted below)
        </li>
        <li>
          <strong>App Activity:</strong> Your app usage data and interactions
        </li>
        <li>
          <strong>Device Information:</strong> Device identifiers and push
          notification tokens
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
        What Data May Be Retained
      </h2>

      <div className="bg-blue-50 border border-blue-500 rounded p-4 my-5">
        <p className="font-semibold mb-2">Important:</p> Certain data may be
        retained for legal, safety, or business purposes:
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>
            <strong>Financial Records:</strong> Trip earnings, payment records,
            and financial transactions may be retained as required by law
            (typically 7 years for tax and accounting purposes)
          </li>
          <li>
            <strong>Safety Records:</strong> Trip records, incident reports, and
            safety-related data may be retained for safety and security purposes
          </li>
          <li>
            <strong>Legal Compliance:</strong> Data required to comply with
            legal obligations, resolve disputes, or enforce agreements may be
            retained
          </li>
          <li>
            <strong>Anonymized Data:</strong> Aggregated or anonymized analytics
            data that cannot identify you may be retained
          </li>
          <li>
            <strong>Location Data:</strong> Historical location data may be
            retained if required for legal or safety purposes, but will be
            anonymized where possible
          </li>
        </ul>
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
        Data Retention Periods
      </h2>

      <p className="mb-4">
        After account deletion, retained data will be kept for the following
        periods:
      </p>

      <ul className="list-disc ml-6 space-y-2 mb-6">
        <li>
          <strong>Financial Records:</strong> Up to 7 years (as required by tax
          and accounting laws)
        </li>
        <li>
          <strong>Safety Records:</strong> As long as necessary for safety and
          legal compliance
        </li>
        <li>
          <strong>Legal Records:</strong> As required by applicable laws and
          regulations
        </li>
        <li>
          <strong>Anonymized Analytics:</strong> Indefinitely (in anonymized
          form only)
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
        What Happens After Deletion
      </h2>

      <ul className="list-disc ml-6 space-y-2 mb-6">
        <li>You will no longer be able to log in to the egoo driver app</li>
        <li>All your active trips and scheduled trips will be cancelled</li>
        <li>You will not receive any further notifications from egoo</li>
        <li>
          Your account will be permanently removed from our active systems
        </li>
        <li>
          You will need to create a new account if you wish to use egoo again in
          the future
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
        Alternative: Account Deactivation
      </h2>

      <p className="mb-6">
        If you're not sure about permanent deletion, you can temporarily
        deactivate your account by logging out of the app. You can log back in
        anytime to reactivate your account. However, your data will remain
        stored until you request permanent deletion.
      </p>

      <div className="bg-gray-100 rounded p-5 my-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Contact Us
        </h2>
        <p className="mb-2">
          If you have questions about account deletion or need assistance with
          your request, please contact us:
        </p>
        <p className="mb-2">
          <strong>Email:</strong>{" "}
          <a
            href="mailto:midoalzahbe@gmail.com"
            className="text-blue-500 font-bold hover:underline"
          >
            midoalzahbe@gmail.com
          </a>
        </p>
        <p className="mb-2">
          <strong>Website:</strong>{" "}
          <a
            href="https://egoobus.com"
            className="text-blue-500 font-bold hover:underline"
          >
            https://egoobus.com
          </a>
        </p>
        <p>
          <strong>Response Time:</strong> We aim to respond to all deletion
          requests within 5 business days and process them within 30 days.
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
        Your Rights
      </h2>

      <p className="mb-6">
        You have the right to request deletion of your personal data under
        applicable privacy laws, including GDPR (for EU users) and CCPA (for
        California residents). This page explains how to exercise that right for
        your egoo driver account.
      </p>

      <div className="mt-10 pt-5 border-t border-gray-300 text-sm text-gray-600">
        <p>
          <strong>Last Updated:</strong> January 2025
          <br />
          <strong>App Name:</strong> egoo
          <br />
          <strong>Package Name:</strong> com.becodemy.ridewavedriver
        </p>
      </div>
    </div>
  );
}
