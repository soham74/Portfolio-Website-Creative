import React, { useState, useRef, useEffect, useCallback } from 'react';
import FS from '../../data/fileSystem';

/* ================================================================== */
/*  THEME COLORS                                                      */
/* ================================================================== */
const THEMES = {
  green:  { bg: '#0c0c0c', fg: '#33ff33', prompt: '#33ff33', caret: '#33ff33' },
  amber:  { bg: '#1a1000', fg: '#ffb000', prompt: '#ffb000', caret: '#ffb000' },
  blue:   { bg: '#000020', fg: '#00aaff', prompt: '#00aaff', caret: '#00aaff' },
  white:  { bg: '#0c0c0c', fg: '#cccccc', prompt: '#cccccc', caret: '#cccccc' },
  red:    { bg: '#0c0c0c', fg: '#ff4444', prompt: '#ff4444', caret: '#ff4444' },
  purple: { bg: '#0c0c0c', fg: '#c084fc', prompt: '#c084fc', caret: '#c084fc' },
};

/* ================================================================== */
/*  FORTUNES                                                          */
/* ================================================================== */
const FORTUNES = [
  '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." -- Martin Fowler',
  '"First, solve the problem. Then, write the code." -- John Johnson',
  '"Talk is cheap. Show me the code." -- Linus Torvalds',
  '"Programs must be written for people to read, and only incidentally for machines to execute." -- Abelson & Sussman',
  '"The best error message is the one that never shows up." -- Thomas Fuchs',
  '"It works on my machine." -- Every developer ever',
  '"There are only two hard things in CS: cache invalidation, naming things, and off-by-one errors."',
  '"99 little bugs in the code, 99 bugs in the code. Take one down, patch it around... 127 little bugs in the code."',
  '"A SQL query walks into a bar, sees two tables, and asks... Can I JOIN you?"',
  '"Why do programmers prefer dark mode? Because light attracts bugs."',
  '"Debugging is like being the detective in a crime movie where you are also the murderer."',
  '"I don\'t always test my code, but when I do, I do it in production."',
  '"In order to understand recursion, one must first understand recursion."',
  '"!false — it\'s funny because it\'s true."',
  '"Weeks of coding can save you hours of planning."',
  '"The cloud is just someone else\'s computer."',
];

/* ================================================================== */
/*  ASCII BANNER                                                      */
/* ================================================================== */
const BANNER = [
  '  ____        _                       _  __     _ _          ',
  ' / ___|  ___ | |__   __ _ _ __ ___   | |/ /___ | | |__   ___ ',
  ' \\___ \\ / _ \\| \'_ \\ / _` | \'_ ` _ \\  | \' // _ \\| | \'_ \\ / _ \\',
  '  ___) | (_) | | | | (_| | | | | | | | . \\ (_) | | | | |  __/',
  ' |____/ \\___/|_| |_|\\__,_|_| |_| |_| |_|\\_\\___/|_|_| |_|\\___|',
];

/* ================================================================== */
/*  COWSAY                                                            */
/* ================================================================== */
function cowsay(msg) {
  const line = msg || 'moo';
  const border = '-'.repeat(line.length + 2);
  return [
    ` ${border}`,
    `< ${line} >`,
    ` ${border}`,
    '        \\   ^__^',
    '         \\  (oo)\\_______',
    '            (__)\\       )\\/\\',
    '                ||----w |',
    '                ||     ||',
  ];
}

/* ================================================================== */
/*  TREE                                                              */
/* ================================================================== */
function buildTree(path, prefix) {
  const node = FS[path];
  if (!node || node.type !== 'dir') return [];
  const result = [];
  const children = node.children;
  children.forEach((child, i) => {
    const isLast = i === children.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const childPath = path + '\\' + child.toUpperCase();
    const fsEntry = FS[childPath];
    const isDir = fsEntry && fsEntry.type === 'dir';
    result.push(prefix + connector + child + (isDir ? '\\' : ''));
    if (isDir) {
      const nextPrefix = prefix + (isLast ? '    ' : '│   ');
      result.push(...buildTree(childPath, nextPrefix));
    }
  });
  return result;
}

/* ================================================================== */
/*  STATIC COMMANDS                                                   */
/* ================================================================== */
const STATIC_COMMANDS = {
  help: () => [
    'Available commands:',
    '',
    '  whoami       - who is this guy?',
    '  education    - school & awards',
    '  experience   - work history',
    '  skills       - technical skills',
    '  projects     - project highlights',
    '  awards       - competitions & wins',
    '  contact      - get in touch',
    '',
    '  ls / dir     - list files in current directory',
    '  cd <folder>  - change directory (cd .. to go back)',
    '  cat <file>   - read a file',
    '  tree         - show file tree from current dir',
    '  history      - show command history',
    '',
    '  theme <name> - change colors (green/amber/blue/white/red/purple)',
    '  banner       - ASCII art name',
    '  neofetch     - system info',
    '  cowsay <msg> - moo',
    '  fortune      - random quote',
    '  ping <host>  - ping something',
    '  matrix       - enter the matrix',
    '  hack         - become a hacker',
    '  rickroll     - :)',
    '  bsod         - blue screen of death',
    '  clear        - clear terminal',
    '  sudo rm -rf  - try it',
    '  sudo hire soham - :)',
    '',
  ],
  whoami: () => [
    'Soham Kolhe',
    '------------------------------',
    'CS student @ UW-Madison (\'28)',
    'AI/ML researcher across 3 labs',
    'Hackathon enthusiast (2 wins)',
    'Madison, WI',
  ],
  education: () => [
    'EDUCATION',
    '------------------------------',
    'University of Wisconsin--Madison',
    'BS Computer Science | Expected May 2028',
    '',
    'Awards:',
    '  * 1st Place -- US Cyber Challenge',
    '  * 1st Place -- CMU picoCTF',
    '  * Top 3%   -- USA Astronomy & Astrophysics Olympiad',
  ],
  experience: () => [
    'WORK EXPERIENCE',
    '------------------------------',
    '',
    '> Student Research Assistant        Feb 2026 -- Present',
    '  UW Dept of Surgery -- N+1 Institute',
    '  Building AI grant-writing tools with LLMs & RAG',
    '',
    '> Applied AI Researcher             Feb 2026 -- Present',
    '  UW Tech Exploration Lab',
    '  Workflow automation + document classifiers (BERT)',
    '',
    '> Undergraduate Researcher          Jul 2025 -- Present',
    '  Wisconsin Institute of Discovery -- Mura Lab',
    '  Crop detection AI for the USDA (93% accuracy)',
    '',
    '> Software Engineering Intern       May -- Aug 2024',
    '  Cledge',
    '  Java Spring Boot microservices, C++ optimization',
    '',
    '> Treasurer                         Feb 2026 -- Present',
    '  Cursor Campus Ambassador, UW-Madison',
  ],
  skills: () => [
    'SKILLS',
    '------------------------------',
    'Languages:  Python, JavaScript, TypeScript, Java, C++, SQL',
    'AI/ML:      PyTorch, TensorFlow, scikit-learn, XGBoost,',
    '            BERT, ONNX, RAG, LLMs',
    'Frameworks: React, Next.js, FastAPI, Spring Boot, Node.js',
    'Infra:      Docker, PostgreSQL, Git, AWS, GCP, Figma',
  ],
  projects: () => [
    'PROJECTS',
    '------------------------------',
    '',
    '> arcflow                       1st Place, MadData Hackathon',
    '  No-code AI pipeline builder on Qualcomm Snapdragon NPU',
    '',
    '> ScopeAI                       Best AI/ML, CalHacks',
    '  AI contract analysis -- 91% accuracy on gov contracts',
    '',
    '> USDA Crop Detection AI        WID -- Mura Lab',
    '  Satellite imagery analysis serving 500+ farmers',
    '',
    '> AI Grant-Writing Tool         UW Dept of Surgery',
    '  LLM + RAG for NIH proposal automation',
    '',
    '> Workflow Automation Engine     UW Tech Exploration Lab',
    '  BERT classifiers + XGBoost bottleneck prediction',
  ],
  awards: () => [
    'AWARDS & COMPETITIONS',
    '------------------------------',
    '  [*] 1st Place -- MadData Hackathon (Qualcomm Track)',
    '  [*] Best AI/ML Hack -- CalHacks (3,000+ participants)',
    '  [*] 1st Place -- US Cyber Challenge',
    '  [*] 1st Place -- CMU picoCTF',
    '  [*] Top 3% -- USA Astronomy & Astrophysics Olympiad',
  ],
  contact: () => [
    'CONTACT',
    '------------------------------',
    '  Email:    sohamkolhe26@gmail.com',
    '  GitHub:   github.com/soham74',
    '  LinkedIn: linkedin.com/in/soham-kolhe',
    '  Web:      soham-kolhe-portfolio.vercel.app',
  ],
  neofetch: () => [
    '',
    '    ██████╗ ██╗  ██╗    soham@portfolio',
    '   ██╔════╝ ██║ ██╔╝    -----------------',
    '   ╚█████╗  █████╔╝     OS:      Windows 95 (simulated)',
    '    ╚═══██╗ ██╔═██╗     Host:    UW-Madison',
    '   ██████╔╝ ██║  ██╗    Uptime:  since Jul 2025',
    '   ╚═════╝  ╚═╝  ╚═╝    Shell:   React 19 + Tailwind',
    '                        CPU:     caffeine-powered',
    '   ████████████████     Memory:  3 labs worth',
    '   ██  CS Student  ██     Disk:    5TB of satellite imagery',
    '   ████████████████     Theme:   Windows 95 Retro',
    '                        Awards:  5 (and counting)',
    '',
  ],
  'sudo rm -rf': () => [
    '',
    '  Nice try.',
    '',
    '  Permission denied: you are not root on this portfolio.',
    '  But I appreciate the energy.',
    '',
  ],
  'sudo hire soham': () => [
    '',
    '  ╔══════════════════════════════════════════════╗',
    '  ║         HIRING PROTOCOL INITIATED            ║',
    '  ╠══════════════════════════════════════════════╣',
    '  ║                                              ║',
    '  ║  [sudo] password for recruiter: ********     ║',
    '  ║  Authentication successful.                  ║',
    '  ║                                              ║',
    '  ║  Deploying Soham Kolhe to your team...       ║',
    '  ║  ████████████████████████████████ 100%       ║',
    '  ║                                              ║',
    '  ║  Status: READY TO DEPLOY                     ║',
    '  ║  Contact: sohamkolhe26@gmail.com              ║',
    '  ║  GitHub:  github.com/soham74                 ║',
    '  ║                                              ║',
    '  ║  Excellent choice. Your team will thank you. ║',
    '  ╚══════════════════════════════════════════════╝',
    '',
  ],
  sudo: () => [
    '',
    '  soham is not in the sudoers file.',
    '  This incident will be reported.',
    '',
  ],
  banner: () => ['', ...BANNER, ''],
  fortune: () => ['', FORTUNES[Math.floor(Math.random() * FORTUNES.length)], ''],
};

/* ================================================================== */
/*  BOOT SEQUENCE                                                     */
/* ================================================================== */
const BOOT_LINES = [
  'Microsoft(R) Windows 95',
  '   (C) Copyright Microsoft Corp 1981-1996.',
  '',
  'C:\\PORTFOLIO> loading soham_kolhe.exe ...',
  'Initializing neural networks.......... OK',
  'Loading 3 research labs............... OK',
  'Calibrating hackathon wins............ OK',
  '',
  'Welcome to Soham\'s terminal. Type "help" to get started.',
  '',
];

/* ================================================================== */
/*  MATRIX RAIN COMPONENT                                             */
/* ================================================================== */
const MatrixRain = ({ onDone }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.parentElement.clientWidth;
    const H = canvas.parentElement.clientHeight;
    canvas.width = W;
    canvas.height = H;

    const fontSize = 14;
    const cols = Math.floor(W / fontSize);
    const drops = Array(cols).fill(1);
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const id = setInterval(draw, 40);

    const stopHandler = (e) => {
      if (e.type === 'keydown' || e.type === 'click') {
        clearInterval(id);
        onDone();
      }
    };
    const timer = setTimeout(() => { clearInterval(id); onDone(); }, 8000);

    window.addEventListener('keydown', stopHandler);
    canvas.addEventListener('click', stopHandler);
    return () => {
      clearInterval(id);
      clearTimeout(timer);
      window.removeEventListener('keydown', stopHandler);
      canvas.removeEventListener('click', stopHandler);
    };
  }, [onDone]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, zIndex: 10, cursor: 'pointer' }}
    />
  );
};

/* ================================================================== */
/*  MAIN TERMINAL COMPONENT                                           */
/* ================================================================== */
const ResumeWindow = () => {
  const [lines, setLines] = useState(BOOT_LINES);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [cwd, setCwd] = useState('C:\\PORTFOLIO');
  const [theme, setTheme] = useState('green');
  const [showMatrix, setShowMatrix] = useState(false);
  const [hackRunning, setHackRunning] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const hackRef = useRef(null);

  const colors = THEMES[theme] || THEMES.green;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Cleanup hack interval on unmount
  useEffect(() => {
    return () => { if (hackRef.current) clearInterval(hackRef.current); };
  }, []);

  /* ---------- resolve path ---------- */
  const resolvePath = useCallback((arg) => {
    if (!arg) return cwd;
    if (arg === '..') {
      const parts = cwd.split('\\');
      if (parts.length <= 1) return 'C:\\';
      parts.pop();
      return parts.join('\\') || 'C:\\';
    }
    if (arg === '\\' || arg === '/') return 'C:\\';
    // absolute
    if (arg.match(/^[A-Z]:\\/i)) return arg.toUpperCase();
    return (cwd + '\\' + arg).toUpperCase();
  }, [cwd]);

  /* ---------- process command ---------- */
  const processCommand = useCallback((raw) => {
    const trimmed = raw.trim();
    const lower = trimmed.toLowerCase();
    const parts = trimmed.split(/\s+/);
    const cmd = parts[0]?.toLowerCase();
    const args = parts.slice(1).join(' ');

    // empty
    if (!trimmed) return [];

    // static
    if (lower.startsWith('sudo rm')) return STATIC_COMMANDS['sudo rm -rf']();
    if (lower === 'sudo hire soham') return STATIC_COMMANDS['sudo hire soham']();
    if (lower.startsWith('sudo')) return STATIC_COMMANDS['sudo']();
    if (STATIC_COMMANDS[lower]) return STATIC_COMMANDS[lower]();

    switch (cmd) {
      /* ---- theme ---- */
      case 'theme': {
        const t = args.toLowerCase();
        if (THEMES[t]) {
          setTheme(t);
          return [`Theme changed to "${t}".`];
        }
        return [`Unknown theme "${args}". Available: ${Object.keys(THEMES).join(', ')}`];
      }

      /* ---- ls / dir ---- */
      case 'ls':
      case 'dir': {
        const target = args ? resolvePath(args) : cwd;
        const node = FS[target];
        if (!node || node.type !== 'dir') return [`Directory not found: ${target}`];
        const heading = ` Directory of ${target}`;
        const entries = node.children.map(c => {
          const childPath = target + '\\' + c.toUpperCase();
          const isDir = FS[childPath] && FS[childPath].type === 'dir';
          return isDir ? `  <DIR>     ${c}` : `            ${c}`;
        });
        return ['', heading, '', ...entries, '', `  ${node.children.length} item(s)`, ''];
      }

      /* ---- cd ---- */
      case 'cd': {
        if (!args) return [cwd];
        const target = resolvePath(args);
        const node = FS[target];
        if (!node || node.type !== 'dir') return [`The system cannot find the path specified: ${args}`];
        setCwd(target);
        return [];
      }

      /* ---- cat / type ---- */
      case 'cat':
      case 'type': {
        if (!args) return ['Usage: cat <filename>'];
        const target = resolvePath(args);
        const node = FS[target];
        if (!node) return [`File not found: ${args}`];
        if (node.type === 'dir') return [`${args} is a directory, not a file. Use "ls" to list contents.`];
        return ['', ...node.content, ''];
      }

      /* ---- tree ---- */
      case 'tree': {
        const target = args ? resolvePath(args) : cwd;
        const node = FS[target];
        if (!node || node.type !== 'dir') return [`Not a directory: ${target}`];
        return ['', target, ...buildTree(target, ''), ''];
      }

      /* ---- history ---- */
      case 'history':
        if (cmdHistory.length === 0) return ['No commands in history.'];
        return ['', ...cmdHistory.map((c, i) => `  ${String(i + 1).padStart(4)}  ${c}`), ''];

      /* ---- cowsay ---- */
      case 'cowsay':
        return cowsay(args || 'moo');

      /* ---- ping ---- */
      case 'ping': {
        const host = args || 'localhost';
        const responses = [
          `Pinging ${host} with 32 bytes of data:`,
          '',
        ];
        for (let i = 0; i < 4; i++) {
          const ms = Math.floor(Math.random() * 50) + 1;
          responses.push(`Reply from ${host}: bytes=32 time=${ms}ms TTL=128`);
        }
        const times = Array.from({ length: 4 }, () => Math.floor(Math.random() * 50) + 1);
        const min = Math.min(...times);
        const max = Math.max(...times);
        const avg = Math.round(times.reduce((a, b) => a + b) / 4);
        responses.push('', `Ping statistics for ${host}:`,
          `    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)`,
          `    Minimum = ${min}ms, Maximum = ${max}ms, Average = ${avg}ms`);
        if (host.toLowerCase() === 'soham') {
          responses.push('', '  Status: currently caffeinated and coding.');
        }
        return responses;
      }

      /* ---- rickroll ---- */
      case 'rickroll':
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
        return ['', 'Never gonna give you up...', 'Never gonna let you down...', ''];

      /* ---- matrix ---- */
      case 'matrix':
        setShowMatrix(true);
        return ['Entering the Matrix... (press any key or click to exit)'];

      /* ---- bsod ---- */
      case 'bsod':
        window.dispatchEvent(new Event('triggerBSOD'));
        return ['', 'Triggering Blue Screen of Death...', ''];

      /* ---- hack ---- */
      case 'hack':
        return null; // handled specially

      /* ---- echo ---- */
      case 'echo':
        return [args || ''];

      /* ---- date ---- */
      case 'date':
        return [new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })];

      /* ---- time ---- */
      case 'time':
        return [new Date().toLocaleTimeString()];

      /* ---- whoami shortcut ---- */
      case 'man':
        return ['What manual page do you want?', 'Just kidding. Type "help" for available commands.'];

      /* ---- exit ---- */
      case 'exit':
        return ['Nice try. You can never leave.', '', 'Hotel California plays softly...'];

      /* ---- rm ---- */
      case 'rm':
        return ['Permission denied. This is a read-only portfolio.'];

      /* ---- unknown ---- */
      default:
        return [`'${trimmed}' is not recognized as an internal or external command.`, 'Type "help" for available commands.'];
    }
  }, [cwd, cmdHistory, resolvePath]);

  /* ---------- hack sequence ---------- */
  const runHack = useCallback(() => {
    setHackRunning(true);
    const hackLines = [
      '[*] Initializing exploit framework...',
      '[*] Scanning target: portfolio.soham.local',
      '[*] Port scan: 22/ssh 80/http 443/https 3000/react',
      '[*] Found: React 19 running on Node.js',
      '[+] Vulnerability found: excessive talent detected',
      '[*] Deploying payload: resume_reader.sh',
      '[*] Bypassing firewall.......',
      '    ░░░░░░░░░░░░░░░░░░░░ 0%',
      '    ████░░░░░░░░░░░░░░░░ 20%',
      '    ████████░░░░░░░░░░░░ 40%',
      '    ████████████░░░░░░░░ 60%',
      '    ████████████████░░░░ 80%',
      '    ████████████████████ 100%',
      '[+] Access granted!',
      '[*] Downloading secrets...',
      '',
      '    SECRET_1=loves_hackathons',
      '    SECRET_2=runs_on_caffeine',
      '    SECRET_3=mass_chaos_averted_daily',
      '',
      '[+] Hack complete. You\'re in.',
      '[*] Just kidding. But you should hire this guy.',
      '',
    ];
    let i = 0;
    hackRef.current = setInterval(() => {
      if (i < hackLines.length) {
        setLines(prev => [...prev, hackLines[i]]);
        i++;
      } else {
        clearInterval(hackRef.current);
        hackRef.current = null;
        setHackRunning(false);
      }
    }, 200);
  }, []);

  /* ---------- submit ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (hackRunning) return;

    const promptLine = `${cwd}> ${input}`;
    const trimmed = input.trim().toLowerCase();

    if (trimmed === 'clear') {
      setLines([]);
      setInput('');
      return;
    }

    const result = processCommand(input);

    if (result === null && trimmed === 'hack') {
      setLines(prev => [...prev, promptLine]);
      runHack();
    } else {
      setLines(prev => [...prev, promptLine, ...(result || []), '']);
    }

    if (input.trim()) {
      setCmdHistory(prev => [...prev, input.trim()]);
    }
    setHistoryIdx(-1);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const next = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(next);
        setInput(cmdHistory[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx >= 0 && historyIdx < cmdHistory.length - 1) {
        const next = historyIdx + 1;
        setHistoryIdx(next);
        setInput(cmdHistory[next]);
      } else {
        setHistoryIdx(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Basic tab completion for files/dirs in cwd
      const partial = input.trim().split(/\s+/);
      const lastWord = partial[partial.length - 1]?.toUpperCase();
      if (lastWord) {
        const node = FS[cwd];
        if (node && node.type === 'dir') {
          const match = node.children.find(c => c.toUpperCase().startsWith(lastWord));
          if (match) {
            partial[partial.length - 1] = match;
            setInput(partial.join(' '));
          }
        }
      }
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      onClick={handleContainerClick}
      style={{
        height: '100%',
        background: colors.bg,
        color: colors.fg,
        fontFamily: '"Courier New", Consolas, monospace',
        fontSize: 13,
        padding: 12,
        overflow: 'auto',
        cursor: 'text',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {showMatrix && <MatrixRain onDone={() => setShowMatrix(false)} />}
      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {lines.map((line, i) => (
          <div key={i} style={{ minHeight: '1.3em', whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>
            {line}
          </div>
        ))}
        {!hackRunning && (
          <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
            <span>{cwd}&gt;&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: colors.fg,
                fontFamily: '"Courier New", Consolas, monospace',
                fontSize: 13,
                padding: 0,
                caretColor: colors.caret,
              }}
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ResumeWindow;
