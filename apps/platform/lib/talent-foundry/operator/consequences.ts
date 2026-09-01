import { shiftMission } from '../campaigns/operator/shift';
import { assignedTo, assignmentsFor, unusedPeople } from './engine';
import type { OperatorMissionDef, OperatorOutcome, OperatorRunState, OperatorWorld } from './types';

function actorName(id: string, mission: OperatorMissionDef): string {
  return mission.people.find((p) => p.id === id)?.name ?? id;
}

function needLabel(id: string, mission: OperatorMissionDef): string {
  return mission.needs.find((n) => n.id === id)?.label ?? id;
}

export function deriveWorld(
  run: OperatorRunState,
  mission: OperatorMissionDef = shiftMission,
  clock: 'open' | 'waveOne' | 'waveTwo' | 'finale' = 'open',
): OperatorWorld {
  const office = assignedTo(run, 'office');
  const materials = assignedTo(run, 'materials');
  const greeting = assignedTo(run, 'greeting');
  const social = assignedTo(run, 'social');
  const kelly = assignedTo(run, 'kelly');
  const onboard = assignedTo(run, 'onboard');
  const unused = unusedPeople(run, mission);
  const jordanLoad = assignmentsFor(run, 'jordan');
  const late = Boolean(mission.people.find((p) => p.id === greeting)?.arrivesLateMinutes);
  const newOnboarded = onboard != null;
  const newUsedElsewhere = run.assignments.some((a) => a.actorId === 'new' && a.needId !== 'onboard');

  const outcomes: OperatorOutcome[] = [];

  if (clock !== 'open') {
    if (newOnboarded) {
      outcomes.push({
        id: 'new_useful',
        text:
          run.peopleFirst === 'teach' || run.peopleFirst === 'ask'
            ? 'The new volunteer is still in the room and useful.'
            : 'Someone gave the new volunteer a starting place.',
      });
    } else if (unused.includes('new') || !newUsedElsewhere) {
      outcomes.push({ id: 'new_left', text: 'The volunteer who had no direction is gone.' });
    }

    if (materials === 'jordan') {
      outcomes.push({ id: 'materials_early', text: 'Event materials left headquarters early.' });
    } else if (!materials) {
      outcomes.push({ id: 'materials_still', text: 'The box of campaign material is still here.' });
    } else if (materials === 'self') {
      outcomes.push({ id: 'materials_self', text: 'You are the one moving the event material.' });
    } else {
      outcomes.push({
        id: 'materials_assigned',
        text: `${actorName(materials, mission)} is moving the event material.`,
      });
    }

    if (run.clarification === 'hold' || run.clarification === 'check') {
      outcomes.push({ id: 'organizer_held', text: 'The organizer is waiting, but they feel answered.' });
    } else if (run.clarification === 'promise' || run.clarification === 'guess') {
      outcomes.push({ id: 'organizer_assumed', text: 'The organizer is planning around an earlier arrival.' });
    } else if (run.clarification === 'refuse' || run.clarification === 'locked') {
      outcomes.push({ id: 'organizer_tight', text: 'The organizer sounded clipped after the last reply.' });
    }

    if (social === 'eli' && run.clarification !== 'check' && run.clarification !== 'hold') {
      outcomes.push({
        id: 'social_risk',
        text: 'A draft social post uses a start time nobody confirmed.',
      });
    } else if (social === 'eli') {
      outcomes.push({ id: 'social_caught', text: 'The social volunteer caught a detail before posting.' });
    } else if (!social) {
      outcomes.push({ id: 'social_silent', text: 'Nothing public has gone out yet.' });
    }

    if (!office) {
      outcomes.push({ id: 'office_open', text: 'The office was left without a named person.' });
    } else {
      outcomes.push({ id: 'office_held', text: 'Someone is responsible for the office.' });
    }

    if (jordanLoad.includes('office') && !jordanLoad.includes('materials')) {
      outcomes.push({
        id: 'jordan_stuck',
        text: 'The person with the vehicle is tied to the office.',
      });
    }

    if (greeting === 'maya') {
      outcomes.push({ id: 'maya_stretch', text: 'Maya is at the table. She looks like she is working through it.' });
    } else if (late && clock !== 'waveOne') {
      outcomes.push({ id: 'taylor_late', text: 'The table was uncovered for a stretch. It is staffed now.' });
    }

    if (run.peopleFirst === 'blame') {
      outcomes.push({ id: 'new_withdrawn', text: 'The new volunteer is quieter than they were an hour ago.' });
    } else if (run.peopleFirst === 'teach' || run.peopleFirst === 'ask') {
      outcomes.push({ id: 'new_taught', text: 'The handout mistake is being repaired with the person who made it.' });
    } else if (run.peopleFirst === 'takeover') {
      outcomes.push({ id: 'new_sidelined', text: 'The handout problem is solved. The person who made it is watching.' });
    }

    if (run.unknown === 'ignore' || run.unknownAct === 'ignore') {
      outcomes.push({ id: 'qr_down', text: 'The printed signup still fails when you press it.' });
    } else if (run.unknownAct === 'workaround' || run.unknown === 'workaround' || run.unknown === 'alternate') {
      outcomes.push({ id: 'qr_work', text: 'People can still sign up. The printed QR is not the only path.' });
    } else if (run.usedAi && (run.unknownAct === 'test' || run.unknown === 'test')) {
      outcomes.push({ id: 'qr_tested', text: 'The destination was tested before anyone changed the print.' });
    }

    if (run.interruption === 'later' || run.interruption === 'comms' || run.interruption === 'delegate') {
      outcomes.push({ id: 'reporter_held', text: 'The reporter is waiting on a later answer.' });
    } else if (run.interruption === 'ignore') {
      outcomes.push({ id: 'reporter_cold', text: 'The reporter is still standing by the door.' });
    } else if (run.interruption === 'take') {
      outcomes.push({ id: 'reporter_taken', text: 'You spent part of the window with the reporter.' });
    } else if (run.interruption === 'protect') {
      outcomes.push({ id: 'reporter_deferred', text: 'Kelly’s path to the event was protected. The reporter was not closed.' });
    }
  }

  if (clock === 'finale') {
    outcomes.push({
      id: 'kelly_left',
      text: run.critical.includes('kelly_ready')
        ? 'Kelly left on time with a named person and a destination.'
        : 'Kelly left on time. The last-minute briefing was thinner than it could have been.',
    });
    const placed = new Set(run.assignments.filter((a) => a.actorId !== 'self').map((a) => a.actorId));
    outcomes.push({
      id: 'placed',
      text: `${placed.size} volunteer${placed.size === 1 ? '' : 's'} had a place.`,
    });
    if (run.peopleFirst === 'blame') {
      outcomes.push({ id: 'tomorrow_talk', text: 'One volunteer needs a conversation tomorrow.' });
    }
  }

  const board = mission.needs.map((need) => {
    const actor = assignedTo(run, need.id);
    if (!actor) {
      return {
        needId: need.id,
        status: clock === 'open' ? ('open' as const) : ('missed' as const),
        note: clock === 'open' ? 'Open.' : 'Still unresolved.',
      };
    }
    if (need.id === 'social' && actor === 'eli' && run.clarification !== 'check' && run.clarification !== 'hold') {
      return { needId: need.id, status: 'risk' as const, note: `${actorName(actor, mission)} · unconfirmed detail` };
    }
    if (need.id === 'office' && actor) {
      return { needId: need.id, status: 'assigned' as const, note: actorName(actor, mission) };
    }
    if (need.id === 'materials' && actor === 'jordan' && clock !== 'open') {
      return { needId: need.id, status: 'done' as const, note: 'Moving' };
    }
    return { needId: need.id, status: 'assigned' as const, note: actorName(actor, mission) };
  });

  const people = mission.people
    .filter((p) => !p.isSelf)
    .map((p) => {
      const load = assignmentsFor(run, p.id);
      if (p.isNew && !newOnboarded && clock !== 'open' && unused.includes('new')) {
        return { actorId: p.id, status: 'left' as const, note: 'No direction.' };
      }
      if (p.arrivesLateMinutes && load.length && clock === 'waveOne') {
        return { actorId: p.id, status: 'late' as const, note: `Arrives in ${p.arrivesLateMinutes} minutes.` };
      }
      if (load.length >= 3) {
        return { actorId: p.id, status: 'stretched' as const, note: load.map((id) => needLabel(id, mission)).join(' · ') };
      }
      if (load.length) {
        return { actorId: p.id, status: 'placed' as const, note: load.map((id) => needLabel(id, mission)).join(' · ') };
      }
      return { actorId: p.id, status: 'available' as const, note: p.availableUntil ? `Until ${p.availableUntil}` : 'No assignment yet.' };
    });

  return {
    clock: mission.clocks[clock],
    outcomes,
    board,
    people,
  };
}

export function finaleFacts(run: OperatorRunState, mission: OperatorMissionDef = shiftMission): string[] {
  return deriveWorld(run, mission, 'finale').outcomes.map((o) => o.text);
}
