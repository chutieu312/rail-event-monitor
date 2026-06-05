INSERT INTO trains (train_code, route, status) VALUES
('TR-1001', 'Jacksonville -> Pittsburgh', 'ON_TIME'),
('TR-1002', 'Minnetonka -> Jacksonville', 'ON_TIME'),
('TR-1003', 'Pittsburgh -> Jacksonville', 'DELAYED')
ON CONFLICT (train_code) DO NOTHING;
