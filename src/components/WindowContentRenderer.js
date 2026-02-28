import React from 'react';
import ProjectsWindow from './windows/ProjectsWindow';
import ResumeWindow from './windows/ResumeWindow';
import AboutWindow from './windows/AboutWindow';
import ContactWindow from './windows/ContactWindow';
import SkillsWindow from './windows/SkillsWindow';
import GamesWindow from './windows/GamesWindow';
import SettingsWindow from './windows/SettingsWindow';
import RecycleBinWindow from './windows/RecycleBinWindow';
import MusicPlayerWindow from './windows/MusicPlayerWindow';
import NotepadWindow from './windows/NotepadWindow';
import ExplorerWindow from './windows/ExplorerWindow';
import SnakeGame from './windows/games/SnakeGame';
import MinesweeperGame from './windows/games/MinesweeperGame';
import TetrisGame from './windows/games/TetrisGame';
import PongGame from './windows/games/PongGame';
import Game2048 from './windows/games/Game2048';
import BreakoutGame from './windows/games/BreakoutGame';
import MemoryGame from './windows/games/MemoryGame';
import GomokuGame from './windows/games/GomokuGame';
import LightsOutGame from './windows/games/LightsOutGame';

const WindowContentRenderer = ({ component }) => {
  switch (component) {
    case 'ProjectsWindow':
      return <ProjectsWindow />;
    case 'ResumeWindow':
      return <ResumeWindow />;
    case 'AboutWindow':
      return <AboutWindow />;
    case 'ContactWindow':
      return <ContactWindow />;
    case 'SkillsWindow':
      return <SkillsWindow />;
    case 'GamesWindow':
      return <GamesWindow />;
    case 'SettingsWindow':
      return <SettingsWindow />;
    case 'RecycleBinWindow':
      return <RecycleBinWindow />;
    case 'MusicPlayerWindow':
      return <MusicPlayerWindow />;
    case 'NotepadWindow':
      return <NotepadWindow />;
    case 'ExplorerWindow':
      return <ExplorerWindow />;
    case 'SnakeGame':
      return <SnakeGame />;
    case 'MinesweeperGame':
      return <MinesweeperGame />;
    case 'TetrisGame':
      return <TetrisGame />;
    case 'PongGame':
      return <PongGame />;
    case 'Game2048':
      return <Game2048 />;
    case 'BreakoutGame':
      return <BreakoutGame />;
    case 'MemoryGame':
      return <MemoryGame />;
    case 'GomokuGame':
      return <GomokuGame />;
    case 'LightsOutGame':
      return <LightsOutGame />;
    default:
      return (
        <div>
          <h3>Unknown Window Type</h3>
          <p>The requested window content could not be found.</p>
        </div>
      );
  }
};

export default WindowContentRenderer;
