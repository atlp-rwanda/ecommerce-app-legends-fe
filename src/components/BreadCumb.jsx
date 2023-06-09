import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const BreadCumb = ({ crumbs }) => {
  const { t } = useTranslation();
  console.log('crumb', crumbs);
  return (
    <div>
      <nav className="items-center justify-between bg-gray-900 p-4 mb-8 rounded shadow">
        <div className="flex items-center space-x-2">
          <NavLink
            to="/dashboard"
            className="text-gray-500 hover:text-gray-700"
          >
            {t('home')}
          </NavLink>
          {crumbs &&
            crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;
              return (
                <React.Fragment key={crumb.text}>
                  <span className="text-gray-500">/</span>
                  <NavLink
                    to={crumb.path}
                    className={`${
                      isLast
                        ? 'font-bold text-whiteColor'
                        : 'text-whiteColor hover:text-gray-400'
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
