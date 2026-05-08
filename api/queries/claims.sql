-- Claims by Branch — for sampleClaims on dashboard load
-- Parameters: @Branch (branch ID, multi-value supported)
-- Joins claims to Bonds/BondDetails to filter by branch and get principal name
SELECT
    c.ClaimNumber,
    c.BondNumber,
    c.Principal,
    c.Adjuster,
    c.LossDate,
    c.FiledDate,
    c.Status,
    c.CloseDate,
    c.CustomerNumber
FROM (
    SELECT DISTINCT
        c.Incident AS ClaimNumber,
        c.BondNumber,
        acct.AccountName AS Principal,
        c.AdjusterName AS Adjuster,
        CONVERT(VARCHAR, c.LossDate, 101) AS LossDate,
        CONVERT(VARCHAR, c.ReportedDate, 101) AS FiledDate,
        CASE WHEN c.IsClosed = 1 THEN 'Closed' ELSE 'Open' END AS Status,
        CONVERT(VARCHAR, c.CloseDate, 101) AS CloseDate,
        c.CustomerNumber,
        c.ReportedDate
    FROM dbo.vw_vwBondClaims c
    INNER JOIN Bonds b ON b.BondNumber = c.BondNumber
    INNER JOIN BondDetails bd ON bd.BondId = b.Id
    LEFT JOIN Accounts acct ON acct.Id = bd.AccountId
    WHERE bd.BranchId IN (@Branch)
) c
ORDER BY c.ReportedDate DESC
