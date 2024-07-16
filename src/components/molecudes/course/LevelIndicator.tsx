import React from 'react';

type LevelIndicatorProps = {
    level: 'Beginner' | 'Intermediate' | 'Advanced';
};

const LevelIndicator: React.FC<LevelIndicatorProps> = ({ level }) => {
    const levelToDots = {
        'Beginner': [true, false, false],
        'Intermediate': [true, true, false],
        'Advanced': [true, true, true]
    };

    // Determine the number of active dots based on the level
    const dots = levelToDots[level];

    return (
        <div className='flex gap-1'>
            {dots.map((isActive, index) => (
                <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-800' : 'bg-gray-200'}`}
                />
            ))}
        </div>
    );
};

export { LevelIndicator };