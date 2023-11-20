import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div>
            <div className="tabs">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`tab ${index === activeTab ? 'active' : ''}`}
                        onClick={() => handleTabClick(index)}
                    >
                        <Link to={tab.link}>{tab.label}</Link>
                    </div>
                ))}
            </div>
            <div className="tab-content">{tabs[activeTab].content}</div>
        </div>
    );
};

export default Tabs;
