import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ArrowRight,
  Brain,
  Database,
  Zap,
  Star,
  TrendingUp,
  Users,
  Shield,
} from "lucide-react";
import Spline from "@splinetool/react-spline";
import { useState } from "react";
import { ContainerTextFlip } from "../components/ui/ContainerTextFlip";


export const Home = () => {
  const { isAuthenticated } = useAuth();
  const [splineLoaded, setSplineLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3a3a3a_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),transparent)]"
        style={{ pointerEvents: "none" }}
      ></div>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <style>{`
          /* Target only watermark elements, not the canvas */
          a[href*="spline.design"],
          a[href*="spline.design"] > *,
          div[style*="position: fixed"],
          div[style*="position:fixed"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
          }
          /* Black overlay to cover bottom-right watermark */
          .spline-container::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 180px;
            height: 50px;
            background: linear-gradient(to left, black 60%, transparent);
            z-index: 9999;
            pointer-events: none;
          }
        `}</style>
        <div className="text-center mb-1 lg:mb-2 animate-fade-in">
          <div className="mb-2 inline-block">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 tracking-tighter animate-[float_6s_ease-in-out_infinite]">
              FLUX
            </h1>
          </div>
        </div>

        <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] mb-6 overflow-hidden spline-container hidden md:block">
          {!splineLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-gray-700 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Loading 3D Model...</p>
              </div>
            </div>
          )}
          <div
            className={`w-full h-full transition-opacity duration-1000 ${
              splineLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <Spline
              scene={import.meta.env.VITE_SPLINE_SCENE_URL}
              onLoad={() => setSplineLoaded(true)}
            />
          </div>
        </div>

        <div className="text-center mt-12 md:mt-20 mb-8 md:mb-12 lg:mb-20 animate-fade-up px-2">
          <p
            className="relative z-10 text-xl sm:text-3xl md:text-5xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold tracking-tight leading-tight mb-3 md:mb-6 lg:mb-8"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Product
          </p>
          <div className="mb-6 md:mb-8 lg:mb-10">
            <ContainerTextFlip
              words={["Review", "Evaluation", "Rating", "Opinion"]}
              interval={3000}
              animationDuration={1200}
            />
          </div>
          <p className="text-xs sm:text-base md:text-lg lg:text-xl text-gray-300 mb-8 md:mb-10 lg:mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            AI-powered sentiment analysis for customer feedback
          </p>

          {!isAuthenticated && (
            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-5 lg:gap-6 justify-center items-center animate-fade-up px-2"
              style={{ animationDelay: "0.15s" }}
            >
              <Link
                to="/signup"
                className="group relative bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white px-8 sm:px-12 py-3 sm:py-5 rounded-2xl font-bold transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 flex items-center gap-3 shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-400/60 text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                Get Started{" "}
                <ArrowRight
                  size={22}
                  className="group-hover:translate-x-2 transition-transform duration-300"
                />
              </Link>
              <Link
                to="/login"
                className="border-2 border-gray-700 hover:border-emerald-500 bg-gray-900/50 hover:bg-gray-800/80 text-white px-8 sm:px-12 py-3 sm:py-5 rounded-2xl font-bold transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/30 text-sm sm:text-base w-full sm:w-auto"
              >
                Sign In
              </Link>
            </div>
          )}

          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="group relative bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white px-8 sm:px-12 py-3 sm:py-5 rounded-2xl font-bold transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 inline-flex items-center gap-3 shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-400/60 animate-fade-up text-sm sm:text-base"
              style={{ animationDelay: "0.15s" }}
            >
              Go to Dashboard{" "}
              <ArrowRight
                size={22}
                className="group-hover:translate-x-2 transition-transform duration-300"
              />
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-8 lg:gap-10 mt-16 sm:mt-32 mb-16 sm:mb-24">
          <div
            className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-emerald-500/70 rounded-3xl p-6 sm:p-10 lg:p-12 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 transform hover:-translate-y-3 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Brain
              className="text-emerald-400 mb-6 sm:mb-8 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500"
              size={48}
            />
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-5">
              AI Sentiment Analysis
            </h3>
            <p className="text-gray-400 text-sm sm:text-lg leading-relaxed">
              Automatic classification of reviews into Positive, Negative, or
              Neutral sentiments in real-time.
            </p>
          </div>

          <div
            className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-cyan-500/70 rounded-3xl p-6 sm:p-10 lg:p-12 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 transform hover:-translate-y-3 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Database
              className="text-cyan-400 mb-6 sm:mb-8 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500"
              size={48}
            />
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-5">
              Secure Storage
            </h3>
            <p className="text-gray-400 text-sm sm:text-lg leading-relaxed">
              Enterprise-grade MongoDB with robust security and flexible data
              schemas.
            </p>
          </div>

          <div
            className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-yellow-500/70 rounded-3xl p-6 sm:p-10 lg:p-12 hover:shadow-2xl hover:shadow-yellow-500/30 transition-all duration-500 transform hover:-translate-y-3 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <Zap
              className="text-yellow-400 mb-6 sm:mb-8 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500"
              size={48}
            />
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-5">
              Lightning Fast
            </h3>
            <p className="text-gray-400 text-sm sm:text-lg leading-relaxed">
              Optimized RESTful API with instant sentiment analysis and CRUD
              operations.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-10 lg:gap-12 mb-16 sm:mb-24">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-6 sm:p-10 lg:p-14 hover:border-emerald-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in">
            <Star
              className="text-emerald-400 mb-6 sm:mb-8 animate-pulse-slow"
              size={40}
            />
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">
              Why Choose FLUX?
            </h2>
            <ul className="space-y-3 sm:space-y-5 text-gray-400 text-sm sm:text-lg">
              <li className="flex items-start gap-3 sm:gap-4 hover:text-gray-300 transition-colors duration-300">
                <span className="text-emerald-400 mt-1 text-xl sm:text-2xl flex-shrink-0">
                  ✓
                </span>
                <span>Automated sentiment detection with 95%+ accuracy</span>
              </li>
              <li className="flex items-start gap-3 sm:gap-4 hover:text-gray-300 transition-colors duration-300">
                <span className="text-emerald-400 mt-1 text-xl sm:text-2xl flex-shrink-0">
                  ✓
                </span>
                <span>Real-time analytics and comprehensive dashboards</span>
              </li>
              <li className="flex items-start gap-3 sm:gap-4 hover:text-gray-300 transition-colors duration-300">
                <span className="text-emerald-400 mt-1 text-xl sm:text-2xl flex-shrink-0">
                  ✓
                </span>
                <span>Full CRUD operations for complete review management</span>
              </li>
              <li className="flex items-start gap-3 sm:gap-4 hover:text-gray-300 transition-colors duration-300">
                <span className="text-emerald-400 mt-1 text-xl sm:text-2xl flex-shrink-0">
                  ✓
                </span>
                <span>Scalable architecture built for enterprise needs</span>
              </li>
            </ul>
          </div>

          <div
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-6 sm:p-10 lg:p-14 hover:border-cyan-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <TrendingUp
              className="text-cyan-400 mb-6 sm:mb-8 animate-pulse-slow"
              size={40}
            />
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">
              Key Features
            </h2>
            <div className="space-y-4 sm:space-y-7">
              <div className="flex items-start gap-3 sm:gap-5 hover:translate-x-2 transition-transform duration-300">
                <Users className="text-cyan-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-white font-bold mb-1 sm:mb-2 text-base sm:text-lg">
                    User Management
                  </h4>
                  <p className="text-gray-400 text-sm sm:text-base">
                    Secure authentication and personalized user experiences
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-5 hover:translate-x-2 transition-transform duration-300">
                <Shield
                  className="text-cyan-400 flex-shrink-0 mt-1"
                  size={24}
                />
                <div>
                  <h4 className="text-white font-bold mb-1 sm:mb-2 text-base sm:text-lg">
                    Data Security
                  </h4>
                  <p className="text-gray-400 text-sm sm:text-base">
                    JWT-based authentication with encrypted data storage
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-5 hover:translate-x-2 transition-transform duration-300">
                <Brain className="text-cyan-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-white font-bold mb-1 sm:mb-2 text-base sm:text-lg">
                    Smart Insights
                  </h4>
                  <p className="text-gray-400 text-sm sm:text-base">
                    AI-powered sentiment trends and pattern recognition
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-emerald-500/40 rounded-3xl p-6 sm:p-10 lg:p-16 hover:border-emerald-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 mb-4">
              Ready to Transform Your Reviews?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto">
              Join forward-thinking companies that are revolutionizing their
              feedback systems with AI-powered insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-10 lg:mb-12">
            <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-6 hover:border-emerald-400/60 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 text-emerald-400">
                ⚡
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Real-time sentiment analysis with instant results and zero
                latency
              </p>
            </div>

            <div className="bg-black/40 border border-cyan-500/30 rounded-2xl p-6 hover:border-cyan-400/60 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 text-cyan-400">🎯</div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                Highly Accurate
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                95%+ accuracy AI model trained on millions of customer reviews
              </p>
            </div>

            <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-6 hover:border-emerald-400/60 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 text-emerald-400">
                🔒
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                Enterprise Security
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Bank-level encryption and compliance with industry standards
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-10 lg:mb-12">
            <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-2xl p-6 sm:p-8">
              <h4 className="text-white font-bold text-lg sm:text-xl mb-4 flex items-center gap-2">
                <span className="text-emerald-400">📈</span> Measurable Impact
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                <li>✓ 40% faster feedback analysis</li>
                <li>✓ 60% reduction in manual review time</li>
                <li>✓ Identify trends 10x faster</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-6 sm:p-8">
              <h4 className="text-white font-bold text-lg sm:text-xl mb-4 flex items-center gap-2">
                <span className="text-cyan-400">🚀</span> Seamless Integration
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                <li>✓ Works with any review platform</li>
                <li>✓ Simple API for quick setup</li>
                <li>✓ No complex configuration needed</li>
              </ul>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-emerald-500/30">
            <p className="text-xs sm:text-sm text-gray-400 mb-6">
              Join 500+ companies already using FLUX to understand their
              customers better
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                Start Free Trial
              </button>
              <button className="border-2 border-cyan-500/50 hover:border-cyan-400 bg-transparent hover:bg-cyan-500/10 text-cyan-400 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold transition-all duration-300 text-sm sm:text-base">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
