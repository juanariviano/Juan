import React from "react";
import "../style/tailwind.css";

const Experience = () => {
  return (
    <div className="col-span-4 max-xl:col-span-5">
      <div className="flex flex-col gap-1 mb-10">
        <div>
          <h3 className="font-semibold">
            Web Development Coordinator - TECHFEST HIMTI BINUS University
          </h3>
          <ul className="list-disc ml-[26px]">
            <li>
              I led the web development team to build a user-friendly and
              responsive website for TECHFEST 2024, using HTML, CSS, and
              JavaScript. I made sure the website worked well on all devices and
              had interactive features to help participants.
            </li>
            <li>
              I managed the team, worked with other departments to understand
              their needs, and made sure we finished the project on time. This
              role helped me improve my leadership, teamwork, and technical
              skills.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Experience;
