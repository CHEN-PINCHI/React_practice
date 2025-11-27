import React from 'react';
import InfoJobTitle from '../images/Info-JobTitle.png';
import InfoEducation from '../images/Info-Education.png';
import InfoSalary from '../images/Info-Salary.png';

const WorkList = ({ fadeState, jobs, getEducationLabel, getSalaryLabel, setModalJob }) => {
  if (jobs.length === 0) return <div className={`noData ${fadeState}`}>無資料</div>;

  return (
    <div className={`workList ${fadeState}`}>
      {jobs.map((job, index) => (
        <div className="workItem" key={index}>
          <div className="item">
            <div className="companyName">{job.companyName}</div>
            <div className="infoList">
              <div className="infoItem jobTitle">
                <img src={InfoJobTitle} alt="Job Title" />
                <div className="info">{job.jobTitle}</div>
              </div>
              <div className="infoItem education">
                <img src={InfoEducation} alt="Education" />
                <div className="info">{getEducationLabel(job.educationId)}</div>
              </div>
              <div className="infoItem salary">
                <img src={InfoSalary} alt="Salary" />
                <div className="info">{getSalaryLabel(job.salaryId)}</div>
              </div>
            </div>
            <div className="preview">{job.preview}</div>
            <button type="button" className="description" onClick={() => setModalJob(job)}>
              查看細節
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkList;
