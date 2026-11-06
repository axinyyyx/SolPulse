import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateBuilderLevel, filterBounties, isValidUrl, calculateProtocolStats, INITIAL_BOUNTIES } from './bountyLogic';
import { shortenAddress, solToLamports, lamportsToSol, formatSol } from './solana';

test('shortenAddress properly truncates long public keys', () => {
  const address = '9xKy18MvQz81Tp2YqR8sW76P10vL8291M41Xy99Q5555';
  const shortened = shortenAddress(address, 4);
  assert.equal(shortened, '9xKy...5555');
  
  assert.equal(shortenAddress(''), '');
  assert.equal(shortenAddress('short'), 'short');
});

test('solToLamports and lamportsToSol handle decimals safely', () => {
  assert.equal(solToLamports(1), 1_000_000_000);
  assert.equal(solToLamports(0.5), 500_000_000);
  assert.equal(lamportsToSol(1_000_000_000), 1.0);
  assert.equal(lamportsToSol(250_000_000), 0.25);
});

test('formatSol formats numbers cleanly', () => {
  assert.equal(formatSol(1.5), '1.50');
  assert.equal(formatSol(0.1234, 3), '0.123');
  assert.equal(formatSol(0), '0.00');
});

test('calculateBuilderLevel calculates progression and rank correctly', () => {
  // New builder with 0 XP
  const level0 = calculateBuilderLevel(0, 0);
  assert.equal(level0.level, 1);
  assert.equal(level0.levelTitle, 'Apprentice Builder');
  assert.equal(level0.xp, 0);

  // Builder with 1 completed bounty (100 XP) and 0.2 SOL (200 XP) = 300 XP
  const level3 = calculateBuilderLevel(0.2, 1);
  assert.equal(level3.level, 3);
  assert.equal(level3.levelTitle, 'Protocol Architect');
  assert.equal(level3.xp, 300);
});

test('filterBounties filters by category, difficulty and search query', () => {
  const all = filterBounties(INITIAL_BOUNTIES, {});
  assert.equal(all.length, INITIAL_BOUNTIES.length);

  const securityOnly = filterBounties(INITIAL_BOUNTIES, { category: 'Security & Audit' });
  assert.equal(securityOnly.length, 1);
  assert.equal(securityOnly[0].category, 'Security & Audit');

  const advancedOnly = filterBounties(INITIAL_BOUNTIES, { difficulty: 'Advanced' });
  assert.ok(advancedOnly.length >= 2);
  advancedOnly.forEach(b => assert.equal(b.difficulty, 'Advanced'));

  const searched = filterBounties(INITIAL_BOUNTIES, { searchQuery: 'Blink' });
  assert.ok(searched.length >= 1);
  assert.ok(searched[0].title.includes('Blink') || searched[0].tags.includes('Blinks'));
});

test('isValidUrl correctly validates URLs', () => {
  assert.equal(isValidUrl('https://github.com/solana-labs/solana'), true);
  assert.equal(isValidUrl('http://localhost:3000'), true);
  assert.equal(isValidUrl('invalid-url'), false);
  assert.equal(isValidUrl(''), false);
});

test('calculateProtocolStats computes volume and counts', () => {
  const stats = calculateProtocolStats(INITIAL_BOUNTIES);
  assert.equal(stats.totalBounties, 6);
  assert.ok(stats.totalSolVolume > 1.5);
});
