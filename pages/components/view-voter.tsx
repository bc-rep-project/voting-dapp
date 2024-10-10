
import React from 'react';
import Link from 'next/link';
import '../../components/styles/ViewVoter.css';

const ViewVoter = () => {
  return (
    <div className="view-voter-container">
      <h1 className="title">View Voter</h1>
      <p className="description">Details of the voter will be displayed here.</p>
      <Link href="/components/view-all-voters">
        <button className="button">Back to All Voters</button>
      </Link>
    </div>
  );
};

export default ViewVoter;
