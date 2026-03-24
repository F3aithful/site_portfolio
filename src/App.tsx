import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Menu, X, Github, Send, Phone, 
  Calendar, CheckCircle, AlertCircle, Zap 
} from 'lucide-react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-[#e5e5e5] hover:text-[#00FF9D] transition-colors duration-300 font-medium text-sm tracking-widest"
  >
    {children}
  </a>
);

const ProgressBar: React.FC<{ label: string; percentage: number; delay?: number }> = ({ 
  label, 
  percentage, 
  delay = 0 
}) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, delay);
    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-1.5 text-[#e5e5e5]">
        <span>{label}</span>
        <span className="text-[#00FF9D] font-mono">{percentage}%</span>
      </div>
      <div className="h-1 bg-[#222222] rounded-full overflow-hidden">
        <motion.div 
          className="h-1 bg-[#00FF9D] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const TerminalLine: React.FC<{ text: string; type: 'success' | 'error' | 'info'; delay: number }> = ({
  text,
  type,
  delay
}) => {
  const [visible, setVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  const color = type === 'success' ? 'text-[#00FF9D]' : 
                type === 'error' ? 'text-red-500' : 'text-[#e5e5e5]';

  return (
    <div className={`font-mono text-sm ${color} transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {displayedText}
      {visible && <span className="animate-pulse">_</span>}
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sections = {
    about: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    why: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null)
  };

  const scrollToSection = (sectionId: keyof typeof sections) => {
    sections[sectionId].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    setIsMenuOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending
    setFormSubmitted(true);
    setTimeout(() => {
      alert('Сообщение отправлено! Спасибо. Я свяжусь с вами в ближайшее время.');
      setFormData({ name: '', email: '', company: '', message: '' });
      setFormSubmitted(false);
    }, 800);
  };

  const terminalLines = [
    { text: '✓ GET /users — 200 OK [45ms]', type: 'success' as const, delay: 200 },
    { text: '✓ POST /login — 200 OK [112ms]', type: 'success' as const, delay: 500 },
    { text: 'X DELETE /user/99 — 404 [23ms]', type: 'error' as const, delay: 800 },
    { text: '→ Bug found! Logging...', type: 'info' as const, delay: 1100 },
    { text: '✓ Patch applied & re-tested', type: 'success' as const, delay: 1500 },
    { text: '✓ All 47 tests passed', type: 'success' as const, delay: 1900 },
  ];

  const skillsData = [
    {
      title: "Автоматизация",
      icon: <Zap className="w-8 h-8" />,
      tools: [
        { label: "Selenium", perc: 92 },
        { label: "Pytest", perc: 88 },
        { label: "Requests", perc: 85 },
        { label: "Page Object Model", perc: 90 }
      ]
    },
    {
      title: "API & Данные",
      icon: <Calendar className="w-8 h-8" />,
      tools: [
        { label: "Postman", perc: 95 },
        { label: "Swagger", perc: 82 },
        { label: "REST API", perc: 90 },
        { label: "SQL (Basic)", perc: 75 }
      ]
    },
    {
      title: "Инструменты",
      icon: <CheckCircle className="w-8 h-8" />,
      tools: [
        { label: "Yonote", perc: 85 },
        { label: "TestIt", perc: 88 },
        { label: "GitHub", perc: 93 },
        { label: "DevTools", perc: 90 }
      ]
    }
  ];

  const projects = [
    {
      title: "Chitai-gorod (Automation)",
      image: "/images/chitai-code.jpg",
      description: "Дипломный проект SkyPro. Разработал 10 автотестов с использованием Page Object Model и Allure Report. Полная автоматизация UI-тестирования.",
      tags: ["Python", "Selenium", "Pytest", "Page Object Model", "Allure Report"],
      github: "https://github.com/F3aithful/QA---Portfolio",
      link: "#"
    },
    {
      title: "Kinopoisk (Manual Testing)",
      image: "/images/kinopoisk.jpg",
      description: "Полный цикл ручного тестирования: чек-листы, smoke, regression, functional тестирование. Обнаружено и описано 27 багов различной критичности.",
      tags: ["Тест-кейсы", "Баг-репорты", "Smoke", "Regression", "Postman"],
      github: "https://github.com/F3aithful/QA---Portfolio",
      link: "#"
    },
    {
      title: "SkyPro / Раздел расписание (API Testing)",
      image: "/images/skypro.jpg",
      description: "Разрабатывал тестовую документацию, проводил smoke, regression и functional тестирование. API-тестирование: создание, редактирование и удаление уроков.",
      tags: ["API Testing", "Чек-листы", "Баг-репорты", "Postman", "Swagger"],
      github: "https://github.com/F3aithful/QA---Portfolio",
      link: "#"
    }
  ];

  const whyCards = [
    {
      icon: <AlertCircle className="w-10 h-10 text-[#00FF9D]" />,
      title: "Готов с первого дня",
      desc: "Глубокое понимание QA процессов. Могу начать работу с первого дня без длительного онбординга."
    },
    {
      icon: <Zap className="w-10 h-10 text-[#00FF9D]" />,
      title: "UI + API = двойное покрытие",
      desc: "Тестирую как интерфейс, так и серверную часть. Обеспечиваю максимальное качество продукта."
    },
    {
      icon: <Send className="w-10 h-10 text-[#00FF9D]" />,
      title: "Чёткая коммуникация",
      desc: "Прозрачные отчеты, понятные баг-репорты и отличные навыки командной работы."
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-[#00FF9D]" />,
      title: "Результаты, а не процессы",
      desc: "Фокус на результатах: баги исправлены, качество продукта повышено."
    }
  ];

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden font-sans">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#222222]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#00FF9D] rounded flex items-center justify-center">
              <Shield className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="font-bold text-xl tracking-tighter">QA PORTFOLIO</div>
              <div className="text-[10px] text-[#00FF9D] -mt-1 font-mono">JUNIOR QA ENGINEER</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10 text-sm">
            <NavLink href="#about" onClick={() => scrollToSection('about')}>ОБО МНЕ</NavLink>
            <NavLink href="#skills" onClick={() => scrollToSection('skills')}>НАВЫКИ</NavLink>
            <NavLink href="#projects" onClick={() => scrollToSection('projects')}>ПРОЕКТЫ</NavLink>
            <NavLink href="#why" onClick={() => scrollToSection('why')}>ПОЧЕМУ Я?</NavLink>
            <NavLink href="#contact" onClick={() => scrollToSection('contact')}>КОНТАКТ</NavLink>
          </nav>

          <div className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 bg-[#00FF9D] text-black font-semibold rounded-full flex items-center gap-2 hover:bg-white transition-all duration-300 text-sm tracking-widest"
            >
              НАНЯТЬ МЕНЯ <span className="text-lg">→</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-[#00FF9D]"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[#222222] bg-[#0a0a0a]"
            >
              <div className="px-6 py-8 flex flex-col gap-6 text-lg">
                {['about', 'skills', 'projects', 'why', 'contact'].map((sec, idx) => (
                  <a 
                    key={idx}
                    href={`#${sec}`}
                    onClick={() => scrollToSection(sec as keyof typeof sections)}
                    className="text-[#e5e5e5] hover:text-[#00FF9D] py-1"
                  >
                    {sec === 'about' && 'ОБО МНЕ'}
                    {sec === 'skills' && 'НАВЫКИ'}
                    {sec === 'projects' && 'ПРОЕКТЫ'}
                    {sec === 'why' && 'ПОЧЕМУ Я?'}
                    {sec === 'contact' && 'КОНТАКТ'}
                  </a>
                ))}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => scrollToSection('contact')}
                  className="mt-4 w-full py-4 bg-[#00FF9D] text-black font-semibold rounded-xl"
                >
                  НАНЯТЬ МЕНЯ →
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO / ABOUT */}
      <section id="about" ref={sections.about} className="pt-24 min-h-screen flex items-center relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 pt-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-[#00FF9D] text-sm tracking-[4px] font-mono border border-[#00FF9D]/30 px-4 py-1 rounded-full">
                01. ОБО МНЕ
              </div>
              <h1 className="text-6xl md:text-7xl font-bold leading-[1.05] tracking-tighter">
                JUNIOR QA ENGINEER<br />
                <span className="text-[#00FF9D]">ТЕСТИРУЮ ТАК,</span><br />
                ЧТОБЫ БАГИ ПЛАКАЛИ,<br />
                А ПОЛЬЗОВАТЕЛИ УЛЫБАЛИСЬ 😎
              </h1>
            </div>

            <div className="max-w-lg text-[#e5e5e5] text-lg leading-relaxed">
              Прошёл курс SkyPro по направлению "Тестирование ПО". 
              Выполнил дипломный проект по автоматизации тестирования сайта Chitai-gorod.
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                onClick={() => scrollToSection('projects')}
                whileHover={{ scale: 1.03 }}
                className="group px-10 py-4 border border-[#00FF9D] text-[#00FF9D] rounded-2xl font-medium flex items-center gap-3 hover:bg-[#00FF9D] hover:text-black transition-all"
              >
                СМОТРЕТЬ ПРОЕКТЫ ↓
              </motion.a>
              <motion.a
                href="tel:+79780632668"
                whileHover={{ scale: 1.03 }}
                className="group px-10 py-4 border border-white/40 hover:border-white rounded-2xl font-medium flex items-center gap-3 transition-all"
              >
                ПОЗВОНИТЬ <Phone className="w-4 h-4" />
              </motion.a>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#222222]">
              <div>
                <div className="text-5xl font-bold text-[#00FF9D] tracking-tighter">47+</div>
                <div className="text-sm text-[#888] mt-1">ТЕСТ-КЕЙСОВ</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-[#00FF9D] tracking-tighter">3</div>
                <div className="text-sm text-[#888] mt-1">ПРОЕКТА</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-[#00FF9D] tracking-tighter">100%</div>
                <div className="text-sm text-[#888] mt-1">ВОВЛЕЧЁННОСТЬ</div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: PHOTO + TERMINAL (оригинальный вариант) */}
          <div className="relative flex flex-col items-center md:items-end space-y-8">
            {/* Profile Photo */}
            <div className="relative w-full max-w-[380px]">
              <div className="absolute -inset-6 bg-[#00FF9D]/10 rounded-[3rem] -rotate-2"></div>
              <img 
                src="/images/profile.jpg" 
                alt="Junior QA Engineer" 
                className="w-full rounded-3xl shadow-2xl relative z-10 border border-[#222222] object-cover"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#111111] border border-[#00FF9D] text-[#00FF9D] text-sm px-8 py-2.5 rounded-2xl font-medium flex items-center gap-2 shadow-xl z-20">
                <div className="w-2 h-2 bg-[#00FF9D] rounded-full animate-pulse"></div>
                AVAILABLE FOR WORK
              </div>
            </div>

            {/* Terminal */}
            <div className="w-full max-w-[520px] bg-black border border-[#222222] rounded-3xl p-8 shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-xs text-[#666] font-mono">terminal — zsh — 120×38</div>
              </div>
              
              <div className="space-y-2.5 font-mono text-sm h-[260px] overflow-hidden">
                {terminalLines.map((line, index) => (
                  <TerminalLine 
                    key={index} 
                    text={line.text} 
                    type={line.type} 
                    delay={line.delay} 
                  />
                ))}
                <div className="pt-4 text-[#555] text-xs">Running UI smoke tests...</div>
                <div className="flex gap-6 pt-1">
                  <div className="flex items-center gap-1.5 text-[#00FF9D] text-xs">
                    <CheckCircle className="w-3.5 h-3.5" /> Test #1 passed
                  </div>
                  <div className="flex items-center gap-1.5 text-[#00FF9D] text-xs">
                    <CheckCircle className="w-3.5 h-3.5" /> Test #2 passed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-12 left-1/2 hidden md:flex flex-col items-center gap-3">
          <div className="text-[10px] tracking-[3px] text-[#555] font-mono">SCROLL</div>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#00FF9D] to-transparent"></div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" ref={sections.skills} className="py-24 border-t border-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <div className="inline-flex items-center gap-2 text-[#00FF9D] text-sm tracking-[4px] font-mono border border-[#00FF9D]/30 px-4 py-1 rounded-full mb-4">
                02. НАВЫКИ И ИНСТРУМЕНТЫ
              </div>
              <h2 className="text-6xl font-bold tracking-tighter">ЧТО Я УМЕЮ</h2>
            </div>
            <div className="hidden md:block text-right max-w-xs text-[#888] text-sm">
              Постоянно развиваюсь. Использую самые актуальные инструменты тестирования.
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {skillsData.map((skill, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#111111] border border-[#222222] p-10 rounded-3xl group hover:border-[#00FF9D]/50 transition-all hover:-translate-y-1"
              >
                <div className="text-[#00FF9D] mb-8">{skill.icon}</div>
                <h3 className="text-3xl font-semibold mb-9">{skill.title}</h3>
                
                <div className="space-y-6">
                  {skill.tools.map((tool, i) => (
                    <ProgressBar 
                      key={i} 
                      label={tool.label} 
                      percentage={tool.perc} 
                      delay={300 + i * 120} 
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-3 justify-center">
            {["Postman", "Swagger", "REST API", "JSON", "Requests", "Selenium", "Page Object", "Pytest", "Automation", "TestIt", "DevTools", "Miro", "Jira", "GitHub", "SQL (Basic)", "API", "UI/UX", "Allure"].map((tag, i) => (
              <div key={i} className="px-6 py-2 text-xs border border-[#222222] hover:border-[#00FF9D] hover:text-[#00FF9D] rounded-full transition-all cursor-default">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" ref={sections.projects} className="py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 text-[#00FF9D] text-sm tracking-[4px] font-mono border border-[#00FF9D]/30 px-4 py-1 rounded-full mb-4">
              03. ПРОЕКТЫ
            </div>
            <h2 className="text-6xl font-bold tracking-tighter">МОИ КЕЙСЫ</h2>
          </div>

          <div className="space-y-24">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid md:grid-cols-12 gap-8 md:gap-16 items-center"
              >
                <div className={`md:col-span-7 rounded-3xl overflow-hidden border border-[#222222] ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                <div className={`md:col-span-5 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="text-[#00FF9D] text-sm tracking-widest mb-3">PROJECT {String(index + 1).padStart(2, '0')}</div>
                  <h3 className="text-4xl font-semibold mb-6 leading-tight">{project.title}</h3>
                  
                  <p className="text-[#e5e5e5] leading-relaxed mb-9 text-[17px]">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-4 py-1.5 bg-[#1a1a1a] border border-[#333] rounded-full text-[#aaa]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <motion.a 
                      href={project.github} 
                      target="_blank"
                      whileHover={{ scale: 1.02 }}
                      className="flex-1 md:flex-none border border-white/60 hover:bg-white hover:text-black px-8 py-4 rounded-2xl flex items-center justify-center gap-3 text-sm font-medium transition-all"
                    >
                      <Github className="w-4 h-4" /> GITHUB
                    </motion.a>
                    <motion.a 
                      href={project.link} 
                      whileHover={{ scale: 1.02 }}
                      className="flex-1 md:flex-none bg-[#00FF9D] text-black px-8 py-4 rounded-2xl flex items-center justify-center gap-3 text-sm font-semibold transition-all hover:bg-white"
                    >
                      ОТКРЫТЬ ОТЧЁТ →
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ME SECTION */}
      <section id="why" ref={sections.why} className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 text-[#00FF9D] text-sm tracking-[4px] font-mono border border-[#00FF9D]/30 px-4 py-1 rounded-full mb-4">
              04. ПОЧЕМУ Я?
            </div>
            <h2 className="text-6xl font-bold tracking-tighter">ПРЕИМУЩЕСТВА</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-24">
            {whyCards.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="group bg-[#111] border border-[#222222] p-10 rounded-3xl hover:border-[#00FF9D] transition-colors"
              >
                <div className="mb-8">{card.icon}</div>
                <h3 className="text-3xl font-semibold mb-6">{card.title}</h3>
                <p className="text-[#ccc] leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* ROCKET BANNER */}
          <div className="relative bg-black rounded-[42px] overflow-hidden border border-[#222222]">
            <img 
              src="/images/rocket.jpg" 
              alt="Rocket" 
              className="absolute inset-0 w-full h-full object-cover opacity-80" 
            />
            
            <div className="relative p-16 md:p-24 flex flex-col items-center text-center z-10">
              <div className="inline text-[#00FF9D] text-sm tracking-[6px] mb-4">ГОТОВ К РАБОТЕ</div>
              
              <h2 className="text-[68px] md:text-8xl font-bold leading-none tracking-tighter mb-8">
                ГОТОВ ТЕСТИРОВАТЬ<br />ВАШ ПРОДУКТ УЖЕ ЗАВТРА
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-5 mt-6">
                <motion.button 
                  onClick={() => scrollToSection('contact')}
                  whileHover={{ scale: 1.05 }}
                  className="px-12 py-5 bg-[#00FF9D] hover:bg-white text-xl font-semibold text-black rounded-2xl flex items-center gap-3 transition-colors"
                >
                  НАПИСАТЬ МНЕ
                </motion.button>
                
                <motion.a 
                  href="tel:+79780632668"
                  whileHover={{ scale: 1.05 }}
                  className="px-12 py-5 border-2 border-white/70 hover:border-white text-xl font-semibold rounded-2xl flex items-center gap-3 transition-all"
                >
                  ПОЗВОНИТЬ →
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" ref={sections.contact} className="py-24 border-t border-[#111111]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-x-16">
          {/* LEFT: CONTACTS */}
          <div className="md:col-span-5">
            <div className="sticky top-28">
              <div className="inline-flex items-center gap-2 text-[#00FF9D] text-sm tracking-[4px] font-mono border border-[#00FF9D]/30 px-4 py-1 rounded-full mb-6">
                05. СВЯЗАТЬСЯ
              </div>
              <h2 className="text-6xl font-bold tracking-[-2px] leading-none mb-16">Давайте<br />поговорим</h2>

              <div className="space-y-10">
                <div>
                  <a href="https://t.me/vbrwork" target="_blank" className="block group">
                    <div className="text-sm text-[#888] mb-1">TELEGRAM</div>
                    <div className="text-3xl font-medium group-hover:text-[#00FF9D] transition-colors">@vbrwork</div>
                  </a>
                </div>
                
                <div>
                  <a href="https://github.com/F3aithful/QA---Portfolio" target="_blank" className="block group">
                    <div className="text-sm text-[#888] mb-1">GITHUB</div>
                    <div className="text-3xl font-medium group-hover:text-[#00FF9D] transition-colors">github.com/F3aithful</div>
                  </a>
                </div>

                <div>
                  <a href="tel:+79780632668" className="block group">
                    <div className="text-sm text-[#888] mb-1">ПОЗВОНИТЬ МНЕ</div>
                    <div className="text-3xl font-medium group-hover:text-[#00FF9D] transition-colors">+7 978 063 26 68</div>
                  </a>
                </div>
              </div>

              <div className="mt-16 p-8 border border-[#00FF9D]/30 bg-[#0a0a0a] rounded-3xl">
                <div className="flex items-center gap-4">
                  <div className="text-[#00FF9D]">
                    <CheckCircle className="w-9 h-9" />
                  </div>
                  <div>
                    <div className="font-semibold">Доступен к работе</div>
                    <div className="text-sm text-[#888]">Full-time / Part-time / Freelance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="md:col-span-7 mt-16 md:mt-0">
            <form onSubmit={handleFormSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-widest text-[#888] mb-3">ИМЯ *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full bg-transparent border-b border-[#333] pb-4 text-xl focus:border-[#00FF9D] outline-none transition-colors placeholder:text-[#555]"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest text-[#888] mb-3">EMAIL *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full bg-transparent border-b border-[#333] pb-4 text-xl focus:border-[#00FF9D] outline-none transition-colors placeholder:text-[#555]"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-widest text-[#888] mb-3">КОМПАНИЯ</label>
                <input 
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleFormChange}
                  className="w-full bg-transparent border-b border-[#333] pb-4 text-xl focus:border-[#00FF9D] outline-none transition-colors placeholder:text-[#555]"
                  placeholder="Название компании"
                />
              </div>

              <div>
                <label className="block text-xs tracking-widest text-[#888] mb-3">СООБЩЕНИЕ <span className="text-[#555]">(0/{formData.message.length})</span></label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  maxLength={500}
                  required
                  rows={7}
                  className="w-full resize-y bg-[#111] border border-[#333] rounded-3xl p-8 text-xl focus:border-[#00FF9D] outline-none transition-colors"
                  placeholder="Расскажите о вашем проекте..."
                ></textarea>
              </div>

              <div className="pt-4 flex flex-col gap-4">
                <motion.button 
                  type="submit"
                  disabled={formSubmitted}
                  whileHover={!formSubmitted ? { scale: 1.01 } : {}}
                  className="w-full py-7 bg-[#00FF9D] text-black text-xl font-semibold rounded-3xl flex items-center justify-center gap-4 hover:bg-white disabled:opacity-70"
                >
                  {formSubmitted ? "ОТПРАВЛЯЕМ..." : "ОТПРАВИТЬ СООБЩЕНИЕ →"}
                </motion.button>
                
                <div className="text-center text-sm text-[#777]">
                  Или сразу в <a href="https://t.me/vbrwork" target="_blank" className="underline hover:text-[#00FF9D]">Telegram</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#222222] py-16 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-sm">
          <div className="flex items-center gap-6 text-[#666]">
            <div>JUNIOR QA ENGINEER · 2025</div>
          </div>
          
          <div className="text-[#00FF9D] font-medium flex items-center gap-3">
            ГОТОВ ТЕСТИРОВАТЬ ВАШ ПРОДУКТ УЖЕ ЗАВТРА ✨
          </div>

          <div className="flex items-center gap-8 text-[#555]">
            <a href="https://t.me/vbrwork" target="_blank" className="hover:text-[#00FF9D] transition-colors">TG</a>
            <a href="https://github.com/F3aithful/QA---Portfolio" target="_blank" className="hover:text-[#00FF9D] transition-colors">GH</a>
            <a href="tel:+79780632668" className="hover:text-[#00FF9D] transition-colors">☎︎</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

