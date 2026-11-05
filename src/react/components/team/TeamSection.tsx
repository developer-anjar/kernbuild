import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TEAM_DATA } from '../../data/team';
import { TeamNavigation } from './TeamNavigation';
import { TeamNetwork } from './TeamNetwork';
import { TeamProfile } from './TeamProfile';
import './TeamSection.css';

export function TeamSection() {
  const [selectedMemberId, setSelectedMemberId] = useState(TEAM_DATA[0]?.id ?? '');
  const selectedMember = TEAM_DATA.find(member => member.id === selectedMemberId) ?? TEAM_DATA[0];
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = prefersReducedMotion ?? false;

  return (
    <section className="section team-section" id="team">
      <div className="container">
        <motion.header
          className="section-heading team-section__heading"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">The people behind KernBuild</p>
          <h2>Small team. Thoughtful work. Big ideas.</h2>
          <p>Four founders bringing engineering, design, and strategy together to build meaningful digital products.</p>
        </motion.header>

        {selectedMember && (
          <>
            <div className="team-experience">
              <motion.div
                className="team-network-wrap"
                initial={reducedMotion ? false : { opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.75, delay: reducedMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <TeamNetwork
                  members={TEAM_DATA}
                  selectedMemberId={selectedMember.id}
                  onSelect={setSelectedMemberId}
                  reducedMotion={reducedMotion}
                />
              </motion.div>
              <TeamProfile member={selectedMember} reducedMotion={reducedMotion} />
            </div>
            <TeamNavigation
              members={TEAM_DATA}
              selectedMemberId={selectedMember.id}
              onSelect={setSelectedMemberId}
            />
          </>
        )}
      </div>
    </section>
  );
}
