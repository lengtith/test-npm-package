import React from 'react';
import { Card, CardBody, Icon } from "../../../components";
import { LevelIndicator } from './LevelIndicator';

type CardCourseProps = {
  id?: string;
  name: string;
  imageUrl: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  lesson: string;
  subject: string;
  onClick?: () => void;
};

const CardCourse: React.FC<CardCourseProps> = ({
  name,
  imageUrl,
  level,
  duration,
  lesson,
  subject,
  onClick
}) => {
  return (
    <>
      <Card
        className="flex-grow w-full rounded-xl overflow-hidden hover:shadow-lg bg-slate-50 p-4"
        onClick={onClick}
      >
        <img
          className="h-[150px] p-3 rounded-[30px] w-full object-cover"
          src={
            imageUrl ||
            "https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"
          }
          alt={name}
        />

        <CardBody className="w-full px-4">
          <h3 className="font-semibold text-xl capitalize mb-2.5 truncate">
            {name}
          </h3>

          <div className="flex gap-2.5 items-center mb-2.5">
            <p className="capitalize text-sm">{level}</p>
            <LevelIndicator level={level} />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2.5 items-center">
              <p className="text-gray-700 text-sm flex items-center">
                <Icon icon="document-text" className="w-4 h-4" />
                <span>{lesson} {parseInt(lesson) > 1 ? "lessons" : "lesson"}</span>
              </p>

              <p className="text-gray-700 text-sm flex items-center">
                <Icon icon="clock" className="w-4 h-4" />
                <span>{duration}</span>
              </p>
            </div>
            <div>
              <p className="text-sm">{subject}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export { CardCourse };