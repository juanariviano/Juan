import React from "react";
import { projectapps } from "../data/projectapps";
import { getImageUrl } from "../utils/utils";

const Project = () => {
  return projectapps.map((data) => (
    <div className="mb-10 max-md:col-span-3 max-md:mb-2">
      <img src={getImageUrl(data.id)} alt="projcet-image" />
      <p className="text-gray-400 mt-2">{data.tech.join(", ")}</p>
      <h3 className="font-bold">{data.name}</h3>
      <p>{data.description}</p>
      <div className="flex gap-3">
        <a
          href={data.github}
          className="text-blue-900 underline dark:text-blue-600"
        >
          GitHub
        </a>
        {data.deploy !== "none" ? (
          <a
            href={data.deploy}
            className="text-blue-900 underline dark:text-blue-600"
          >
            UI
          </a>
        ) : null}
      </div>
    </div>
  ));
};

export default Project;
