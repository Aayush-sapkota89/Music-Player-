import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      details: ['123 Coffee Street', 'Downtown District', 'City, State 12345']
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      details: ['(555) 123-CAFE', '(555) 123-2233']
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      details: ['hello@10xcafe.com', 'orders@10xcafe.com']
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Hours',
      details: ['Mon-Fri: 6:00 AM - 10:00 PM', 'Sat-Sun: 7:00 AM - 11:00 PM']
    }
  ];

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, name: 'Instagram', href: '#' },
    { icon: <Facebook className="w-5 h-5" />, name: 'Facebook', href: '#' },
    { icon: <Twitter className="w-5 h-5" />, name: 'Twitter', href: '#' }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-600 font-semibold text-lg">Get in Touch</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">
            Visit Us Today
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We'd love to see you! Come experience the perfect blend of great coffee, 
            delicious food, and warm hospitality at 10 X Cafe.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="text-amber-600 flex-shrink-0 mt-1">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{info.title}</h4>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-16">
          <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p className="text-lg font-medium">Interactive Map</p>
              <p className="text-sm">123 Coffee Street, Downtown District</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;