import React, { useEffect, useState } from 'react';
import { formatCourseData } from './formatCourseData';
import { DataCatalog } from '../catalog';
import TableLayout from './TableLayout';
import FilterSubject from './FilterSubject';
import FilterLevel from './FilterLevel';
import CardLayout from './CardLayout';
import { courses } from './CourseData'

interface SortData {
    field: string;
    sort: null | 'ASC' | 'DESC';
}

const renderTableLayout = (
    data: any[],
    loading: boolean,
    onSort: (sortData: SortData) => void,
    onItemClick: (itemData: any) => void
) => {
    return (
        <TableLayout
            rows={data}
            loading={loading}
            onSort={onSort}
            onRowClick={onItemClick}
        />
    );
};

const renderCardLayout = (data: any[], loading: boolean) => {
    return <CardLayout data={data} loading={loading} />;
};

const renderFilterSubject = (onChange: (value: string) => void) => {
    return <FilterSubject onChange={onChange} />;
};

const renderFilterLevel = (onChange: (value: string) => void) => {
    return <FilterLevel onChange={onChange} />;
};

const filters = [
    { name: 'subject', component: renderFilterSubject },
    { name: 'level', component: renderFilterLevel },
];

const CourseDataCatalog: React.FC = () => {
    const [courseData, setCourseData] = useState<any[]>([]);
    const [isLoadingFetch, setIsLoadingFetch] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [nextToken, setNextToken] = useState<string | null>(null);
    const [filter, setFilter] = useState({
        level: '',
        subject: '',
    });
    const [sort, setSort] = useState<SortData>({
        field: '',
        sort: null,
    });

    useEffect(() => {
        setCourseData([]);
        setNextToken(null);
        fetchData();
    }, [filter, sort]);

    const handleFetchMoreData = () => {
        if (nextToken !== null && !isLoadingFetch) {
            fetchData(nextToken);
        }
    };

    const handleFilter = (filterData: { name: string; value: string }) => {
        setFilter((prev) => ({
            ...prev,
            [filterData.name]: filterData.value,
        }));
    };

    const handleSort = (sort: SortData) => {
        setSort(sort);
    };

    const fetchData = async (nextToken: string | null = null) => {
        try {
            setIsLoading(true);
            const formattedCourses = formatCourseData(courses);
            setCourseData((prev) => [...prev, ...formattedCourses]);
            setIsLoading(false);
        } catch (error) {
            setError('Error fetching course data: ' + error);
            setIsLoadingFetch(false);
            setIsLoading(false);
        }
    };

    return (
        <div>
            <DataCatalog
                data={courseData}
                loading={isLoading}
                onSort={handleSort}
                onFilter={handleFilter}
                onScroll={() => { }}
                onItemClick={() => { }}
                filters={filters}
                layouts={[
                    {
                        name: 'list',
                        viewAs: renderTableLayout,
                        iconName: 'list',
                    },
                    {
                        name: 'item',
                        viewAs: renderCardLayout,
                        iconName: 'item',
                    },
                ]}
                onFetchMoreData={handleFetchMoreData}
            />
        </div>
    );
};

export { CourseDataCatalog };
