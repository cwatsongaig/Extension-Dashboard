-- Claims (all branches) — for sampleClaims when user is admin
-- No branch filter — returns most recent claims across all branches
SELECT DISTINCT TOP 200
    c.Incident AS ClaimNumber,
    c.BondNumber,
    acct.AccountName AS Principal,
    c.AdjusterName AS Adjuster,
    CONVERT(VARCHAR, c.LossDate, 101) AS LossDate,
    CONVERT(VARCHAR, c.ReportedDate, 101) AS FiledDate,
    CASE WHEN c.IsClosed = 1 THEN 'Closed' ELSE 'Open' END AS Status,
    CONVERT(VARCHAR, c.CloseDate, 101) AS CloseDate,
    c.CustomerNumber
FROM dbo.vw_vwBondClaims c
INNER JOIN Bonds b ON b.BondNumber = c.BondNumber
INNER JOIN BondDetails bd ON bd.BondId = b.Id
LEFT JOIN Accounts acct ON acct.Id = bd.AccountId
ORDER BY FiledDate DESC
