
import React from 'react';
import Link from 'next/link';
import '../../components/styles/ViewAllVoters.css';

const ViewAllVoters = () => {
  return (
    <div className="view-all-voters-container">
      <h1 className="title">View All Voters</h1>
      <p className="description">List of all voters will be displayed here.</p>
      <Link href="/components/view-voter">
        <button className="button">View Voter</button>
      </Link>
    </div>
  );
};

export default ViewAllVoters;
