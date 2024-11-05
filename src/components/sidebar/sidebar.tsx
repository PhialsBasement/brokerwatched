import React from 'react';
import './Sidebar.css'; // This imports the CSS for styling

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-item" id='minlogo'><i className="home-icon"></i></div>
            <div className="sidebar-item"><i className="time-icon"></i></div>
            <div className="sidebar-item"><i className="case-icon"></i></div>
            <div className="sidebar-item"><i className="money-icon"></i></div>
            <div className="sidebar-item"><i className="arrow-icon"></i></div>
            <div className="sidebar-item"><i className="arr-icon"></i></div>
        </div>
    );
}

export default Sidebar;
