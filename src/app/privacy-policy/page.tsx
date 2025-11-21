import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - egoo",
  description: "Privacy Policy for egoo - A driver and trip management mobile application",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <article className="max-w-none">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Privacy Policy for egoo
            </h1>
            <p className="text-muted-foreground text-sm">
              <strong>Last Updated: January 2025</strong>
            </p>
          </header>

          {/* Section 1: Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-6 mt-8">
              1. Introduction
            </h2>
            <p className="text-foreground leading-7 mb-4">
              Welcome to <strong>egoo</strong> (the "App"), a driver and trip management mobile
              application operated by egoo ("we," "us," or "our"). This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when you use our mobile
              application.
            </p>
            <p className="text-foreground leading-7 mb-4">
              By downloading, installing, or using the egoo app, you agree to the collection and use
              of information in accordance with this Privacy Policy. If you do not agree with our
              policies and practices, please do not use our App.
            </p>
            <p className="text-foreground leading-7 mb-4">
              This Privacy Policy is effective as of the date listed above and will remain in effect
              except with respect to any changes in its provisions in the future, which will take
              effect immediately upon being posted on this page.
            </p>
            <div className="my-6">
              <p className="text-foreground font-semibold mb-2">Contact Information:</p>
              <ul className="list-disc list-inside space-y-1 text-foreground ml-4">
                <li>
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://egoobus.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://egoobus.com
                  </a>
                </li>
                <li>
                  <strong>Privacy Policy URL:</strong>{" "}
                  <a
                    href="https://egoobus.com/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://egoobus.com/privacy-policy
                  </a>
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:midoalzahbe@gmail.com"
                    className="text-primary hover:underline"
                  >
                    midoalzahbe@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <hr className="my-8 border-border" />

          {/* Section 2: Information We Collect */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-6 mt-8">
              2. Information We Collect
            </h2>
            <p className="text-foreground leading-7 mb-6">
              We collect several types of information from and about users of our App:
            </p>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              2.1 Personal Information
            </h3>
            <p className="text-foreground leading-7 mb-4">
              When you register as a driver and use the egoo app, we collect the following personal
              information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground mb-6 ml-4">
              <li>
                <strong>Account Information:</strong>
                <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                  <li>Full name</li>
                  <li>Phone number (required for account verification and communication)</li>
                  <li>Email address (required for account verification)</li>
                  <li>Country of residence</li>
                  <li>Vehicle registration number</li>
                  <li>Vehicle type (Car, Motorcycle, CNG)</li>
                  <li>Vehicle color</li>
                  <li>Driving license number</li>
                  <li>Vehicle registration date</li>
                  <li>Service rate information</li>
                </ul>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              2.2 Location Data
            </h3>
            <p className="text-foreground leading-7 mb-4">
              The egoo app collects real-time location data, which is essential for the app's core
              functionality:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground mb-6 ml-4">
              <li>
                <strong>Real-Time Location Tracking:</strong>
                <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                  <li>Precise GPS coordinates (latitude and longitude)</li>
                  <li>
                    Location data is collected both when the app is in the foreground and
                    background
                  </li>
                  <li>
                    Location data is collected during active trips, navigation, and when you are
                    available to accept ride requests
                  </li>
                  <li>
                    Location data is used to track trip progress, verify proximity to scheduled trip
                    points, and enable real-time navigation
                  </li>
                </ul>
              </li>
              <li>
                <strong>Location Data Collection Scenarios:</strong>
                <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                  <li>When you are actively providing transportation services</li>
                  <li>During trip navigation and route guidance</li>
                  <li>When checking in for scheduled trips</li>
                  <li>For trip activation verification (proximity checks)</li>
                  <li>For real-time location sharing with the platform</li>
                </ul>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              2.3 Trip and Activity Data
            </h3>
            <p className="text-foreground leading-7 mb-4">
              We collect information related to your trips and driving activity:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-6 ml-4">
              <li>Trip pickup and destination locations</li>
              <li>Trip distance and duration</li>
              <li>Trip status (active, completed, cancelled)</li>
              <li>Trip ratings and reviews</li>
              <li>Scheduled trip information</li>
              <li>Trip progress and completion status</li>
              <li>Emergency usage records (if applicable)</li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              2.4 Device Information
            </h3>
            <p className="text-foreground leading-7 mb-4">
              We automatically collect certain information about your mobile device:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-6 ml-4">
              <li>Device type and model</li>
              <li>Operating system version</li>
              <li>Unique device identifiers</li>
              <li>Mobile network information</li>
              <li>Push notification tokens (required for receiving trip notifications)</li>
              <li>App version and installation information</li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              2.5 Usage and Analytics Data
            </h3>
            <p className="text-foreground leading-7 mb-4">
              We may collect information about how you interact with the App:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-6 ml-4">
              <li>App usage patterns and features accessed</li>
              <li>Performance data and crash reports</li>
              <li>Error logs and diagnostic information</li>
              <li>Session duration and frequency of use</li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              2.6 Communication Data
            </h3>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-6 ml-4">
              <li>
                Records of communications between you and passengers (if applicable)
              </li>
              <li>Customer support interactions</li>
              <li>Feedback and survey responses</li>
            </ul>
          </section>

          <hr className="my-8 border-border" />

          {/* Section 3: How We Use the Information */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-6 mt-8">
              3. How We Use the Information
            </h2>
            <p className="text-foreground leading-7 mb-6">
              We use the information we collect for the following purposes:
            </p>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              3.1 Core App Functionality
            </h3>
            <ul className="list-disc list-inside space-y-2 text-foreground mb-6 ml-4">
              <li>
                <strong>Trip Assignment and Management:</strong>
                <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                  <li>Matching you with available ride requests</li>
                  <li>Assigning scheduled trips</li>
                  <li>Facilitating trip navigation and route guidance</li>
                  <li>Tracking trip progress and completion</li>
                </ul>
              </li>
              <li>
                <strong>Account Management:</strong>
                <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                  <li>Creating and maintaining your driver account</li>
                  <li>
                    Verifying your identity through phone and email verification
                  </li>
                  <li>Managing your driver profile and vehicle information</li>
                  <li>Processing account-related requests</li>
                </ul>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              3.2 Location-Based Services
            </h3>
            <ul className="list-disc list-inside space-y-2 text-foreground mb-6 ml-4">
              <li>
                <strong>Real-Time Location Services:</strong>
                <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                  <li>Displaying your location on maps for trip navigation</li>
                  <li>
                    Enabling real-time location sharing during active trips
                  </li>
                  <li>
                    Verifying your proximity to scheduled trip pickup points
                  </li>
                  <li>Calculating distances and estimated arrival times</li>
                  <li>Providing turn-by-turn navigation instructions</li>
                </ul>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              3.3 Safety and Verification
            </h3>
            <ul className="list-disc list-inside space-y-2 text-foreground mb-6 ml-4">
              <li>
                <strong>Safety Features:</strong>
                <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                  <li>Verifying driver identity and credentials</li>
                  <li>Monitoring trip progress for safety purposes</li>
                  <li>Enabling emergency features and support</li>
                  <li>
                    Maintaining records of trip activity for safety and security
                  </li>
                </ul>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              3.4 Communication
            </h3>
            <ul className="list-disc list-inside space-y-2 text-foreground mb-6 ml-4">
              <li>
                <strong>Notifications:</strong>
                <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                  <li>Sending push notifications about new trip requests</li>
                  <li>Notifying you about scheduled trips</li>
                  <li>Sending trip updates and status changes</li>
                  <li>
                    Delivering important account and service-related messages
                  </li>
                </ul>
              </li>
              <li>
                <strong>Account Verification:</strong>
                <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                  <li>
                    Sending one-time passwords (OTPs) via SMS for phone verification
                  </li>
                  <li>
                    Sending verification codes via email for account setup
                  </li>
                  <li>
                    Confirming account changes and security updates
                  </li>
                </ul>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              3.5 Service Improvement
            </h3>
            <ul className="list-disc list-inside space-y-2 text-foreground mb-6 ml-4">
              <li>
                <strong>Analytics and Optimization:</strong>
                <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                  <li>
                    Analyzing app usage patterns to improve user experience
                  </li>
                  <li>Identifying and fixing technical issues</li>
                  <li>Optimizing app performance and reliability</li>
                  <li>Developing new features and services</li>
                </ul>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              3.6 Business Operations
            </h3>
            <ul className="list-disc list-inside space-y-2 text-foreground mb-6 ml-4">
              <li>
                <strong>Financial and Administrative:</strong>
                <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                  <li>Calculating earnings and trip charges</li>
                  <li>Processing payments and managing financial records</li>
                  <li>Generating trip reports and analytics</li>
                  <li>
                    Maintaining business records as required by law
                  </li>
                </ul>
              </li>
            </ul>
          </section>

          <hr className="my-8 border-border" />

          {/* Section 4: Location Data Usage */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-6 mt-8">
              4. Location Data Usage
            </h2>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              4.1 Why We Collect Location Data
            </h3>
            <p className="text-foreground leading-7 mb-4">
              Location data is essential for the egoo app to function properly. We collect your
              location data to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-6 ml-4">
              <li>Enable real-time trip matching and assignment</li>
              <li>Provide accurate navigation and route guidance</li>
              <li>Verify your location for scheduled trip activation</li>
              <li>Calculate accurate trip distances and fares</li>
              <li>Ensure passenger safety by tracking trip progress</li>
              <li>Improve service quality and reliability</li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              4.2 When Location Data is Collected
            </h3>
            <p className="text-foreground leading-7 mb-4">
              Location data is collected in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground mb-6 ml-4">
              <li>
                <strong>During Active Trips:</strong> We continuously track your location while you
                are providing transportation services to enable real-time navigation and trip
                tracking.
              </li>
              <li>
                <strong>During Navigation:</strong> Location data is collected when you are
                navigating to pickup points or destinations.
              </li>
              <li>
                <strong>For Scheduled Trips:</strong> Location data is used to verify your
                proximity to scheduled trip pickup points and activate trips when you are in the
                correct location.
              </li>
              <li>
                <strong>When Available:</strong> Location data may be collected when you are marked
                as available to accept ride requests.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              4.3 Location Data Permissions
            </h3>
            <p className="text-foreground leading-7 mb-4">
              The egoo app requires the following location permissions:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-4 ml-4">
              <li>
                <strong>Android:</strong> <code className="bg-muted px-2 py-1 rounded text-sm">ACCESS_FINE_LOCATION</code> and <code className="bg-muted px-2 py-1 rounded text-sm">ACCESS_COARSE_LOCATION</code>
              </li>
              <li>
                <strong>iOS:</strong> Location services permission (When In Use and Always)
              </li>
            </ul>
            <p className="text-foreground leading-7 mb-6">
              You can control location permissions through your device settings. However, disabling
              location services will significantly limit or prevent the app from functioning, as
              location data is essential for trip assignment, navigation, and service delivery.
            </p>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              4.4 Background Location Access
            </h3>
            <p className="text-foreground leading-7 mb-4">
              The app may request background location access to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-4 ml-4">
              <li>
                Continue tracking your location during active trips even when the app is not in the
                foreground
              </li>
              <li>Send location updates to the platform for trip management</li>
              <li>Enable trip activation checks for scheduled trips</li>
            </ul>
            <p className="text-foreground leading-7 mb-6">
              You can revoke background location access at any time through your device settings,
              but this may affect the app's ability to provide full functionality.
            </p>
          </section>

          <hr className="my-8 border-border" />

          {/* Section 5: Third-Party Services */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-6 mt-8">
              5. Third-Party Services
            </h2>
            <p className="text-foreground leading-7 mb-6">
              The egoo app integrates with several third-party services that may collect, process,
              or have access to your information:
            </p>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              5.1 Google Maps Platform
            </h3>
            <p className="text-foreground leading-7 mb-2">
              <strong>Service Provider:</strong> Google LLC
            </p>
            <p className="text-foreground leading-7 mb-2">
              <strong>Purpose:</strong> The app uses Google Maps Platform for:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-4 ml-4">
              <li>Displaying interactive maps</li>
              <li>Providing geolocation services</li>
              <li>Calculating routes and directions</li>
              <li>Geocoding addresses and locations</li>
              <li>Distance and travel time calculations</li>
            </ul>
            <p className="text-foreground leading-7 mb-2">
              <strong>Data Shared:</strong> Location data, destination addresses, and route
              information are shared with Google Maps Platform to provide mapping and navigation
              services.
            </p>
            <p className="text-foreground leading-7 mb-2">
              <strong>Privacy Policy:</strong>{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://policies.google.com/privacy
              </a>
            </p>
            <p className="text-foreground leading-7 mb-6">
              <strong>Terms of Service:</strong>{" "}
              <a
                href="https://maps.google.com/help/terms_maps.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://maps.google.com/help/terms_maps.html
              </a>
            </p>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              5.2 Firebase (Google)
            </h3>
            <p className="text-foreground leading-7 mb-2">
              <strong>Service Provider:</strong> Google LLC
            </p>
            <p className="text-foreground leading-7 mb-2">
              <strong>Purpose:</strong> The app uses Firebase for:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-4 ml-4">
              <li>Push notification delivery</li>
              <li>App analytics and performance monitoring</li>
              <li>Crash reporting and error tracking</li>
              <li>Device token management</li>
            </ul>
            <p className="text-foreground leading-7 mb-2">
              <strong>Data Shared:</strong> Device information, app usage data, crash reports, and
              push notification tokens are shared with Firebase.
            </p>
            <p className="text-foreground leading-7 mb-2">
              <strong>Privacy Policy:</strong>{" "}
              <a
                href="https://firebase.google.com/support/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://firebase.google.com/support/privacy
              </a>
            </p>
            <p className="text-foreground leading-7 mb-6">
              <strong>Terms of Service:</strong>{" "}
              <a
                href="https://firebase.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://firebase.google.com/terms
              </a>
            </p>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">5.3 Twilio</h3>
            <p className="text-foreground leading-7 mb-2">
              <strong>Service Provider:</strong> Twilio Inc.
            </p>
            <p className="text-foreground leading-7 mb-2">
              <strong>Purpose:</strong> The app uses Twilio for:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-4 ml-4">
              <li>
                Sending SMS messages containing one-time passwords (OTPs) for phone verification
              </li>
              <li>Account verification and authentication</li>
            </ul>
            <p className="text-foreground leading-7 mb-2">
              <strong>Data Shared:</strong> Phone numbers are shared with Twilio solely for the
              purpose of sending verification codes via SMS.
            </p>
            <p className="text-foreground leading-7 mb-2">
              <strong>Privacy Policy:</strong>{" "}
              <a
                href="https://www.twilio.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://www.twilio.com/legal/privacy
              </a>
            </p>
            <p className="text-foreground leading-7 mb-6">
              <strong>Terms of Service:</strong>{" "}
              <a
                href="https://www.twilio.com/legal/tos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://www.twilio.com/legal/tos
              </a>
            </p>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">5.4 Expo</h3>
            <p className="text-foreground leading-7 mb-2">
              <strong>Service Provider:</strong> Expo (Expo.dev)
            </p>
            <p className="text-foreground leading-7 mb-2">
              <strong>Purpose:</strong> The app uses Expo framework and services for:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-4 ml-4">
              <li>App development and deployment</li>
              <li>Push notification infrastructure</li>
              <li>App updates and over-the-air updates</li>
            </ul>
            <p className="text-foreground leading-7 mb-2">
              <strong>Data Shared:</strong> Device information and push notification tokens may be
              shared with Expo services.
            </p>
            <p className="text-foreground leading-7 mb-2">
              <strong>Privacy Policy:</strong>{" "}
              <a
                href="https://expo.dev/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://expo.dev/privacy
              </a>
            </p>
            <p className="text-foreground leading-7 mb-6">
              <strong>Terms of Service:</strong>{" "}
              <a
                href="https://expo.dev/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://expo.dev/terms
              </a>
            </p>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              5.5 Third-Party Data Processing
            </h3>
            <p className="text-foreground leading-7 mb-4">
              These third-party service providers have access to your information only to perform
              specific tasks on our behalf and are obligated not to disclose or use it for any other
              purpose. However, each third-party service provider has its own privacy policy
              addressing how they handle your information.
            </p>
            <p className="text-foreground leading-7 mb-6">
              We recommend that you review the privacy policies of these third-party service
              providers to understand their data practices.
            </p>
          </section>

          <hr className="my-8 border-border" />

          {/* Section 6: Data Storage and Security */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-6 mt-8">
              6. Data Storage and Security
            </h2>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">6.1 Data Storage</h3>
            <p className="text-foreground leading-7 mb-4">
              Your information is stored on secure servers and databases:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-6 ml-4">
              <li>
                <strong>Primary Database:</strong> MongoDB (cloud-hosted database)
              </li>
              <li>
                <strong>Data Location:</strong> Data is stored in secure cloud infrastructure
              </li>
              <li>
                <strong>Backup:</strong> Regular backups are performed to ensure data integrity and
                availability
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              6.2 Data Retention
            </h3>
            <p className="text-foreground leading-7 mb-4">
              We retain your information for as long as necessary to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-4 ml-4">
              <li>Provide you with the egoo service</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce our agreements</li>
              <li>Maintain business records as required by law</li>
            </ul>
            <p className="text-foreground leading-7 mb-2">
              <strong>Specific Retention Periods:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-6 ml-4">
              <li>
                <strong>Account Information:</strong> Retained for the duration of your account and
                for a reasonable period after account closure for legal and business purposes
              </li>
              <li>
                <strong>Trip Data:</strong> Retained for a minimum period as required by law and
                business needs
              </li>
              <li>
                <strong>Location Data:</strong> Retained only as necessary for trip completion and
                may be anonymized or deleted after trip completion, except where required for legal
                or safety purposes
              </li>
              <li>
                <strong>Analytics Data:</strong> May be retained in aggregated or anonymized form
                for longer periods
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              6.3 Security Measures
            </h3>
            <p className="text-foreground leading-7 mb-4">
              We implement appropriate technical and organizational security measures to protect your
              information:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-4 ml-4">
              <li>
                <strong>Encryption:</strong> Data transmission is encrypted using industry-standard
                SSL/TLS protocols
              </li>
              <li>
                <strong>Access Controls:</strong> Access to your information is restricted to
                authorized personnel only
              </li>
              <li>
                <strong>Authentication:</strong> Strong authentication mechanisms are used to
                protect account access
              </li>
              <li>
                <strong>Regular Security Audits:</strong> We conduct regular security assessments
                and updates
              </li>
              <li>
                <strong>Secure Infrastructure:</strong> Our servers and databases are hosted on
                secure, monitored infrastructure
              </li>
            </ul>
            <p className="text-foreground leading-7 mb-6">
              However, no method of transmission over the internet or electronic storage is 100%
              secure. While we strive to use commercially acceptable means to protect your
              information, we cannot guarantee absolute security.
            </p>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              6.4 Data Breach Notification
            </h3>
            <p className="text-foreground leading-7 mb-4">
              In the event of a data breach that may affect your personal information, we will:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-6 ml-4">
              <li>Investigate the breach promptly</li>
              <li>Notify affected users as required by applicable law</li>
              <li>Take appropriate remedial actions</li>
              <li>Report to relevant authorities if required by law</li>
            </ul>
          </section>

          <hr className="my-8 border-border" />

          {/* Section 7: Sharing of Data */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-6 mt-8">
              7. Sharing of Data
            </h2>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              7.1 When We Share Data
            </h3>
            <p className="text-foreground leading-7 mb-4">
              We may share your information in the following circumstances:
            </p>
            <p className="text-foreground leading-7 mb-2">
              <strong>With Passengers (During Active Trips):</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-4 ml-4">
              <li>
                Your name and vehicle information may be shared with passengers who have booked
                trips with you
              </li>
              <li>
                Your real-time location may be shared with passengers during active trips for safety
                and convenience
              </li>
            </ul>
            <p className="text-foreground leading-7 mb-2">
              <strong>With Service Providers:</strong>
            </p>
            <p className="text-foreground leading-7 mb-2">
              We share information with third-party service providers (as listed in Section 5) who
              perform services on our behalf, such as:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-4 ml-4">
              <li>Cloud hosting and database services</li>
              <li>Payment processing</li>
              <li>SMS and email delivery services</li>
              <li>Analytics and performance monitoring</li>
            </ul>
            <p className="text-foreground leading-7 mb-2">
              <strong>For Legal Compliance:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-4 ml-4">
              <li>
                We may disclose information if required by law, court order, or government
                regulation
              </li>
              <li>
                We may share information to respond to legal process or government requests
              </li>
              <li>
                We may disclose information to protect our rights, property, or safety, or that of
                our users or others
              </li>
            </ul>
            <p className="text-foreground leading-7 mb-2">
              <strong>Business Transfers:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-4 ml-4">
              <li>
                In the event of a merger, acquisition, or sale of assets, your information may be
                transferred to the acquiring entity
              </li>
            </ul>
            <p className="text-foreground leading-7 mb-2">
              <strong>With Your Consent:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-6 ml-4">
              <li>
                We may share your information with your explicit consent for specific purposes
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              7.2 What We Do Not Share
            </h3>
            <p className="text-foreground leading-7 mb-4">
              We do not sell, rent, or trade your personal information to third parties for their
              marketing purposes.
            </p>
            <p className="text-foreground leading-7 mb-6">
              We do not share your personal information with third parties except as described in
              this Privacy Policy.
            </p>
          </section>

          <hr className="my-8 border-border" />

          {/* Section 8: User Rights */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-6 mt-8">8. User Rights</h2>
            <p className="text-foreground leading-7 mb-6">
              You have certain rights regarding your personal information, which may vary depending
              on your location:
            </p>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              8.1 Access and Portability
            </h3>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-6 ml-4">
              <li>
                <strong>Right to Access:</strong> You have the right to request access to the
                personal information we hold about you
              </li>
              <li>
                <strong>Right to Data Portability:</strong> You may request a copy of your data in
                a structured, machine-readable format
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              8.2 Correction and Update
            </h3>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-6 ml-4">
              <li>
                <strong>Right to Rectification:</strong> You can update your account information
                directly through the app settings
              </li>
              <li>
                You can request corrections to inaccurate or incomplete information
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">8.3 Deletion</h3>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-6 ml-4">
              <li>
                <strong>Right to Deletion:</strong> You may request deletion of your account and
                associated personal information
              </li>
              <li>
                Note: We may retain certain information as required by law or for legitimate
                business purposes (e.g., financial records, safety records)
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              8.4 Withdrawal of Consent
            </h3>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-6 ml-4">
              <li>
                <strong>Right to Withdraw Consent:</strong> You can withdraw consent for certain
                data processing activities
              </li>
              <li>
                Note: Withdrawing consent may affect the app's functionality
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              8.5 Objection and Restriction
            </h3>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-6 ml-4">
              <li>
                <strong>Right to Object:</strong> You may object to certain processing of your
                personal information
              </li>
              <li>
                <strong>Right to Restriction:</strong> You may request restriction of processing in
                certain circumstances
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              8.6 Exercising Your Rights
            </h3>
            <p className="text-foreground leading-7 mb-4">
              To exercise any of these rights, please contact us using the contact information
              provided in Section 11. We will respond to your request within a reasonable timeframe
              and in accordance with applicable law.
            </p>
            <p className="text-foreground leading-7 mb-6">
              <strong>Verification:</strong> For security purposes, we may need to verify your
              identity before processing certain requests.
            </p>
          </section>

          <hr className="my-8 border-border" />

          {/* Section 9: Children's Privacy */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-6 mt-8">
              9. Children's Privacy
            </h2>
            <p className="text-foreground leading-7 mb-4">
              The egoo app is <strong>not intended for children under the age of 18</strong>. We do
              not knowingly collect personal information from children under 18 years of age.
            </p>
            <p className="text-foreground leading-7 mb-4">
              If you are a parent or guardian and believe that your child under 18 has provided us
              with personal information, please contact us immediately. If we become aware that we
              have collected personal information from a child under 18 without verification of
              parental consent, we will take steps to delete that information from our servers.
            </p>
            <p className="text-foreground leading-7 mb-2">
              To use the egoo app as a driver, you must:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-6 ml-4">
              <li>Be at least 18 years of age</li>
              <li>Have a valid driver's license</li>
              <li>
                Meet all legal requirements to operate a vehicle in your jurisdiction
              </li>
            </ul>
          </section>

          <hr className="my-8 border-border" />

          {/* Section 10: Changes to This Privacy Policy */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-6 mt-8">
              10. Changes to This Privacy Policy
            </h2>
            <p className="text-foreground leading-7 mb-6">
              We may update this Privacy Policy from time to time to reflect changes in our
              practices, technology, legal requirements, or other factors.
            </p>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              10.1 Notification of Changes
            </h3>
            <p className="text-foreground leading-7 mb-4">
              When we make material changes to this Privacy Policy, we will:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-6 ml-4">
              <li>Update the "Last Updated" date at the top of this policy</li>
              <li>
                Post the updated Privacy Policy on our website at{" "}
                <a
                  href="https://egooobus.com/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://egooobus.com/privacy-policy
                </a>
              </li>
              <li>
                Notify you through the app or via email if the changes are significant
              </li>
              <li>Provide a summary of material changes when possible</li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              10.2 Your Continued Use
            </h3>
            <p className="text-foreground leading-7 mb-6">
              Your continued use of the egoo app after any changes to this Privacy Policy
              constitutes your acceptance of the updated policy. If you do not agree with the
              changes, you should stop using the app and delete your account.
            </p>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              10.3 Reviewing Changes
            </h3>
            <p className="text-foreground leading-7 mb-6">
              We encourage you to review this Privacy Policy periodically to stay informed about how
              we collect, use, and protect your information.
            </p>
          </section>

          <hr className="my-8 border-border" />

          {/* Section 11: Contact Information */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-6 mt-8">
              11. Contact Information
            </h2>
            <p className="text-foreground leading-7 mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our
              data practices, please contact us:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground mb-6 ml-4">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:midoalzahbe@gmail.com"
                  className="text-primary hover:underline"
                >
                  midoalzahbe@gmail.com
                </a>
              </li>
              <li>
                <strong>Website:</strong>{" "}
                <a
                  href="https://egooobus.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://egooobus.com
                </a>
              </li>
              <li>
                <strong>Privacy Policy:</strong>{" "}
                <a
                  href="https://egooobus.com/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://egooobus.com/privacy-policy
                </a>
              </li>
            </ul>
            <p className="text-foreground leading-7 mb-6">
              We will make every effort to respond to your inquiries promptly and address any
              concerns you may have about your privacy and data protection.
            </p>
          </section>

          <hr className="my-8 border-border" />

          {/* Section 12: Additional Information */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-6 mt-8">
              12. Additional Information
            </h2>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              12.1 International Users
            </h3>
            <p className="text-foreground leading-7 mb-6">
              If you are using the egoo app from outside the country where our servers are located,
              please note that your information may be transferred to, stored, and processed in a
              country different from your own. By using the app, you consent to the transfer of your
              information to our facilities and those third parties with whom we share it as
              described in this Privacy Policy.
            </p>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              12.2 California Privacy Rights
            </h3>
            <p className="text-foreground leading-7 mb-4">
              If you are a California resident, you may have additional rights under the California
              Consumer Privacy Act (CCPA), including:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-4 ml-4">
              <li>The right to know what personal information is collected</li>
              <li>The right to know if personal information is sold or disclosed</li>
              <li>The right to opt-out of the sale of personal information</li>
              <li>The right to access your personal information</li>
              <li>The right to request deletion of personal information</li>
              <li>
                The right to non-discrimination for exercising your privacy rights
              </li>
            </ul>
            <p className="text-foreground leading-7 mb-6">
              To exercise these rights, please contact us using the information provided in Section
              11.
            </p>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              12.3 European Union (EU) Users
            </h3>
            <p className="text-foreground leading-7 mb-4">
              If you are located in the European Union, you have additional rights under the General
              Data Protection Regulation (GDPR), including:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-4 ml-4">
              <li>The right to access your personal data</li>
              <li>The right to rectification of inaccurate data</li>
              <li>The right to erasure ("right to be forgotten")</li>
              <li>The right to restrict processing</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
              <li>Rights related to automated decision-making</li>
            </ul>
            <p className="text-foreground leading-7 mb-4">
              Our legal basis for processing your personal information includes:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-4 ml-4">
              <li>
                <strong>Consent:</strong> When you provide explicit consent for specific processing
                activities
              </li>
              <li>
                <strong>Contract Performance:</strong> To provide you with the egoo service
              </li>
              <li>
                <strong>Legal Obligation:</strong> To comply with applicable laws and regulations
              </li>
              <li>
                <strong>Legitimate Interests:</strong> For business operations, safety, and service
                improvement
              </li>
            </ul>
            <p className="text-foreground leading-7 mb-6">
              To exercise your GDPR rights, please contact us using the information provided in
              Section 11.
            </p>

            <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">
              12.4 Data Controller
            </h3>
            <p className="text-foreground leading-7 mb-6">
              For the purposes of applicable data protection laws, egoo is the data controller of
              your personal information.
            </p>
          </section>

          <hr className="my-8 border-border" />

          {/* Section 13: Consent */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-6 mt-8">13. Consent</h2>
            <p className="text-foreground leading-7 mb-4">
              By using the egoo app, you consent to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground mb-6 ml-4">
              <li>
                The collection and use of your information as described in this Privacy Policy
              </li>
              <li>
                The processing of your location data for the purposes outlined in this policy
              </li>
              <li>
                The sharing of your information with third-party service providers as described
              </li>
              <li>
                The transfer of your information to servers located in different countries
              </li>
            </ul>
            <p className="text-foreground leading-7 mb-6">
              If you do not consent to any part of this Privacy Policy, please do not use the egoo
              app.
            </p>
          </section>

          <hr className="my-8 border-border" />

          {/* Footer */}
          <footer className="mt-12 mb-8">
            <p className="text-center font-semibold text-foreground mb-4">
              End of Privacy Policy
            </p>
            <p className="text-center text-sm text-muted-foreground italic">
              This Privacy Policy was last updated on January 2025. We reserve the right to update
              this policy at any time. Please check this page periodically for updates.
            </p>
          </footer>
        </article>
      </div>
    </div>
  );
}

