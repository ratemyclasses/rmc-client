import React from 'react';
import { SearchField } from './SearchField';
import { Universities } from './Universities';

export function LandingContents() {
  return (
    <div className="text-center mt-20">
      <SearchField />
      <Universities />
    </div>
  );
}
