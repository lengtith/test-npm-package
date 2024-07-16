import React from "react";
import { Typography } from "../../atoms";
import { Card, CardBody, Icon } from "../../../components";

interface CardMaterialProps {
  material: {
    filetype: string;
    thumbnailUrl?: string;
    title: string;
  };
  onClick?: () => void;
}

const IconType: { [key: string]: string } = {
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "word",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "excel",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "power-point",
  "application/pdf": "pdf",
  "image/png": "image",
  "image/jpg": "image",
  "image/jpeg": "image",
  "application/mp4": "mp4",
};

const CardMaterial: React.FC<CardMaterialProps> = ({ material, onClick }) => {
  const placeholderImage = "https://www.tundralodge.com/integration/tc-theme/public/img/placeholder_4_3.png";
  const icon = IconType[material.filetype] || "file";

  return (
    <div>
      <Card
        className="max-w-xs w-full rounded-3xl overflow-hidden shadow-lg"
        onClick={onClick}
      >
        <div className="relative">
          <img
            className="h-[130px] px-3 pt-3 rounded-2xl w-full object-cover"
            src={material.thumbnailUrl || placeholderImage}
            alt={material.title}
          />
          <div className="absolute w-10 h-10 left-5 -bottom-5 flex items-center justify-center border-2 border-white bg-blue-900 rounded-full">
            <Icon icon={icon} className="w-6 h-6" />
          </div>
        </div>
        <CardBody className="w-full h-full">
          <Typography fontSize="base" className="mt-2 truncate">
            {material.title}
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export { CardMaterial };
