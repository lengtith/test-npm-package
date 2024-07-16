import React from 'react'
import { CardCourse, Empty } from "../../../components";

type Course = {
  id: string;
  courseTitle: {
    title: string;
    thumbnail: string;
  };
  subject: string;
  duration: string;
  lesson: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
};

type CourseProps = {
  data: Course[];
  loading: boolean;
};

const CardList: React.FC<CourseProps> = ({ data, loading }) => {

  // Data is loaded but empty
  if (!loading && data.length === 0) {
    return (
      <>
        <Empty />
      </>
    );
  }

  return (
    <div className='px-8'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(item => (
          <CardCourse
            key={item.id}
            name={item.courseTitle.title}
            imageUrl={item.courseTitle.thumbnail}
            lesson={item.lesson}
            level={item.level}
            duration={item.duration}
            subject={item.subject}
          />
        ))}

        {/* Skeleton loading */}
        {loading ? (

          [...Array(4)].map((_, index) => (

            <div key={index} className="w-full rounded-xl overflow-hidden hover:shadow-lg bg-slate-50 p-4">

              <div className="animate-pulse bg-gray-300 w-full h-40 rounded-xl mb-4"></div>

              <div className="px-4">
                <div className="animate-pulse bg-gray-300 w-2/3 h-5 mb-2.5 rounded-xl"></div>

                <div className='animate-pulse bg-gray-300 w-1/3 h-3 mb-2.5 rounded-xl'></div>

                <div className='flex justify-between items-center'>
                  <div className='flex gap-2.5 items-center w-3/6'>
                    <div className='animate-pulse bg-gray-300 w-1/2 h-3 rounded-xl'></div>
                    <div className='animate-pulse bg-gray-300 w-1/2 h-3 rounded-xl'></div>
                  </div>
                  <div className='animate-pulse bg-gray-300 w-2/6 h-3 rounded-xl'>
                  </div>
                </div>
              </div>
            </div>
          ))

        ) : ""}
      </div>
    </div>
  )
}

export default CardList