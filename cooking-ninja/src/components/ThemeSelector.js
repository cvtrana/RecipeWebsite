import "./ThemeSelector.css";
import modeIcon from "../assets/mode-icon.svg";
import { useTheme } from "../hooks/useTheme";
const themecolors = ["#58249c", "#249c6b", "#b70233"];
export default function ThemeSelector() {
  const { changecolor, changeMode, mode } = useTheme();

  const toggleMode = () => {
    changeMode(mode === 'dark' ? 'light' : 'dark');
  };
  console.log(mode)
  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img 
        onClick={toggleMode}
        src={modeIcon} alt = "changeMode" 
        style={{filter  :mode==='dark' ? 'invert(100%)' : 'invert(20%)'}}
         />
      </div>
      <div className="theme-buttons">
        {themecolors.map((color) => (
          <div
            key={color}
            onClick={() => changecolor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
}
