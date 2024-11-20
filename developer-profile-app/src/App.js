import "./App.css";
import "./styles.css";

function App() {
  let skillset = [
    { tech: "java", level: "advanced", color: "silver" },
    { tech: "javascript", level: "begineer", color: "pink" },
    { tech: "springboot", level: "advanced", color: "yellow" },
    { tech: "react", level: "intermediate", color: "orange" },
  ];
  return (
    <div className="card">
      <Avatar imgfile="./devloperphoto.jpg" />
      <AvatarInfo
        devlprname="Shiva Ram Krishna"
        description="Full Stack Developer with 5 years of Experience, loves to travel and is a foodie."
      />
      <div className="skill-list">
        <SkillSet skills={skillset} />
      </div>
    </div>
  );
}

function Avatar(props) {
  return (
    <div>
      <img className="avatar" src={props.imgfile} alt="dev_photo" />
    </div>
  );
}

function AvatarInfo(props) {
  return (
    <div>
      <h1>{props.devlprname}</h1>
      <div className="data">{props.description}</div>
    </div>
  );
}

function SkillSet(props) {
  return (
    <div className="skill-list">
      {props.skills.map((skill) => (
        <div className="skill" style={{ backgroundColor: skill.color }}>
          <span>{skill.tech}</span>
          <span>
            {skill.level === "begineer"
              ? "🌱"
              : skill.level === "intermediate"
              ? "🌟"
              : "💪🏼"}
          </span>
        </div>
      ))}
    </div>
  );
}

export default App;
