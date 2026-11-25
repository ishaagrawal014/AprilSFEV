import React from "react";
import { Col, Container, Row } from "reactstrap";
import { Shield, Lock, Eye, Users, FileText, Bell, AlertCircle, Mail, Phone } from "lucide-react";

const TermsAndConditions = () => {
    const sections = [
        {
            icon: <FileText className="w-6 h-6" />,
            title: "1. Information We Collect",
            content: (
                <>
                    <p className="mb-4">We collect various types of information to provide and improve our Services to you.</p>
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                            <strong className="text-lg text-gray-800">Personal Information You Provide Voluntarily:</strong>
                            <ul className="mt-3 space-y-2 ml-4">
                                <li>This includes information you provide when you register for an account, choose an investment slab, sign e-agreements, make payments, or communicate with us. This may include:</li>
                                <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address.</li>
                                <li><strong>Financial Information:</strong> Bank account details, payment information, tax identification numbers (e.g., PAN).</li>
                                <li><strong>Identity Verification Information:</strong> Documents like Aadhar card, passport, or driving license for KYC (Know Your Customer) purposes, as required by law.</li>
                                <li><strong>Communication Content:</strong> Any information you provide when you contact our customer support or interact with us.</li>
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                            <strong className="text-lg text-gray-800">Information We Collect Automatically:</strong>
                            <ul className="mt-3 space-y-2 ml-4">
                                <li>When you access and use our Services, we may automatically collect certain information about your device and usage patterns, such as:</li>
                                <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers.</li>
                                <li><strong>Usage Data:</strong> Pages visited, time spent on pages, referral sources, app activity (e.g., tracking vehicle deployment and earnings via the app).</li>
                                <li><strong>Cookies and Tracking Technologies:</strong> We may use cookies and similar tracking technologies (like web beacons and pixels) to track activity on our Service and hold certain information.</li>
                            </ul>
                        </div>
                    </div>
                </>
            )
        },
        {
            icon: <Eye className="w-6 h-6" />,
            title: "2. How We Use Your Information",
            content: (
                <>
                    <p className="mb-4">We use the collected information for various purposes, including but not limited to:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-blue-600 mb-2">Service Provision</h5>
                            <p className="text-sm">To facilitate your investment, manage your account, process transactions, and enable app access for tracking.</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-green-600 mb-2">Communication</h5>
                            <p className="text-sm">To send you updates, alerts, newsletters, promotional materials (if you opt-in), and respond to your inquiries.</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-purple-600 mb-2">Legal Compliance</h5>
                            <p className="text-sm">To fulfill our legal obligations, including KYC verification, anti-money laundering (AML) checks, and tax reporting requirements.</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-orange-600 mb-2">Service Improvement</h5>
                            <p className="text-sm">To understand how you use our Services, troubleshoot issues, develop new features, and enhance user experience.</p>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-red-600 mb-2">Security</h5>
                            <p className="text-sm">To protect our Services and users from fraud, unauthorized access, and other security threats.</p>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-50 to-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-indigo-600 mb-2">Analytics</h5>
                            <p className="text-sm">To analyze trends, monitor the effectiveness of our campaigns, and gather demographic information for internal research.</p>
                        </div>
                    </div>
                </>
            )
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "3. How We Share Your Information",
            content: (
                <>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded">
                        <p className="font-semibold text-yellow-800">We do not sell your personal information to third parties.</p>
                    </div>
                    <p className="mb-4">We may share your information in the following circumstances:</p>
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <div>
                                <strong>With Service Providers:</strong> We may share your data with third-party vendors, consultants, and other service providers who perform services on our behalf (e.g., payment processing, identity verification, cloud hosting, analytics, legal, or accounting services). These providers are obligated to protect your information and use it only for the purposes for which it was disclosed.
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <div>
                                <strong>With Our Partners (Fleet Operators):</strong> As part of the FOCO model, relevant operational data may be shared with our trusted fleet operators for vehicle deployment and management. However, this typically involves operational data rather than direct personal investment details.
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <div>
                                <strong>For Legal Reasons:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court order or government agency).
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <div>
                                <strong>Business Transfers:</strong> In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company.
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <div>
                                <strong>With Your Consent:</strong> We may share your information with your explicit consent for any other purpose not listed above.
                            </div>
                        </li>
                    </ul>
                </>
            )
        },
        {
            icon: <Lock className="w-6 h-6" />,
            title: "4. Data Security",
            content: (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                    <p className="text-gray-700">
                        We implement reasonable technical and organizational measures designed to protect your personal information from unauthorized access, use, alteration, and disclosure. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                    </p>
                </div>
            )
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "5. Data Retention",
            content: (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                    <p className="text-gray-700">
                        We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. This includes the duration of your investment and any subsequent period required by law or our legitimate business interests.
                    </p>
                </div>
            )
        },
        {
            icon: <Bell className="w-6 h-6" />,
            title: "6. Your Rights (Applicable to Indian Residents)",
            content: (
                <>
                    <p className="mb-4">Subject to applicable law, you may have the following rights regarding your personal data:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-blue-500">
                            <h5 className="font-bold text-blue-600 mb-2">Right to Access</h5>
                            <p className="text-sm text-gray-600">You may request access to the personal data we hold about you.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-green-500">
                            <h5 className="font-bold text-green-600 mb-2">Right to Correction</h5>
                            <p className="text-sm text-gray-600">You may request correction of inaccurate or incomplete personal data.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-purple-500">
                            <h5 className="font-bold text-purple-600 mb-2">Right to Erasure</h5>
                            <p className="text-sm text-gray-600">In certain circumstances, you may request the deletion of your personal data.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-orange-500">
                            <h5 className="font-bold text-orange-600 mb-2">Right to Object</h5>
                            <p className="text-sm text-gray-600">You may object to the processing of your personal data in certain situations.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-red-500 md:col-span-2">
                            <h5 className="font-bold text-red-600 mb-2">Right to Withdraw Consent</h5>
                            <p className="text-sm text-gray-600">Where we rely on your consent to process your personal data, you have the right to withdraw that consent at any time.</p>
                        </div>
                    </div>
                    <p className="text-gray-700">
                        To exercise any of these rights, please contact us using the details provided in the "Contact Us" section below. We may require you to verify your identity before responding to such requests.
                    </p>
                </>
            )
        },
        {
            icon: <AlertCircle className="w-6 h-6" />,
            title: "7. Third-Party Links",
            content: (
                <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-400">
                    <p className="text-gray-700">
                        Our Services may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                    </p>
                </div>
            )
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "8. Children's Privacy",
            content: (
                <div className="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-400">
                    <p className="text-gray-700">
                        Our Services are not intended for individuals under the age of 18. We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
                    </p>
                </div>
            )
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: "9. Changes to This Privacy Policy",
            content: (
                <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-400">
                    <p className="text-gray-700">
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                    </p>
                </div>
            )
        }
    ];

    return (
        <>
            <section
                className="section py-5"
                id="mos"
                style={{ 
                    background: "#c3dfffff",
                    minHeight: "100vh"
                }}
            >
                <Container className="cont">
                    {/* Header Section */}
                    <Row className="justify-content-center mb-5">
                        <Col lg={10}>
                            <div className="text-center bg-white rounded-lg shadow-2xl p-5 md:p-8 mb-5">
                                <div className="flex justify-center mb-4">
                                    <div className="bg-blue-100 p-4 rounded-full">
                                        <Shield className="w-12 h-12 text-blue-600" />
                                    </div>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-3">
                                    Privacy{" "}
                                    <span style={{ color: "#2689ff" }}>Policy</span>
                                </h1>
                                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-4"></div>
                                <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">
                                    Last Updated: July 2025
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    Speed Force EV ("we," "our," or "us") is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, process, and disclose your information when you access or use our website, services, and investment platform (collectively, the "Services").
                                    <br /><br />
                                    <strong>By using our Services, you agree to the collection and use of information in accordance with this policy.</strong>
                                </p>
                            </div>
                        </Col>
                    </Row>

                    {/* Content Sections */}
                    <Row className="justify-content-center">
                        <Col lg={10}>
                            <div className="space-y-6">
                                {sections.map((section, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <div className="flex items-center mb-4">
                                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg text-white mr-4">
                                                {section.icon}
                                            </div>
                                            <h4 className="text-2xl font-bold text-gray-800 mb-0">
                                                {section.title}
                                            </h4>
                                        </div>
                                        <div className="text-gray-700">
                                            {section.content}
                                        </div>
                                    </div>
                                ))}

                                {/* Contact Section */}
                                <div className="bg-blue-500 rounded-lg shadow-lg p-6 md:p-8 text-white">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-white p-3 rounded-lg text-blue-600 mr-4">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-2xl font-bold mb-0">
                                            10. Contact Us
                                        </h4>
                                    </div>
                                    <p className="mb-4">If you have any questions about this Privacy Policy, please contact us:</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        
                                        <a href="mailto:support@speedforceev.in" className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 transition-all p-4 rounded-lg no-underline text-white">
                                            <Mail className="w-5 h-5 mr-3" />
                                            <div>
                                                <p className="text-sm opacity-80 mb-1">Email Us</p>
                                                <p className="font-semibold mb-0">support@speedforceev.in</p>
                                            </div>
                                        </a>
                                        
                                        <a href="tel:+918866812888" className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 transition-all p-4 rounded-lg no-underline text-white">
                                            <Phone className="w-5 h-5 mr-3" />
                                            <div>
                                                <p className="text-sm opacity-80 mb-1">Call Us</p>
                                                <p className="font-semibold mb-0">+91 8866812888</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {/* Go Back Button */}
                    <Row className="justify-content-center mt-5">
                        <Col lg={10} className="text-center">
                            
                            <a href="/" className="inline-flex items-center bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 no-underline">
                                <i className="mdi mdi-arrow-left me-2"></i>
                                <span className="d-none d-sm-inline">Go Back To Website</span>
                                <span className="d-inline d-sm-none">Go Back</span>
                            </a>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default TermsAndConditions;