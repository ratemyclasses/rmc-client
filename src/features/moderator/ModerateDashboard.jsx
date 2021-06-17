import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { Navbar } from '../../common/Navbar';
import { SearchFilters } from '../dashboard/SearchFilters';
import { ReviewCard } from './ReviewCard';
import { ReviewList } from './ReviewList';

export function ModerateDashboard() {
  const { path } = useRouteMatch();

  return (
    <div>
      <Navbar moderate />
      <SearchFilters />
      <div className="flex items-start justify-between">
        <div className="hidden sm:block w-full border-r border-gray-200 sm:w-64 lg:w-96">
          <ReviewList />
        </div>
        <div className="block w-full sm:w-full sm:block bg-white">
          <Route path={`${path}/:reviewId`} component={ReviewCard} />
        </div>
      </div>
    </div>
  );
}
