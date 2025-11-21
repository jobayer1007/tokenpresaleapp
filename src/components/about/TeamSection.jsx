import kevin from 'assets/images/team/kevin.png';
import derek from 'assets/images/team/derek.png';
import ajay from 'assets/images/team/ajay.png';
import vladimir from 'assets/images/team/vladimir.png';
import bhumish from 'assets/images/team/bhumish.png';
import gow from 'assets/images/team/gow.png';

const members = [
  {
    name: 'Kevin Smith',
    title: 'CEO',
    avatar: kevin,
    bio: 'Co-founder steering vision, go-to-market, and community growth for ELO.',
  },
  {
    name: 'Derek Smith',
    title: 'Manager Development & Testing',
    avatar: derek,
    bio: 'Leads engineering quality and release readiness across smart contracts and UI.',
  },
  {
    name: 'Ajay Jain',
    title: 'Web Development Manager',
    avatar: ajay,
    bio: 'Owns the front-end experience and shipping responsive product flows.',
  },
  {
    name: 'Vladimir Urosevic',
    title: 'Restaurant Support Manager',
    avatar: vladimir,
    bio: 'Connects merchant operations with the reward stack so partners succeed.',
  },
  {
    name: 'Bhumish Shaw',
    title: 'Server Administration Manager',
    avatar: bhumish,
    bio: 'Keeps infrastructure reliable and secure through every release.',
  },
  {
    name: 'Gow Patel',
    title: 'Mobile Development Manager',
    avatar: gow,
    bio: 'Bringing ELO to mobile with native experiences and push-to-earn moments.',
  },
];

const TeamSection = () => {
  return (
    <section className="border-t border-ink/5 bg-surface py-16">
      <div className="section-shell">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Team</p>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">People behind ELO</h2>
          <p className="max-w-2xl text-base text-ink/70">
            Operators, engineers, and designers focused on turning everyday orders into lasting
            rewards.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div key={member.name} className="card space-y-3 bg-white">
              <div className="flex items-center gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-14 w-14 rounded-full border border-ink/10 object-cover"
                />
                <div>
                  <p className="text-base font-semibold text-ink">{member.name}</p>
                  <p className="text-sm font-semibold text-primary">{member.title}</p>
                </div>
              </div>
              <p className="text-sm text-ink/70">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
