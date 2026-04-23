import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import {
  ArrowRight, Cpu, Database, Network, Lock,
  Sparkles, MessageSquare, Rocket, Star, Quote,
  Zap, Bot, Target, Layers, Code2, GraduationCap,
  TrendingUp, Award, Globe, Shield, Brain, Cloud,
  BookOpen, Users, Video, FileText, Coffee, Trophy,
  Library, Clock, BarChart3, GitBranch, Fingerprint,
  Activity, Zap as ZapIcon, PieChart, GitMerge,
  Server, ShieldCheck, Atom, Binary, Microscope
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin-dashboard');
      else if (user.role === 'student') navigate('/dashboard');
      else if (user.role === 'librarian') navigate('/librarian-dashboard');
      else if (user.role === 'hod') navigate('/hod-dashboard');
      else if (user.role === 'parent') navigate('/parent-dashboard');
      else if (user.role === 'teacher') navigate('/faculty-dashboard');
    }
  }, [user, navigate]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const scaleOnHover = {
    whileHover: { scale: 1.05, transition: { duration: 0.2 } },
    whileTap: { scale: 0.95 }
  };

  const featureCards = [
    { 
      icon: Brain, 
      title: "Smart AI Assistant", 
      desc: "Our smart AI watches how you learn and changes in real-time to help you.", 
      color: "from-indigo-500 to-purple-500", 
      bg: "bg-gradient-to-br from-indigo-500/20 to-purple-500/20",
      border: "group-hover:border-indigo-500/50",
      detailedDesc: "The system creates a personal path that helps you remember things better and finish your studies faster by understanding your unique style."
    },
    { 
      icon: Activity, 
      title: "Fast Live Classes", 
      desc: "Talk and work with others across the world as if they were in the same room.", 
      color: "from-cyan-500 to-blue-500", 
      bg: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20",
      border: "group-hover:border-cyan-500/50",
      detailedDesc: "Experience real-time collaboration with no delay. Our fast network ensures you get clear video and sound without any annoying lag."
    },
    { 
      icon: GitMerge, 
      title: "Fun Learning Games", 
      desc: "Enjoy learning with fun games and challenges that reward your hard work.", 
      color: "from-amber-500 to-orange-500", 
      bg: "bg-gradient-to-br from-amber-500/20 to-orange-500/20",
      border: "group-hover:border-amber-500/50",
      detailedDesc: "Earn digital badges and climb the leaderboard as you complete tasks, fostering healthy competition while keeping your academic records safe."
    },
    { 
      icon: PieChart, 
      title: "Smart Progress Tracking", 
      desc: "Our smart systems can see how you are doing and predict your future success.", 
      color: "from-emerald-500 to-teal-500", 
      bg: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20",
      border: "group-hover:border-emerald-500/50",
      detailedDesc: "We help find areas where you might need extra help before any problems start, giving you the best chance to reach your academic goals."
    },
    { 
      icon: Server, 
      title: "Group Study Hubs", 
      desc: "Work together in shared spaces where everyone can contribute and learn.", 
      color: "from-rose-500 to-pink-500", 
      bg: "bg-gradient-to-br from-rose-500/20 to-pink-500/20",
      border: "group-hover:border-rose-500/50",
      detailedDesc: "Discuss lessons with friends, get help from mentors, and see all the ways your course materials have been improved over time."
    },
    { 
      icon: ShieldCheck, 
      title: "Safe & Secure Data", 
      desc: "We use strong security to keep your information safe and private 24/7.", 
      color: "from-slate-500 to-gray-500", 
      bg: "bg-gradient-to-br from-slate-500/20 to-gray-500/20",
      border: "group-hover:border-slate-500/50",
      detailedDesc: "Your data is locked away using top-tier encryption and monitored constantly so it stays exactly where it should—with you."
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Ishu Anand Malviya",
      role: "Lead Systems Architect",
      institution: "Neural-Link Engineering",
      content: "ScholarMatrix represents the pinnacle of modern pedagogical architecture. By synthesizing distributed computing with real-time neural adaptation, we've engineered a platform that doesn't just store knowledge—it accelerates the human potential to absorb it.",
      rating: 5,
      avatar: "IM",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop"
    },
    {
      id: 2,
      name: "Dr. Elena Volkov",
      role: "Head of Computational Pedagogy",
      institution: "CERN Academic Hub",
      content: "The low-latency synchronization protocols and technical vocabulary integrated into ScholarMatrix facilitate a level of research collaboration previously reserved for localized supercomputer nodes. It is truly an exceptional framework.",
      rating: 5,
      avatar: "EV",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop"
    },
    {
      id: 3,
      name: "Alex Thorne",
      role: "Senior DevRel Engineer",
      institution: "Vercel Systems",
      content: "Implementing ScholarMatrix across our global training modules resulted in a 450% increase in technical retention. The Git-integrated discussion nodes and sub-millisecond AI response times are simply unmatched in the EdTech ecosystem.",
      rating: 5,
      avatar: "AT",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
    }
  ];

  // Refs for scroll animations
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="relative overflow-x-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-[#030712] dark:via-[#050a15] dark:to-[#030712] text-gray-900 dark:text-gray-100 transition-colors duration-500">

      {/* --- ANIMATED BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated Gradient Orbs */}
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-primary-400/30 to-indigo-400/30 blur-[120px]"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-rose-400/20 to-purple-400/20 blur-[120px]"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute top-[50%] left-[50%] w-[50%] h-[50%] rounded-full bg-gradient-to-r from-cyan-400/10 to-emerald-400/10 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      </div>

      {/* --- HERO SECTION --- */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden"
      >
        <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInLeft}
            className="flex flex-col items-start text-left max-w-2xl"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wide mb-8 border border-primary-200 dark:border-primary-800/50 shadow-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={14} className="text-amber-500" />
              </motion.div>
              <span>Next Generation Learning Ecosystem</span>
            </motion.div>

            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8 text-gray-900 dark:text-white"
              variants={fadeInUp}
            >
              Welcome to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-indigo-600 to-primary-600 dark:from-primary-400 dark:via-indigo-400 dark:to-primary-400 animate-gradient">
                ScholarMatrix
              </span>
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 font-medium leading-relaxed"
              variants={fadeInUp}
            >
              Experience the future of education with our intelligent learning platform. ScholarMatrix combines cutting-edge AI, collaborative tools, and personalized learning paths to unlock your full academic potential.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={scaleOnHover}>
                <Link to="/login" className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold text-xs uppercase tracking-wide hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-xl shadow-indigo-600/30 flex justify-center items-center gap-3 group relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <GraduationCap size={18} className="text-white relative z-10" />
                  <span className="relative z-10">Start Learning Now</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                </Link>
              </motion.div>
              <motion.div variants={scaleOnHover}>
                <Link to="/about" className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 font-semibold text-xs uppercase tracking-wide text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all flex justify-center items-center gap-3 shadow-md group">
                  Learn More
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              className="mt-12 flex items-center gap-6 flex-wrap"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Shield size={16} className="text-green-500" />
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Users size={16} className="text-blue-500" />
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">50K+ Active Users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Trophy size={16} className="text-purple-500" />
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Award-Winning Platform</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Visual - Interactive Scholar Matrix Showcase */}
          <motion.div 
            className="w-full h-[500px] lg:h-[600px] relative flex items-center justify-center"
            initial="hidden"
            animate="visible"
            variants={fadeInRight}
          >
            <div className="absolute inset-0 bg-primary-500/5 rounded-full blur-[120px]" />

            <motion.div 
              className="relative z-10 w-full max-w-lg aspect-square"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary-600 to-indigo-600 rounded-[3rem] rotate-3 opacity-10"
                animate={{ rotate: [3, 6, 3] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              />

              <div className="relative h-full w-full backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-[3rem] border border-white/20 flex flex-col items-center justify-center p-12 text-center overflow-hidden shadow-2xl">
                {/* Animated Grid of Icons */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {[
                    { icon: BookOpen, color: "text-blue-500", delay: 0 },
                    { icon: Video, color: "text-purple-500", delay: 0.2 },
                    { icon: Users, color: "text-green-500", delay: 0.4 },
                    { icon: FileText, color: "text-orange-500", delay: 0.1 },
                    { icon: Brain, color: "text-red-500", delay: 0.3 },
                    { icon: Coffee, color: "text-yellow-500", delay: 0.5 }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-lg flex items-center justify-center border border-gray-200 dark:border-gray-700"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: item.delay, duration: 0.5 }}
                    >
                      <item.icon size={32} className={item.color} />
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Comprehensive Learning Suite
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    All-in-one platform for modern education
                  </p>
                </motion.div>

                {/* Animated Accents */}
                <motion.div 
                  className="absolute top-12 right-12 w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles size={28} />
                </motion.div>
                <motion.div 
                  className="absolute bottom-12 left-12 w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  <Target size={28} />
                </motion.div>
                <motion.div 
                  className="absolute top-1/2 -right-6 w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 shadow-lg"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                  <Zap size={24} />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </motion.section>

      {/* --- STATS SECTION --- */}
      <motion.section 
        ref={statsRef}
        className="py-24 border-y border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-dark-card/30 backdrop-blur-md relative z-20 px-6 md:px-12 lg:px-24"
        initial={{ opacity: 0, y: 50 }}
        animate={statsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { num: "50k+", label: "Active Students", icon: GraduationCap },
              { num: "3,000+", label: "Expert Instructors", icon: Award },
              { num: "1M+", label: "Quizzes Solved", icon: TrendingUp },
              { num: "99.9%", label: "Uptime SLA", icon: Shield }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                className="flex flex-col items-center justify-center p-4 group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500/10 to-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <motion.h3 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-3"
                  initial={{ opacity: 0 }}
                  animate={statsInView ? { opacity: 1 } : {}}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  {stat.num}
                </motion.h3>
                <p className="text-gray-500 dark:text-gray-400 font-bold tracking-wide uppercase text-xs md:text-xs mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- FEATURES GRID --- */}
      <motion.section 
        ref={featuresRef}
        className="py-32 relative z-10 px-6 md:px-12 lg:px-24"
        initial={{ opacity: 0 }}
        animate={featuresInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
              Built for the <span className="bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">Modern Scholar</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-3xl mx-auto">
              Everything you need to orchestrate a sophisticated learning environment precisely engineered for peak performance and student retention.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            {featureCards.map((feature, i) => (
              <motion.div 
                key={i} 
                className={`group backdrop-blur-xl bg-white/70 dark:bg-gray-900/40 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 ${feature.border} hover:shadow-2xl transition-all duration-500 hover:shadow-primary-500/10 flex flex-col h-full`}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <motion.div 
                    className={`w-14 h-14 rounded-xl ${feature.bg} flex justify-center items-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    <feature.icon className={`w-7 h-7 bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight flex-1">
                    {feature.title}
                  </h3>
                </div>
                
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-medium mb-4">
                  {feature.desc}
                </p>
                
                <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed mb-6 pt-2 border-t border-gray-100 dark:border-gray-800">
                  {feature.detailedDesc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* --- TESTIMONIALS SECTION --- */}
      <motion.section 
        ref={testimonialsRef}
        className="py-32 relative overflow-hidden px-6 md:px-12 lg:px-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/20 dark:to-transparent"
        initial={{ opacity: 0 }}
        animate={testimonialsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wide mb-8">
              <MessageSquare size={14} />
              <span>Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-gray-900 dark:text-white">
              What Our <span className="bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">Community</span> Says
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium">
              Join thousands of satisfied students and educators who have transformed their learning experience with ScholarMatrix
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id} 
                className="relative bg-white dark:bg-gray-800/40 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm group"
                initial={{ opacity: 0, y: 50 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-indigo-500 flex items-center justify-center backdrop-blur-sm shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Quote className="w-6 h-6 text-white" />
                </motion.div>
                <div className="flex gap-1.5 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={testimonialsInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                    >
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 text-base italic"
                  initial={{ opacity: 0 }}
                  animate={testimonialsInView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  "{testimonial.content}"
                </motion.p>
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg"
                    whileHover={{ scale: 1.1 }}
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wide">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold mt-1 uppercase tracking-tighter">
                      {testimonial.institution}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* --- FINAL CTA SECTION --- */}
      <motion.section 
        ref={ctaRef}
        className="py-32 relative overflow-hidden px-6 md:px-12 lg:px-24"
        initial={{ opacity: 0 }}
        animate={ctaInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wide mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Rocket size={14} />
              </motion.div>
              <span>Ready to Begin?</span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 dark:text-white">
              Start Your Learning<br />Journey Today
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto font-medium">
              Join thousands of students already accelerating their academic success with ScholarMatrix
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/login" className="inline-flex items-center gap-4 px-12 py-5 rounded-2xl bg-gradient-to-r from-primary-600 via-primary-600 to-indigo-600 text-white font-semibold text-xs uppercase tracking-wide hover:shadow-2xl transition-all shadow-xl shadow-primary-600/30 group relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10">Get Started Free</span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Background decoration */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary-500/5 to-indigo-500/5 blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.section>

      {/* --- GLOBAL STYLES --- */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          dark: background: #1a1a1a;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #6366f1, #8b5cf6);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #4f46e5, #7c3aed);
        }

        /* Performance optimizations */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
};

export default Home;