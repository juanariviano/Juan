import React from "react";
import "../style/tailwind.css";

const About = () => {
  const skill = ["Javascript", "Python", "C", "React.js"];
  const listSkill = skill.map((skill) => <li>{skill}</li>);
  return (
    <div className="col-span-4 max-xl:col-span-5">
      <div className="flex flex-col gap-1 mb-10">
        <p>
          I am currently pursuing a degree in Computer Science at Binus
          University, where I am deepening my understanding of software
          engineering principles and practices. My academic journey has provided
          me with a solid foundation in various programming languages and
          technologies. Throughout my studies, I have gained hands-on experience
          with a diverse set of tools and frameworks. Some of the key
          technologies I have been working with include:
        </p>
        <ul className="list-decimal ml-[26px]">{listSkill}</ul>
      </div>
    </div>
  );
};

export default About;
