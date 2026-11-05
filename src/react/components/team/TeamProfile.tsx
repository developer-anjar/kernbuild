import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { TeamMember } from '../../types/team';

interface TeamProfileProps {
  member: TeamMember;
  reducedMotion: boolean;
}

function getInitials(name: string) {
  return name.split(/\s+/).map(part => part[0]).join('').slice(0, 2);
}

export function TeamProfile({ member, reducedMotion }: TeamProfileProps) {
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const socialLinks = [
    { label: 'LinkedIn', href: member.socialLinks.linkedin },
    { label: 'GitHub', href: member.socialLinks.github },
    { label: 'Instagram', href: member.socialLinks.instagram },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));

  useEffect(() => {
    setImageUnavailable(false);
  }, [member.id, member.profileImage]);

  return (
    <div className="team-profile-slot" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          key={member.id}
          className="team-profile"
          style={{ '--team-accent': member.accentColor } as CSSProperties}
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="team-profile__eyebrow"><span aria-hidden="true" /> Founding team</div>
          <div className="team-profile__identity">
            <div className="team-profile__portrait">
              {member.profileImage !== '/images/team/placeholder-avatar.svg' && !imageUnavailable ? (
                <img
                  src={member.profileImage}
                  alt={member.name}
                  onError={() => setImageUnavailable(true)}
                />
              ) : (
                <span aria-hidden="true">{getInitials(member.name)}</span>
              )}
            </div>
            <div>
              <p className="team-profile__designation">{member.designation}</p>
              <h3>{member.name}</h3>
              <p className="team-profile__title">{member.title}</p>
            </div>
          </div>

          <div className="team-profile__divider" />
          <div className="team-profile__skills">
            <h4>Areas of focus</h4>
            <ul>
              {member.skills.map(skill => <li key={skill}>{skill}</li>)}
            </ul>
          </div>

          {socialLinks.length > 0 && (
            <div className="team-profile__socials">
              {socialLinks.map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}<span aria-hidden="true"> ↗</span>
                </a>
              ))}
            </div>
          )}
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
