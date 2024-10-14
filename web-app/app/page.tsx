
import Sidebar from '../components/sidebar'
import HomePage from '../components/homepage'
import RegisterVoter from '../components/register-voter'
import CastVote from '../components/cast-vote'
import TallyVotes from '../components/tally-votes'
import CandidateInfo from '../components/candidate-info'

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <section id="home">
          <HomePage />
        </section>
      </div>
    </div>
  )
}
