-- All accounts with branch info (for account dropdown + My Accounts view)
-- No parameters required — returns all active/suspended accounts
SELECT
    a.Id AS AccountID,
    a.AccountName,
    a.AccountNumber,
    a.AccountCustomerNumber AS CustomerNumber,
    br.Name AS Branch,
    br.Code AS BranchCode,
    br.Id AS BranchId,
    CASE WHEN br.RegionCode = 'BCOMM' THEN 'Commercial' ELSE 'Contract' END AS AccountType,
    CASE
        WHEN a.AccountStatus = 1 THEN 'Active'
        WHEN a.AccountStatus = 3 THEN 'Suspended'
    END AS AccountStatus,
    u.UserName AS Underwriter
FROM Accounts a
INNER JOIN Agencies ags ON a.AgencyId = ags.Id
INNER JOIN Branches br ON ags.BranchId = br.Id
LEFT JOIN Users u ON a.UnderwriterId = u.Id
WHERE a.AccountStatus IN (1, 3)
ORDER BY a.AccountName
