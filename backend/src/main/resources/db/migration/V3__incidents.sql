CREATE TABLE IF NOT EXISTS incidents (
    id BIGSERIAL PRIMARY KEY,
    train_code VARCHAR(64) NOT NULL,
    severity VARCHAR(32) NOT NULL,
    summary VARCHAR(255) NOT NULL,
    details TEXT NOT NULL,
    status VARCHAR(32) NOT NULL,
    opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_incidents_status_opened_at
    ON incidents (status, opened_at DESC);
