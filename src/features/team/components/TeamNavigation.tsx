import type { TeamMember } from '../types/team';

interface TeamNavigationProps {
  members: TeamMember[];
  selectedMemberId: string;
  onSelect: (id: string) => void;
}

export function TeamNavigation({ members, selectedMemberId, onSelect }: TeamNavigationProps) {
  return (
    <nav className="team-navigation" aria-label="Choose a team member">
      {members.map((member, index) => (
        <button
          className={member.id === selectedMemberId ? 'team-navigation__button is-active' : 'team-navigation__button'}
          key={member.id}
          type="button"
          aria-pressed={member.id === selectedMemberId}
          onClick={() => onSelect(member.id)}
        >
          <span className="team-navigation__index">0{index + 1}</span>
          <span className="team-navigation__name">{member.name}</span>
          <span className="team-navigation__dot" style={{ backgroundColor: member.accentColor }} aria-hidden="true" />
        </button>
      ))}
    </nav>
  );
}
