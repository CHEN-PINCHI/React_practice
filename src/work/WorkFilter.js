import React from 'react';

const WorkFilter = ({ inputFilters, setInputFilters, educationList, salaryList, onSearch }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e) => e.key === 'Enter' && onSearch();

  return (
    <div className="filterBox">
      <div className="filterList">
        <div className="filterItem company">
          <label htmlFor="companyName">公司名稱</label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            placeholder="請輸入公司名稱"
            value={inputFilters.companyName}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="filterItem education">
          <label htmlFor="education">教育程度</label>
          <select id="education" name="education" value={inputFilters.education} onChange={handleChange}>
            <option value="">不限</option>
            {educationList.map((item) => (
              <option key={item.id} value={item.label}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className="filterItem salary">
          <label htmlFor="salary">薪水範圍</label>
          <select id="salary" name="salary" value={inputFilters.salary} onChange={handleChange}>
            <option value="">不限</option>
            {salaryList.map((item) => (
              <option key={item.id} value={item.label}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className="filterItem search">
          <button type="button" onClick={onSearch}>條件搜尋</button>
        </div>
      </div>
    </div>
  );
};

export default WorkFilter;
