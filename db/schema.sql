CREATE TABLE IF NOT EXISTS eligibility (
  wallet TEXT NOT NULL,
  phase_key TEXT NOT NULL,
  status TEXT NOT NULL,
  PRIMARY KEY (wallet, phase_key)
);

CREATE INDEX IF NOT EXISTS idx_eligibility_wallet
ON eligibility(wallet);

CREATE INDEX IF NOT EXISTS idx_eligibility_phase
ON eligibility(phase_key);
