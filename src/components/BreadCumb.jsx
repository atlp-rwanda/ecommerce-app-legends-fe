import React from 'react';
import { NavLink } from 'react-router-dom';

const BreadCumb = ({ crumbs }) => {
  return (
    <div>
      <nav className="items-center justify-between bg-gray-900 p-4 mb-8 rounded shadow">
        <div className="flex items-center space-x-2">
          <NavLink
            to="/dashboard"
            className="text-gray-500 hover:text-gray-700"
          >
            Home
          </NavLink>
          {crumbs &&
            crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;
              return (
                <React.Fragment key={crumb.text}>
                  <span className="text-gray-700">/</span>
                  <NavLink
                    to={crumb.path}
                    className={`${
                      isLast
                        ? 'font-bold text-gray-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {crumb.text}
                  </NavLink>
                </React.Fragment>
              );
            })}
        </div>
      </nav>
    </div>
  );
};

export default BreadCumb;
