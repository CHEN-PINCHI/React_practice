import React, { useState, useEffect, useRef } from 'react';
import educationList from '../constants/educationList';
import salaryList from '../constants/salaryList';
import jobList from '../constants/jobList';

import WorkFilter from './WorkFilter';
import WorkList from './WorkList';
import WorkModal from './WorkModal';
import Pagination from './Pagination';

const Work = () => {
  const [inputFilters, setInputFilters] = useState({ companyName: '', education: '', salary: '' });
  const [filters, setFilters] = useState({ companyName: '', education: '', salary: '' });
  const [fadeState, setFadeState] = useState('fade-in');
  const [pageFadeState, setPageFadeState] = useState('fade-in');
  const [modalJob, setModalJob] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth < 769 ? 4 : 6);
  const [isCompactPage, setIsCompactPage] = useState(window.innerWidth < 769);
  const workBoxRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 769 ? 4 : 6);
      setIsCompactPage(window.innerWidth < 769);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 篩選邏輯
  const handleSearch = () => {
    setFadeState('fade-out');
    setPageFadeState('fade-out');
    setTimeout(() => {
      setFilters(inputFilters);
      setCurrentPage(1);
      setFadeState('fade-in');
      setPageFadeState('fade-in');
    }, 300);
  };

  // 教育與薪水轉換
  const getEducationLabel = (id) => educationList.find((i) => i.id === id)?.label || '未指定';
  const getSalaryLabel = (id) => salaryList.find((i) => i.id === id)?.label || '未指定';

  // 過濾與分頁
  const filteredJobs = jobList.filter((job) => {
    const matchCompany = !filters.companyName || job.companyName.toLowerCase().includes(filters.companyName.toLowerCase());
    const matchEducation = !filters.education || getEducationLabel(job.educationId) === filters.education;
    const matchSalary = !filters.salary || getSalaryLabel(job.salaryId) === filters.salary;
    return matchCompany && matchEducation && matchSalary;
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const currentJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setFadeState('fade-out');
    setTimeout(() => {
      setCurrentPage(page);
      setFadeState('fade-in');
      workBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  return (
    <div className="workArea">
      <div className="wrap">
        <div className="workBox" ref={workBoxRef}>
          <h1 className="title">適合前端工程師的好工作</h1>

          <WorkFilter
            inputFilters={inputFilters}
            setInputFilters={setInputFilters}
            educationList={educationList}
            salaryList={salaryList}
            onSearch={handleSearch}
          />

          <WorkList
            fadeState={fadeState}
            jobs={currentJobs}
            getEducationLabel={getEducationLabel}
            getSalaryLabel={getSalaryLabel}
            setModalJob={setModalJob}
          />

          <WorkModal
            modalJob={modalJob}
            setModalJob={setModalJob}
          />

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              isCompactPage={isCompactPage}
              fadeState={pageFadeState}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Work;
