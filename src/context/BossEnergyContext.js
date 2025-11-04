import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

const createId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

const STORAGE_KEY = 'sbs.boss-energy.entries';
const MILESTONE_KEY = 'sbs.boss-energy.milestones';

const initialEntry = {
  id: createId(),
  createdAt: new Date().toISOString(),
  body: 5,
  money: 5,
  boundaries: 5,
  spirit: 5,
  notes: 'Centered. Soft. Ready.',
};

const BossEnergyContext = createContext();

function hydrateEntries(raw) {
  if (!raw) return [initialEntry];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [initialEntry];
  } catch (error) {
    console.warn('Failed to parse boss energy entries', error);
    return [initialEntry];
  }
}

function hydrateMilestones(raw) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Failed to parse boss energy milestones', error);
    return [];
  }
}

export function BossEnergyProvider({ children }) {
  const [entries, setEntries] = useState([initialEntry]);
  const [milestones, setMilestones] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function bootstrap() {
      try {
        const storedEntries = await AsyncStorage.getItem(STORAGE_KEY);
        const storedMilestones = await AsyncStorage.getItem(MILESTONE_KEY);
        if (!mounted) return;
        setEntries(hydrateEntries(storedEntries));
        setMilestones(hydrateMilestones(storedMilestones));
      } catch (error) {
        console.warn('Failed to bootstrap Boss Energy Index', error);
      } finally {
        if (mounted) setHydrated(true);
      }
    }

    bootstrap();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries)).catch((error) =>
      console.warn('Failed to persist entries', error),
    );
  }, [entries, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(MILESTONE_KEY, JSON.stringify(milestones)).catch((error) =>
      console.warn('Failed to persist milestones', error),
    );
  }, [milestones, hydrated]);

  const recordEntry = useCallback((entry) => {
    setEntries((current) => [
      {
        id: createId(),
        createdAt: new Date().toISOString(),
        body: entry.body,
        money: entry.money,
        boundaries: entry.boundaries,
        spirit: entry.spirit,
        notes: entry.notes,
      },
      ...current,
    ]);
  }, []);

  const toggleMilestone = useCallback((milestoneId) => {
    setMilestones((current) => {
      if (current.includes(milestoneId)) {
        return current.filter((id) => id !== milestoneId);
      }
      return [...current, milestoneId];
    });
  }, []);

  const metrics = useMemo(() => {
    const latest = entries[0];
    const sevenDaysAgo = dayjs().subtract(7, 'day');
    const recent = entries.filter((entry) => dayjs(entry.createdAt).isAfter(sevenDaysAgo));

    const aggregate = recent.reduce(
      (acc, entry) => {
        acc.count += 1;
        acc.body += entry.body;
        acc.money += entry.money;
        acc.boundaries += entry.boundaries;
        acc.spirit += entry.spirit;
        return acc;
      },
      { count: 0, body: 0, money: 0, boundaries: 0, spirit: 0 },
    );

    const divisor = aggregate.count || 1;

    return {
      latest,
      weeklyAverage: {
        body: Math.round((aggregate.body / divisor) * 10) / 10,
        money: Math.round((aggregate.money / divisor) * 10) / 10,
        boundaries: Math.round((aggregate.boundaries / divisor) * 10) / 10,
        spirit: Math.round((aggregate.spirit / divisor) * 10) / 10,
      },
      streak: aggregate.count,
    };
  }, [entries]);

  const value = useMemo(
    () => ({
      hydrated,
      entries,
      milestones,
      metrics,
      recordEntry,
      toggleMilestone,
    }),
    [entries, hydrated, metrics, milestones, recordEntry, toggleMilestone],
  );

  return <BossEnergyContext.Provider value={value}>{children}</BossEnergyContext.Provider>;
}

BossEnergyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useBossEnergy() {
  const ctx = useContext(BossEnergyContext);
  if (!ctx) {
    throw new Error('useBossEnergy must be used within BossEnergyProvider');
  }
  return ctx;
}
