import React, { useState, useEffect } from "react";
import { homeData } from "../data/dummyData";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  console.log(isScrolled);

  return (
    <div
      className="bg-gray-100 text-gray-800"
      onClick={() => {
        const footerElement = document.getElementById("footer");
        if (footerElement) {
          footerElement.scrollIntoView({ behavior: "smooth" });
        }
      }}>
      {/* Hero Section */}
      <header
        className={`fixed top-0 left-0 right-0 h-[900px] bg-cover bg-center bg-no-repeat z-10 transition-all duration-100
        }`}
        style={{
          backgroundImage:
            'url("https://mindlercareerlibrarynew.imgix.net/17A-Event_Management.png")',
        }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        {!isScrolled && (
          <div className="relative container mx-auto my-[22rem] text-center px-6">
            <h1 className="text-6xl font-bold mb-4 text-white">
              Streamline Your Events with Ease
            </h1>
            <p className="text-xl mb-6 text-gray-200">
              Create, manage, and promote events effortlessly while engaging
              with your audience.
            </p>
            <button className="bg-white text-blue-600 px-8 py-6 rounded-full text-lg shadow-lg hover:bg-blue-100 transition">
              Get Started
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative pt-[900px] z-20">
        {/* Features Section */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {homeData.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-blue-50 py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                {
                  step: "1",
                  title: "Sign Up",
                  description: "Create an account to get started.",
                },
                {
                  step: "2",
                  title: "Create an Event",
                  description:
                    "Add event details and customize your preferences.",
                },
                {
                  step: "3",
                  title: "Engage & Manage",
                  description: "Promote, track, and interact with attendees.",
                },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow">
                  <div className="text-4xl font-bold text-blue-600 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call-to-Action */}
        <section
          id="footer"
          className="bg-indigo-600 text-white py-12"
          style={{
            backgroundImage:
              'url("https://e1.pxfuel.com/desktop-wallpaper/851/920/desktop-wallpaper-trillium-events-management-company-corporate-event.jpg")',
          }}>
          <div className="container mx-auto text-center px-6">
            <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
            <p className="mb-6">
              Sign up today and take your events to the next level.
            </p>
            <button
              className="bg-white text-indigo-600 px-6 py-3 rounded-full shadow-lg hover:bg-indigo-100 transition"
              onClick={() => {
                navigate("/register");
              }}>
              Sign Up Now
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
